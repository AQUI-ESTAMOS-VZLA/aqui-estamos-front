import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export const metadata = {
  title: "Search and Privacy Policy — Aqui Estamos Venezuela",
  description:
    "Aquí Estamos search and privacy policy: what information is public, what is private, and how a person is located safely.",
};

export default function PrivacyEn() {
  return (
    <main className="pg">
      <SiteHeader homeHref="/en" switchHref="/privacidad" switchLabel="Traducir a español" lang="en" />
      <div className="pg-main lp-inner">
        <div className="pg-hero">
          <p className="pg-eyebrow">Privacy</p>
          <h1 className="pg-title">Search and Privacy Policy</h1>
          <p className="pg-lead">How we protect the information of registered persons.</p>
        </div>
        <article className="doc pg-body">

      <section>
        <h3>What information is public?</h3>
        <p>
          None. Aquí Estamos does not publish personal information about
          registered persons: it does not display names, photographs, age,
          city, date, status or record number. The public search only confirms
          whether a record exists; it does not reveal any data about the person.
        </p>
      </section>

      <section>
        <h3>What information is private?</h3>
        <p>All information in a record is private. This includes:</p>
        <ul>
          <li>First and last name.</li>
          <li>Main photograph.</li>
          <li>Approximate age.</li>
          <li>City or municipality of the record.</li>
          <li>Date of the record.</li>
          <li>
            Status (located, in a shelter, hospitalized, sought by relatives or
            deceased when there is official confirmation).
          </li>
          <li>Unique record number.</li>
          <li>Exact address.</li>
          <li>GPS coordinates.</li>
          <li>Specific hospital or shelter.</li>
          <li>Phone numbers and emails.</li>
          <li>Relatives' data.</li>
          <li>Identity document.</li>
          <li>Medical information.</li>
          <li>Volunteer's data.</li>
          <li>Original videos and internal notes.</li>
        </ul>
      </section>

      <section>
        <h3>What can be searched?</h3>
        <p>
          The public search allows queries by first name, last name, full name
          or photograph (in a future stage through facial recognition). The
          system only confirms the existence of the record.
        </p>
      </section>

      <section>
        <h3>How is a person located?</h3>
        <p>
          The system confirms that a record exists and offers the option to
          request contact. An operator verifies the relationship or identity
          before sharing sensitive information or coordinating a meeting.
        </p>
      </section>

      <section>
        <h3>Special protection for children</h3>
        <p>
          The location, school, caregiver's name or any other information that
          could help locate a minor is never published. Every reunification
          requires identity verification.
        </p>
      </section>

      <section>
        <h3>Summary</h3>
        <table className="pubpriv">
          <thead>
            <tr>
              <th>Information</th>
              <th className="c">Public</th>
              <th className="c">Private</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Name</td><td className="c"></td><td className="c"><span className="yes">✓</span></td></tr>
            <tr><td>Main photograph</td><td className="c"></td><td className="c"><span className="yes">✓</span></td></tr>
            <tr><td>City / Municipality</td><td className="c"></td><td className="c"><span className="yes">✓</span></td></tr>
            <tr><td>Date of the record</td><td className="c"></td><td className="c"><span className="yes">✓</span></td></tr>
            <tr><td>Status</td><td className="c"></td><td className="c"><span className="yes">✓</span></td></tr>
            <tr><td>Exact address</td><td className="c"></td><td className="c"><span className="yes">✓</span></td></tr>
            <tr><td>Specific hospital or shelter</td><td className="c"></td><td className="c"><span className="yes">✓</span></td></tr>
            <tr><td>Phone</td><td className="c"></td><td className="c"><span className="yes">✓</span></td></tr>
            <tr><td>Medical data</td><td className="c"></td><td className="c"><span className="yes">✓</span></td></tr>
            <tr><td>Relatives</td><td className="c"></td><td className="c"><span className="yes">✓</span></td></tr>
            <tr><td>Original video</td><td className="c"></td><td className="c"><span className="yes">✓</span></td></tr>
            <tr><td>GPS coordinates</td><td className="c"></td><td className="c"><span className="yes">✓</span></td></tr>
            <tr><td>Volunteer's notes</td><td className="c"></td><td className="c"><span className="yes">✓</span></td></tr>
          </tbody>
        </table>
      </section>

      <p className="lead-rule">
        <strong>Guiding principle:</strong> the goal of the system is not to
        reveal where a person is, but to confirm that they are registered and to
        facilitate safe contact with their relatives through a verification
        process.
      </p>

      </article>
      </div>
      <SiteFooter lang="en" />
    </main>
  );
}
