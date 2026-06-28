'use client';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { getConfig } from '@/lib/config';
import { useAuthGate } from '@/components/useAuthGate';
import { LoginGate } from '@/components/LoginGate';
import { Alert, Spinner, Field, Row } from '@/components/ui';
import { Volunteer, AdminEntry } from '@/lib/types';

type Hdr = () => Record<string, string>;

export default function AdminPage() {
  const gate = useAuthGate('/api/admin/check');

  if (gate.status === 'loading')
    return (
      <main className="wrap">
        <Spinner>Cargando…</Spinner>
      </main>
    );

  if (gate.status === 'out')
    return (
      <main className="wrap">
        <img className="hero-img" src="/assets/images/image01.jpg" alt="Aqui Estamos Venezuela" />
        <h1>Panel de Administración</h1>
        <LoginGate
          title="Acceso restringido"
          subtitle="Solo personas autorizadas pueden registrar y consultar voluntarios."
          onSend={gate.sendMagicLink}
          error={gate.error}
        />
      </main>
    );

  return (
    <main className="wrap">
      <img className="hero-img" src="/assets/images/image01.jpg" alt="Aqui Estamos Venezuela" />
      <h1>Panel de Administración</h1>
      <div className="topbar">
        <span className="badge ok">Administrador</span>
        <span className="muted small">{gate.email}</span>
        <a href="#" style={{ marginLeft: 'auto' }} onClick={(e) => { e.preventDefault(); gate.logout(); }}>
          Salir
        </a>
      </div>

      <VolunteerLookup />
      <VolunteerRegister authHeader={gate.authHeader} onAuthFail={gate.forceRelogin} />
      <Allowlist
        title="Administradores"
        subtitle="Personas autorizadas a entrar a este panel. Agrega o quita correos."
        listPath="/api/admins"
        addPath="/api/admins"
        removePath="/api/admins"
        dataKey="admins"
        authHeader={gate.authHeader}
        onAuthFail={gate.forceRelogin}
        showTags
      />
      <Allowlist
        title="Voluntarios de registro"
        subtitle="Personas autorizadas a usar la consola de registros (registro.<dominio>)."
        listPath="/api/registro-users"
        addPath="/api/registro-users"
        removePath="/api/registro-users"
        dataKey="users"
        authHeader={gate.authHeader}
        onAuthFail={gate.forceRelogin}
      />
    </main>
  );
}

function VolunteerLookup() {
  const [cedula, setCedula] = useState('');
  const [state, setState] = useState<{ kind: string; v?: Volunteer; msg?: string }>({ kind: 'idle' });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cedula.trim()) return;
    setState({ kind: 'loading' });
    try {
      const r = await fetch(`${getConfig().apiBase}/api/volunteers/verify?cedula=${encodeURIComponent(cedula.trim())}`);
      if (r.status === 404) return setState({ kind: 'error', msg: `No se encontró ningún voluntario con la cédula ${cedula}.` });
      if (!r.ok) throw new Error('HTTP ' + r.status);
      const d = await r.json();
      setState({ kind: 'ok', v: d.volunteer });
    } catch (err: any) {
      setState({ kind: 'error', msg: 'Error al buscar. (' + err.message + ')' });
    }
  };

  return (
    <div className="panel">
      <h3 className="section-title">Buscar voluntario</h3>
      <p className="section-sub">Consulta la ficha de un voluntario por su cédula.</p>
      <form onSubmit={submit} autoComplete="off">
        <Field id="v_cedula" label="Cédula">
          <input type="text" id="v_cedula" inputMode="numeric" value={cedula} onChange={(e) => setCedula(e.target.value)} placeholder="Ej. 12345678" required />
        </Field>
        <button type="submit" className="btn">Buscar</button>
      </form>
      {state.kind === 'loading' && <Spinner>Buscando…</Spinner>}
      {state.kind === 'error' && <Alert kind="error">{state.msg}</Alert>}
      {state.kind === 'ok' && state.v && (
        <div className="card">
          {state.v.photo_url ? <img className="photo" src={state.v.photo_url} alt="Foto" /> : <div className="photo" />}
          <div className="info">
            <h3>{state.v.first_name} {state.v.last_name}</h3>
            <Row k="Cédula" v={state.v.cedula} />
            <Row k="Rol" v={state.v.role} />
            <Row k="Estado" v={state.v.status} />
            <Row k="Registrado" v={state.v.created_at?.substring(0, 10)} />
          </div>
        </div>
      )}
    </div>
  );
}

