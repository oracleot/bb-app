import React from 'react'
import Image from "next/image"
import Link from "next/link"

interface ModuleGridProps {
  progress: Array<{
    module_id: number
    completed_at?: string
    score?: number
  }>
}

const modules = [
  { id: 1, title: "Prompt Basics", image: "content/images/module1.png" },
  { id: 2, title: "Specificity", image: "content/images/module1.png" },
  { id: 3, title: "Personas", image: "content/images/module1.png" },
  { id: 4, title: "Examples", image: "content/images/module1.png" },
  { id: 5, title: "Step-by-step", image: "content/images/module1.png" },
  { id: 6, title: "Capstone Project", image: "content/images/module1.png" },
]

/**
 * ModuleGrid displays all modules with progress indicators.
 */
export default function ModuleGrid({ progress }: ModuleGridProps) {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {modules.map((mod) => {
        const modProgress = progress.find((p) => p.module_id === mod.id)
        const isCompleted = Boolean(modProgress?.completed_at)
        // Only Prompt Basics links for now, others can be updated as new modules are implemented
        const moduleLink = mod.id === 1 ? "/modules/prompt-basics" : "#"
        return (
          <Link href={moduleLink} key={mod.id} className="no-underline">
            <div
              className={
                "bg-card rounded-lg shadow p-4 flex flex-col items-center justify-between transition " +
                (isCompleted ? "border-emerald-500 border-2" : "border border-muted")
              }
            >
              <Image
                src={mod.image.startsWith('/') ? mod.image : `/` + mod.image}
                alt={mod.title}
                width={96}
                height={96}
                className="w-24 h-24 object-cover rounded mb-2"
                loading="lazy"
                unoptimized={false}
              />
              <h2 className="text-lg font-semibold mb-1">{mod.title}</h2>
              <span className={
                "text-xs px-2 py-1 rounded " +
                (isCompleted ? "bg-emerald-100 text-emerald-700" : "bg-muted text-muted-foreground")
              }>
                {isCompleted ? "Completed" : "In Progress"}
              </span>
            </div>
          </Link>
        )
      })}
    </section>
  )
}
