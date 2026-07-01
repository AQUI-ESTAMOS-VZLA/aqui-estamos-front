'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getConfig, AeConfig } from '@/lib/config';
import { CHILD_POLICY, CHILD_POLICY_EN } from '@/lib/policy';
import { SiteHeader } from '@/components/SiteHeader';
import { SiteFooter } from '@/components/SiteFooter';

type FormKey = Extract<keyof AeConfig, 'ayudarFormUrl' | 'registroFormUrl'>;

const STRINGS = {
  es: {
    noticeLabel: 'Aviso importante.',
    read: (t: string) => `Leer la ${t}.`,
    mustAccept: 'Debes aceptar la política para continuar.',
    switchLabel: 'Translate to English',
    homeHref: '/',
    eyebrowRecord: 'Registro',
    eyebrowVolunteer: 'Voluntariado',
  },
  en: {
    noticeLabel: 'Important notice.',
    read: (t: string) => `Read the ${t}.`,
    mustAccept: 'You must accept the policy to continue.',
    switchLabel: 'Traducir a español',
    homeHref: '/en',
    eyebrowRecord: 'Record',
    eyebrowVolunteer: 'Volunteering',
  },
};

/**
 * Consent interstitial before an external Google Form (volunteer sign-up or
 * registro upload). Enforces the child-protection notice + a mandatory
 * acceptance checkbox. Styled to match the landing redesign.
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
  const eyebrow = formKey === 'registroFormUrl' ? t.eyebrowRecord : t.eyebrowVolunteer;

  return (
    <main className="pg">
      <SiteHeader
        homeHref={t.homeHref}
        switchHref={switchHref || t.homeHref}
        switchLabel={t.switchLabel}
        lang={lang}
      />

      <div className="pg-main lp-inner">
        <div className="pg-hero">
          <p className="pg-eyebrow">{eyebrow}</p>
          <h1 className="pg-title">{title}</h1>
          <p className="pg-lead">{subtitle}</p>
        </div>

        <div className="pg-body" style={{ maxWidth: 660 }}>
          <div className="alert info" role="note">
            <strong>{t.noticeLabel}</strong> {policy.notice}
            {extraNote ? ' ' + extraNote : ''}
          </div>

          <div className="panel">
            <label
              className="field"
              style={{ display: 'flex', gap: '.7rem', alignItems: 'flex-start' }}
            >
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
              <a className="pg-btn" href={formUrl} target="_blank" rel="noopener noreferrer">
                {continueLabel}
              </a>
            ) : (
              <button className="pg-btn" type="button" disabled aria-disabled="true">
                {continueLabel}
              </button>
            )}
            {!accepted && (
              <p className="muted small" style={{ margin: '.85rem 0 0' }}>
                {t.mustAccept}
              </p>
            )}
          </div>
        </div>
      </div>

      <SiteFooter lang={lang} />
    </main>
  );
}
