/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return {
      // Host-based subdomain routing: admin.<domain> -> /admin, registro.<domain> -> /registro
      beforeFiles: [
        {
          source: '/',
          has: [{ type: 'host', value: 'admin\\..*' }],
          destination: '/admin',
        },
        {
          source: '/',
          has: [{ type: 'host', value: 'registro\\..*' }],
          destination: '/registro',
        },
      ],
    };
  },
};

export default nextConfig;