function VolunteerRegister({ authHeader, onAuthFail }: { authHeader: Hdr; onAuthFail: () => void }) {
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<React.ReactNode>(null);
  const [preview, setPreview] = useState('');
  const formRef = useRef<HTMLFormElement>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const fd = new FormData(form);
    setBusy(true);
    setMsg(<Spinner>Registrando…</Spinner>);
    try {
      const r = await fetch(`${getConfig().apiBase}/api/volunteers`, { method: 'POST', headers: authHeader(), body: fd });
      const body = await r.json();
      if (r.status === 401 || r.status === 403) { onAuthFail(); return; }
      if (!r.ok) { setMsg(<Alert kind="error">No se pudo registrar: {body.detail || 'Error ' + r.status}</Alert>); return; }
      const v = body.volunteer || body;
      setMsg(<Alert kind="success">Voluntario <strong>{v.first_name} {v.last_name}</strong> (cédula {v.cedula}) registrado correctamente.</Alert>);
      form.reset();
      setPreview('');
    } catch (err: any) {
      setMsg(<Alert kind="error">No se pudo contactar el servidor. ({err.message})</Alert>);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="panel">
      <h3 className="section-title">Registrar voluntario</h3>
      <p className="section-sub">Da de alta a un voluntario con su foto. Quedará disponible para verificación pública por cédula.</p>
      <form ref={formRef} onSubmit={submit} autoComplete="off">
        <Field id="first_name" label="Nombre"><input type="text" id="first_name" name="first_name" placeholder="Ej. María" required /></Field>
        <Field id="last_name" label="Apellido"><input type="text" id="last_name" name="last_name" placeholder="Ej. González" required /></Field>
        <Field id="cedula" label="Cédula"><input type="text" id="cedula" name="cedula" inputMode="numeric" placeholder="Ej. 12345678" required /></Field>
        <Field id="role" label="Rol (opcional)">
          <select id="role" name="role" defaultValue="Registro audiovisual">
            <option value="Registro audiovisual">Registro audiovisual</option>
            <option value="Registro escrito">Registro escrito</option>
            <option value="Verificación">Verificación</option>
            <option value="Coordinación">Coordinación</option>
          </select>
        </Field>
        <Field id="photo" label="Foto del voluntario">
          <div className="file-row">
            <input type="file" id="photo" name="photo" accept="image/*" required onChange={(e) => { const f = e.target.files?.[0]; setPreview(f ? URL.createObjectURL(f) : ''); }} />
            {preview && <img className="photo-preview show" src={preview} alt="Vista previa" />}
          </div>
        </Field>
        <button type="submit" className="btn btn-primary" disabled={busy}>Registrar voluntario</button>
      </form>
      {msg}
    </div>
  );
}

function Allowlist({
  title, subtitle, listPath, addPath, removePath, dataKey, authHeader, onAuthFail, showTags,
}: {
  title: string; subtitle: string; listPath: string; addPath: string; removePath: string;
  dataKey: 'admins' | 'users'; authHeader: Hdr; onAuthFail: () => void; showTags?: boolean;
}) {
  const [rows, setRows] = useState<AdminEntry[] | null>(null);
  const [err, setErr] = useState('');
  const [email, setEmail] = useState('');
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<React.ReactNode>(null);

  const load = useCallback(async () => {
    setErr('');
    try {
      const r = await fetch(getConfig().apiBase + listPath, { headers: authHeader() });
      if (r.status === 401 || r.status === 403) { onAuthFail(); return; }
      if (!r.ok) throw new Error('HTTP ' + r.status);
      const d = await r.json();
      setRows(d[dataKey] || []);
    } catch (e: any) { setErr('No se pudo cargar. (' + e.message + ')'); }
  }, [listPath, dataKey, authHeader, onAuthFail]);

  useEffect(() => { load(); }, [load]);

  const add = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setBusy(true);
    setMsg(<Spinner>Autorizando…</Spinner>);
    try {
      const r = await fetch(getConfig().apiBase + addPath, {
        method: 'POST', headers: { 'Content-Type': 'application/json', ...authHeader() }, body: JSON.stringify({ email: email.trim() }),
      });
      const body = await r.json();
      if (r.status === 401 || r.status === 403) { onAuthFail(); return; }
      if (!r.ok) { setMsg(<Alert kind="error">{body.detail || 'No se pudo autorizar.'}</Alert>); return; }
      setMsg(<Alert kind="success">{body.email} autorizado.</Alert>);
      setEmail('');
      load();
    } catch (e: any) { setMsg(<Alert kind="error">No se pudo contactar el servidor. ({e.message})</Alert>); }
    finally { setBusy(false); }
  };

  const remove = async (addr: string) => {
    if (!confirm(`¿Quitar a ${addr}?`)) return;
    try {
      const r = await fetch(`${getConfig().apiBase}${removePath}/${encodeURIComponent(addr)}`, { method: 'DELETE', headers: authHeader() });
      if (r.status === 401 || r.status === 403) { onAuthFail(); return; }
      if (!r.ok) { const b = await r.json().catch(() => ({})); setMsg(<Alert kind="error">{b.detail || 'No se pudo quitar.'}</Alert>); return; }
      load();
    } catch (e: any) { setMsg(<Alert kind="error">No se pudo quitar. ({e.message})</Alert>); }
  };

  return (
    <div className="panel">
      <h3 className="section-title">{title}</h3>
      <p className="section-sub">{subtitle}</p>
      <form onSubmit={add} autoComplete="off">
        <Field id={`new_${dataKey}`} label="Autorizar un nuevo correo">
          <input type="email" id={`new_${dataKey}`} value={email} onChange={(e) => setEmail(e.target.value)} placeholder="persona@correo.com" required />
        </Field>
        <button type="submit" className="btn" disabled={busy}>Autorizar correo</button>
      </form>
      {msg}
      <div style={{ marginTop: '1.1rem' }}>
        {err && <Alert kind="error">{err}</Alert>}
        {!rows && !err && <Spinner>Cargando…</Spinner>}
        {rows && rows.length === 0 && <p className="muted small">Aún no hay correos autorizados. (Los administradores también tienen acceso.)</p>}
        {rows && rows.map((a) => (
          <div className="list-row" key={a.email}>
            <div className="who">
              <span className="em">{a.email}</span>
              {a.full_name && <span className="nm">{a.full_name}</span>}
            </div>
            <span className="grow" />
            {showTags && a.is_self && <span className="tag">tú</span>}
            {showTags && a.source === 'env' && <span className="tag">fijo</span>}
            {(showTags ? a.removable : true) && (
              <button className="rm" onClick={() => remove(a.email)}>Quitar</button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
