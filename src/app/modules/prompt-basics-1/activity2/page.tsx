"use client"

import { SparkyChatLesson } from "@/components/modules/SparkyChatLesson"
import { activity2Script } from "@/components/modules/sparkyLessonScripts"

export default function Activity2Page() {
  return (
    <SparkyChatLesson 
      key="activity2-lesson" // Force remount on route change
      lessonScripts={activity2Script}
      nextRouteOnComplete="/modules/prompt-basics-1/power-unlocked"
    />
  )
}
