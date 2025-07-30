import React from 'react'
import Image from "next/image"
import Link from "next/link"
import { BorderBeam } from "@/components/magicui/border-beam"
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'

interface ModuleGridProps {
  progress: Array<{
    module_id: number
    step?: string
    completed_at?: string
    score?: number
  }>
}

const modules = [
  { id: 1, title: "Prompt Basics", image: "content/images/module1.png" },
  { id: 2, title: "Specificity", image: "content/images/module2.png" },
  { id: 3, title: "Personas", image: "content/images/module3.png" },
  { id: 4, title: "Examples", image: "content/images/module4.png" },
  { id: 5, title: "Step-by-step", image: "content/images/module5.png" },
  { id: 6, title: "Project", image: "content/images/module6.png" },
]

// Local map of expected steps per module
const moduleSteps: Record<number, string[]> = {
  1: ["concept", "case-study", "connection", "workshop", "takeaway"],
  2: ["concept"],
  3: ["concept"],
  4: ["concept"],
  5: ["concept"],
  6: ["concept"],
}

/**
 * ModuleGrid displays all modules with progress indicators.
 */
export default function ModuleGrid({ progress }: ModuleGridProps) {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {modules.map((mod) => {
        const expectedSteps = moduleSteps[mod.id] || []
        const totalSteps = expectedSteps.length
        const normalize = (s: string) => s.trim().toLowerCase()
        const normalizedExpected = expectedSteps.map(normalize)
        const completedSteps = progress.filter(p => {
          if (String(p.module_id) !== String(mod.id) || !p.completed_at || !p.step) return false
          return normalizedExpected.includes(normalize(p.step))
        })
        const completedCount = completedSteps.length
        const isCompleted = totalSteps > 0 && completedCount === totalSteps
        const isInProgress = completedCount > 0 && completedCount < totalSteps
        const isComingSoon = totalSteps === 0
        const moduleLink = mod.id === 1 && !isComingSoon ? "/modules/prompt-basics" : "#"

        return (
          <div key={mod.id} className="relative">
            <Link href={moduleLink} className={"no-underline " + (isComingSoon ? "pointer-events-none" : "") } tabIndex={isComingSoon ? -1 : 0}>
              <Card
                className={
                  "p-4 transition " +
                  (isCompleted ? "border-emerald-500 border-2" : isInProgress ? "border-blue-500 border-2" : isComingSoon ? "border border-muted opacity-60" : "border border-muted")
                }
                aria-disabled={isComingSoon}
              >
                <CardHeader className='text-center'>
                  <h2 className="text-lg font-bold">{mod.title}</h2>
                </CardHeader>
                <CardContent className='flex flex-col items-center justify-between'>
                  <Image
                    src={mod.image.startsWith('/') ? mod.image : `/` + mod.image}
                    alt={mod.title}
                    width={150}
                    height={150}
                    className="w-36 h-36 object-cover rounded"
                    unoptimized={false}
                    {...(mod.id === 1 ? { priority: true } : { loading: "lazy" })}
                  />
                </CardContent>
                <CardFooter className="flex justify-center">
                  {isComingSoon ? (
                    <span className="text-xs px-3 py-2 rounded bg-muted text-muted-foreground min-w-[120px] text-center">Coming Soon</span>
                  ) : isCompleted ? (
                    <span className="text-xs px-3 py-2 rounded bg-emerald-100 text-emerald-700 flex items-center gap-1 min-w-[120px] text-center">
                      <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><path stroke="#059669" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
                      Completed
                    </span>
                  ) : isInProgress ? (
                    <span className="text-xs py-2 rounded bg-blue-100 text-blue-700 w-full text-center block">
                      In Progress (<span className='font-bold'>{completedCount}</span>/{totalSteps})
                    </span>
                  ) : (
                    <span className="text-xs px-3 py-2 rounded bg-muted text-muted-foreground min-w-[120px] text-center">Not Started</span>
                  )}
                </CardFooter>
                <BorderBeam
                  duration={4}
                  size={300}
                  reverse
                  className="from-transparent via-green-500 to-transparent"
                />
              </Card>
            </Link>
            {isComingSoon && (
              <div className="absolute inset-0 bg-card/70 flex items-center justify-center rounded-lg">
                <span className="text-xs text-muted-foreground">Content In Development</span>
              </div>
            )}
          </div>
        )
      })}
    </section>
  )
}
