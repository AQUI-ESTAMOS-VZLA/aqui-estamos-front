'use client';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { getSupabase } from '@/lib/supabase';
import { Alert, Spinner, Field } from '@/components/ui';

// Public account for people searching for someone. Unlike the admin/registro
// consoles, there is NO allowlist — anyone can create an account with a
// magic-link email and sign in to check whether there's a match.
//
// SCAFFOLD: the account is real (Supabase magic-link auth) but the "searches"
// and "matches" are placeholders until the search backend is connected.
type Status = 'loading' | 'out' | 'in';

const Icon = {
  shield: (
    <path d="M12 1l9 4v6c0 5.55-3.84 10.74-9 12-5.16-1.26-9-6.45-9-12V5l9-4zm-1.2 13.4l5.3-5.3-1.4-1.4-3.9 3.9-1.9-1.9-1.4 1.4 3.3 3.3z" />
  ),
  search: (
    <path d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 1 0-.7.7l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0A4.5 4.5 0 1 1 14 9.5 4.49 4.49 0 0 1 9.5 14z" />
  ),
  bell: (
    <path d="M12 22a2 2 0 0 0 2-2h-4a2 2 0 0 0 2 2zm6-6v-5a6 6 0 0 0-5-5.91V4a1 1 0 1 0-2 0v1.09A6 6 0 0 0 6 11v5l-2 2v1h16v-1l-2-2z" />
  ),
  lock: (
    <path d="M12 17a2 2 0 0 0 2-2 2 2 0 0 0-2-2 2 2 0 0 0-2 2 2 2 0 0 0 2 2zm6-9h-1V6A5 5 0 0 0 7 6v2H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V10a2 2 0 0 0-2-2zM8.9 6a3.1 3.1 0 0 1 6.2 0v2H8.9V6z" />
  ),
  heart: (
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
  ),
};

function Svg({ children }: { children: React.ReactNode }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      {children}
    </svg>
  );
}

export default function Cuenta() {
  const [status, setStatus] = useState<Status>('loading');
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    const sb = getSupabase();
    if (!sb) {
      setStatus('out');
      return;
    }
    sb.auth.getSession().then(({ data }) => {
      const s = data.session;
      setEmail(s?.user?.email ?? null);
      setStatus(s ? 'in' : 'out');
    });
    const { data: sub } = sb.auth.onAuthStateChange((_e, session) => {
      setEmail(session?.user?.email ?? null);
      setStatus(session ? 'in' : 'out');
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  async function logout() {
    await getSupabase()?.auth.signOut();
    setStatus('out');
    setEmail(null);
  }

  return (
    <main className="wrap acct">
      <div className="topbar">
        <Link href="/">&larr; Inicio</Link>
      </div>
      <h1>Mi cuenta</h1>
      <h2>
        Crea una cuenta para registrar a quién buscas y recibir aviso si aparece una posible
        coincidencia.
      </h2>

      {status === 'loading' && <Spinner>Cargando…</Spinner>}
      {status === 'out' && <LoginCard />}
      {status === 'in' && <Dashboard email={email} onLogout={logout} />}
    </main>
  );
}

function LoginCard() {
  const [email, setEmail] = useState('');
  const [sending, setSending] = useState(false);
  const [msg, setMsg] = useState<React.ReactNode>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const addr = email.trim();
    if (!addr) return;
    const sb = getSupabase();
    if (!sb) {
      setMsg(<Alert kind="error">El servicio de cuentas no está disponible ahora mismo.</Alert>);
      return;
    }
    setSending(true);
    setMsg(<Spinner>Enviando enlace…</Spinner>);
    const { error } = await sb.auth.signInWithOtp({
      email: addr,
      options: { emailRedirectTo: window.location.href.split('#')[0] },
    });
    setSending(false);
    setMsg(
      error ? (
        <Alert kind="error">No se pudo enviar: {error.message}</Alert>
      ) : (
        <Alert kind="success">
          Te enviamos un enlace a <strong>{addr}</strong>. Ábrelo desde este dispositivo para entrar.
        </Alert>
      )
    );
  }

  return (
    <div className="panel acct-card">
      <div className="acct-badge">
        <Svg>{Icon.shield}</Svg>
      </div>
      <h3 className="section-title">Entrar o crear tu cuenta</h3>
      <p className="section-sub">
        Te enviamos un enlace de un solo uso a tu correo. Sin contraseñas. Si es tu primera vez, la
        cuenta se crea automáticamente.
      </p>
      <form onSubmit={submit} autoComplete="off">
        <Field id="cuenta_email" label="Correo electrónico">
          <input
            type="email"
            id="cuenta_email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="tu@correo.com"
            required
          />
        </Field>
        <button type="submit" className="btn btn-primary" disabled={sending}>
          Enviar enlace de acceso
        </button>
      </form>
      {msg}

      <ul className="acct-perks">
        <li className="acct-perk">
          <Svg>{Icon.search}</Svg>
          <span>
            <strong>Guarda a quién buscas</strong> y consulta el estado cuando quieras.
          </span>
        </li>
        <li className="acct-perk">
          <Svg>{Icon.bell}</Svg>
          <span>
            <strong>Recibe un aviso</strong> si aparece una posible coincidencia.
          </span>
        </li>
        <li className="acct-perk">
          <Svg>{Icon.lock}</Svg>
          <span>
            <strong>Tus datos se mantienen privados</strong> y no se publican.
          </span>
        </li>
      </ul>

      <p className="acct-foot">
        <Svg>{Icon.lock}</Svg>
        Acceso seguro con enlace de un solo uso.
      </p>
    </div>
  );
}

function Dashboard({ email, onLogout }: { email: string | null; onLogout: () => void }) {
  const initial = (email?.trim()?.[0] || '?').toUpperCase();
  return (
    <>
      <div className="acct-header">
        <span className="acct-avatar" aria-hidden="true">
          {initial}
        </span>
        <span className="acct-who">
          <span className="em">{email || 'Tu cuenta'}</span>
          <span className="nm">Sesión iniciada</span>
        </span>
        <button type="button" className="acct-signout" onClick={onLogout}>
          Cerrar sesión
        </button>
      </div>

      <div className="alert info" role="note" style={{ marginBottom: '1.25rem' }}>
        <strong>En construcción.</strong> El registro de búsquedas y la detección de coincidencias
        están en preparación. Tu cuenta ya funciona; pronto podrás guardar a quién buscas y ver aquí
        las posibles coincidencias.
      </div>

      <div className="panel">
        <h3 className="section-title">Mis búsquedas</h3>
        <p className="section-sub">Las personas que estás buscando aparecerán aquí.</p>
        <div className="acct-empty">
          <span className="ico">
            <Svg>{Icon.search}</Svg>
          </span>
          <p>Aún no has registrado ninguna búsqueda. Empieza describiendo a quién buscas.</p>
          <Link className="btn btn-primary" href="/buscar/nueva" role="button">
            Iniciar una nueva búsqueda
          </Link>
        </div>
      </div>

      <div className="panel">
        <h3 className="section-title">Posibles coincidencias</h3>
        <p className="section-sub">
          Cuando un registro coincida con alguna de tus búsquedas, te avisaremos y aparecerá aquí.
        </p>
        <div className="acct-empty">
          <span className="ico">
            <Svg>{Icon.heart}</Svg>
          </span>
          <p>No hay coincidencias por ahora. Te avisaremos en cuanto encontremos algo.</p>
        </div>
      </div>
    </>
  );
}
