// "Active in today's jornada" — shared logic for the colaboradores directory
// and the volunteer-verification flow. A volunteer counts as active today if
// they were marked present in today's roll call (last_active_at == today, in
// Venezuela time) — coordinators always count, since they run the jornada.

export function normalizeText(text: string): string {
  return (text || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}

// Today in Venezuela (UTC-4, no DST) as YYYY-MM-DD — matches how the backend
// stamps last_active_at, so the active set is the same for any viewer timezone.
export function todayVenezuelaISO(): string {
  const ve = new Date(Date.now() - 4 * 60 * 60 * 1000);
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${ve.getUTCFullYear()}-${pad(ve.getUTCMonth() + 1)}-${pad(ve.getUTCDate())}`;
}

export function isCoordinator(role?: string | null): boolean {
  return normalizeText(role || '').includes('coordinacion');
}

export function isActiveToday(role?: string | null, lastActiveAt?: string | null): boolean {
  if (isCoordinator(role)) return true;
  return Boolean(lastActiveAt) && lastActiveAt === todayVenezuelaISO();
}
