import Link from "next/link";

export const metadata = {
  title:
    "Policy for the Protection of Children and Adolescents and the Safeguarding of People in Situations of Vulnerability — Aqui Estamos Venezuela",
  description:
    "Aquí Estamos institutional policy (Version 2.0): reinforced protection of children, no public exposure of registered persons, and safeguarding of people in situations of vulnerability.",
};

export default function ChildProtectionEn() {
  return (
    <main className="wrap doc">
      <div className="lang-switch">
        <Link href="/proteccion-menores" hrefLang="es">
          Español
        </Link>
      </div>
      <div className="topbar">
        <Link href="/en">&larr; Home</Link>
      </div>
      <h1>
        Policy for the Protection of Children and Adolescents and the
        Safeguarding of People in Situations of Vulnerability
      </h1>
      <h2>Aquí Estamos · Version 2.0 · Institutional document for public release</h2>

      <div className="callout" role="note">
        <strong>Reinforced protection of minors.</strong> As a current
        institutional measure, Aquí Estamos does not create audiovisual records
        or carry out any other processing of information that would allow the
        direct or indirect identification of children or adolescents until
        specialized protocols, legal advice and agreements with the competent
        institutions are in place.
      </div>

      <section>
        <h3><span className="num">1.</span> Declaration of principles</h3>
        <p>
          Aquí Estamos develops technological infrastructure to support the
          humanitarian response in emergency situations. The protection of the
          dignity, privacy and rights of people is the guiding principle of the
          project. Children and adolescents receive the highest level of
          protection within this policy.
        </p>
      </section>

      <section>
        <h3><span className="num">2.</span> Principle of non-exposure</h3>
        <p>
          The platform is designed to prevent the public exposure of registered
          persons. It does not publish lists of victims, photographs, individual
          profiles, locations or information that would allow a person to be
          directly or indirectly identified. Its purpose is to enable secure
          verification processes between someone searching for a relative and
          the institution responsible for protecting that person.
        </p>
      </section>

      <section>
        <h3><span className="num">3.</span> Reinforced protection of minors</h3>
        <p>
          As a current institutional measure, Aquí Estamos does not create
          audiovisual records or carry out any other processing of information
          that would allow the direct or indirect identification of children or
          adolescents until specialized protocols, legal advice and agreements
          with the competent institutions are in place. This measure may only be
          reviewed when there are sufficient guarantees for the protection of
          their rights.
        </p>
      </section>

      <section>
        <h3><span className="num">4.</span> Data minimization</h3>
        <p>
          Only the information strictly necessary to fulfill the authorized
          humanitarian purpose will be collected. Whenever possible, mechanisms
          that reduce the exposure of personal data will be used.
        </p>
      </section>

      <section>
        <h3><span className="num">5.</span> Human oversight</h3>
        <p>
          Decisions related to the identification, verification or contact of
          vulnerable persons will not be made solely through automated
          processes. Human intervention will be an essential requirement.
        </p>
      </section>

      <section>
        <h3><span className="num">6.</span> Temporality and custody</h3>
        <p>
          Aquí Estamos acts as a temporary custodian of the humanitarian
          information it manages. Data must be retained only for as long as
          necessary to fulfill its purpose or while a legal or institutional
          obligation justifies its retention; afterward it must be deleted or
          anonymized in accordance with applicable regulations.
        </p>
      </section>

      <section>
        <h3><span className="num">7.</span> Access restrictions</h3>
        <p>
          Access to information will be limited by role, need-to-know and
          authentication mechanisms. The download, export or reproduction of
          sensitive information may only take place with the express
          authorization of the responsible institution and in accordance with
          secure procedures.
        </p>
      </section>

      <section>
        <h3><span className="num">8.</span> Institutional commitment</h3>
        <p>
          Aquí Estamos designs its processes to minimize the risks associated
          with handling sensitive information and to continuously improve its
          technical and organizational measures. No system can completely
          eliminate risk, so the organization will permanently review and
          strengthen its protection protocols.
        </p>
      </section>

      <section>
        <h3><span className="num">9.</span> Final statement</h3>
        <p>
          The best sensitive information is that which never needs to be made
          public in order to fulfill its humanitarian purpose. That principle
          guides the technological and operational development of Aquí Estamos.
        </p>
      </section>

      <section>
        <h3>Validity</h3>
        <p>
          This policy takes effect upon its publication and will be reviewed
          periodically to incorporate improvements arising from technological,
          legal and humanitarian developments.
        </p>
      </section>

      <p className="lead-rule">
        <strong>Guiding principle:</strong> the best sensitive information is
        that which never needs to be made public in order to fulfill its
        humanitarian purpose.
      </p>

      <footer>
        <Link href="/en">Back to home</Link>
        &nbsp;·&nbsp;
        <Link href="/en/privacy">Search and Privacy Policy</Link>
      </footer>
    </main>
  );
}
