/* Central configuration for the Aqui Estamos frontend.
 *
 * Environment is detected from the hostname so the SAME static bundle serves
 * production and previews correctly:
 *   - Production hosts  -> AquiEstamos (production) Supabase project + prod backend
 *   - Vercel previews / localhost -> AquiEstamosDev project + matching preview backend
 *
 * The anon/publishable keys below are PUBLIC by design (safe in the browser).
 * Secrets (service_role) live only in the backend's Vercel env vars. */
(function () {
  var host = location.hostname;
  var isLocal = host === 'localhost' || host === '127.0.0.1';

  // Hosts that should use the PRODUCTION (AquiEstamos) project.
  var PROD_HOSTS = [
    'aquiestamosvenezuela.com',
    'www.aquiestamosvenezuela.com',
    'admin.aquiestamosvenezuela.com',
    'colaboradores.aquiestamosvenezuela.com',
    'aqui-estamos-front.vercel.app'
  ];
  var isProd = PROD_HOSTS.indexOf(host) !== -1;

  var SUPABASE = isProd
    ? { url: 'https://zsffpnbjexnjpuyudsvr.supabase.co',
        anon: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpzZmZwbmJqZXhuanB1eXVkc3ZyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI0OTkyNDEsImV4cCI6MjA5ODA3NTI0MX0.nx0hena4fl0MOxdgyROdrZVnxiYmEd40lCZa_Q-ReSQ' }
    : { url: 'https://qycxgscxuvfrspogocvs.supabase.co',
        anon: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF5Y3hnc2N4dXZmcnNwb2dvY3ZzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI1MDMyNzcsImV4cCI6MjA5ODA3OTI3N30.4oQaczS9ddOLyZG6FJPQvdvcoRavGByNZJTADNWIUZI' };

  // Backend base URL: local -> localhost; prod -> prod backend; preview -> the
  // matching preview backend (front<->back share Vercel's branch alias shape).
  var API_BASE = isLocal
    ? 'http://localhost:8000'
    : isProd
      ? 'https://aqui-estamos-back.vercel.app'
      : location.origin.replace('aqui-estamos-front', 'aqui-estamos-back');

  window.AE_CONFIG = {
    ENV: isLocal ? 'local' : (isProd ? 'production' : 'preview'),
    API_BASE: API_BASE,

    // Per requirement #2 the two landing buttons point to the SAME address.
    SHARED_FORM_URL: 'https://forms.gle/CeaiBpMKw1AGk9rf8',
    INSTAGRAM_URL: 'https://www.instagram.com/aqui.estamos.vnzl',

    SUPABASE_URL: SUPABASE.url,
    SUPABASE_ANON_KEY: SUPABASE.anon
  };
})();
