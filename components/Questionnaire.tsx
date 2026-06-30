'use client';
import React, { useState } from 'react';
import { OTRO } from '@/lib/questionnaire-options';

// Reusable building blocks for the search / record questionnaires.
// Fields are uncontrolled (read via FormData on submit) except SelectOther and
// Apodos, which need a little local state. Every dropdown can fall back to a
// free-text "Otro" answer.

export function Section({
  title,
  hint,
  children,
}: {
  title: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="panel">
      <h3 className="section-title">{title}</h3>
      {hint && <p className="section-sub">{hint}</p>}
      {children}
    </section>
  );
}

export function TextField({
  name,
  label,
  hint,
  type = 'text',
  placeholder,
}: {
  name: string;
  label: string;
  hint?: string;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div className="field">
      <label htmlFor={name}>
        {label} {hint && <span className="muted small">{hint}</span>}
      </label>
      <input id={name} name={name} type={type} placeholder={placeholder} />
    </div>
  );
}

export function TextAreaField({
  name,
  label,
  hint,
  placeholder,
  rows = 3,
}: {
  name: string;
  label: string;
  hint?: string;
  placeholder?: string;
  rows?: number;
}) {
  return (
    <div className="field">
      <label htmlFor={name}>
        {label} {hint && <span className="muted small">{hint}</span>}
      </label>
      <textarea id={name} name={name} placeholder={placeholder} rows={rows} />
    </div>
  );
}

// Dropdown that reveals a free-text input when "Otro" is selected. Submits both
// `name` (the choice) and `name_otro` (the free text) via FormData.
export function SelectOther({
  name,
  label,
  options,
  hint,
}: {
  name: string;
  label: string;
  options: string[];
  hint?: string;
}) {
  const [value, setValue] = useState('');
  return (
    <div className="field">
      <label htmlFor={name}>
        {label} {hint && <span className="muted small">{hint}</span>}
      </label>
      <select id={name} name={name} value={value} onChange={(e) => setValue(e.target.value)}>
        <option value="">Selecciona…</option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
      {value === OTRO && (
        <input
          name={`${name}_otro`}
          type="text"
          placeholder="Especifica…"
          aria-label={`${label} — especifica`}
          style={{ marginTop: '.5rem' }}
        />
      )}
    </div>
  );
}

// Dedicated apodos (nicknames) section — a person may be known by several, so
// this is a small add/remove list. Each input submits under name "apodo", read
// with FormData.getAll('apodo').
export function ApodosField() {
  const [rows, setRows] = useState<number[]>([0]);
  const [next, setNext] = useState(1);
  return (
    <div className="field">
      <label>
        Apodos o cómo le dicen <span className="muted small">(uno por línea; agrega los que quieras)</span>
      </label>
      {rows.map((id) => (
        <div key={id} className="file-row" style={{ marginBottom: '.5rem' }}>
          <input name="apodo" type="text" placeholder="Ej. «El Flaco», «Mari», «Chuo»…" />
          {rows.length > 1 && (
            <button
              type="button"
              className="rollbtn"
              onClick={() => setRows((r) => r.filter((x) => x !== id))}
              aria-label="Quitar apodo"
            >
              Quitar
            </button>
          )}
        </div>
      ))}
      <button
        type="button"
        className="btn"
        style={{ width: 'auto', padding: '.5rem 1rem', fontSize: '.95rem' }}
        onClick={() => {
          setRows((r) => [...r, next]);
          setNext((n) => n + 1);
        }}
      >
        + Agregar otro apodo
      </button>
    </div>
  );
}

// Collect a readable record from the form, dropping empty values and merging
// each "Otro" free-text into its field.
export function collectAnswers(form: HTMLFormElement): Record<string, unknown> {
  const fd = new FormData(form);
  const out: Record<string, unknown> = {};

  const apodos = (fd.getAll('apodo') as string[]).map((s) => s.trim()).filter(Boolean);
  if (apodos.length) out['apodos'] = apodos;

  for (const [key, raw] of fd.entries()) {
    if (key === 'apodo') continue;
    if (raw instanceof File) {
      if (raw.size > 0) out[key] = raw.name; // store the filename for the preview
      continue;
    }
    const value = raw.trim();
    if (!value) continue;
    if (key.endsWith('_otro')) {
      const base = key.slice(0, -'_otro'.length);
      out[base] = value; // the free text replaces the literal "Otro"
    } else if (!(key in out)) {
      out[key] = value;
    }
  }
  return out;
}

// Review panel showing the collected answers (these forms don't submit anywhere yet).
export function AnswersPreview({
  answers,
  onClose,
}: {
  answers: Record<string, unknown>;
  onClose: () => void;
}) {
  const entries = Object.entries(answers);
  return (
    <div className="panel" style={{ borderColor: 'var(--ve-blue)' }}>
      <h3 className="section-title">Borrador generado (vista de revisión)</h3>
      <p className="section-sub">Así se vería la respuesta. No se ha enviado a ningún sistema.</p>
      {entries.length === 0 ? (
        <p className="muted">No completaste ningún campo.</p>
      ) : (
        <div className="roster">
          {entries.map(([k, v]) => (
            <div className="row" key={k}>
              <span className="k" style={{ color: 'var(--muted)', marginRight: '.4rem' }}>
                {k}:
              </span>
              {Array.isArray(v) ? v.join(' · ') : String(v)}
            </div>
          ))}
        </div>
      )}
      <button type="button" className="btn" style={{ marginTop: '1rem' }} onClick={onClose}>
        Volver a editar
      </button>
    </div>
  );
}

// Draft banner — these questionnaires are not published yet.
export function DraftBanner() {
  return (
    <div className="alert info" role="note" style={{ marginBottom: '1.25rem' }}>
      <strong>Borrador.</strong> Este cuestionario está en preparación y aún no se publica. Lo que
      envíes aquí no se guarda en ningún sistema todavía; solo se muestra para revisión.
    </div>
  );
}
