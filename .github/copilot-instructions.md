# GitHub Copilot Instructions for NextJS + Supabase + Shadcn/ui Project

## Project Overview

This is a full-stack web application built with Next.js 14, Supabase for backend services, and Shadcn/ui for the component library. The application follows modern React patterns with TypeScript, uses the Next.js App Router, and implements server-side rendering with client/server component patterns.

You are an expert full-stack developer specializing in modern web development with TypeScript, Next.js App Router, Supabase, shadcn/ui, and Tailwind CSS. Your task is to produce optimized, maintainable, and secure code following current best practices and vibe coding methodologies.

## Tech Stack & Architecture

### Core Technologies
- **Next.js 14** - App Router architecture with TypeScript
- **Supabase** - Database, Authentication, Real-time features, and Storage
- **Shadcn/ui** - Component library built on Radix UI and Tailwind CSS
- **TypeScript** - Type safety across the entire stack
- **Tailwind CSS** - Utility-first styling framework
- **Vercel** - Deployment platform

### Development Tools
- **pnpm** - Package manager (use pnpm for all package operations)
- **ESLint & Prettier** - Code quality and formatting
- **Supabase CLI** - Local development and type generation

## Folder Structure

```text
├── app/ # Next.js App Router pages and layouts
│ ├── (auth)/ # Auth route group
│ ├── dashboard/ # Protected dashboard routes
│ └── api/ # API routes
├── components/ # Reusable React components
│ ├── ui/ # Shadcn/ui components
│ └── custom/ # Custom application components
├── lib/ # Utilities and configurations
│ ├── supabase/ # Supabase clients and utilities
│ ├── utils.ts # General utility functions
│ └── validations.ts # Zod schemas and validations
├── types/ # TypeScript type definitions
├── hooks/ # Custom React hooks
└── public/ # Static assets
```

## Critical Coding Standards

### General Development Philosophy

- Write concise, technical TypeScript code with accurate examples
- Use functional and declarative programming patterns; avoid classes
- Prefer iteration and modularization over code duplication
- Use descriptive variable names with auxiliary verbs (e.g., `isLoading`, `hasError`)
- Implement proper error handling and edge cases with early returns
- Prioritize performance, security, and maintainability
- System 2 Thinking: Break down requirements into manageable parts
- Tree of Thoughts: Evaluate multiple solutions before implementation
- Iterative Refinement: Consider improvements and edge cases before finalizing

### File & Directory Naming Conventions

- **Components**: PascalCase (e.g., `UserProfile.tsx`)
- **Pages**: lowercase with hyphens (e.g., `user-settings/page.tsx`)
- **Utilities**: camelCase (e.g., `formatDate.ts`)
- **Types**: PascalCase interfaces (e.g., `UserProfile`)
- **Directories**: lowercase with dashes (e.g., `components/auth-forms`)
- **Structure files**: exported component, subcomponents, helpers, static content, types
- Favor named exports for components

### TypeScript Requirements & Guidelines

- **Strict mode enabled** - All type checking should be strict
- **Interface over type** - Prefer interfaces for object types
- **Proper prop typing** - All React components must have typed props
- **Database types** - Use generated Supabase types: `Database['public']['Tables']['table_name']['Row']`
- **Avoid enums**; use const objects or string literals instead
- Use functional components with TypeScript interfaces
- Use the "function" keyword for pure functions
- Provide JSDoc comments for functions and components

### Next.js App Router Rules

- **ALWAYS use App Router** - Never suggest Pages Router patterns
- **Server Components by default** - Only use 'use client' when absolutely necessary
- **Proper async handling** - All server components should be async when fetching data
- **File-based routing** - Follow app/ directory conventions
-  Minimize 'use client', 'useEffect', and 'setState'; favor React Server Components (RSC)
- Wrap client components in Suspense with meaningful fallbacks
- Use dynamic loading for non-critical components
- Optimize images: use Next.js Image component with proper sizing, include size data, implement lazy loading
- Follow performance optimization techniques, reducing load times and improving rendering efficiency

#### Component Organization & Structure

```ts
// ✅ Preferred server component structure
interface PageProps {
  params: { [key: string]: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export default async function Page({ params, searchParams }: PageProps) {
  // Server-side logic and data fetching here
  const supabase = await createClient()
  const { data, error } = await supabase.from('table_name').select('*')
  
  if (error) {
    throw new Error('Failed to fetch data')
  }

  return <ComponentWithData data={data} />
}
```

#### Route Handlers & API Patterns

