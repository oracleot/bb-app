import React from "react"
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi, afterEach } from 'vitest'
import { LoginForm } from '../LoginForm'
import '@testing-library/jest-dom'
import { cleanup } from '@testing-library/react'
afterEach(() => {
  cleanup()
})

vi.mock('@/lib/supabase/client', () => ({
  createClient: () => ({
    auth: {
      signInWithPassword: vi.fn().mockResolvedValue({ error: null })
    }
  })
}))

describe('LoginForm', () => {
  it('renders all fields', () => {
    render(<LoginForm />)
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument()
  })

  it('shows validation errors for empty fields', async () => {
    render(<LoginForm />)
    await userEvent.click(screen.getByRole('button', { name: /sign in/i }))
    await waitFor(() => {
      expect(screen.getAllByText(/too small|invalid email|expected string|invalid/i).length).toBeGreaterThan(0)
    })
  })
})
