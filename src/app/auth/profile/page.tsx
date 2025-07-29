import { Profile } from '@/components/auth/Profile'

/**
 * Basic profile page for logged-in users.
 */
export default function ProfilePage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-lg p-6 rounded-lg shadow-lg bg-white dark:bg-zinc-900">
        <h1 className="text-2xl font-bold mb-6 text-center">Your Profile</h1>
        <Profile />
      </div>
    </main>
  )
}