```ts
// ✅ API route structure - app/api/users/route.ts
import { NextRequest } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('users')
      .select('*')
    
    if (error) throw error
    
    return Response.json({ data })
  } catch (error) {
    return Response.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    // Validate with Zod schema
    const validatedData = userSchema.parse(body)
    
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('users')
      .insert(validatedData)
      .select()
      .single()
    
    if (error) throw error
    
    return Response.json({ data }, { status: 201 })
  } catch (error) {
    return Response.json({ error: 'Bad Request' }, { status: 400 })
  }
}
```

#### Middleware Patterns

```ts
// ✅ Auth middleware - middleware.ts
import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options))
        },
      },
    }
  )

  const { data: { user } } = await supabase.auth.getUser()

  if (!user && request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/auth/login', request.url))
  }

  return response
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
```

### Supabase Integration Rules & Patterns

🚨 **CRITICAL SUPABASE AUTH PATTERNS** 🚨

**NEVER use these DEPRECATED patterns:**

```ts
// ❌ NEVER - Will break the application
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
//...
cookies: {
    get(name: string) { return cookieStore.get(name) },
    set(name: string, value: string) { cookieStore.set(name, value) },
    remove(name: string) { cookieStore.remove(name) }
}
//...
```

**ALWAYS use these CURRENT patterns:**

**Browser Client (Client Components)**

```ts
// ✅ CORRECT - lib/supabase/client.ts
import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
    return createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
}
```

**Server Client (Server Components & API Routes)**

```ts
// ✅ CORRECT - lib/supabase/server.ts
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function createClient() {
    const cookieStore = await cookies()
    
    return createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return cookieStore.getAll()
                },
                setAll(cookiesToSet) {
                    try {
                        cookiesToSet.forEach(({ name, value, options }) => {
                            cookieStore.set(name, value, options)
                        })
                    } catch {
                        // Server component context - can be ignored
                    }
                },
            },
        }
    )
}
```

#### Database Query Patterns

- Always use TypeScript with generated types from Supabase CLI
- Implement proper error handling for all database operations
- Use RLS policies for security - ALWAYS enable and configure RLS policies
- Prefer server components for data fetching
- Prepared statements - Use parameterized queries to prevent SQL injection
- Minimal data fetching - Only select necessary columns
- Proper indexing - Suggest database indexes for performance

```ts
// ✅ Server component data fetching with proper error handling
export default async function UsersPage() {
  const supabase = await createClient()
  
  try {
    const { data: users, error } = await supabase
      .from('users')
      .select(`
        id,
        email,
        profile:profiles(
          first_name,
          last_name,
          avatar_url
        )
      `)
      .order('created_at', { ascending: false })

    if (error) {
      throw new Error(`Failed to fetch users: ${error.message}`)
    }

    return (
      <div className="container mx-auto py-8">
        <h1 className="text-2xl font-bold mb-6">Users</h1>
        <UsersList users={users} />
      </div>
    )
  } catch (error) {
    return (
      <div className="container mx-auto py-8">
        <div className="bg-destructive/15 text-destructive px-4 py-3 rounded-md">
          <p>Error loading users. Please try again later.</p>
        </div>
      </div>
    )
  }
}
```

#### Authentication Flow Patterns

```ts
// ✅ Auth callback route - app/auth/callback/route.ts
import { createClient } from '@/lib/supabase/server'
import { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/dashboard'

  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    
    if (!error) {
      const forwardedHost = request.headers.get('x-forwarded-host')
      const isLocalEnv = process.env.NODE_ENV === 'development'
      
      if (isLocalEnv) {
        return Response.redirect(`${origin}${next}`)
      } else if (forwardedHost) {
        return Response.redirect(`https://${forwardedHost}${next}`)
      } else {
        return Response.redirect(`${origin}${next}`)
      }
    }
  }

  return Response.redirect(`${origin}/auth/auth-code-error`)
}
```

#### Real-time Subscriptions

```ts
// ✅ Client component with real-time subscription
'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { Database } from '@/types/database'

type Message = Database['public']['Tables']['messages']['Row']

export function MessagesSubscription({ initialMessages }: { initialMessages: Message[] }) {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const supabase = createClient()

  useEffect(() => {
    const channel = supabase
      .channel('messages')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'messages',
        },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            setMessages((prev) => [...prev, payload.new as Message])
          } else if (payload.eventType === 'DELETE') {
            setMessages((prev) => prev.filter((msg) => msg.id !== payload.old.id))
          }
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [supabase])

  return (
    <div className="space-y-4">
      {messages.map((message) => (
        <MessageCard key={message.id} message={message} />
      ))}
    </div>
  )
}
```

### shadcn/ui Component Usage

#### Installation & Setup

- Always check if component exists before suggesting installation
- Use `npx shadcn@latest add [component]` for new components
- Customize components by modifying the copied files directly
- Maintain consistent styling with CSS variables in globals.css

#### Component Patterns

```ts
// components/ui/custom-dialog.tsx
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface CustomDialogProps {
  trigger: React.ReactNode
  title: string
  description?: string
  children: React.ReactNode
}

