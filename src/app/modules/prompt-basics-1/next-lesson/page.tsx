"use client"

import { SparkyChatLesson } from "@/components/modules/SparkyChatLesson"
import { nextLessonScript } from "@/components/modules/sparkyLessonScripts"

export default function NextLessonPage() {
  return (
    <SparkyChatLesson 
      key="next-lesson-lesson" // Force remount on route change
      lessonScripts={nextLessonScript}
      nextRouteOnComplete="/modules" // Back to modules overview
      onLessonComplete={() => {
        console.log("Lesson complete!")
      }}
    />
  )
}
