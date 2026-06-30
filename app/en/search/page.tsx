"use client";
import Link from "next/link";

export default function SearchEn() {
  return (
    <main className="wrap">
      <div className="lang-switch">
        <Link href="/busqueda" hrefLang="es">
          Traducir a español
        </Link>
      </div>
      <div className="topbar">
        <Link href="/en">&larr; Home</Link>
      </div>

      <div
        className="panel"
        style={{ textAlign: "center", padding: "3rem 1.5rem" }}
      >
        <div
          style={{ fontSize: "3rem", lineHeight: 1, marginBottom: "1rem" }}
          aria-hidden="true"
        >
          🚧
        </div>
        <h1 style={{ marginBottom: ".5rem" }}>
          We are strengthening the security of the system
        </h1>
        <p className="section-sub" style={{ maxWidth: 460, margin: "0 auto" }}>
          Searching for people will be available very soon. We are tuning this
          tool with special care to protect the identity of registered persons
          and to guarantee a secure process.
        </p>
        <p className="section-sub" style={{ maxWidth: 460, margin: "0 auto" }}>
          Thank you for your patience.
        </p>
        <div style={{ marginTop: "1.6rem" }}>
          <Link className="btn btn-primary" href="/en" role="button">
            Back to home
          </Link>
        </div>
      </div>
    </main>
  );
}
