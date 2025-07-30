import React from 'react'

interface StepCompletionCheckboxProps {
  isCompleted: boolean
  isLoading: boolean
  error: string | null
  onComplete: () => void
}

export function StepCompletionCheckbox({ isCompleted, isLoading, error, onComplete }: StepCompletionCheckboxProps) {
  return (
    <div className="flex items-center gap-4 mt-6">
      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={isCompleted}
          disabled={isCompleted || isLoading}
          onChange={onComplete}
          className="w-5 h-5 accent-blue-500"
        />
        <span className="text-sm">Mark this step as completed</span>
      </label>
      {error && <span className="text-destructive text-xs ml-2">{error}</span>}
    </div>
  )
}
