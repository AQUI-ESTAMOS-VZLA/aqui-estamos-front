import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import './globals.css';
import Nav from '@/components/Nav';

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '500', '700', '900'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://aquiestamosvenezuela.com'),
  title: 'Aqui Estamos Venezuela',
  description:
    'Red Ciudadana de Registro Audiovisual para reunir familias tras la emergencia en Venezuela.',
  icons: { icon: '/assets/images/favicon.png', apple: '/assets/images/apple-touch-icon.png' },
  openGraph: {
    title: 'Aqui Estamos Venezuela',
    description: 'Red Ciudadana de Registro Audiovisual para reunir familias.',
    images: ['/assets/images/card.jpg'],
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className={roboto.className}>
        <Nav />
        {children}
      </body>
    </html>
  );
}
