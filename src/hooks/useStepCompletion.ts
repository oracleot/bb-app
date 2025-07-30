import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'

interface UseStepCompletionOptions {
  userId: string
  moduleId: number
  step: string
}

/**
 * Custom hook to manage step completion state and DB sync.
 */
export function useStepCompletion({ userId, moduleId, step }: UseStepCompletionOptions) {
  const [isCompleted, setIsCompleted] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Prevent DB calls if userId is falsy
    if (!userId) {
      setIsLoading(false)
      setIsCompleted(false)
      setError(null)
      return
    }
    async function fetchProgress() {
      setIsLoading(true)
      setError(null)
      const supabase = createClient()
      const { data, error } = await supabase
        .from('user_progress')
        .select('id')
        .eq('user_id', userId)
        .eq('module_id', moduleId)
        .eq('step', step)
        .maybeSingle()
      if (error) setError(error.message)
      setIsCompleted(!!data)
      setIsLoading(false)
    }
    fetchProgress()
  }, [userId, moduleId, step])

  async function completeStep() {
    // Prevent DB calls if userId is falsy
    if (!userId) {
      setError('User not loaded')
      setIsLoading(false)
      console.error('completeStep called with empty userId')
      return
    }
    setError(null)
    setIsLoading(true)
    const supabase = createClient()
    // Only insert if not already completed
    const { data: existing, error: existingError } = await supabase
      .from('user_progress')
      .select('id')
      .eq('user_id', userId)
      .eq('module_id', moduleId)
      .eq('step', step)
      .maybeSingle()
    if (existingError) {
      setError(existingError.message)
      setIsLoading(false)
      console.error('Error checking existing progress:', existingError)
      return
    }
    if (!existing) {
      const { error: insertError } = await supabase
        .from('user_progress')
        .insert({ user_id: userId, module_id: moduleId, step, screen_id: step, completed_at: new Date().toISOString() })
      if (insertError) {
        setError(insertError.message)
        console.error('Error inserting progress:', insertError)
      } else {
        setIsCompleted(true)
        console.log('Step completion inserted for user:', userId, 'module:', moduleId, 'step:', step)
      }
    } else {
      console.log('Step already completed for user:', userId, 'module:', moduleId, 'step:', step)
    }
    setIsLoading(false)
  }

  return { isCompleted, isLoading, error, completeStep }
}
