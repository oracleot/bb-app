import React from 'react'
import Image from "next/image"

interface Profile {
  first_name?: string
  last_name?: string
  avatar_url?: string
}


interface WelcomeBannerProps {
  user: {
    id?: string | number
    username?: string
    age_group?: string
    email?: string
    profile?: Profile[]
  }
}


/**
 * WelcomeBanner displays a personalized greeting for the user.
 */
export default function WelcomeBanner({ user }: WelcomeBannerProps) {
  const profile = user.profile?.[0]
  // Always prefer username, fallback to email, then profile first_name, then 'Guest'
  const name = user.username || user.email || profile?.first_name || 'Guest'
  return (
    <section className="flex items-center gap-4">
      {profile?.avatar_url && (
        <Image
          src={profile.avatar_url}
          alt="User avatar"
          width={48}
          height={48}
          className="w-12 h-12 rounded-full object-cover border"
          priority
        />
      )}
      <div>
        <h1 className="text-2xl font-bold">Welcome, {name}!</h1>
        <p className="text-muted-foreground">Ready to continue your journey?</p>
      </div>
    </section>
  )
}
