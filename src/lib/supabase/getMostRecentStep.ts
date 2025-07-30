import { createClient } from '@/lib/supabase/client'

/**
 * Get the most recent completed step for a user in a module.
 */
export async function getMostRecentStep(userId: string, moduleId: number): Promise<string | null> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('user_progress')
    .select('step, completed_at')
    .eq('user_id', userId)
    .eq('module_id', moduleId)
    .order('completed_at', { ascending: false })
    .limit(1)
  if (error || !data?.length) return null
  return data[0].step
}
