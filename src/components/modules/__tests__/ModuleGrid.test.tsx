import React from 'react'
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import ModuleGrid from '../ModuleGrid'

describe('ModuleGrid', () => {
  it('renders all module cards', () => {
    const progress = [
      { module_id: 1, completed_at: '2025-07-29T10:00:00Z' },
      { module_id: 2 },
      { module_id: 3 },
      { module_id: 4 },
      { module_id: 5 },
      { module_id: 6 },
    ]
    render(<ModuleGrid progress={progress} />)
    expect(screen.getByText('Prompt Basics')).toBeInTheDocument()
    expect(screen.getByText('Specificity')).toBeInTheDocument()
    expect(screen.getByText('Personas')).toBeInTheDocument()
    expect(screen.getByText('Examples')).toBeInTheDocument()
    expect(screen.getByText('Step-by-step')).toBeInTheDocument()
    expect(screen.getByText('Capstone Project')).toBeInTheDocument()
  })

  it('shows completed status for completed modules', () => {
    const progress = [
      { module_id: 1, completed_at: '2025-07-29T10:00:00Z' },
      { module_id: 2 },
      { module_id: 3 },
      { module_id: 4 },
      { module_id: 5 },
      { module_id: 6 },
    ]
    render(<ModuleGrid progress={progress} />)
    expect(screen.getAllByText('Completed').length).toBeGreaterThan(0)
    expect(screen.getAllByText('In Progress').length).toBeGreaterThan(0)
  })
})
