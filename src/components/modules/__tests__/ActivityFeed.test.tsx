import React from 'react'
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import ActivityFeed from '../ActivityFeed'

describe('ActivityFeed', () => {
  it('renders recent activity items', () => {
    const activity = [
      { achievement_type: 'Badge Earned', earned_at: '2025-07-29T10:00:00Z' },
      { achievement_type: 'Module Completed', earned_at: '2025-07-28T09:00:00Z' },
    ]
    render(<ActivityFeed activity={activity} />)
    expect(screen.getByText('Badge Earned')).toBeInTheDocument()
    expect(screen.getByText('Module Completed')).toBeInTheDocument()
  })

  it('shows no activity message if empty', () => {
    render(<ActivityFeed activity={[]} />)
    expect(screen.getByText('No recent activity yet.')).toBeInTheDocument()
  })
})
