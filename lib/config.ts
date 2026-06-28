// Runtime config, resolved from the hostname so the same build serves prod & previews.
//   Production hosts  -> AquiEstamos (production) Supabase + prod backend
//   Vercel previews / localhost -> AquiEstamosDev + matching preview backend
// The anon keys are PUBLIC by design (safe in the browser).

export interface AeConfig {
  env: 'local' | 'production' | 'preview';
  apiBase: string;
  supabaseUrl: string;
  supabaseAnonKey: string;
  ayudarFormUrl: string;
  instagramUrl: string;
}

const PROD_HOSTS = [
  'aquiestamosvenezuela.com',
  'www.aquiestamosvenezuela.com',
  'admin.aquiestamosvenezuela.com',
  'registro.aquiestamosvenezuela.com',
  'aqui-estamos-front.vercel.app',
];

const PROD = {
  supabaseUrl: 'https://zsffpnbjexnjpuyudsvr.supabase.co',
  supabaseAnonKey:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpzZmZwbmJqZXhuanB1eXVkc3ZyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI0OTkyNDEsImV4cCI6MjA5ODA3NTI0MX0.nx0hena4fl0MOxdgyROdrZVnxiYmEd40lCZa_Q-ReSQ',
};
const DEV = {
  supabaseUrl: 'https://qycxgscxuvfrspogocvs.supabase.co',
  supabaseAnonKey:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF5Y3hnc2N4dXZmcnNwb2dvY3ZzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI1MDMyNzcsImV4cCI6MjA5ODA3OTI3N30.4oQaczS9ddOLyZG6FJPQvdvcoRavGByNZJTADNWIUZI',
};

export function getConfig(): AeConfig {
  const host = typeof window !== 'undefined' ? window.location.hostname : '';
  const origin = typeof window !== 'undefined' ? window.location.origin : '';
  const isLocal = host === 'localhost' || host === '127.0.0.1';
  const isProd = PROD_HOSTS.includes(host);

  const sb = isProd ? PROD : DEV;
  const apiBase = isLocal
    ? 'http://localhost:8000'
    : isProd
    ? 'https://aqui-estamos-back.vercel.app'
    : origin.replace('aqui-estamos-front', 'aqui-estamos-back');

  return {
    env: isLocal ? 'local' : isProd ? 'production' : 'preview',
    apiBase,
    supabaseUrl: sb.supabaseUrl,
    supabaseAnonKey: sb.supabaseAnonKey,
    ayudarFormUrl: 'https://forms.gle/LUDqmrv8QQ4dmjZh9',
    instagramUrl: 'https://www.instagram.com/aqui.estamos.vnzl',
  };
}
