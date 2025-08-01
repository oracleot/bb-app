"use client"

import { SparkyChatLesson } from "@/components/modules/SparkyChatLesson"
import { reflectionScript } from "@/components/modules/sparkyLessonScripts"

export default function ReflectionPage() {
  return (
    <SparkyChatLesson 
      key="reflection-lesson" // Force remount on route change
      lessonScripts={reflectionScript}
      nextRouteOnComplete="/modules/prompt-basics-1/next-lesson"
    />
  )
}
