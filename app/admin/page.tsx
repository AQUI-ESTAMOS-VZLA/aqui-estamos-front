'use client';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { getConfig } from '@/lib/config';
import { useAuthGate } from '@/components/useAuthGate';
import { LoginGate } from '@/components/LoginGate';
import { SiteHeader } from '@/components/SiteHeader';
import { Alert, Spinner, Field } from '@/components/ui';
import { Volunteer, AdminEntry } from '@/lib/types';

type Hdr = () => Record<string, string>;

export default function AdminPage() {
  const gate = useAuthGate('/api/admin/check');

  if (gate.status === 'loading')
    return (
      <main className="pg">
        <SiteHeader homeHref="/" lang="es" />
        <div className="pg-main lp-inner" style={{ padding: '3rem 0' }}>
          <Spinner>Cargando…</Spinner>
        </div>
      </main>
    );

  if (gate.status === 'out')
    return (
      <main className="pg">
        <SiteHeader homeHref="/" lang="es" />
        <div className="pg-main lp-inner">
          <div className="pg-hero">
            <p className="pg-eyebrow">Administración</p>
            <h1 className="pg-title">Panel de Administración</h1>
          </div>
          <div className="pg-body" style={{ maxWidth: 520 }}>
            <LoginGate
              title="Acceso restringido"
              subtitle="Solo personas autorizadas pueden registrar y consultar voluntarios."
              onSend={gate.sendMagicLink}
              error={gate.error}
            />
          </div>
        </div>
      </main>
    );

  return (
    <main className="admin-main">
      <div className="admin-header">
        <div>
          <h1 className="admin-title">Panel de Administración</h1>
          <span className="muted small">Aquí Estamos Venezuela · {gate.email}</span>
        </div>
        <div className="admin-user">
          <span className="badge ok">Administrador</span>
          <a href="#" onClick={(e) => { e.preventDefault(); gate.logout(); }}>Salir</a>
        </div>
      </div>

      <VolunteersPanel authHeader={gate.authHeader} onAuthFail={gate.forceRelogin} />

      <div className="admin-grid">
        <VolunteerRegister authHeader={gate.authHeader} onAuthFail={gate.forceRelogin} />
        <Allowlist
          title="Administradores"
          subtitle="Personas autorizadas a entrar a este panel. Agrega o quita correos."
          listPath="/api/admins"
          addPath="/api/admins"
          removePath="/api/admins"
          dataKey="admins"
          authHeader={gate.authHeader}
          onAuthFail={gate.forceRelogin}
          showTags
        />
        <Allowlist
          title="Voluntarios de registro"
          subtitle="Personas autorizadas a usar la consola de registros (registro.<dominio>)."
          listPath="/api/registro-users"
          addPath="/api/registro-users"
          removePath="/api/registro-users"
          dataKey="users"
          authHeader={gate.authHeader}
          onAuthFail={gate.forceRelogin}
        />
      </div>
    </main>
  );
}

