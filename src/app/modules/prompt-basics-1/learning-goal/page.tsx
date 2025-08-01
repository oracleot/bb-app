"use client"

import { SparkyChatLesson } from "@/components/modules/SparkyChatLesson"
import { learningGoalScript } from "@/components/modules/sparkyLessonScripts"

export default function LearningGoalPage() {
  return (
    <SparkyChatLesson 
      key="learning-goal-lesson" // Force remount on route change
      lessonScripts={learningGoalScript}
      nextRouteOnComplete="/modules/prompt-basics-1/activity1"
    />
  )
}
