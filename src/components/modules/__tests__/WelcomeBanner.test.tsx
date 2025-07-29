import React from 'react'
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import WelcomeBanner from '../WelcomeBanner'

describe('WelcomeBanner', () => {
  it('renders user first name and avatar', () => {
    const user = {
      username: 'testuser',
      profile: [{ first_name: 'John', avatar_url: '/avatar.png' }],
    }
    render(<WelcomeBanner user={user} />)
    expect(screen.getByText('Welcome, John!')).toBeInTheDocument()
    expect(screen.getByAltText('User avatar')).toBeInTheDocument()
  })

  it('renders username if first name is missing', () => {
    const user = {
      username: 'testuser',
      profile: [{}],
    }
    render(<WelcomeBanner user={user} />)
    expect(screen.getByText('Welcome, testuser!')).toBeInTheDocument()
  })
})
