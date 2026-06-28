'use client';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { getConfig } from '@/lib/config';
import { Registro } from '@/lib/types';
import { Alert, Spinner, StatusPill, Row } from '@/components/ui';

interface SearchResponse {
  query?: string;
  results?: Registro[];
}

function ResultCard({ v }: { v: Registro }) {
  const [instagram, setInstagram] = useState('#');
  const [revealed, setRevealed] = useState(false);
  useEffect(() => {
    setInstagram(getConfig().instagramUrl);
  }, []);

  const name = `${v.first_name || ''} ${v.last_name || ''}`.trim() || 'Sin identificar';
  const loc = [v.city, v.state].filter(Boolean).join(', ');

  return (
    <div className="card">
      {v.photo_url ? (
        <img className="photo" src={v.photo_url} alt="Foto" />
      ) : (
        <div className="photo"></div>
      )}
      <div className="info">
        <h3>{name}</h3>
        <div style={{ marginBottom: '.55rem' }}>
          <StatusPill status={v.status} />
        </div>
        <Row k="N.º de registro" v={v.registro_number} />
        {v.approximate_age ? <Row k="Edad aprox." v={`${v.approximate_age} años`} /> : null}
        <Row k="Sexo" v={v.sex} />
        <Row k="Ubicación" v={loc} />
        <Row k="Vestimenta" v={v.clothing} />
        <Row k="Señas particulares" v={v.distinguishing_features} />
        <Row k="Visto por última vez" v={v.last_seen} />
        <Row k="Fecha de registro" v={v.created_at ? v.created_at.substring(0, 10) : ''} />
        <button
          className="btn"
          style={{ marginTop: '.7rem', width: 'auto', padding: '.5rem 1rem', fontSize: '.92rem' }}
          disabled={revealed}
          onClick={() => setRevealed(true)}
        >
          Solicitar contacto seguro
        </button>
        {revealed && (
          <div className="alert success" style={{ marginTop: '.7rem' }}>
            Para proteger a la persona, un operador verificará tu identidad o parentesco antes de
            compartir información. Escríbenos por Instagram{' '}
            <a href={instagram} target="_blank" rel="noopener">
              @aqui.estamos.vnzl
            </a>{' '}
            indicando el N.º de registro <strong>{v.registro_number}</strong>.
          </div>
        )}
      </div>
    </div>
  );
}

export default function Busqueda() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Registro[] | null>(null);
  const [lastQuery, setLastQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const seqRef = useRef(0);

  useEffect(() => {
    const q = query.trim();
    if (!q) {
      setResults(null);
      setLoading(false);
      setError('');
      return;
    }
    const timer = setTimeout(() => {
      const mySeq = ++seqRef.current;
      setLoading(true);
      setError('');
      setLastQuery(q);
      fetch(`${getConfig().apiBase}/api/registros/search?q=${encodeURIComponent(q)}`)
        .then((r) => {
          if (!r.ok) throw new Error('HTTP ' + r.status);
          return r.json();
        })
        .then((data: SearchResponse) => {
          if (mySeq !== seqRef.current) return;
          setLoading(false);
          setResults(data.results || []);
          setLastQuery(data.query || q);
        })
        .catch((err: Error) => {
          if (mySeq !== seqRef.current) return;
          setLoading(false);
          setResults(null);
          setError(err.message);
        });
    }, 250);
    return () => clearTimeout(timer);
  }, [query]);

  return (
    <main className="wrap">
      <div className="topbar">
        <Link href="/">&larr; Inicio</Link>
      </div>
      <h1>Buscar a una persona</h1>
      <h2>
        Escribe un nombre, apellido o número de registro. La búsqueda tolera errores de escritura y
        acentos.
      </h2>

      <div className="panel">
        <form autoComplete="off" onSubmit={(e) => e.preventDefault()}>
          <div className="field" style={{ marginBottom: 0 }}>
            <label htmlFor="q">Nombre, apellido o N.º de registro</label>
            <input
              type="text"
              id="q"
              name="q"
              placeholder="Ej. María González, o AE-00001"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </form>
      </div>

      <div aria-live="polite">
        {error ? (
          <Alert kind="error">No se pudo buscar. ({error})</Alert>
        ) : loading ? (
          <Spinner>Buscando…</Spinner>
        ) : results !== null ? (
          results.length === 0 ? (
            <Alert kind="info">
              No se encontró ningún registro para “{lastQuery}”. Revisa la escritura o intenta con
              menos palabras.
            </Alert>
          ) : (
            <>
              <p className="muted small" style={{ margin: '.25rem 0 1rem' }}>
                {results.length} resultado{results.length === 1 ? '' : 's'}
              </p>
              {results.map((v) => (
                <ResultCard key={v.registro_number} v={v} />
              ))}
            </>
          )
        ) : null}
      </div>

      <p className="muted small center" style={{ marginTop: '1.5rem' }}>
        El sistema solo confirma que un registro existe y muestra información pública.{' '}
        <Link href="/privacidad">Ver Política de Búsqueda y Privacidad</Link>.
      </p>
    </main>
  );
}
