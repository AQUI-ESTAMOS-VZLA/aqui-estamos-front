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
    <main className="wrap">
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
    <div className="panel">
      <h3 className="section-title">Entrar o crear tu cuenta</h3>
      <p className="section-sub">
        Escribe tu correo y te enviaremos un enlace de un solo uso. Si es tu primera vez, la cuenta se
        crea automáticamente.
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
    </div>
  );
}

function Dashboard({ email, onLogout }: { email: string | null; onLogout: () => void }) {
  return (
    <>
      <div className="list-row" style={{ marginBottom: '1.25rem' }}>
        <div className="who">
          <span className="em">{email || 'Tu cuenta'}</span>
          <span className="nm">Sesión iniciada</span>
        </div>
        <span className="grow" />
        <button type="button" className="rollbtn" onClick={onLogout}>
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
        <p className="muted">Aún no has registrado ninguna búsqueda.</p>
        <Link className="btn btn-primary" href="/buscar/nueva" role="button" style={{ marginTop: '.5rem' }}>
          Iniciar una nueva búsqueda
        </Link>
      </div>

      <div className="panel">
        <h3 className="section-title">Posibles coincidencias</h3>
        <p className="section-sub">
          Cuando un registro coincida con alguna de tus búsquedas, te avisaremos y aparecerá aquí.
        </p>
        <p className="muted">No hay coincidencias por ahora.</p>
      </div>
    </>
  );
}
