
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

const registerSchema = z.object({
  username: z.string().min(2).max(32),
  email: z.email(),
  password: z.string().min(6),
  age_group: z.enum(["9-11", "12-15"]),
})

export function RegisterForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      age_group: "9-11",
    },
  })

  async function onSubmit(values: z.infer<typeof registerSchema>) {
    setIsLoading(true)
    setError(null)
    const supabase = createClient()
    const { error: signUpError } = await supabase.auth.signUp({
      email: values.email,
      password: values.password,
      options: {
        data: {
          username: values.username,
          age_group: values.age_group,
        },
      },
    })
    setIsLoading(false)
    if (signUpError) {
      setError(signUpError.message)
    } else {
      // Optionally redirect or show success message
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 max-w-md mx-auto p-4"
      >
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Username" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
        <FormField
          control={form.control}
          name="age_group"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Age Group</FormLabel>
              <FormControl>
                <select {...field} className="input w-full">
                  <option value="9-11">Juniors (9-11)</option>
                  <option value="12-15">Teens (12-15)</option>
                </select>
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
          {isLoading ? "Registering..." : "Register"}
        </Button>
      </form>
    </Form>
  )
}
