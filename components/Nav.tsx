"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

// Public site navigation. Mounted globally in the root layout so every page
// can reach Inicio / Preguntas frecuentes / Colaboradores. Collapses to a
// hamburger menu on mobile.
const LINKS = [
  { href: "/", label: "Inicio" },
  { href: "/preguntas-frecuentes", label: "Preguntas frecuentes" },
  { href: "/colaboradores", label: "Colaboradores" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const close = () => setOpen(false);

  return (
    <nav className="site-nav" aria-label="Navegación principal">
      <div className="site-nav-inner">
        <Link href="/" className="site-nav-brand" onClick={close}>
          Aquí Estamos
        </Link>

        <button
          type="button"
          className="site-nav-toggle"
          aria-label="Abrir menú"
          aria-expanded={open}
          aria-controls="site-nav-menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>

        <ul id="site-nav-menu" className={`site-nav-links${open ? " open" : ""}`}>
          {LINKS.map((l) => {
            const active =
              l.href === "/" ? pathname === "/" : pathname.startsWith(l.href);
            return (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className={active ? "active" : ""}
                  aria-current={active ? "page" : undefined}
                  onClick={close}
                >
                  {l.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
