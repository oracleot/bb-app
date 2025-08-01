import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Prompt Basics - Interactive Lesson | BibleBot",
  description: "Learn the fundamentals of prompt engineering with Sparky, your AI guide",
}

export default function PromptBasics1Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-pink-50">
      {children}
    </div>
  )
}
