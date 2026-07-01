import Link from "next/link";
import React from "react";

// Full-screen "coming soon" placeholder styled to match the landing redesign.
// Used by the WIP search pages (/busqueda, /en/search).
export function ComingSoon({
  lang,
  eyebrow,
  title,
  body,
  homeHref,
  homeLabel,
  switchHref,
  switchLabel,
  note,
}: {
  lang: "es" | "en";
  eyebrow: string;
  title: string;
  body: string;
  homeHref: string;
  homeLabel: string;
  switchHref?: string;
  switchLabel?: string;
  note?: React.ReactNode;
}) {
  return (
    <main className="wip">
      <div className="wip-top lp-inner">
        <Link href={homeHref} className="lp-brand">
          <img src="/assets/figma/logo-shield.png" alt="" />
          <span>Aquí Estamos</span>
        </Link>
        {switchHref && switchLabel && (
          <Link href={switchHref} className="lp-lang" hrefLang={lang === "es" ? "en" : "es"}>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm6.9 6h-2.6a15.7 15.7 0 0 0-1.2-3.1A8 8 0 0 1 18.9 8zM12 4c.8 1.2 1.4 2.5 1.8 4h-3.6c.4-1.5 1-2.8 1.8-4zM4.3 14a7.8 7.8 0 0 1 0-4h3a17.9 17.9 0 0 0 0 4h-3zm.8 2h2.6c.3 1.1.7 2.1 1.2 3.1A8 8 0 0 1 5.1 16zm2.6-8H5.1a8 8 0 0 1 3.8-3.1A15.7 15.7 0 0 0 7.7 8zM12 20c-.8-1.2-1.4-2.5-1.8-4h3.6c-.4 1.5-1 2.8-1.8 4zm2.2-6H9.8a15.9 15.9 0 0 1 0-4h4.4a15.9 15.9 0 0 1 0 4zm.3 5.1c.5-1 .9-2 1.2-3.1h2.6a8 8 0 0 1-3.8 3.1zM16.7 14a17.9 17.9 0 0 0 0-4h3a7.8 7.8 0 0 1 0 4h-3z" />
            </svg>
            {switchLabel}
          </Link>
        )}
      </div>

      <div className="wip-body lp-inner">
        <span className="wip-badge" aria-hidden="true">
          <svg viewBox="0 0 24 24">
            <path d="M12 17a2 2 0 0 0 2-2 2 2 0 0 0-2-2 2 2 0 0 0-2 2 2 2 0 0 0 2 2zm6-9h-1V6A5 5 0 0 0 7 6v2H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V10a2 2 0 0 0-2-2zM8.9 6a3.1 3.1 0 0 1 6.2 0v2H8.9V6z" />
          </svg>
        </span>
        <p className="lp-eyebrow lp-eyebrow-light">{eyebrow}</p>
        <h1 className="wip-title">{title}</h1>
        <p className="wip-sub">{body}</p>
        <Link href={homeHref} className="wip-btn">
          {homeLabel}
        </Link>
        {note && <div className="wip-note">{note}</div>}
      </div>

      <div className="lp-stripe" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
    </main>
  );
}
