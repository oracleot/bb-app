import React from "react"
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi, afterEach } from 'vitest'
import { RegisterForm } from '../RegisterForm'
import '@testing-library/jest-dom'

// Clean up after each test to avoid test pollution
import { cleanup } from '@testing-library/react'
afterEach(() => {
  cleanup()
})


vi.mock('@/lib/supabase/client', () => ({
  createClient: () => ({
    auth: {
      signUp: vi.fn().mockResolvedValue({ error: null })
    }
  })
}))

describe('RegisterForm', () => {
  it('renders all fields', () => {
    render(<RegisterForm />)
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/age group/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /register/i })).toBeInTheDocument()
  })

  it('shows validation errors for empty fields', async () => {
    render(<RegisterForm />)
    await userEvent.click(screen.getByRole('button', { name: /register/i }))
    await waitFor(() => {
      // Match all error messages in the form
      expect(screen.getAllByText(/too small|invalid email|expected string|invalid/i).length).toBeGreaterThan(0)
    })
  })
})
