"use client";
import { useEffect, useMemo, useState } from "react";
import { getConfig } from "@/lib/config";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { isActiveToday, normalizeText } from "@/lib/jornada";

// Public colaboradores directory. Shows ONLY the volunteers active in today's
// jornada (present in today's roll call; coordinators always count). The roster
// is read live from the backend (volunteers table) via /api/volunteers/public.

type Collaborator = {
  id: string;
  nombre: string;
  apellido: string;
  cedula: string;
  foto: string;
  role?: string | null;
  activo_en_jornada?: string | null;
};

type ApiVolunteer = {
  cedula: string;
  first_name: string;
  last_name: string;
  role?: string | null;
  photo_url?: string | null;
  last_active_at?: string | null;
};

function initials(c: Collaborator): string {
  const a = c.nombre?.trim()?.[0] ?? "";
  const b = c.apellido?.trim()?.[0] ?? "";
  return (a + b).toUpperCase() || "?";
}

function Avatar({ c, className }: { c: Collaborator; className: string }) {
  if (c.foto) {
    return (
      <img
        src={c.foto}
        alt={`${c.nombre} ${c.apellido}`}
        className={className}
        loading="lazy"
      />
    );
  }
  return (
    <div className={`${className} dir-avatar-fallback`} aria-hidden="true">
      {initials(c)}
    </div>
  );
}

async function fetchCollaborators(): Promise<Collaborator[]> {
  const { apiBase } = getConfig();
  const r = await fetch(`${apiBase}/api/volunteers/public`, {
    headers: { Accept: "application/json" },
  });
  if (!r.ok) throw new Error("HTTP " + r.status);
  const data: { results?: ApiVolunteer[] } = await r.json();
  return (data.results || []).map((v) => ({
    id: v.cedula || "",
    nombre: v.first_name || "",
    apellido: v.last_name || "",
    cedula: v.cedula || "",
    foto: v.photo_url || "",
    role: v.role || null,
    activo_en_jornada: v.last_active_at || null,
  }));
}

function ActiveDot() {
  return (
    <span className="dir-dot small" aria-hidden="true">
      <span className="dir-dot-ping" />
      <span className="dir-dot-core" />
    </span>
  );
}

export default function Colaboradores() {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Collaborator | null>(null);
  const [active, setActive] = useState<Collaborator[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let alive = true;
    fetchCollaborators()
      .then((rows) => {
        if (!alive) return;
        // Only volunteers active in today's jornada are listed.
        setActive(rows.filter((c) => isActiveToday(c.role, c.activo_en_jornada)));
      })
      .catch((e) => alive && setError(String(e?.message || e)))
      .finally(() => alive && setLoading(false));
    return () => {
      alive = false;
    };
  }, []);

  useEffect(() => {
    if (!selected) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setSelected(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selected]);

  const filtered = useMemo<Collaborator[]>(() => {
    const q = normalizeText(query.trim());
    if (!q) return active;
    return active.filter((c) =>
      normalizeText(`${c.nombre} ${c.apellido} ${c.cedula} ${c.role || ""}`).includes(q),
    );
  }, [query, active]);

  return (
    <main className="pg">
      <SiteHeader homeHref="/" lang="es" />
      <div className="pg-main lp-inner">
        <div className="pg-hero">
          <p className="pg-eyebrow">Equipo</p>
          <h1 className="pg-title">Colaboradores</h1>
          <p className="pg-lead">
            Voluntarios activos en la jornada de hoy
            {!loading && !error ? (
              <>
                {" "}· {active.length} activo{active.length === 1 ? "" : "s"}
              </>
            ) : null}
          </p>
        </div>
        <div className="pg-body">
          <div className="dir-search">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 1 0-.7.7l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0A4.5 4.5 0 1 1 14 9.5 4.49 4.49 0 0 1 9.5 14z" />
        </svg>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar por nombre, apellido o cédula…"
          aria-label="Buscar colaboradores activos"
        />
      </div>

      {loading ? (
        <p className="dir-empty">Cargando colaboradores…</p>
      ) : error ? (
        <p className="dir-empty">No se pudo cargar la lista. ({error})</p>
      ) : filtered.length === 0 ? (
        <p className="dir-empty">
          {query
            ? `No se encontraron colaboradores activos para “${query}”.`
            : "No hay voluntarios activos en la jornada de hoy."}
        </p>
      ) : (
        <ul className="roster-grid dir-grid">
          {filtered.map((c) => (
            <li key={c.id}>
              <button
                type="button"
                className="roster-card active"
                onClick={() => setSelected(c)}
              >
                <span className="card-dot">
                  <ActiveDot />
                </span>
                <Avatar c={c} className="roster-photo" />
                <span className="roster-card-name">
                  {c.nombre} {c.apellido}
                </span>
                {c.cedula && <span className="muted small">{c.cedula}</span>}
              </button>
            </li>
          ))}
        </ul>
      )}

      {selected && (
        <div
          className="dir-modal-overlay"
          role="dialog"
          aria-modal="true"
          aria-label={`${selected.nombre} ${selected.apellido}`}
          onClick={() => setSelected(null)}
        >
          <div className="dir-modal" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="dir-modal-close"
              aria-label="Cerrar"
              onClick={() => setSelected(null)}
            >
              ✕
            </button>
            <Avatar c={selected} className="dir-modal-photo" />
            <h3 className="center" style={{ margin: ".4rem 0 0" }}>
              {selected.nombre} {selected.apellido}
            </h3>
            {selected.cedula && (
              <p className="muted center small" style={{ margin: ".25rem 0 0" }}>
                {selected.cedula}
              </p>
            )}
            {selected.role && (
              <p className="muted center small" style={{ margin: ".15rem 0 0" }}>
                {selected.role}
              </p>
            )}
            <span className="dir-active-pill">
              <ActiveDot />
              Activo en la jornada de hoy
            </span>
          </div>
        </div>
      )}
        </div>
      </div>
      <SiteFooter lang="es" />
    </main>
  );
}
