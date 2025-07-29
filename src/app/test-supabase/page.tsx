import { createClient } from '@/lib/supabase/server'

// Remove explicit PageProps type to avoid type mismatch with Next.js App Router

/**
 * Test page to verify Supabase connectivity.
 * TODO: remove before production deployment
 */
export default async function Page() {
  const supabase = await createClient()
  // Try to fetch from a public table, e.g., 'users'
  const { data, error } = await supabase.from('users').select('*').limit(1)

  if (error) {
    return (
      <div className="p-4 text-red-600">
        Supabase connection failed: {error.message}
      </div>
    )
  }

  return (
    <div className="p-4 text-green-600">
      Supabase connection successful!<br />
      Data: <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  )
}
