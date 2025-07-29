// src/lib/supabase/client.ts
import { createBrowserClient } from '@supabase/ssr'

/**
 * Creates a Supabase browser client for client-side operations.
 * @returns Supabase client instance
 */
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
