'use client';
import Link from 'next/link';
import { useState } from 'react';
import { getConfig } from '@/lib/config';
import { Alert, Spinner, Row } from '@/components/ui';
import type { Volunteer } from '@/lib/types';

type Result =
  | { kind: 'loading' }
  | { kind: 'error'; message: string }
  | { kind: 'results'; query: string; volunteers: Volunteer[] };

function VolunteerCard({ v }: { v: Volunteer }) {
  return (
    <div className="card">
      {v.photo_url ? (
        <img className="photo" src={v.photo_url} alt={`Photo of ${v.first_name}`} />
      ) : (
        <div className="photo"></div>
      )}
      <div className="info">
        <h3>
          {v.first_name} {v.last_name}
        </h3>
        <div style={{ marginBottom: '.6rem' }}>
          <span className="badge ok">Verified volunteer</span>
        </div>
        <Row k="ID number" v={v.cedula} />
        <Row k="Role" v={v.role} />
        <Row k="Status" v={v.status} />
        <Row k="Registered" v={v.created_at ? v.created_at.substring(0, 10) : ''} />
      </div>
    </div>
  );
}

export default function VerifyEn() {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState<Result | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const value = query.trim();
    if (!value) {
      setResult({ kind: 'error', message: 'Enter an ID number, first name or last name.' });
      return;
    }

    setSubmitting(true);
    setResult({ kind: 'loading' });

    const url = `${getConfig().apiBase}/api/volunteers/lookup?q=${encodeURIComponent(value)}`;

    try {
      const r = await fetch(url, { headers: { Accept: 'application/json' } });
      if (!r.ok) throw new Error('HTTP ' + r.status);
      const data: { results?: Volunteer[] } = await r.json();
      const volunteers = data.results || [];
      if (volunteers.length === 0) {
        setResult({
          kind: 'error',
          message: `No volunteer was found for “${value}”.`,
        });
        return;
      }
      setResult({ kind: 'results', query: value, volunteers });
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      setResult({
        kind: 'error',
        message:
          'The verification server could not be reached. ' +
          'Check your connection or try again later. (' +
          message +
          ')',
      });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="wrap">
      <div className="lang-switch">
        <Link href="/verificar" hrefLang="es">
          Traducir a español
        </Link>
      </div>
      <div className="topbar">
        <Link href="/en">&larr; Home</Link>
      </div>

      <h1>Verify a volunteer</h1>
      <h2>
        Confirm that a person belongs to the volunteer network by searching for
        them by ID number, first name or last name.
      </h2>

      <div className="panel">
        <form onSubmit={onSubmit} autoComplete="off">
          <div className="field">
            <label htmlFor="q">ID number, first name or last name</label>
            <input
              type="text"
              id="q"
              name="q"
              placeholder="e.g. 12345678 or María González"
              required
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary" id="submit-btn" disabled={submitting}>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 1l9 4v6c0 5.55-3.84 10.74-9 12-5.16-1.26-9-6.45-9-12V5l9-4zm-1.2 13.4l5.3-5.3-1.4-1.4-3.9 3.9-1.9-1.9-1.4 1.4 3.3 3.3z" />
            </svg>
            Verify
          </button>
        </form>

        <div id="result" aria-live="polite">
          {result?.kind === 'loading' && <Spinner>Searching…</Spinner>}
          {result?.kind === 'error' && <Alert kind="error">{result.message}</Alert>}
          {result?.kind === 'results' && (
            <>
              {result.volunteers.length > 1 && (
                <p className="section-sub" style={{ marginTop: '1rem' }}>
                  {result.volunteers.length} volunteers match “{result.query}”.
                </p>
              )}
              {result.volunteers.map((v) => (
                <VolunteerCard key={v.cedula} v={v} />
              ))}
            </>
          )}
        </div>
      </div>
    </main>
  );
}
