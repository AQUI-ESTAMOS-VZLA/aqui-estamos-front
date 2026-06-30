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
  CONTEXTURA,
  ESTATURA,
  COLOR_PIEL,
  COLOR_OJOS,
  COLOR_CABELLO,
  TIPO_CABELLO,
  ESTADOS,
  ESTADO_REGISTRO,
} from '@/lib/questionnaire-options';

// DRAFT — "Añadir un registro" questionnaire (a volunteer documenting a located
// / sheltered / unidentified person). Not linked from the site and not wired to
// any backend yet (see DraftBanner).
export default function RegistroNuevo() {
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
      <h1>Añadir un registro</h1>
      <h2>
        Documenta a una persona localizada, en refugio, hospitalizada o sin identificar. Completa
        todo lo que puedas observar; si no sabes un dato, déjalo en blanco.
      </h2>

      <DraftBanner />

      {answers && <AnswersPreview answers={answers} onClose={() => setAnswers(null)} />}

      <form onSubmit={onSubmit} autoComplete="off">
        <Section title="Identidad" hint="Si la persona no puede identificarse, deja los nombres en blanco.">
          <div className="grid2">
            <TextField name="nombres" label="Nombres" hint="(si se conocen)" />
            <TextField name="apellidos" label="Apellidos" hint="(si se conocen)" />
          </div>
          <ApodosField />
          <div className="grid2">
            <SelectOther name="sexo" label="Sexo" options={SEXO} />
            <TextField name="edad_aproximada" label="Edad aproximada" hint="(en años)" type="number" />
          </div>
          <div className="grid2">
            <SelectOther name="estado_persona" label="Estado de la persona" options={ESTADO_REGISTRO} />
            <TextField name="documento" label="Documento de identidad" hint="(si lo porta)" />
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
            label="Condición médica observada"
            hint="(heridas, estado de salud, discapacidad — si aplica)"
          />
        </Section>

        <Section title="Dónde se encuentra / fue encontrada">
          <div className="grid2">
            <SelectOther name="estado" label="Estado" options={ESTADOS} />
            <TextField name="ciudad" label="Ciudad o municipio" />
          </div>
          <TextField name="lugar" label="Refugio / hospital / lugar" />
          <TextAreaField name="ropa" label="Ropa que viste" />
          <TextAreaField
            name="circunstancias"
            label="Circunstancias del hallazgo"
            hint="(¿cómo y cuándo se le encontró?)"
          />
        </Section>

        <Section title="Foto y material">
          <div className="field">
            <label htmlFor="foto">Foto principal (opcional)</label>
            <div className="file-row">
              <input id="foto" name="foto" type="file" accept="image/*" />
            </div>
          </div>
        </Section>

        <Section title="Voluntario que registra" hint="Para seguimiento interno.">
          <div className="grid2">
            <TextField name="voluntario_nombre" label="Tu nombre" />
            <TextField name="voluntario_contacto" label="Tu contacto" hint="(teléfono o correo)" />
          </div>
        </Section>

        <button type="submit" className="btn btn-primary">
          Generar borrador
        </button>
      </form>
    </main>
  );
}
