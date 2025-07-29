import { LoginForm } from '@/components/auth/LoginForm'

/**
 * Login page for returning users.
 */
export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-lg p-6 rounded-lg shadow-lg bg-white dark:bg-zinc-900">
        <h1 className="text-2xl font-bold mb-6 text-center">Sign In</h1>
        <LoginForm />
      </div>
    </main>
  )
}
