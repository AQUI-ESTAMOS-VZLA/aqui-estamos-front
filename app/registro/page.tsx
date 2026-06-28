'use client';
import React, { useCallback, useEffect, useState } from 'react';
import { getConfig } from '@/lib/config';
import { useAuthGate } from '@/components/useAuthGate';
import { LoginGate } from '@/components/LoginGate';
import { Alert, Spinner, Field, Row, StatusPill } from '@/components/ui';
import { Registro, MediaItem, REGISTRO_STATUS_LABEL } from '@/lib/types';

type Hdr = () => Record<string, string>;

export default function RegistroPage() {
  const gate = useAuthGate('/api/registro/check');
  const [reload, setReload] = useState(0);

  if (gate.status === 'loading')
    return <main className="wrap"><Spinner>Cargando…</Spinner></main>;

  if (gate.status === 'out')
    return (
      <main className="wrap">
        <img className="hero-img" src="/assets/images/image01.jpg" alt="Aqui Estamos Venezuela" />
        <h1>Consola de Registros</h1>
        <LoginGate
          title="Acceso para voluntarios de registro"
          subtitle="Solo personas autorizadas pueden añadir y consultar registros."
          onSend={gate.sendMagicLink}
          error={gate.error}
        />
      </main>
    );

  return (
    <main className="wrap">
      <img className="hero-img" src="/assets/images/image01.jpg" alt="Aqui Estamos Venezuela" />
      <h1>Consola de Registros</h1>
      <div className="topbar">
        <span className="badge ok">Voluntario de registro</span>
        <span className="muted small">{gate.email}</span>
        <a href="#" style={{ marginLeft: 'auto' }} onClick={(e) => { e.preventDefault(); gate.logout(); }}>Salir</a>
      </div>
      <AddRegistro authHeader={gate.authHeader} onAuthFail={gate.forceRelogin} onCreated={() => setReload((n) => n + 1)} />
      <RegistroList authHeader={gate.authHeader} onAuthFail={gate.forceRelogin} reload={reload} />
    </main>
  );
}

const STATUS_OPTIONS = [
  ['buscada', 'Buscada por familiares'],
  ['localizada', 'Localizada'],
  ['en_refugio', 'En refugio'],
  ['hospitalizada', 'Hospitalizada'],
  ['fallecida', 'Fallecida'],
];

