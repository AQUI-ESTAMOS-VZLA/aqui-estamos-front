// Option lists for the search / record questionnaires.
//
// Every list ends with "Otro" — the SelectOther field reveals a free-text input
// when "Otro" is chosen, so there is always an escape hatch for anything we did
// not anticipate.

export const OTRO = 'Otro';
const withOtro = (xs: string[]) => [...xs, OTRO];

export const SEXO = withOtro(['Femenino', 'Masculino']);

export const PARENTESCO = withOtro([
  'Madre',
  'Padre',
  'Hijo / Hija',
  'Hermano / Hermana',
  'Abuelo / Abuela',
  'Tío / Tía',
  'Primo / Prima',
  'Cónyuge / Pareja',
  'Amigo / Amiga',
  'Vecino / Vecina',
]);

export const CONTEXTURA = withOtro(['Delgada', 'Promedio', 'Robusta', 'Atlética']);

export const ESTATURA = withOtro([
  'Menos de 1,50 m',
  '1,50 – 1,60 m',
  '1,61 – 1,70 m',
  '1,71 – 1,80 m',
  'Más de 1,80 m',
]);

export const COLOR_PIEL = withOtro(['Clara', 'Trigueña', 'Morena', 'Oscura']);

export const COLOR_OJOS = withOtro(['Negros', 'Marrones', 'Miel', 'Verdes', 'Azules', 'Grises']);

export const COLOR_CABELLO = withOtro(['Negro', 'Castaño', 'Rubio', 'Pelirrojo', 'Canoso', 'Teñido']);

export const TIPO_CABELLO = withOtro(['Liso', 'Ondulado', 'Rizado', 'Crespo', 'Calvo / Rapado']);

// Venezuelan states (for "last seen" / record location).
export const ESTADOS = withOtro([
  'Amazonas',
  'Anzoátegui',
  'Apure',
  'Aragua',
  'Barinas',
  'Bolívar',
  'Carabobo',
  'Cojedes',
  'Delta Amacuro',
  'Distrito Capital',
  'Falcón',
  'Guárico',
  'La Guaira',
  'Lara',
  'Mérida',
  'Miranda',
  'Monagas',
  'Nueva Esparta',
  'Portuguesa',
  'Sucre',
  'Táchira',
  'Trujillo',
  'Yaracuy',
  'Zulia',
]);

// Status of a record (mirrors the backend registro statuses), plus Otro.
export const ESTADO_REGISTRO = withOtro([
  'Buscada por familiares',
  'Localizada',
  'En refugio',
  'Hospitalizada',
  'Fallecida',
]);