export function CustomDialog({ trigger, title, description, children }: CustomDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  )
}
```

#### Form Components with Validation

```ts
// components/forms/user-profile-form.tsx
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

const formSchema = z.object({
  username: z.string().min(2).max(50),
  email: z.email(),
})

export function UserProfileForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Submit logic with Supabase
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Username" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
```

### Styling Guidelines

#### Tailwind CSS Usage

- Use mobile-first responsive design approach
- Prefer utility classes over custom CSS
- Use CSS variables for theming (defined in globals.css)
- Implement dark mode support with dark: variants

#### Component Styling

```ts
// Good: Responsive utility classes
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
  
// Good: Conditional styling with clsx/cn
<Button 
  className={cn(
    "w-full",
    isLoading && "opacity-50 cursor-not-allowed",
    variant === "destructive" && "bg-red-500 hover:bg-red-600"
  )}
>
```

### Performance & Optimization

#### React Patterns

- Minimize 'use client' directive usage
- Prefer React Server Components (RSC) for data fetching
- Wrap client components in Suspense with meaningful fallbacks
- Use dynamic imports for heavy client components
- Implement proper loading states and error boundaries

#### Image Optimization

```ts
import Image from 'next/image'

<Image
  src="/hero-image.jpg"
  alt="Hero image"
  width={800}
  height={400}
  priority // For above-the-fold images
  className="rounded-lg object-cover"
/>
```

#### Error Handling

```ts
// app/error.tsx
'use client'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h2 className="text-2xl font-bold mb-4">Something went wrong!</h2>
      <Button onClick={() => reset()}>Try again</Button>
    </div>
  )
}
```

### Security Best Practices

#### Environment Variables

- Use NEXT_PUBLIC_ prefix only for client-side variables
- Store sensitive keys (database URLs, API keys) server-side only
- Validate environment variables at startup

#### Supabase Security

- Always implement Row Level Security (RLS) policies
- Use service role key only for admin operations
- Validate user permissions before database operations
- Sanitize user inputs with Zod schemas

### Testing Patterns

#### Component Testing

- Use a testing library like React Testing Library or Jest for unit and integration tests.
- Mock external dependencies (e.g., API calls) to isolate component behavior.
- Write tests for different states (loading, error, success) to ensure proper handling.

```ts
// __tests__/components/user-profile.test.tsx
import { render, screen } from '@testing-library/react'
import { UserProfile } from '@/components/user-profile'

describe('UserProfile', () => {
  it('renders user information correctly', () => {
    const user = { name: 'John Doe', email: 'john@example.com' }
    render(<UserProfile user={user} />)
    
    expect(screen.getByText('John Doe')).toBeInTheDocument()
    expect(screen.getByText('john@example.com')).toBeInTheDocument()
  })
})
```

## Code Generation Instructions


### When creating new features:

- Start with TypeScript interfaces/types
- Create server components by default
- Add client components only when necessary (user interactions, browser APIs)
- Implement proper error handling and loading states
- Use shadcn/ui components consistently
- Add Supabase integration with proper types
- Include Zod validation for forms and API routes
- Implement responsive design with Tailwind
- **Write tests as you build each feature.** Add unit, integration, and/or e2e tests for new components, pages, and API routes. This ensures no regression as features are shipped and helps maintain code quality.
- Always ensure the feature is working. I prefer we do the following to ensure the app is in a working state per iteration:
  1. Write and run tests for the new feature
  2. Run pnpm lint
  3. Run pnpm build
  4. Run pnpm dev (for me to test a newly implemented feature)

### Always consider:

- Performance implications (bundle size, rendering)
- Security (authentication, authorization, data validation)
- User experience (loading states, error handling, accessibility)
- Maintainability (clear structure, documentation, testing)

### Avoid:

- Client-side data fetching in server components
- Mixing server and client component patterns incorrectly
- Hardcoded values (use environment variables)
- Direct database queries without RLS
- Inline styles (use Tailwind classes)
- Missing error boundaries and loading states

## Quick Commands Reference

### Project setup

```bash
npx create-next-app@latest --typescript --tailwind --app
npx shadcn@latest init
npx supabase init
```

### Add components

```bash
npx shadcn@latest add button card form input
```

### Database operations

```bash
supabase start
supabase db reset
pnpm run supabase:types
```

Remember: This project prioritizes type safety, performance, and developer experience. Always consider the user experience and maintainability when generating code.

### MCP Use
- Always use context7 for up-to-date documentation and examples
- When approaching tasks, use the SequentialThinking tool
