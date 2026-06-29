"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getConfig } from "@/lib/config";

export default function Home() {
  const [instagram, setInstagram] = useState("#");
  useEffect(() => {
    setInstagram(getConfig().instagramUrl);
  }, []);

  return (
    <main className="wrap">
      <div className="lang-switch">
        <Link href="/en" hrefLang="en">
          English
        </Link>
      </div>
      <img
        className="hero-img"
        src="/assets/images/image01.jpg"
        alt="Aqui Estamos Venezuela"
      />
      <h1>Aqui Estamos Venezuela</h1>
      <h2>
        Red Ciudadana para la Localización Segura de Personas durante
        Emergencias
      </h2>

      <ul className="buttons">
        <li>
          <Link className="btn btn-primary" href="/busqueda" role="button">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 1 0-.7.7l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0A4.5 4.5 0 1 1 14 9.5 4.49 4.49 0 0 1 9.5 14z" />
            </svg>
            Buscar a una persona
          </Link>
        </li>
        <li>
          <Link className="btn" href="/subir-registro" role="button">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M9 3l-1.83 2H4a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-3.17L15 3H9zm3 5a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6z" />
            </svg>
            Añadir un registro
          </Link>
        </li>
        <li>
          <Link className="btn" href="/voluntario" role="button">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M4 11h12.17l-5.59-5.59L12 4l8 8-8 8-1.41-1.41L16.17 13H4z" />
            </svg>
            Quiero ser voluntario
          </Link>
        </li>
        <li>
          <Link className="btn" href="/verificar" role="button">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 1l9 4v6c0 5.55-3.84 10.74-9 12-5.16-1.26-9-6.45-9-12V5l9-4zm-1.2 13.4l5.3-5.3-1.4-1.4-3.9 3.9-1.9-1.9-1.4 1.4 3.3 3.3z" />
            </svg>
            Verificar un voluntario
          </Link>
        </li>
      </ul>

      <p className="lead">
        Aquí Estamos es una iniciativa ciudadana, independiente y sin fines de
        lucro que desarrolla una red de colaboración para apoyar la localización
        de personas afectadas por emergencias mediante un sistema seguro de
        registro, verificación e intermediación de información.
      </p>
      <p>
        Nuestro propósito es ayudar a reunir familias, reducir la desinformación
        y facilitar que la información llegue de manera organizada a quienes
        tienen la responsabilidad de proteger a las personas afectadas.
      </p>

      <hr className="divider" />

      <h3>¿Qué hacemos?</h3>
      <p>
        Estamos desarrollando una red de colaboración entre voluntarios,
        profesionales y futuros aliados institucionales para apoyar procesos
        seguros de documentación, verificación y localización de personas
        afectadas por emergencias.
      </p>
      <p>
        La plataforma ha sido diseñada para priorizar la protección de la
        identidad, la privacidad y la dignidad de las personas registradas.
      </p>
      <p>No buscamos publicar información.</p>
      <p>
        Buscamos facilitar que las personas puedan ser encontradas sin quedar
        expuestas.
      </p>

      <hr className="divider" />

      <h3>¿Cómo funciona?</h3>
      <span>
        <h4>1. Documentación responsable</h4>
        <p>
          Los voluntarios autorizados recopilan información siguiendo los
          protocolos establecidos por Aquí Estamos.
        </p>
      </span>
      <span>
        <h4>2. Verificación</h4>
        <p>
          Cada registro es revisado por los equipos de coordinación antes de
          incorporarse al sistema.
        </p>
      </span>
      <span>
        <h4>3. Búsqueda segura</h4>
        <p>
          Las personas que buscan a un familiar pueden aportar datos
          descriptivos y, cuando corresponda, una fotografía de referencia.
        </p>
        <p>
          La plataforma analiza la información disponible para determinar si
          existe una posible coincidencia.
        </p>
      </span>
      <span>
        <h4>4. Intermediación institucional</h4>
        <p>
          Cuando se identifica una posible coincidencia, la plataforma no revela
          la identidad ni la ubicación de la persona registrada.
        </p>
        <p>
          El caso es derivado al equipo o institución responsable para realizar
          el proceso de verificación correspondiente.
        </p>
      </span>

      <hr className="divider" />

      <h3>Nuestra Visión</h3>
      <p>Las emergencias pueden separar familias en cuestión de minutos.</p>
      <p>
        Niños, personas mayores, pacientes hospitalizados, personas con
        discapacidad o personas con dificultades para comunicarse pueden quedar
        temporalmente sin posibilidad de informar dónde se encuentran.
      </p>
      <p>
        Creemos que la tecnología puede ayudar a encontrarlas sin que ello
        implique exponer públicamente su identidad.
      </p>
      <p>
        Por eso desarrollamos una infraestructura de intermediación humanitaria
        que prioriza la protección de las personas por encima de la difusión de
        información.
      </p>

      <hr className="divider" />

      <h3>
        Protección de Niños, Niñas y Adolescentes y de Personas en Situación de
        Vulnerabilidad
      </h3>
      <p>
        La protección de las personas constituye el principio fundamental de
        Aquí Estamos.
      </p>
      <p>
        Nuestra plataforma está diseñada para evitar la exposición pública de la
        identidad de las personas registradas. No publica listados de víctimas,
        galerías de fotografías, perfiles individuales ni ubicaciones.
      </p>
      <p>
        Como medida institucional vigente, Aquí Estamos{" "}
        <strong>
          no realiza registros audiovisuales de niños, niñas y adolescentes{" "}
        </strong>
        ni incorpora información que permita su identificación directa o
        indirecta, hasta contar con protocolos especializados, asesoría jurídica
        y acuerdos con las instituciones competentes.
      </p>
      <p>
        Esta decisión forma parte de nuestro compromiso con la protección de la
        infancia y con el desarrollo responsable de tecnología humanitaria.
      </p>
      <p>
        <Link className="btn" href="/proteccion-menores" role="button">
          Leer la política completa
        </Link>
      </p>
      <p>
        <Link className="btn" href="/constitucion-tecnologica" role="button">
          Leer la Constitución Tecnológica
        </Link>
      </p>

      <hr className="divider" />

      <h3>Independencia</h3>

      <p>Aquí Estamos no pertenece a ningún organismo oficial.</p>
      <p>
        Somos una iniciativa ciudadana, independiente, colaborativa y sin fines
        de lucro.
      </p>

      <footer>
        <a href={instagram} target="_blank" rel="noopener noreferrer">
          Instagram
        </a>
        &nbsp;·&nbsp;
        <Link href="/privacidad">Política de Búsqueda y Privacidad</Link>
        &nbsp;·&nbsp;
        <Link href="/proteccion-menores">
          Protección de Niños, Niñas y Adolescentes
        </Link>
        &nbsp;·&nbsp;
        <Link href="/constitucion-tecnologica">Constitución Tecnológica</Link>
      </footer>
    </main>
  );
}
