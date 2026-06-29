'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getConfig, AeConfig } from '@/lib/config';
import { CHILD_POLICY } from '@/lib/policy';

type FormKey = Extract<keyof AeConfig, 'ayudarFormUrl' | 'registroFormUrl'>;

/**
 * Consent interstitial shown before an external Google Form (volunteer sign-up
 * or registro upload). Enforces the child-protection notice + a mandatory
 * acceptance checkbox before letting the user continue to the form.
 */
export function PolicyConsent({
  title,
  subtitle,
  formKey,
  continueLabel,
  extraNote,
}: {
  title: string;
  subtitle: string;
  formKey: FormKey;
  continueLabel: string;
  extraNote?: string;
}) {
  const [accepted, setAccepted] = useState(false);
  const [formUrl, setFormUrl] = useState('');
  useEffect(() => {
    setFormUrl(getConfig()[formKey]);
  }, [formKey]);

  return (
    <main className="wrap">
      <div className="topbar">
        <Link href="/">&larr; Inicio</Link>
      </div>
      <img className="hero-img" src="/assets/images/image01.jpg" alt="Aqui Estamos Venezuela" />
      <h1>{title}</h1>
      <h2>{subtitle}</h2>

      <div className="alert info" role="note">
        <strong>Aviso importante.</strong> {CHILD_POLICY.notice}
        {extraNote ? ' ' + extraNote : ''}
      </div>

      <div className="panel">
        <label className="field" style={{ display: 'flex', gap: '.7rem', alignItems: 'flex-start' }}>
          <input
            type="checkbox"
            checked={accepted}
            onChange={(e) => setAccepted(e.target.checked)}
            style={{ width: 'auto', marginTop: '.25rem' }}
          />
          <span>
            {CHILD_POLICY.acceptanceText}{' '}
            <Link href={CHILD_POLICY.path}>Leer la {CHILD_POLICY.title}.</Link>
          </span>
        </label>

        {accepted && formUrl ? (
          <a className="btn btn-primary" href={formUrl} target="_blank" rel="noopener noreferrer">
            {continueLabel}
          </a>
        ) : (
          <button className="btn btn-primary" type="button" disabled aria-disabled="true">
            {continueLabel}
          </button>
        )}
        {!accepted && (
          <p className="muted small" style={{ margin: '.85rem 0 0' }}>
            Debes aceptar la política para continuar.
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
