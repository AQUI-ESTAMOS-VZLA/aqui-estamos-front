'use client';
import Link from 'next/link';
import { useState } from 'react';
import { getConfig } from '@/lib/config';
import { Alert, Spinner, Row } from '@/components/ui';
import type { Volunteer } from '@/lib/types';

type Result =
  | { kind: 'loading' }
  | { kind: 'error'; message: string }
  | { kind: 'volunteer'; volunteer: Volunteer };

export default function Verificar() {
  const [cedula, setCedula] = useState('');
  const [result, setResult] = useState<Result | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const value = cedula.trim();
    if (!value) {
      setResult({ kind: 'error', message: 'Ingresa una cédula.' });
      return;
    }

    setSubmitting(true);
    setResult({ kind: 'loading' });

    const url = `${getConfig().apiBase}/api/volunteers/verify?cedula=${encodeURIComponent(value)}`;

    try {
      const r = await fetch(url, { headers: { Accept: 'application/json' } });
      let data: { found?: boolean; volunteer?: Volunteer } | null;
      if (r.status === 404) {
        data = { found: false };
      } else if (!r.ok) {
        throw new Error('HTTP ' + r.status);
      } else {
        data = await r.json();
      }

      if (!data || data.found === false || !data.volunteer) {
        setResult({
          kind: 'error',
          message: `No se encontró ningún voluntario con la cédula ${value}.`,
        });
        return;
      }
      setResult({ kind: 'volunteer', volunteer: data.volunteer });
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      setResult({
        kind: 'error',
        message:
          'No se pudo contactar el servidor de verificación. ' +
          'Verifica tu conexión o inténtalo más tarde. (' +
          message +
          ')',
      });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="wrap">
      <div className="topbar">
        <Link href="/">&larr; Inicio</Link>
      </div>

      <h1>Verificar Voluntario</h1>
      <h2>Confirma que una persona pertenece a la red de voluntarios buscándola por su cédula.</h2>

      <div className="panel">
        <form onSubmit={onSubmit} autoComplete="off">
          <div className="field">
            <label htmlFor="cedula">Cédula</label>
            <input
              type="text"
              id="cedula"
              name="cedula"
              inputMode="numeric"
              placeholder="Ej. 12345678"
              required
              autoFocus
              value={cedula}
              onChange={(e) => setCedula(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary" id="submit-btn" disabled={submitting}>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 1l9 4v6c0 5.55-3.84 10.74-9 12-5.16-1.26-9-6.45-9-12V5l9-4zm-1.2 13.4l5.3-5.3-1.4-1.4-3.9 3.9-1.9-1.9-1.4 1.4 3.3 3.3z" />
            </svg>
            Verificar
          </button>
        </form>

        <div id="result" aria-live="polite">
          {result?.kind === 'loading' && <Spinner>Buscando…</Spinner>}
          {result?.kind === 'error' && <Alert kind="error">{result.message}</Alert>}
          {result?.kind === 'volunteer' && (() => {
            const v = result.volunteer;
            return (
              <div className="card">
                {v.photo_url ? (
                  <img className="photo" src={v.photo_url} alt={`Foto de ${v.first_name}`} />
                ) : (
                  <div className="photo"></div>
                )}
                <div className="info">
                  <h3>
                    {v.first_name} {v.last_name}
                  </h3>
                  <div style={{ marginBottom: '.6rem' }}>
                    <span className="badge ok">Voluntario verificado</span>
                  </div>
                  <Row k="Cédula" v={v.cedula} />
                  <Row k="Rol" v={v.role} />
                  <Row k="Estado" v={v.status} />
                  <Row k="Registrado" v={v.created_at ? v.created_at.substring(0, 10) : ''} />
                </div>
              </div>
            );
          })()}
        </div>
      </div>
    </main>
  );
}
