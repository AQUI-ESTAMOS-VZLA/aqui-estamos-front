'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import { getConfig } from '@/lib/config';
import { getSupabase } from '@/lib/supabase';

type Status = 'loading' | 'out' | 'in';

/**
 * Supabase magic-link auth gate. `checkPath` is a backend endpoint that returns
 * 200 if the logged-in email is authorized for this console, 403 otherwise.
 */
export function useAuthGate(checkPath: string) {
  const [status, setStatus] = useState<Status>('loading');
  const [email, setEmail] = useState<string | null>(null);
  const [error, setError] = useState('');
  const tokenRef = useRef('');

  const verify = useCallback(
    async (accessToken: string) => {
      tokenRef.current = accessToken;
      const cfg = getConfig();
      try {
        const r = await fetch(cfg.apiBase + checkPath, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        if (r.ok) {
          const b = await r.json();
          setEmail(b.email || null);
          setStatus('in');
          setError('');
          return;
        }
        if (r.status === 403) {
          setError('Tu cuenta no está autorizada.');
          await getSupabase()?.auth.signOut();
        }
        setStatus('out');
      } catch {
        setStatus('out');
      }
    },
    [checkPath]
  );

  useEffect(() => {
    const sb = getSupabase();
    if (!sb) {
      setStatus('out');
      return;
    }
    sb.auth.getSession().then(({ data }) => {
      if (data.session?.access_token) verify(data.session.access_token);
      else setStatus('out');
    });
    const { data: sub } = sb.auth.onAuthStateChange((_e, session) => {
      if (session?.access_token) verify(session.access_token);
    });
    return () => sub.subscription.unsubscribe();
  }, [verify]);

  const sendMagicLink = useCallback(async (addr: string) => {
    const sb = getSupabase();
    if (!sb) return { error: 'Supabase no está configurado.' };
    const { error } = await sb.auth.signInWithOtp({
      email: addr,
      options: { emailRedirectTo: window.location.href.split('#')[0] },
    });
    return { error: error?.message };
  }, []);

  const logout = useCallback(async () => {
    await getSupabase()?.auth.signOut();
    tokenRef.current = '';
    setEmail(null);
    setStatus('out');
  }, []);

  const authHeader = useCallback(
    (): Record<string, string> => ({ Authorization: `Bearer ${tokenRef.current}` }),
    []
  );

  const forceRelogin = useCallback(() => {
    getSupabase()?.auth.signOut();
    tokenRef.current = '';
    setStatus('out');
    setError('Sesión expirada. Vuelve a iniciar sesión.');
  }, []);

  return { status, email, error, setError, sendMagicLink, logout, authHeader, forceRelogin };
}
