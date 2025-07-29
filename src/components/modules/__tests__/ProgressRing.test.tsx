import React from 'react'
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import ProgressRing from '../ProgressRing'

describe('ProgressRing', () => {
  it('shows correct percentage and completed modules', () => {
    const progress = [
      { module_id: 1, completed_at: '2025-07-29T10:00:00Z' },
      { module_id: 2 },
      { module_id: 3, completed_at: '2025-07-29T10:00:00Z' },
      { module_id: 4 },
      { module_id: 5 },
      { module_id: 6, completed_at: '2025-07-29T10:00:00Z' },
    ]
    render(<ProgressRing progress={progress} />)
    expect(screen.getByText('50%')).toBeInTheDocument()
    expect(screen.getByText('3 of 6 modules completed')).toBeInTheDocument()
  })

  it('shows 0% when no modules are completed', () => {
    const progress = [
      { module_id: 1 },
      { module_id: 2 },
      { module_id: 3 },
      { module_id: 4 },
      { module_id: 5 },
      { module_id: 6 },
    ]
    render(<ProgressRing progress={progress} />)
    expect(screen.getByText('0%')).toBeInTheDocument()
    expect(screen.getByText('0 of 6 modules completed')).toBeInTheDocument()
  })
})
