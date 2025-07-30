import { createClient } from './server'

/**
 * Track user progress for a given module and screen.
 * @param moduleId - The module identifier (e.g., 'module-1')
 * @param screenId - The screen identifier (e.g., 'concept')
 */
export async function trackProgress(moduleId: string, screenId: string) {
  const supabase = await createClient()
  
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return
  // Upsert progress
  await supabase.from('user_progress').upsert({
    user_id: user.id,
    module_id: moduleId,
    screen_id: screenId,
    completed_at: new Date().toISOString(),
  })
}
