"use client";
import Link from "next/link";

export default function Busqueda() {
  return (
    <main className="wrap">
      <div className="topbar">
        <Link href="/">&larr; Inicio</Link>
      </div>

      <div
        className="panel"
        style={{ textAlign: "center", padding: "3rem 1.5rem" }}
      >
        <div
          style={{ fontSize: "3rem", lineHeight: 1, marginBottom: "1rem" }}
          aria-hidden="true"
        >
          🚧
        </div>
        <h1 style={{ marginBottom: ".5rem" }}>
          Estamos fortaleciendo la seguridad del sistema
        </h1>
        <p className="section-sub" style={{ maxWidth: 460, margin: "0 auto" }}>
          La búsqueda de personas estará disponible muy pronto. Estamos
          ajustando esta herramienta con especial cuidado para proteger la
          identidad de las personas registradas y garantizar un proceso seguro.
        </p>
        <p>Gracias por tu paciencia.</p>
        <div style={{ marginTop: "1.6rem" }}>
          <Link className="btn btn-primary" href="/" role="button">
            Volver al inicio
          </Link>
        </div>
      </div>
    </main>
  );
}
