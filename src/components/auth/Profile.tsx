"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { LogoutButton } from "@/components/auth/LogoutButton"

interface UserProfile {
  id: string
  email: string
  username?: string
  age_group?: string
}

export function Profile() {
  const [user, setUser] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchUser() {
      const supabase = createClient()
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser()
      if (user) {
        setUser({
          id: user.id,
          email: user.email ?? "",
          username: user.user_metadata?.username,
          age_group: user.user_metadata?.age_group,
        })
      }
      setLoading(false)
    }
    fetchUser()
  }, [])

  if (loading) {
    return <div className="p-4">Loading profile...</div>
  }

  if (!user) {
    return <div className="p-4 text-red-600">No user found. Please log in.</div>
  }

  return (
    <div className="space-y-4">
      <div className="bg-muted p-4 rounded-lg">
        <div className="mb-2">
          <span className="font-semibold">Username:</span> {user.username || "-"}
        </div>
        <div className="mb-2">
          <span className="font-semibold">Email:</span> {user.email}
        </div>
        <div className="mb-2">
          <span className="font-semibold">Age Group:</span> {user.age_group || "-"}
        </div>
      </div>
      <LogoutButton />
    </div>
  )
}
