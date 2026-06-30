'use client';
import Link from 'next/link';
import { useState } from 'react';
import {
  Section,
  TextField,
  TextAreaField,
  SelectOther,
  ApodosField,
  DraftBanner,
  AnswersPreview,
  collectAnswers,
} from '@/components/Questionnaire';
import {
  SEXO,
  PARENTESCO,
  CONTEXTURA,
  ESTATURA,
  COLOR_PIEL,
  COLOR_OJOS,
  COLOR_CABELLO,
  TIPO_CABELLO,
  ESTADOS,
} from '@/lib/questionnaire-options';

// DRAFT — "Buscar a una persona" questionnaire. Not linked from the site and
// not wired to any backend yet (see DraftBanner).
export default function BuscarNueva() {
  const [answers, setAnswers] = useState<Record<string, unknown> | null>(null);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setAnswers(collectAnswers(e.currentTarget));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <main className="wrap" style={{ maxWidth: 720 }}>
      <div className="topbar">
        <Link href="/">&larr; Inicio</Link>
      </div>
      <h1>Buscar a una persona</h1>
      <h2>
        Mientras más datos aportes, mejor podremos buscar una posible coincidencia. Todos los campos
        son opcionales; completa lo que sepas.
      </h2>

      <DraftBanner />

      {answers && <AnswersPreview answers={answers} onClose={() => setAnswers(null)} />}

      <form onSubmit={onSubmit} autoComplete="off">
        <Section title="Identidad" hint="¿A quién estás buscando?">
          <div className="grid2">
            <TextField name="nombres" label="Nombres" />
            <TextField name="apellidos" label="Apellidos" />
          </div>
          <ApodosField />
          <div className="grid2">
            <SelectOther name="sexo" label="Sexo" options={SEXO} />
            <TextField name="edad_aproximada" label="Edad aproximada" hint="(en años)" type="number" />
          </div>
          <div className="grid2">
            <TextField name="fecha_nacimiento" label="Fecha de nacimiento" hint="(si la conoces)" type="date" />
            <TextField name="documento" label="Documento de identidad" hint="(opcional)" />
          </div>
        </Section>

        <Section title="Descripción física">
          <div className="grid2">
            <SelectOther name="contextura" label="Contextura" options={CONTEXTURA} />
            <SelectOther name="estatura" label="Estatura aproximada" options={ESTATURA} />
          </div>
          <div className="grid2">
            <SelectOther name="color_piel" label="Color de piel" options={COLOR_PIEL} />
            <SelectOther name="color_ojos" label="Color de ojos" options={COLOR_OJOS} />
          </div>
          <div className="grid2">
            <SelectOther name="color_cabello" label="Color de cabello" options={COLOR_CABELLO} />
            <SelectOther name="tipo_cabello" label="Tipo de cabello" options={TIPO_CABELLO} />
          </div>
          <TextAreaField
            name="senas_particulares"
            label="Señas particulares"
            hint="(cicatrices, tatuajes, lunares, prótesis, etc.)"
          />
          <TextAreaField
            name="condicion_medica"
            label="Condición médica o discapacidad"
            hint="(si aplica)"
          />
        </Section>

        <Section title="Última vez que se le vio">
          <div className="grid2">
            <TextField name="ultima_vez_fecha" label="Fecha" type="date" />
            <SelectOther name="estado" label="Estado" options={ESTADOS} />
          </div>
          <div className="grid2">
            <TextField name="ciudad" label="Ciudad o municipio" />
            <TextField name="lugar" label="Lugar o dirección aproximada" />
          </div>
          <TextAreaField name="ropa" label="Ropa que vestía" />
          <TextAreaField
            name="circunstancias"
            label="Circunstancias"
            hint="(¿qué pasó?, ¿con quién estaba?, ¿hacia dónde iba?)"
          />
        </Section>

        <Section title="Foto de referencia">
          <div className="field">
            <label htmlFor="foto">Foto (opcional)</label>
            <div className="file-row">
              <input id="foto" name="foto" type="file" accept="image/*" />
            </div>
          </div>
        </Section>

        <Section title="Tus datos de contacto" hint="Para poder avisarte si hay una posible coincidencia.">
          <div className="grid2">
            <TextField name="solicitante_nombre" label="Tu nombre" />
            <SelectOther name="parentesco" label="¿Qué relación tienes con la persona?" options={PARENTESCO} />
          </div>
          <div className="grid2">
            <TextField name="solicitante_telefono" label="Teléfono" type="tel" />
            <TextField name="solicitante_correo" label="Correo electrónico" type="email" />
          </div>
        </Section>

        <button type="submit" className="btn btn-primary">
          Generar borrador
        </button>
      </form>
    </main>
  );
}
