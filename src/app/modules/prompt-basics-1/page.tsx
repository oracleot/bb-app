"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { SparkyCharacter } from "@/components/modules/SparkyChatLesson"

export default function PromptBasics1Page() {
  const router = useRouter()

  const startLesson = () => {
    router.push("/modules/prompt-basics-1/intro")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-pink-50 flex flex-col items-center justify-center p-8">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-40 h-40 bg-yellow-300 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-60 h-60 bg-orange-300 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 text-center max-w-4xl">
        {/* Sparky Introduction */}
        <div className="mb-12">
          <div className="flex justify-center mb-8">
            <SparkyCharacter isActive={true} className="transform scale-150" />
          </div>
          
          <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
            Prompt Engineering Basics
          </h1>
          
          <p className="text-2xl text-gray-700 mb-8 leading-relaxed">
            Join Sparky on an interactive journey to master the art of AI communication! 
            Learn how to craft powerful prompts that unlock amazing possibilities.
          </p>

          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 border-3 border-yellow-300 shadow-2xl mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">What you&apos;ll learn:</h2>
            <ul className="text-xl text-gray-700 space-y-3 text-left max-w-2xl mx-auto">
              <li>✨ What prompt engineering really means</li>
              <li>🎯 How to make your AI instructions clear and specific</li>
              <li>🧪 The difference between vague and valuable prompts</li>
              <li>🔑 The 3-part prompt formula for success</li>
              <li>🚀 Practical exercises to build your skills</li>
            </ul>
          </div>

          <Button
            onClick={startLesson}
            className="px-12 py-6 text-2xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 hover:from-yellow-500 hover:to-orange-500 text-gray-800 rounded-3xl shadow-2xl border-3 border-yellow-300 hover:border-orange-400 transform hover:scale-105 transition-all duration-300"
          >
            🌟 Start Your Adventure with Sparky!
          </Button>
          
          <p className="text-lg text-gray-600 mt-6">
            Interactive chat-based learning • ~10 minutes
          </p>
        </div>
      </div>
    </div>
  )
}