function AddRegistro({ authHeader, onAuthFail, onCreated }: { authHeader: Hdr; onAuthFail: () => void; onCreated: () => void }) {
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<React.ReactNode>(null);
  const [photoPrev, setPhotoPrev] = useState('');
  const [mediaPrev, setMediaPrev] = useState<{ url: string; video: boolean }[]>([]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const fd = new FormData(form); // includes all named fields + photo + multiple media files
    setBusy(true);
    setMsg(<Spinner>Guardando… (subiendo archivos)</Spinner>);
    try {
      const r = await fetch(`${getConfig().apiBase}/api/registros`, { method: 'POST', headers: authHeader(), body: fd });
      const body = await r.json();
      if (r.status === 401 || r.status === 403) { onAuthFail(); return; }
      if (!r.ok) { setMsg(<Alert kind="error">No se pudo guardar: {body.detail || 'Error ' + r.status}</Alert>); return; }
      const v: Registro = body.registro;
      const name = `${v.first_name || ''} ${v.last_name || ''}`.trim() || 'Sin identificar';
      setMsg(<Alert kind="success">Registro <strong>{v.registro_number}</strong> creado: {name}.</Alert>);
      form.reset();
      setPhotoPrev('');
      setMediaPrev([]);
      onCreated();
    } catch (err: any) {
      setMsg(<Alert kind="error">No se pudo contactar el servidor. ({err.message})</Alert>);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="panel">
      <h3 className="section-title">Añadir un registro</h3>
      <p className="section-sub">Nada es obligatorio: si no se conoce el nombre, identifica a la persona con una foto y una descripción. Cuanta más información, más fácil será encontrarla.</p>
      <form onSubmit={submit} autoComplete="off">
        <div className="grid2">
          <Field id="first_name" label="Nombre" hint="(si se conoce)"><input type="text" id="first_name" name="first_name" /></Field>
          <Field id="last_name" label="Apellido" hint="(si se conoce)"><input type="text" id="last_name" name="last_name" /></Field>
        </div>
        <div className="grid2">
          <Field id="approximate_age" label="Edad aproximada"><input type="text" id="approximate_age" name="approximate_age" inputMode="numeric" placeholder="Opcional" /></Field>
          <Field id="sex" label="Sexo">
            <select id="sex" name="sex" defaultValue="">
              <option value="">—</option><option value="Femenino">Femenino</option><option value="Masculino">Masculino</option><option value="Otro">Otro</option>
            </select>
          </Field>
        </div>
        <div className="grid2">
          <Field id="city" label="Ciudad / Municipio"><input type="text" id="city" name="city" placeholder="Ej. Caracas" /></Field>
          <Field id="state" label="Estado (región)"><input type="text" id="state" name="state" placeholder="Ej. Distrito Capital" /></Field>
        </div>
        <Field id="status" label="Situación">
          <select id="status" name="status" defaultValue="buscada">
            {STATUS_OPTIONS.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
          </select>
        </Field>
        <Field id="clothing" label="Vestimenta"><input type="text" id="clothing" name="clothing" placeholder="Ropa que llevaba" /></Field>
        <Field id="distinguishing_features" label="Señas particulares"><input type="text" id="distinguishing_features" name="distinguishing_features" placeholder="Cicatrices, tatuajes, estatura…" /></Field>
        <Field id="last_seen" label="Visto por última vez"><input type="text" id="last_seen" name="last_seen" placeholder="Fecha y lugar general donde fue visto" /></Field>

        <Field id="photo" label="Fotografía principal" hint="(pública)">
          <div className="file-row">
            <input type="file" id="photo" name="photo" accept="image/*" onChange={(e) => { const f = e.target.files?.[0]; setPhotoPrev(f ? URL.createObjectURL(f) : ''); }} />
            {photoPrev && <img className="photo-preview show" src={photoPrev} alt="Vista previa" />}
          </div>
        </Field>
        <Field id="media" label="Fotos y videos adicionales" hint="(privados)">
          <input type="file" id="media" name="media" accept="image/*,video/*" multiple
            onChange={(e) => setMediaPrev(Array.from(e.target.files || []).map((f) => ({ url: URL.createObjectURL(f), video: (f.type || '').startsWith('video') })))} />
          {mediaPrev.length > 0 && (
            <div className="media-grid">
              {mediaPrev.map((m, i) => (
                <div className={`media-thumb${m.video ? ' video' : ''}`} key={i}>
                  {m.video ? <><video src={m.url} muted /><span>▶</span></> : <img src={m.url} alt="" />}
                </div>
              ))}
            </div>
          )}
        </Field>

        <details className="private-box">
          <summary>Información privada (no se muestra en la búsqueda pública)</summary>
          <Field id="exact_address" label="Dirección exacta"><input type="text" id="exact_address" name="exact_address" /></Field>
          <div className="grid2">
            <Field id="facility" label="Hospital / refugio específico"><input type="text" id="facility" name="facility" /></Field>
            <Field id="gps" label="Coordenadas GPS"><input type="text" id="gps" name="gps" placeholder="lat, lon" /></Field>
          </div>
          <div className="grid2">
            <Field id="phones" label="Teléfonos"><input type="text" id="phones" name="phones" /></Field>
            <Field id="emails" label="Correos"><input type="text" id="emails" name="emails" /></Field>
          </div>
          <Field id="id_document" label="Documento de identidad"><input type="text" id="id_document" name="id_document" /></Field>
          <Field id="family_data" label="Datos de familiares"><input type="text" id="family_data" name="family_data" /></Field>
          <Field id="medical_info" label="Información médica"><input type="text" id="medical_info" name="medical_info" /></Field>
          <Field id="video_url" label="Enlace al video original"><input type="text" id="video_url" name="video_url" placeholder="URL en el Drive" /></Field>
          <Field id="internal_notes" label="Observaciones internas"><input type="text" id="internal_notes" name="internal_notes" /></Field>
        </details>

        <button type="submit" className="btn btn-primary" disabled={busy} style={{ marginTop: '1rem' }}>Guardar registro</button>
      </form>
      {msg}
    </div>
  );
}

function MediaGallery({ media }: { media?: MediaItem[] }) {
  if (!media || !media.length) return null;
  return (
    <div className="media-grid" style={{ marginTop: '.6rem' }}>
      {media.map((m, i) => (
        <a className={`media-thumb${m.type === 'video' ? ' video' : ''}`} href={m.url} target="_blank" rel="noopener noreferrer" key={i}>
          {m.type === 'video' ? <><video src={m.url} muted /><span>▶</span></> : <img src={m.url} alt="" />}
        </a>
      ))}
    </div>
  );
}

function RegistroList({ authHeader, onAuthFail, reload }: { authHeader: Hdr; onAuthFail: () => void; reload: number }) {
  const [rows, setRows] = useState<Registro[] | null>(null);
  const [err, setErr] = useState('');
  const [filter, setFilter] = useState('');

  const load = useCallback(async () => {
    setErr('');
    try {
      const r = await fetch(`${getConfig().apiBase}/api/registros`, { headers: authHeader() });
      if (r.status === 401 || r.status === 403) { onAuthFail(); return; }
      if (!r.ok) throw new Error('HTTP ' + r.status);
      const d = await r.json();
      setRows(d.registros || []);
    } catch (e: any) { setErr('No se pudo cargar. (' + e.message + ')'); }
  }, [authHeader, onAuthFail]);

  useEffect(() => { load(); }, [load, reload]);

  const del = async (num: string) => {
    if (!confirm(`¿Eliminar el registro ${num}? Esta acción no se puede deshacer.`)) return;
    try {
      const r = await fetch(`${getConfig().apiBase}/api/registros/${encodeURIComponent(num)}`, { method: 'DELETE', headers: authHeader() });
      if (r.status === 401 || r.status === 403) { onAuthFail(); return; }
      if (!r.ok) throw new Error('HTTP ' + r.status);
      setRows((prev) => (prev || []).filter((x) => x.registro_number !== num));
    } catch (e: any) { alert('No se pudo eliminar. (' + e.message + ')'); }
  };

  const f = filter.trim().toLowerCase();
  const shown = (rows || []).filter((r) =>
    !f || `${r.first_name || ''} ${r.last_name || ''} ${r.city || ''} ${r.state || ''} ${r.registro_number}`.toLowerCase().includes(f)
  );

  return (
    <div className="panel">
      <h3 className="section-title">Registros</h3>
      <p className="section-sub">Busca para verificar la información o eliminar registros que no sean necesarios.</p>
      <div className="field" style={{ marginBottom: '.6rem' }}>
        <input type="text" value={filter} onChange={(e) => setFilter(e.target.value)} placeholder="Filtrar por nombre, ciudad o N.º…" />
      </div>
      {err && <Alert kind="error">{err}</Alert>}
      {!rows && !err && <Spinner>Cargando…</Spinner>}
      {rows && shown.length === 0 && <p className="muted small">Sin registros{f ? ` para “${filter}”` : ''}.</p>}
      {shown.map((r) => {
        const name = `${r.first_name || ''} ${r.last_name || ''}`.trim() || 'Sin identificar';
        const loc = [r.city, r.state].filter(Boolean).join(', ');
        return (
          <div className="card" key={r.registro_number}>
            {r.photo_url ? <img className="photo" src={r.photo_url} alt="Foto" /> : <div className="photo" />}
            <div className="info" style={{ width: '100%' }}>
              <h3 style={{ marginBottom: '.4rem' }}>{name}</h3>
              <div style={{ marginBottom: '.5rem' }}><StatusPill status={r.status} /></div>
              <Row k="N.º" v={r.registro_number} />
              <Row k="Edad" v={r.approximate_age ? `${r.approximate_age} años` : undefined} />
              <Row k="Sexo" v={r.sex} />
              <Row k="Ubicación" v={loc} />
              <Row k="Vestimenta" v={r.clothing} />
              <Row k="Señas" v={r.distinguishing_features} />
              <Row k="Visto por última vez" v={r.last_seen} />
              <div className="priv-sep">Privado</div>
              <Row k="Dirección" v={r.exact_address} />
              <Row k="Hospital/Refugio" v={r.facility} />
              <Row k="GPS" v={r.gps} />
              <Row k="Teléfonos" v={r.phones} />
              <Row k="Correos" v={r.emails} />
              <Row k="Documento" v={r.id_document} />
              <Row k="Familiares" v={r.family_data} />
              <Row k="Médico" v={r.medical_info} />
              <Row k="Video original" v={r.video_url ? <a href={r.video_url} target="_blank" rel="noopener noreferrer">abrir</a> : undefined} />
              <Row k="Notas" v={r.internal_notes} />
              <Row k="Registrado por" v={r.registered_by} />
              <MediaGallery media={r.media} />
              <button className="rm" style={{ marginTop: '.7rem' }} onClick={() => del(r.registro_number)}>Eliminar</button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
