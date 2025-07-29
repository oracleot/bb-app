
import React from 'react'

interface ProgressRingProps {
  progress: Array<{
    module_id: number
    completed_at?: string
    score?: number
  }>
}

/**
 * ProgressRing displays the user's overall completion as a ring.
 */
export default function ProgressRing({ progress }: ProgressRingProps) {
  const completed = progress.filter((p) => p.completed_at).length
  const total = 6 // 6 modules
  const percent = Math.round((completed / total) * 100)

  return (
    <div className="flex flex-col items-center my-6">
      <div className="relative">
        {/* Simple SVG ring for progress */}
        <svg width={100} height={100}>
          <circle
            cx={50}
            cy={50}
            r={45}
            stroke="#e5e7eb"
            strokeWidth={8}
            fill="none"
          />
          <circle
            cx={50}
            cy={50}
            r={45}
            stroke="#6366f1"
            strokeWidth={8}
            fill="none"
            strokeDasharray={2 * Math.PI * 45}
            strokeDashoffset={2 * Math.PI * 45 * (1 - percent / 100)}
            strokeLinecap="round"
          />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center text-xl font-bold">
          {percent}%
        </span>
      </div>
      <span className="mt-2 text-sm text-muted-foreground">
        {completed} of {total} modules completed
      </span>
    </div>
  )
}
