"use client"

import { SparkyChatLesson } from "@/components/modules/SparkyChatLesson"
import { activity1Script } from "@/components/modules/sparkyLessonScripts"

export default function Activity1Page() {
  return (
    <SparkyChatLesson 
      key="activity1-lesson" // Force remount on route change
      lessonScripts={activity1Script}
      nextRouteOnComplete="/modules/prompt-basics-1/activity2"
    />
  )
}
