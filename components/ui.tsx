import React from 'react';
import { REGISTRO_STATUS_LABEL, REGISTRO_STATUS_CLASS } from '@/lib/types';

export function Alert({ kind, children }: { kind: 'error' | 'success' | 'info'; children: React.ReactNode }) {
  return <div className={`alert ${kind}`}>{children}</div>;
}

export function Spinner({ children }: { children: React.ReactNode }) {
  return <div className="alert info spinner">{children}</div>;
}

export function StatusPill({ status }: { status: string }) {
  const label = REGISTRO_STATUS_LABEL[status] || status;
  const cls = REGISTRO_STATUS_CLASS[status] || 'muted';
  return <span className={`status-pill s-${cls}`}>{label}</span>;
}

export function Row({ k, v }: { k: string; v?: React.ReactNode }) {
  if (v === null || v === undefined || v === '') return null;
  return (
    <div className="row">
      <span className="k">{k}:</span>
      {v}
    </div>
  );
}

export function Field({
  id,
  label,
  hint,
  children,
}: {
  id: string;
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="field">
      <label htmlFor={id}>
        {label} {hint && <span className="muted small">{hint}</span>}
      </label>
      {children}
    </div>
  );
}
