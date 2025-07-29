

"use client"
import React from "react"

import { useState } from "react"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { createClient } from "@/lib/supabase/client"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(6),
})

export function LoginForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    setIsLoading(true)
    setError(null)
    const supabase = createClient()
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: values.email,
      password: values.password,
    })
    setIsLoading(false)
    if (signInError) {
      setError(signInError.message)
    } else {
      // Successful login
      // Check if user profile exists, create if missing
      const { data: sessionData } = await supabase.auth.getSession()
      const authUser = sessionData?.session?.user
      if (authUser?.id) {
        // Try to fetch user profile from users table
        const { data: userProfile, error: userProfileError } = await supabase
          .from('users')
          .select('id')
          .eq('id', authUser.id)
          .maybeSingle()
        if (!userProfile) {
          // Check if username is taken by another user
          let usernameToUse = authUser.user_metadata?.username || ''
          if (usernameToUse) {
            const { data: existingUser } = await supabase
              .from('users')
              .select('id')
              .eq('username', usernameToUse)
              .neq('id', authUser.id)
              .maybeSingle()
            if (existingUser) {
              // Username is taken, use email as username
              usernameToUse = authUser.email
            }
          }
          // Insert user profile with unique username
          const { error: dbError } = await supabase
            .from('users')
            .insert({
              id: authUser.id,
              username: usernameToUse,
              email: authUser.email,
              age_group: authUser.user_metadata?.age_group || '',
            })
          if (dbError) {
            // If error is duplicate key, fetch existing profile and continue
            if (dbError.message.includes('duplicate key value violates unique constraint')) {
              // Profile exists, continue
            } else {
              setError('Logged in, but failed to create user profile. Please contact support. ' + dbError.message)
              return
            }
          }
        }
      }
      window.location.href = '/dashboard'
    }
  }

  // ...existing code...
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {error && (
          <div className="text-destructive bg-destructive/10 p-2 rounded mb-2">
            {error}
          </div>
        )}
        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading ? "Signing in..." : "Sign In"}
        </Button>
      </form>
    </Form>
  )
}
