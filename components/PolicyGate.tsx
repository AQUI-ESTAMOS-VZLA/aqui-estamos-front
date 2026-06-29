'use client';
import React, { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { getConfig } from '@/lib/config';
import { CHILD_POLICY } from '@/lib/policy';
import { Alert, Spinner } from './ui';

type Hdr = () => Record<string, string>;
type State = 'loading' | 'needsAccept' | 'ok';

/**
 * Blocks a private area until the signed-in volunteer has accepted the current
 * child-protection policy version. They must re-accept on first access and
 * whenever the backend bumps POLICY_VERSION (requirement 4).
 */
export function PolicyGate({
  authHeader,
  onAuthFail,
  children,
}: {
  authHeader: Hdr;
  onAuthFail: () => void;
  children: React.ReactNode;
}) {
  const [state, setState] = useState<State>('loading');
  const [checked, setChecked] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  const check = useCallback(async () => {
    try {
      const r = await fetch(`${getConfig().apiBase}/api/policy/acceptance`, { headers: authHeader() });
      if (r.status === 401 || r.status === 403) return onAuthFail();
      if (!r.ok) throw new Error('HTTP ' + r.status);
      const b = await r.json();
      setState(b.accepted ? 'ok' : 'needsAccept');
    } catch {
      // Infra error (e.g. backend/table not yet available): fail open so the
      // private area isn't bricked. Enforcement resumes once the API responds.
      setState('ok');
    }
  }, [authHeader, onAuthFail]);

  useEffect(() => {
    check();
  }, [check]);

  const accept = async () => {
    if (!checked) return;
    setBusy(true);
    setError('');
    try {
      const r = await fetch(`${getConfig().apiBase}/api/policy/accept`, {
        method: 'POST',
        headers: authHeader(),
      });
      if (r.status === 401 || r.status === 403) return onAuthFail();
      if (!r.ok) throw new Error('HTTP ' + r.status);
      setState('ok');
    } catch (e: any) {
      setError('No se pudo registrar tu aceptación. (' + e.message + ')');
    } finally {
      setBusy(false);
    }
  };

  if (state === 'loading')
    return (
      <div className="panel">
        <Spinner>Verificando política…</Spinner>
      </div>
    );

  if (state === 'needsAccept')
    return (
      <div className="panel">
        <h3 className="section-title">{CHILD_POLICY.title}</h3>
        <div className="alert info" role="note" style={{ marginTop: 0 }}>
          <strong>Antes de continuar.</strong> {CHILD_POLICY.notice} Durante esta fase, todas las
          herramientas se orientan exclusivamente al apoyo humanitario y logístico a las víctimas del
          terremoto del 24 de junio de 2026.
        </div>
        <label className="field" style={{ display: 'flex', gap: '.7rem', alignItems: 'flex-start' }}>
          <input
            type="checkbox"
            checked={checked}
            onChange={(e) => setChecked(e.target.checked)}
            style={{ width: 'auto', marginTop: '.25rem' }}
          />
          <span>
            {CHILD_POLICY.acceptanceText}{' '}
            <Link href={CHILD_POLICY.path} target="_blank">
              Leer la política completa.
            </Link>
          </span>
        </label>
        <button className="btn btn-primary" type="button" disabled={!checked || busy} onClick={accept}>
          Aceptar y continuar
        </button>
        {error && <Alert kind="error">{error}</Alert>}
      </div>
    );

  return <>{children}</>;
}
