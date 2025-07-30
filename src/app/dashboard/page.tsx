import { Suspense } from "react"
import { createClient } from "@/lib/supabase/server"
import { redirect } from 'next/navigation'
import WelcomeBanner from "@/components/modules/WelcomeBanner"
import { LogoutButton } from "@/components/auth/LogoutButton"
import ProgressRing from "@/components/modules/ProgressRing"
import ModuleGrid from "@/components/modules/ModuleGrid"
import ActivityFeed from "@/components/modules/ActivityFeed"
import SettingsButton from "@/components/modules/SettingsButton"

export default async function DashboardPage() {
  const supabase = await createClient()

  // Get current authenticated user
  const {
    data: { user: authUser },
  } = await supabase.auth.getUser()
  let user = null
  let userError: Error | null = null
  let progress: Array<{ module_id: number; completed_at?: string; score?: number }> = []
  let progressError: Error | null = null
  let activity: Array<{ achievement_type: string; earned_at: string; metadata?: Record<string, unknown> }> = []
  let activityError: Error | null = null

  if (!authUser?.id) {
    redirect('/auth/login')
  }
  // Query users table for the current user (expecting one row)
  const userRes = await supabase
    .from("users")
    .select("id, username, age_group, email")
    .eq("id", authUser.id)
    .maybeSingle()
  user = userRes.data
  userError = userRes.error

  if (user?.id) {
    // Query user_progress for all rows for this user, including step
    const progressRes = await supabase
      .from("user_progress")
      .select("module_id, step, completed_at, score")
      .eq("user_id", user.id)
    progress = progressRes.data || []
    progressError = progressRes.error

    // Query user_achievements for all rows for this user
    const activityRes = await supabase
      .from("user_achievements")
      .select("achievement_type, earned_at, metadata")
      .eq("user_id", user.id)
      .order("earned_at", { ascending: false })
      .limit(5)
    activity = activityRes.data || []
    activityError = activityRes.error
  }

  if (userError || progressError || activityError) {
    let errorDetails = ''
    if (userError) errorDetails += `User error: ${userError.message}\n`
    if (progressError) errorDetails += `Progress error: ${progressError.message}\n`
    if (activityError) errorDetails += `Activity error: ${activityError.message}\n`
    throw new Error(`Failed to load dashboard data\n${errorDetails}`)
  }

  // TODO: Ensure every Supabase Auth user has a corresponding row in the users table after signup
  if (!user) {
    return (
      <main className="container mx-auto py-8">
        <div className="bg-destructive/15 text-destructive px-4 py-3 rounded-md mb-6">
          <h2 className="text-xl font-bold mb-2">No user profile found</h2>
          <p>
            Your account exists in Supabase Auth, but no matching row was found in the <code>users</code> table.<br />
            Please ensure your user profile is created after signup.
          </p>
        </div>
        <LogoutButton />
        <pre className="text-xs bg-muted p-2 rounded mb-4">{JSON.stringify(authUser, null, 2)}</pre>
      </main>
    )
  }
  return (
    <main className="container mx-auto py-8">
      <Suspense fallback={<div>Loading dashboard...</div>}>
        <div className="flex items-center justify-between mb-6">
          <WelcomeBanner user={{
            username: user?.username || user?.email || 'Guest',
            age_group: user?.age_group ?? '',
            id: user?.id ?? '',
            email: user?.email ?? ''
          }} />
          <LogoutButton />
        </div>
        {/* ...removed debug JSON output... */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <div className="md:col-span-1 space-y-6">
            <ProgressRing progress={progress} />
            <SettingsButton />
          </div>
          <div className="md:col-span-2 space-y-6">
      {/* Define steps for each module. Only Prompt Basics has steps for now. Others are empty arrays (Coming Soon). */}
      <ModuleGrid
        progress={progress}
      />
            <ActivityFeed activity={activity} />
          </div>
        </div>
      </Suspense>
    </main>
  )
}
