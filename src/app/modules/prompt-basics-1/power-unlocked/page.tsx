"use client"

import { SparkyChatLesson } from "@/components/modules/SparkyChatLesson"
import { powerUnlockedScript } from "@/components/modules/sparkyLessonScripts"

export default function PowerUnlockedPage() {
  return (
    <SparkyChatLesson 
      key="power-unlocked-lesson" // Force remount on route change
      lessonScripts={powerUnlockedScript}
      nextRouteOnComplete="/modules/prompt-basics-1/reflection"
    />
  )
}
