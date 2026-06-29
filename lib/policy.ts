// Child-protection policy — shared constants for the consent UI.
// The authoritative required version is served by the backend (/api/policy/*);
// these strings render the public page, the volunteer notice and the checkbox.

export const CHILD_POLICY = {
  path: '/proteccion-menores',
  title: 'Política de Protección de Niños, Niñas y Adolescentes',
  // Notice shown before completing the volunteer sign-up (requirement 2).
  notice:
    'No estás autorizado a fotografiar, grabar, entrevistar ni registrar de forma audiovisual a personas menores de edad en nombre de Aquí Estamos.',
  // Mandatory acceptance text (requirement 3 — suggested wording).
  acceptanceText:
    'Confirmo que conozco y cumpliré la Política de Protección de Niños, Niñas y Adolescentes de Aquí Estamos. Entiendo que no estoy autorizado para realizar registros audiovisuales de menores de edad hasta nuevo aviso oficial de la organización.',
};

// English equivalent, used by the /en pages.
export const CHILD_POLICY_EN = {
  path: '/en/child-protection',
  title: 'Child and Adolescent Protection Policy',
  notice:
    'You are not authorized to photograph, film, interview or make audiovisual records of minors on behalf of Aquí Estamos.',
  acceptanceText:
    'I confirm that I know and will comply with the Aquí Estamos Child and Adolescent Protection Policy. I understand that I am not authorized to make audiovisual records of minors until further official notice from the organization.',
};
