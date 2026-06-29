'use client';
import Link from 'next/link';

export default function Registro() {
  return (
    <main className="wrap">
      <div className="topbar">
        <Link href="/">&larr; Inicio</Link>
      </div>

      <div className="panel" style={{ textAlign: 'center', padding: '3rem 1.5rem' }}>
        <div style={{ fontSize: '3rem', lineHeight: 1, marginBottom: '1rem' }} aria-hidden="true">
          🚧
        </div>
        <h1 style={{ marginBottom: '.5rem' }}>Consola de registro en construcción</h1>
        <p className="section-sub" style={{ maxWidth: 460, margin: '0 auto' }}>
          Todavía estamos trabajando en la consola de registro. Muy pronto los voluntarios podrán
          subir y gestionar registros desde aquí. Gracias por tu paciencia.
        </p>
        <div style={{ marginTop: '1.6rem' }}>
          <Link className="btn btn-primary" href="/" role="button">
            Volver al inicio
          </Link>
        </div>
      </div>
    </main>
  );
}
