"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getConfig } from "@/lib/config";

// English translation of the landing page. Reachable at /en (and, optionally,
// at en.aquiestamosvenezuela.com via a host rewrite to /en). The sub-pages it
// links to (search, registro, policies) remain in Spanish for now.
export default function HomeEn() {
  const [instagram, setInstagram] = useState("#");
  useEffect(() => {
    setInstagram(getConfig().instagramUrl);
  }, []);

  return (
    <main className="wrap">
      <div className="lang-switch">
        <Link href="/" hrefLang="es">
          Español
        </Link>
      </div>

      <img
        className="hero-img"
        src="/assets/images/image01.jpg"
        alt="Aqui Estamos Venezuela"
      />
      <h1>Aqui Estamos Venezuela</h1>
      <h2>
        Citizen Network for the Safe Location of People during Emergencies
      </h2>

      <ul className="buttons">
        <li>
          <Link className="btn btn-primary" href="/busqueda" role="button">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 1 0-.7.7l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0A4.5 4.5 0 1 1 14 9.5 4.49 4.49 0 0 1 9.5 14z" />
            </svg>
            Search for a person
          </Link>
        </li>
        <li>
          <Link className="btn" href="/subir-registro" role="button">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M9 3l-1.83 2H4a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-3.17L15 3H9zm3 5a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6z" />
            </svg>
            Add a record
          </Link>
        </li>
        <li>
          <Link className="btn" href="/voluntario" role="button">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M4 11h12.17l-5.59-5.59L12 4l8 8-8 8-1.41-1.41L16.17 13H4z" />
            </svg>
            I want to volunteer
          </Link>
        </li>
        <li>
          <Link className="btn" href="/verificar" role="button">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 1l9 4v6c0 5.55-3.84 10.74-9 12-5.16-1.26-9-6.45-9-12V5l9-4zm-1.2 13.4l5.3-5.3-1.4-1.4-3.9 3.9-1.9-1.9-1.4 1.4 3.3 3.3z" />
            </svg>
            Verify a volunteer
          </Link>
        </li>
      </ul>

      <p className="lead">
        Aquí Estamos is an independent, non-profit citizen initiative that is
        building a collaboration network to support the location of people
        affected by emergencies through a secure system of registration,
        verification and information intermediation.
      </p>
      <p>
        Our purpose is to help reunite families, reduce misinformation and
        ensure that information reaches, in an organized way, those responsible
        for protecting the people affected.
      </p>

      <hr className="divider" />

      <h3>What do we do?</h3>
      <p>
        We are developing a collaboration network among volunteers,
        professionals and future institutional allies to support secure
        processes of documentation, verification and location of people
        affected by emergencies.
      </p>
      <p>
        The platform has been designed to prioritize the protection of the
        identity, privacy and dignity of the registered persons.
      </p>
      <p>We do not seek to publish information.</p>
      <p>
        We seek to make it possible for people to be found without being
        exposed.
      </p>

      <hr className="divider" />

      <h3>How does it work?</h3>
      <span>
        <h4>1. Responsible documentation</h4>
        <p>
          Authorized volunteers collect information following the protocols
          established by Aquí Estamos.
        </p>
      </span>
      <span>
        <h4>2. Verification</h4>
        <p>
          Each record is reviewed by the coordination teams before being added
          to the system.
        </p>
      </span>
      <span>
        <h4>3. Safe search</h4>
        <p>
          People searching for a relative can provide descriptive information
          and, when appropriate, a reference photograph.
        </p>
        <p>
          The platform analyzes the available information to determine whether a
          possible match exists.
        </p>
      </span>
      <span>
        <h4>4. Institutional intermediation</h4>
        <p>
          When a possible match is identified, the platform does not reveal the
          identity or location of the registered person.
        </p>
        <p>
          The case is referred to the responsible team or institution to carry
          out the corresponding verification process.
        </p>
      </span>

      <hr className="divider" />

      <h3>Our Vision</h3>
      <p>Emergencies can separate families in a matter of minutes.</p>
      <p>
        Children, older adults, hospitalized patients, people with disabilities
        or people who have difficulty communicating may be temporarily unable to
        report where they are.
      </p>
      <p>
        We believe technology can help find them without publicly exposing their
        identity.
      </p>
      <p>
        That is why we are developing a humanitarian intermediation
        infrastructure that prioritizes the protection of people over the
        dissemination of information.
      </p>

      <hr className="divider" />

      <h3>
        Protection of Children, Adolescents and People in Situations of
        Vulnerability
      </h3>
      <p>
        The protection of people is the fundamental principle of Aquí Estamos.
      </p>
      <p>
        Our platform is designed to prevent the public exposure of the identity
        of registered persons. It does not publish lists of victims, photo
        galleries, individual profiles or locations.
      </p>
      <p>
        As a current institutional measure, Aquí Estamos{" "}
        <strong>
          does not create audiovisual records of children or adolescents{" "}
        </strong>
        and does not incorporate information that would allow their direct or
        indirect identification, until specialized protocols, legal advice and
        agreements with the competent institutions are in place.
      </p>
      <p>
        This decision is part of our commitment to child protection and to the
        responsible development of humanitarian technology.
      </p>
      <p>
        <Link className="btn" href="/proteccion-menores" role="button">
          Read the full policy
        </Link>
      </p>
      <p>
        <Link className="btn" href="/constitucion-tecnologica" role="button">
          Read the Technological Constitution
        </Link>
      </p>

      <hr className="divider" />

      <h3>Independence</h3>

      <p>Aquí Estamos does not belong to any official body.</p>
      <p>
        We are a citizen-led, independent, collaborative and non-profit
        initiative.
      </p>

      <footer>
        <a href={instagram} target="_blank" rel="noopener noreferrer">
          Instagram
        </a>
        &nbsp;·&nbsp;
        <Link href="/privacidad">Search and Privacy Policy</Link>
        &nbsp;·&nbsp;
        <Link href="/proteccion-menores">Child and Adolescent Protection</Link>
        &nbsp;·&nbsp;
        <Link href="/constitucion-tecnologica">Technological Constitution</Link>
      </footer>
    </main>
  );
}
