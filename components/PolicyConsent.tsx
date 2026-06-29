'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getConfig, AeConfig } from '@/lib/config';
import { CHILD_POLICY, CHILD_POLICY_EN } from '@/lib/policy';

type FormKey = Extract<keyof AeConfig, 'ayudarFormUrl' | 'registroFormUrl'>;

const STRINGS = {
  es: {
    back: '← Inicio',
    noticeLabel: 'Aviso importante.',
    read: (t: string) => `Leer la ${t}.`,
    mustAccept: 'Debes aceptar la política para continuar.',
    backHome: 'Volver al inicio',
    switchLabel: 'English',
    homeHref: '/',
  },
  en: {
    back: '← Home',
    noticeLabel: 'Important notice.',
    read: (t: string) => `Read the ${t}.`,
    mustAccept: 'You must accept the policy to continue.',
    backHome: 'Back to home',
    switchLabel: 'Español',
    homeHref: '/en',
  },
};

/**
 * Consent interstitial shown before an external Google Form (volunteer sign-up
 * or registro upload). Enforces the child-protection notice + a mandatory
 * acceptance checkbox before letting the user continue to the form.
 *
 * `lang` defaults to 'es' so existing Spanish pages are unchanged. Pass `lang="en"`
 * (and `switchHref` to the Spanish counterpart) for the /en pages.
 */
export function PolicyConsent({
  title,
  subtitle,
  formKey,
  continueLabel,
  extraNote,
  lang = 'es',
  switchHref,
}: {
  title: string;
  subtitle: string;
  formKey: FormKey;
  continueLabel: string;
  extraNote?: string;
  lang?: 'es' | 'en';
  switchHref?: string;
}) {
  const [accepted, setAccepted] = useState(false);
  const [formUrl, setFormUrl] = useState('');
  useEffect(() => {
    setFormUrl(getConfig()[formKey]);
  }, [formKey]);

  const isEn = lang === 'en';
  const t = isEn ? STRINGS.en : STRINGS.es;
  const policy = isEn ? CHILD_POLICY_EN : CHILD_POLICY;

  return (
    <main className="wrap">
      {switchHref && (
        <div className="lang-switch">
          <Link href={switchHref} hrefLang={isEn ? 'es' : 'en'}>
            {t.switchLabel}
          </Link>
        </div>
      )}
      <div className="topbar">
        <Link href={t.homeHref}>{t.back}</Link>
      </div>
      <img className="hero-img" src="/assets/images/image01.jpg" alt="Aqui Estamos Venezuela" />
      <h1>{title}</h1>
      <h2>{subtitle}</h2>

      <div className="alert info" role="note">
        <strong>{t.noticeLabel}</strong> {policy.notice}
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
            {policy.acceptanceText}{' '}
            <Link href={policy.path}>{t.read(policy.title)}</Link>
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
            {t.mustAccept}
          </p>
        )}
      </div>

      <footer>
        <Link href={t.homeHref}>{t.backHome}</Link>
        &nbsp;·&nbsp;
        <Link href={policy.path}>{policy.title}</Link>
      </footer>
    </main>
  );
}