function VolunteersPanel({ authHeader, onAuthFail }: { authHeader: Hdr; onAuthFail: () => void }) {
  const [vols, setVols] = useState<Volunteer[] | null>(null);
  const [today, setToday] = useState('');
  const [err, setErr] = useState('');
  const [filter, setFilter] = useState('');
  const [busy, setBusy] = useState('');

  const load = useCallback(async () => {
    setErr('');
    try {
      const r = await fetch(getConfig().apiBase + '/api/volunteers', { headers: authHeader() });
      if (r.status === 401 || r.status === 403) { onAuthFail(); return; }
      if (!r.ok) throw new Error('HTTP ' + r.status);
      const d = await r.json();
      setVols(d.volunteers || []);
      setToday(d.today || '');
    } catch (e: any) { setErr('No se pudo cargar la lista. (' + e.message + ')'); }
  }, [authHeader, onAuthFail]);

  useEffect(() => { load(); }, [load]);

  const isActive = (v: Volunteer) => !!v.last_active_at && v.last_active_at === today;

  const setPresent = async (v: Volunteer, present: boolean) => {
    setBusy(v.cedula);
    setVols((prev) => prev && prev.map((x) => (x.cedula === v.cedula ? { ...x, last_active_at: present ? today : null } : x)));
    try {
      const r = await fetch(getConfig().apiBase + '/api/volunteers/rollcall', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...authHeader() },
        body: JSON.stringify({ cedula: v.cedula, present }),
      });
      if (r.status === 401 || r.status === 403) { onAuthFail(); return; }
      if (!r.ok) throw new Error('HTTP ' + r.status);
    } catch {
      setVols((prev) => prev && prev.map((x) => (x.cedula === v.cedula ? { ...x, last_active_at: present ? null : today } : x)));
      setErr('No se pudo actualizar la asistencia. Intenta de nuevo.');
    } finally { setBusy(''); }
  };

  const all = vols || [];
  const q = filter.trim().toLowerCase();
  const filtered = q
    ? all.filter((v) => `${v.first_name} ${v.last_name} ${v.cedula} ${v.role || ''}`.toLowerCase().includes(q))
    : all;
  const activeCount = all.filter(isActive).length;

  return (
    <div className="panel">
      <h3 className="section-title">Pase de lista — voluntarios</h3>
      <p className="section-sub">Marca quién está activo en la jornada de hoy. Esta es la lista completa.</p>

      <div className="stat-row">
        <div className="stat"><span className="stat-n">{all.length}</span><span className="stat-l">Voluntarios</span></div>
        <div className="stat"><span className="stat-n" style={{ color: '#16a34a' }}>{activeCount}</span><span className="stat-l">Activos hoy</span></div>
      </div>

      {!vols && !err && <Spinner>Cargando…</Spinner>}
      {err && <Alert kind="error">{err}</Alert>}

      {vols && (
        <>
          <input
            type="search"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            placeholder="Filtrar por nombre, cédula o rol…"
            style={{ width: '100%', marginBottom: '.9rem' }}
          />
          {filtered.length === 0 && <p className="muted small">Sin resultados.</p>}
          <div className="roster-grid">
            {filtered.map((v) => {
              const active = isActive(v);
              return (
                <div className={'roster-card' + (active ? ' active' : '')} key={v.cedula}>
                  {active && <span className="dot-on card-dot" title="Activo hoy" />}
                  {v.photo_url ? (
                    <img className="roster-photo" src={v.photo_url} alt="" />
                  ) : (
                    <div className="roster-photo" />
                  )}
                  <div className="roster-card-name">
                    {v.first_name} {v.last_name}
                  </div>
                  {v.role && <div className="muted small">{v.role}</div>}
                  <div className="muted small">{v.cedula}</div>
                  <button
                    type="button"
                    className={'rollbtn' + (active ? ' on' : '')}
                    disabled={busy === v.cedula}
                    onClick={() => setPresent(v, !active)}
                  >
                    {active ? '✓ Presente' : 'Marcar presente'}
                  </button>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

function VolunteerRegister({ authHeader, onAuthFail }: { authHeader: Hdr; onAuthFail: () => void }) {
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<React.ReactNode>(null);
  const [preview, setPreview] = useState('');
  const formRef = useRef<HTMLFormElement>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const fd = new FormData(form);
    setBusy(true);
    setMsg(<Spinner>Registrando…</Spinner>);
    try {
      const r = await fetch(`${getConfig().apiBase}/api/volunteers`, { method: 'POST', headers: authHeader(), body: fd });
      const body = await r.json();
      if (r.status === 401 || r.status === 403) { onAuthFail(); return; }
      if (!r.ok) { setMsg(<Alert kind="error">No se pudo registrar: {body.detail || 'Error ' + r.status}</Alert>); return; }
      const v = body.volunteer || body;
      setMsg(<Alert kind="success">Voluntario <strong>{v.first_name} {v.last_name}</strong> (cédula {v.cedula}) registrado correctamente.</Alert>);
      form.reset();
      setPreview('');
    } catch (err: any) {
      setMsg(<Alert kind="error">No se pudo contactar el servidor. ({err.message})</Alert>);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="panel">
      <h3 className="section-title">Registrar voluntario</h3>
      <p className="section-sub">Da de alta a un voluntario con su foto. Quedará disponible para verificación pública por cédula.</p>
      <form ref={formRef} onSubmit={submit} autoComplete="off">
        <Field id="first_name" label="Nombre"><input type="text" id="first_name" name="first_name" placeholder="Ej. María" required /></Field>
        <Field id="last_name" label="Apellido"><input type="text" id="last_name" name="last_name" placeholder="Ej. González" required /></Field>
        <Field id="cedula" label="Cédula"><input type="text" id="cedula" name="cedula" inputMode="numeric" placeholder="Ej. 12345678" required /></Field>
        <Field id="role" label="Rol (opcional)">
          <select id="role" name="role" defaultValue="Registro audiovisual">
            <option value="Registro audiovisual">Registro audiovisual</option>
            <option value="Registro escrito">Registro escrito</option>
            <option value="Verificación">Verificación</option>
            <option value="Coordinación">Coordinación</option>
          </select>
        </Field>
        <Field id="photo" label="Foto del voluntario">
          <div className="file-row">
            <input type="file" id="photo" name="photo" accept="image/*" required onChange={(e) => { const f = e.target.files?.[0]; setPreview(f ? URL.createObjectURL(f) : ''); }} />
            {preview && <img className="photo-preview show" src={preview} alt="Vista previa" />}
          </div>
        </Field>
        <button type="submit" className="btn btn-primary" disabled={busy}>Registrar voluntario</button>
      </form>
      {msg}
    </div>
  );
}

function Allowlist({
  title, subtitle, listPath, addPath, removePath, dataKey, authHeader, onAuthFail, showTags,
}: {
  title: string; subtitle: string; listPath: string; addPath: string; removePath: string;
  dataKey: 'admins' | 'users'; authHeader: Hdr; onAuthFail: () => void; showTags?: boolean;
}) {
  const [rows, setRows] = useState<AdminEntry[] | null>(null);
  const [err, setErr] = useState('');
  const [email, setEmail] = useState('');
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<React.ReactNode>(null);

  const load = useCallback(async () => {
    setErr('');
    try {
      const r = await fetch(getConfig().apiBase + listPath, { headers: authHeader() });
      if (r.status === 401 || r.status === 403) { onAuthFail(); return; }
      if (!r.ok) throw new Error('HTTP ' + r.status);
      const d = await r.json();
      setRows(d[dataKey] || []);
    } catch (e: any) { setErr('No se pudo cargar. (' + e.message + ')'); }
  }, [listPath, dataKey, authHeader, onAuthFail]);

  useEffect(() => { load(); }, [load]);

  const add = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setBusy(true);
    setMsg(<Spinner>Autorizando…</Spinner>);
    try {
      const r = await fetch(getConfig().apiBase + addPath, {
        method: 'POST', headers: { 'Content-Type': 'application/json', ...authHeader() }, body: JSON.stringify({ email: email.trim() }),
      });
      const body = await r.json();
      if (r.status === 401 || r.status === 403) { onAuthFail(); return; }
      if (!r.ok) { setMsg(<Alert kind="error">{body.detail || 'No se pudo autorizar.'}</Alert>); return; }
      setMsg(<Alert kind="success">{body.email} autorizado.</Alert>);
      setEmail('');
      load();
    } catch (e: any) { setMsg(<Alert kind="error">No se pudo contactar el servidor. ({e.message})</Alert>); }
    finally { setBusy(false); }
  };

  const remove = async (addr: string) => {
    if (!confirm(`¿Quitar a ${addr}?`)) return;
    try {
      const r = await fetch(`${getConfig().apiBase}${removePath}/${encodeURIComponent(addr)}`, { method: 'DELETE', headers: authHeader() });
      if (r.status === 401 || r.status === 403) { onAuthFail(); return; }
      if (!r.ok) { const b = await r.json().catch(() => ({})); setMsg(<Alert kind="error">{b.detail || 'No se pudo quitar.'}</Alert>); return; }
      load();
    } catch (e: any) { setMsg(<Alert kind="error">No se pudo quitar. ({e.message})</Alert>); }
  };

  return (
    <div className="panel">
      <h3 className="section-title">{title}</h3>
      <p className="section-sub">{subtitle}</p>
      <form onSubmit={add} autoComplete="off">
        <Field id={`new_${dataKey}`} label="Autorizar un nuevo correo">
          <input type="email" id={`new_${dataKey}`} value={email} onChange={(e) => setEmail(e.target.value)} placeholder="persona@correo.com" required />
        </Field>
        <button type="submit" className="btn" disabled={busy}>Autorizar correo</button>
      </form>
      {msg}
      <div style={{ marginTop: '1.1rem' }}>
        {err && <Alert kind="error">{err}</Alert>}
        {!rows && !err && <Spinner>Cargando…</Spinner>}
        {rows && rows.length === 0 && <p className="muted small">Aún no hay correos autorizados. (Los administradores también tienen acceso.)</p>}
        {rows && rows.map((a) => (
          <div className="list-row" key={a.email}>
            <div className="who">
              <span className="em">{a.email}</span>
              {a.full_name && <span className="nm">{a.full_name}</span>}
            </div>
            <span className="grow" />
            {showTags && a.is_self && <span className="tag">tú</span>}
            {showTags && a.source === 'env' && <span className="tag">fijo</span>}
            {(showTags ? a.removable : true) && (
              <button className="rm" onClick={() => remove(a.email)}>Quitar</button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
