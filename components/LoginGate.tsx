'use client';
import React, { useState } from 'react';
import { Alert, Field, Spinner } from './ui';

export function LoginGate({
  title,
  subtitle,
  onSend,
  error,
}: {
  title: string;
  subtitle: string;
  onSend: (email: string) => Promise<{ error?: string }>;
  error?: string;
}) {
  const [email, setEmail] = useState('');
  const [sending, setSending] = useState(false);
  const [msg, setMsg] = useState<React.ReactNode>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSending(true);
    setMsg(<Spinner>Enviando enlace…</Spinner>);
    const r = await onSend(email.trim());
    setSending(false);
    setMsg(
      r?.error ? (
        <Alert kind="error">No se pudo enviar: {r.error}</Alert>
      ) : (
        <Alert kind="success">Revisa tu correo ({email}) y abre el enlace para entrar.</Alert>
      )
    );
  };

  return (
    <section>
      <h2>{title}</h2>
      <div className="panel">
        <p className="muted small" style={{ marginTop: 0 }}>{subtitle}</p>
        <form onSubmit={submit} autoComplete="off">
          <Field id="login_email" label="Correo electrónico">
            <input
              type="email"
              id="login_email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@correo.com"
              required
            />
          </Field>
          <button type="submit" className="btn btn-primary" disabled={sending}>
            Enviar enlace de acceso
          </button>
          <p className="muted small" style={{ margin: '.85rem 0 0' }}>
            Te enviaremos un enlace de un solo uso. Solo correos autorizados pueden entrar.
          </p>
        </form>
        {error && <Alert kind="error">{error}</Alert>}
        {msg}
      </div>
    </section>
  );
}
