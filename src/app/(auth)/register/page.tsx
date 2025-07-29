import { RegisterForm } from '@/components/auth/RegisterForm'

/**
 * Registration page for new users.
 */
export default function RegisterPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-lg p-6 rounded-lg shadow-lg bg-white dark:bg-zinc-900">
        <h1 className="text-2xl font-bold mb-6 text-center">Create an Account</h1>
        <RegisterForm />
      </div>
    </main>
  )
}
