import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'

/**
 * Custom hook to get the current authenticated user from Supabase.
 */
export function useCurrentUser() {
  const [userId, setUserId] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchUser() {
      setIsLoading(true)
      setError(null)
      const supabase = createClient()
      const { data, error } = await supabase.auth.getUser()
      if (error) setError(error.message)
      setUserId(data?.user?.id ?? null)
      setIsLoading(false)
    }
    fetchUser()
  }, [])

  return { userId, isLoading, error }
}
