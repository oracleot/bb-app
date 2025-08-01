"use client"

import { SparkyChatLesson } from "@/components/modules/SparkyChatLesson"
import { newPromptBasicsLessonScript } from "@/components/modules/sparkyLessonScripts"

export default function IntroPage() {
  return (
    <SparkyChatLesson
      key="prompt-basics-intro"
      lessonScripts={newPromptBasicsLessonScript}
      nextRouteOnComplete="/modules/prompt-basics-1/learning-goal"
    />
  )
}
