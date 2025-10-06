// Minimal ambient declaration to satisfy type checking in environments without local types
declare module '@supabase/supabase-js' {
  export function createClient(url: string, key: string): any;
}
import { createClient } from '@supabase/supabase-js';

// Use "any" to avoid type-resolution issues in environments without installed node_modules/types.
const env: any = (import.meta as any).env ?? {};
const supabaseUrl = env.VITE_SUPABASE_URL as string | undefined;
const supabaseAnonKey = env.VITE_SUPABASE_ANON_KEY as string | undefined;

function createNotConfiguredClient(): any {
  // Minimal shim to avoid hard crashes if envs are missing in production.
  // Any DB call will return a clear configuration error.
  return {
    from() {
      return {
        insert: async () => ({ data: null, error: new Error('Supabase not configured: set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY') }) as any,
        select: async () => ({ data: null, error: new Error('Supabase not configured: set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY') }) as any,
      } as any;
    },
  } as unknown as any;
}

export const supabase: any =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : createNotConfiguredClient();

if (!(supabaseUrl && supabaseAnonKey)) {
  // Surface a helpful log in both dev and prod environments
  // to aid misconfiguration diagnosis during deploys.
  // eslint-disable-next-line no-console
  console.error('[Supabase] Missing configuration. Ensure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are set.');
}
