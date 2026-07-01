import Link from "next/link";

// Shared top bar for inner pages, matching the landing redesign: shield logo +
// brand on the left, language toggle on the right, flag stripe underneath.
export function SiteHeader({
  homeHref,
  switchHref,
  switchLabel,
  lang,
}: {
  homeHref: string;
  switchHref?: string;
  switchLabel?: string;
  lang: "es" | "en";
}) {
  return (
    <header className="site-header">
      <div className="site-header-inner lp-inner">
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
      <div className="lp-stripe" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
    </header>
  );
}
