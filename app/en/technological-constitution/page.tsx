import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export const metadata = {
  title: "Technological Constitution of Aquí Estamos — Aqui Estamos Venezuela",
  description:
    "Founding document (Version 1.0): principles of a humanitarian digital infrastructure centered on dignity, privacy and the non-exposure of people.",
};

export default function TechnologicalConstitutionEn() {
  return (
    <main className="pg">
      <SiteHeader homeHref="/en" switchHref="/constitucion-tecnologica" switchLabel="Traducir a español" lang="en" />
      <div className="pg-main lp-inner">
        <div className="pg-hero">
          <p className="pg-eyebrow">Founding Document</p>
          <h1 className="pg-title">Technological Constitution of Aquí Estamos</h1>
          <p className="pg-lead">Version 1.0 · Founding Document</p>
        </div>
        <article className="doc pg-body">

      <div className="callout" role="note">
        <strong>Preamble.</strong> Technology is not the subject of this
        document; people are. Aquí Estamos{" "}
        <strong>
          develops technology solely as a means to protect the dignity, the
          privacy and the right
        </strong>{" "}
        of people to be located without being exposed during an emergency.
      </div>

      <section>
        <h3><span className="num">1.</span> Statement of intent</h3>
        <p>
          Aquí Estamos promotes a humanitarian digital infrastructure to support
          competent institutions in the location, identification and
          reunification of people affected by emergencies, under a model of data
          protection, human rights and security by design.
        </p>
      </section>

      <section>
        <h3><span className="num">2.</span> Technological mission</h3>
        <p>
          To design a humanitarian digital infrastructure that enables secure
          processes of identification, reunification and institutional
          coordination, minimizing the public exposure of affected people.
        </p>
      </section>

      <section>
        <h3><span className="num">3.</span> Fundamental principles</h3>
        <ul>
          <li>Principle of security, dignity and will for the registered person.</li>
          <li>Principle of Non-Exposure.</li>
          <li>Principle of Responsible Custody.</li>
          <li>Privacy by design.</li>
          <li>Security by default.</li>
          <li>Data minimization.</li>
          <li>Separation of identities.</li>
          <li>Minimal disclosure.</li>
          <li>Human oversight in critical decisions.</li>
          <li>
            Reinforced protection of children, adolescents and other people in
            situations of vulnerability.
          </li>
        </ul>
      </section>

      <section>
        <h3><span className="num">4.</span> Rights of people</h3>
        <p>
          The design of the system will seek to respect the right to dignity,
          privacy, identity, data protection, non-discrimination and access to
          secure verification procedures in accordance with the applicable legal
          framework.
        </p>
      </section>

      <section>
        <h3><span className="num">5.</span> Institutional commitments</h3>
        <p>
          Aquí Estamos is designing its processes to reduce risks, document
          relevant technical decisions, periodically review its security
          controls and maintain continuous improvement based on evidence and
          specialized advice.
        </p>
      </section>

      <section>
        <h3><span className="num">6.</span> Responsible humanitarian technology</h3>
        <p>
          Not every technically possible feature should be implemented. Every
          new capability will be evaluated considering its impact on people's
          rights, security risks and the proportionality of its use.
        </p>
      </section>

      <section>
        <h3><span className="num">7.</span> Technological governance</h3>
        <p>
          The evolution of the system will have multidisciplinary advice in data
          protection, cybersecurity, law, humanitarian response and
          technological ethics. Strategic decisions will aim to be transparent
          and documented.
        </p>
      </section>

      <section>
        <h3><span className="num">8.</span> Intellectual property with a humanitarian purpose</h3>
        <p>
          Intellectual property will remain with its authors to preserve the
          integrity, security and evolution of the system. The intention is to
          facilitate its use through free licenses or public-interest agreements
          for humanitarian, non-profit institutions.
        </p>
      </section>

      <section>
        <h3><span className="num">9.</span> Invitation to cooperate</h3>
        <p>
          Aquí Estamos invites specialists, universities, international bodies,
          humanitarian organizations and competent authorities to continuously
          review, question and strengthen this Technological Constitution.
        </p>
      </section>

      <p className="lead-rule">
        <strong>Final statement:</strong> we do not aspire to build the largest
        system, but the most responsible one possible. We believe that a person
        can be located without turning their identity into public information,
        and that trust is built through transparency, continuous improvement and
        effective protection of human rights.
      </p>

      </article>
      </div>
      <SiteFooter lang="en" />
    </main>
  );
}
