"use client";
import Link from "next/link";
import { useState } from "react";

// Preguntas frecuentes (FAQ).
//
// The page is content-ready: drop question/answer pairs into FAQS below and
// they render automatically as an accordion. While FAQS is empty we show a
// "próximamente" placeholder so the route is live but clearly pending content.
//
// `answer` accepts plain text or JSX (e.g. <p>…</p>, lists, links).
type Faq = {
  question: string;
  answer: React.ReactNode;
};

const FAQS: Faq[] = [
  // {
  //   question: "¿Qué es Aquí Estamos Venezuela?",
  //   answer: (
  //     <p>…</p>
  //   ),
  // },
];

function FaqItem({ faq, defaultOpen }: { faq: Faq; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(Boolean(defaultOpen));
  return (
    <div className={`faq-item${open ? " open" : ""}`}>
      <button
        type="button"
        className="faq-q"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <span>{faq.question}</span>
        <span className="faq-chevron" aria-hidden="true">
          ⌄
        </span>
      </button>
      {open && <div className="faq-a">{faq.answer}</div>}
    </div>
  );
}

export default function PreguntasFrecuentes() {
  return (
    <main className="wrap doc">
      <div className="topbar">
        <Link href="/">&larr; Inicio</Link>
      </div>

      <h1>Preguntas frecuentes</h1>
      <h2>Respuestas a las dudas más comunes sobre Aquí Estamos Venezuela</h2>

      {FAQS.length === 0 ? (
        <div className="callout" style={{ marginTop: "1.5rem" }}>
          <strong>Contenido en preparación.</strong> Estamos redactando las
          preguntas frecuentes. Muy pronto encontrarás aquí respuestas sobre
          cómo funciona la plataforma, la protección de datos y cómo participar.
        </div>
      ) : (
        <div className="faq-list">
          {FAQS.map((faq, i) => (
            <FaqItem key={faq.question} faq={faq} defaultOpen={i === 0} />
          ))}
        </div>
      )}

      <footer>
        <Link href="/">Volver al inicio</Link>
        &nbsp;·&nbsp;
        <Link href="/colaboradores">Colaboradores</Link>
      </footer>
    </main>
  );
}
