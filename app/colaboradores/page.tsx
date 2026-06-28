import { redirect } from 'next/navigation';

// The old colaboradores upload now lives in the gated registry console.
export default function Colaboradores() {
  redirect('/registro');
}
