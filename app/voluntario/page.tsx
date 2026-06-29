'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getConfig } from '@/lib/config';
import { CHILD_POLICY } from '@/lib/policy';

export default function Voluntario() {
  const [accepted, setAccepted] = useState(false);
  const [formUrl, setFormUrl] = useState('');

  useEffect(() => {
    setFormUrl(getConfig().ayudarFormUrl);
  }, []);

  return (
    <main className="wrap">
      <div className="topbar">
        <Link href="/">&larr; Inicio</Link>
      </div>
      <img className="hero-img" src="/assets/images/image01.jpg" alt="Aqui Estamos Venezuela" />
      <h1>Quiero ser voluntario</h1>
      <h2>Antes de inscribirte, lee y acepta nuestra política de protección de la infancia.</h2>

      <div className="alert info" role="note">
        <strong>Aviso importante.</strong> {CHILD_POLICY.notice} Durante esta fase, todas las
        actividades se orientan exclusivamente al apoyo humanitario y logístico a las víctimas del
        terremoto del 24 de junio de 2026.
      </div>

      <div className="panel">
        <label className="field" style={{ display: 'flex', gap: '.7rem', alignItems: 'flex-start' }}>
          <input
            type="checkbox"
            checked={accepted}
            onChange={(e) => setAccepted(e.target.checked)}
            style={{ width: 'auto', marginTop: '.25rem' }}
            aria-describedby="policy-link"
          />
          <span>
            {CHILD_POLICY.acceptanceText}{' '}
            <Link id="policy-link" href={CHILD_POLICY.path}>
              Leer la {CHILD_POLICY.title}.
            </Link>
          </span>
        </label>

        {accepted && formUrl ? (
          <a className="btn btn-primary" href={formUrl} target="_blank" rel="noopener noreferrer">
            Continuar al formulario de inscripción
          </a>
        ) : (
          <button className="btn btn-primary" type="button" disabled aria-disabled="true">
            Continuar al formulario de inscripción
          </button>
        )}
        {!accepted && (
          <p className="muted small" style={{ margin: '.85rem 0 0' }}>
            Debes aceptar la política para continuar con tu inscripción.
          </p>
        )}
      </div>

      <footer>
        <Link href="/">Volver al inicio</Link>
        &nbsp;·&nbsp;
        <Link href={CHILD_POLICY.path}>{CHILD_POLICY.title}</Link>
      </footer>
    </main>
  );
}
