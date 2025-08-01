"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import type { LessonScript } from "./SparkyLesson"
import { TypingAnimation } from "../magicui/typing-animation"

// Enhanced Message interface for chat display
interface ChatMessage {
  id: string
  content: string
  role: 'sparky' | 'user'
  timestamp: Date
  isTyping?: boolean
  delay?: number
}

// Main component props
interface SparkyChatLessonProps {
  lessonScripts: LessonScript[]
  nextRouteOnComplete?: string
  onLessonComplete?: () => void
  className?: string
}

// Enhanced floating sparks animation
function FloatingParticles({ intensity = 1 }: { intensity?: number }) {
  const particleCount = Math.floor(8 * intensity)
  
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {[...Array(particleCount)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-yellow-400 rounded-full opacity-70"
          style={{
            left: `${10 + i * 15}%`,
            top: `${20 + (i % 4) * 20}%`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.7, 1, 0.7],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 2 + i * 0.3,
            repeat: Infinity,
            delay: i * 0.4,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  )
}

// Enhanced Sparky character with better animations
function SparkyCharacter({ 
  isActive = false, 
  isSpeaking = false,
  className 
}: { 
  isActive?: boolean
  isSpeaking?: boolean
  className?: string
}) {
  return (
    <motion.div
      className={cn("relative", className)}
      animate={{
        y: [0, -12, 0],
        rotate: [0, 4, 0, -4, 0],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      <motion.div
        className="relative w-24 h-24 sm:w-28 sm:h-28"
        animate={isSpeaking ? {
          scale: [1, 1.2, 1],
          filter: ["brightness(1)", "brightness(1.4)", "brightness(1)"]
        } : isActive ? {
          scale: [1, 1.1, 1],
          filter: ["brightness(1)", "brightness(1.15)", "brightness(1)"]
        } : {}}
        transition={{
          duration: isSpeaking ? 0.6 : 1.5,
          repeat: (isSpeaking || isActive) ? Infinity : 0,
        }}
      >
        <Image
          src="/content/Sparky Playful Robot Firefly.png"
          alt="Sparky the Code Guide"
          fill
          className="object-contain"
          priority
        />
        
        {/* Enhanced glow effect */}
        <motion.div
          className="absolute inset-0 bg-yellow-400 rounded-full opacity-30 blur-xl"
          animate={{
            scale: [1, 1.6, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Sparks when speaking or active */}
        {(isSpeaking || isActive) && (
          <FloatingParticles intensity={isSpeaking ? 1.5 : 1} />
        )}
      </motion.div>
    </motion.div>
  )
}

// Enhanced choice buttons for activities
function ChoiceButtons({ 
  choices, 
  onChoice,
  className 
}: { 
  choices: { text: string; value: string; isCorrect?: boolean }[]
  onChoice: (value: string) => void
  className?: string
}) {
  return (
    <div className={cn("flex flex-wrap gap-3 mt-6", className)}>
      {choices.map((choice, index) => (
        <motion.button
          key={choice.value}
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ 
            delay: index * 0.15,
            type: "spring",
            stiffness: 300,
            damping: 20
          }}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onChoice(choice.value)}
          className={cn(
            "px-6 py-3 rounded-2xl font-semibold shadow-lg transition-all duration-300 border-2",
            "bg-gradient-to-r from-yellow-400 to-orange-400 hover:from-yellow-500 hover:to-orange-500",
            "text-gray-800 border-yellow-300 hover:border-orange-400",
            "transform-gpu backdrop-blur-sm"
          )}
        >
          {choice.text}
        </motion.button>
      ))}
    </div>
  )
}

// Main enhanced lesson component
function SparkyChatLesson({ 
  lessonScripts, 
  nextRouteOnComplete,
  onLessonComplete, 
  className 
}: SparkyChatLessonProps) {
  const router = useRouter()
  const [currentScriptIndex, setCurrentScriptIndex] = React.useState(0)
  const [messages, setMessages] = React.useState<ChatMessage[]>([])
  const [input, setInput] = React.useState("")
  const [isTyping, setIsTyping] = React.useState(false)
  const [waitingForResponse, setWaitingForResponse] = React.useState(false)
  const [showChoices, setShowChoices] = React.useState(false)
  const [processingChoice, setProcessingChoice] = React.useState(false)
  const [isInitialized, setIsInitialized] = React.useState(false)
  
  const inputRef = React.useRef<HTMLInputElement>(null)
  const messagesEndRef = React.useRef<HTMLDivElement>(null)
  
  // Use ref to track lesson scripts to prevent re-initialization on navigation
  const lessonScriptsRef = React.useRef(lessonScripts)
  const hasStartedRef = React.useRef(false)

  const currentScript = lessonScripts?.[currentScriptIndex]

  // Auto-scroll to bottom with smooth behavior
  React.useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ 
        behavior: "smooth", 
        block: "end" 
      })
    }
  }, [messages, isTyping])

  // Helper to proceed to next script or complete lesson
  const proceedToNext = React.useCallback(() => {
    setCurrentScriptIndex(prevIndex => {
      const nextIndex = prevIndex + 1
      if (nextIndex >= lessonScripts.length) {
        // Lesson complete
        if (nextRouteOnComplete) {
          setTimeout(() => {
            router.push(nextRouteOnComplete)
          }, 1500)
        } else {
          onLessonComplete?.()
        }
      }
      return nextIndex
    })
  }, [lessonScripts.length, nextRouteOnComplete, router, onLessonComplete])

  const startScript = React.useCallback((script: LessonScript, delay = 800) => {
    setTimeout(() => {
      setIsTyping(true)
      setWaitingForResponse(false)
      setShowChoices(false)
      setProcessingChoice(false)

      // Add Sparky's message with unique ID
      const sparkyMessage: ChatMessage = {
        id: `sparky-${script.id}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        content: script.sparkyMessage,
        role: 'sparky',
        timestamp: new Date(),
        isTyping: true,
        delay: script.delay || 0
      }

      setMessages(prev => [...prev, sparkyMessage])
      
      // Since TypingAnimation doesn't have onComplete, simulate typing time and then show interactions
      const typingDuration = Math.max(1000, script.sparkyMessage.length * 30) // Estimate typing time
      setTimeout(() => {
        setIsTyping(false)
        
        // Determine next action based on script type
        if (script.choices && script.choices.length > 0) {
          setShowChoices(true)
          setWaitingForResponse(true)
        } else if (script.inputRequired) {
          setWaitingForResponse(true)
          setTimeout(() => inputRef.current?.focus(), 200)
        } else {
          // Auto-proceed after a delay for messages without interaction
          setTimeout(() => {
            proceedToNext()
          }, 1200)
        }
      }, typingDuration)
    }, delay)
  }, [proceedToNext])

  // Reset everything when lessonScripts change (navigation between lessons)
  React.useEffect(() => {
    // Check if lessonScripts actually changed by comparing reference
    if (lessonScriptsRef.current !== lessonScripts) {
      lessonScriptsRef.current = lessonScripts
      hasStartedRef.current = false
      
      // Reset all state
      setMessages([])
      setCurrentScriptIndex(0)
      setIsInitialized(false)
      setIsTyping(false)
      setWaitingForResponse(false)
      setShowChoices(false)
      setProcessingChoice(false)
      setInput("")
    }
  }, [lessonScripts])

  // Initialize lesson - only run once per lesson
  React.useEffect(() => {
    if (
      lessonScripts && 
      lessonScripts.length > 0 && 
      !isInitialized && 
      !hasStartedRef.current
    ) {
      hasStartedRef.current = true
      setIsInitialized(true)
      
      // Start first script with a small delay
      setTimeout(() => {
        startScript(lessonScripts[0], 300)
      }, 100)
    }
  }, [lessonScripts, isInitialized, startScript])

  // Handle script progression - run when currentScriptIndex changes (after first)
  React.useEffect(() => {
    if (
      currentScriptIndex > 0 && 
      currentScriptIndex < lessonScripts.length && 
      isInitialized
    ) {
      startScript(lessonScripts[currentScriptIndex])
    }
  }, [currentScriptIndex, lessonScripts, startScript, isInitialized])

  const handleChoice = React.useCallback((value: string) => {
    if (processingChoice || !currentScript) return
    
    setProcessingChoice(true)
    setShowChoices(false)
    
    // Find the choice text for display
    const choiceText = currentScript.choices?.find(c => c.value === value)?.text || value
    
    // Add user's choice as message
    const userMessage: ChatMessage = {
      id: `user-choice-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      content: choiceText,
      role: 'user',
      timestamp: new Date()
    }
    setMessages(prev => [...prev, userMessage])
    
    // Move to next script after a delay
    setTimeout(() => {
      proceedToNext()
    }, 1200)
  }, [currentScript, processingChoice, proceedToNext])

  const handleSubmit = React.useCallback((e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || !waitingForResponse || processingChoice) return

    setProcessingChoice(true)
    
    const userMessage: ChatMessage = {
      id: `user-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      content: input.trim(),
      role: 'user',
      timestamp: new Date()
    }
    setMessages(prev => [...prev, userMessage])

    setInput("")
    
    // Move to next script after showing user input
    setTimeout(() => {
      proceedToNext()
    }, 1000)
  }, [input, waitingForResponse, processingChoice, proceedToNext])

  // Guard clause for invalid state
  if (!lessonScripts || lessonScripts.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-pink-50">
        <p className="text-gray-500">No lesson scripts available</p>
      </div>
    )
  }

  return (
    <div className={cn(
      "flex flex-col h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-pink-50 overflow-hidden relative",
      className
    )}>
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-40 h-40 bg-yellow-300 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-60 h-60 bg-orange-300 rounded-full blur-3xl" />
      </div>

      {/* Sparky floating in top area */}
      <div className="relative h-40 flex items-center justify-start pl-8 z-10">
        <SparkyCharacter 
          isActive={!isTyping} 
          isSpeaking={isTyping}
          className="transform scale-110" 
        />
      </div>

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto px-6 pb-6 relative z-10">
        <div className="max-w-5xl mx-auto space-y-8">
          {messages.map((message, messageIndex) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ 
                duration: 0.5,
                type: "spring",
                stiffness: 300,
                damping: 25
              }}
              className={cn(
                "flex w-full",
                message.role === 'user' ? "justify-end" : "justify-start"
              )}
            >
              <div
                className={cn(
                  "max-w-[85%] rounded-3xl px-8 py-6 shadow-xl relative",
                  message.role === 'user' 
                    ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white ml-16"
                    : "bg-white border-3 border-yellow-300 text-gray-800 mr-16"
                )}
              >
                <TypingAnimation 
                  delay={message.delay || 0} 
                  as="span" 
                  style={{fontSize: 16, lineHeight: 1.5}}
                >
                  {message.content}
                </TypingAnimation>

                {message.role === 'sparky' && 
                 messageIndex === messages.length - 1 && 
                 showChoices && 
                 !isTyping && 
                 currentScript?.choices && 
                 currentScript.choices.length > 0 && (
                  <ChoiceButtons 
                    choices={currentScript.choices} 
                    onChoice={handleChoice}
                  />
                )}
              </div>
            </motion.div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input area - only show when waiting for text response */}
      <AnimatePresence>
        {waitingForResponse && !showChoices && currentScript?.inputRequired && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="border-t-2 border-yellow-300 p-6 bg-white/90 backdrop-blur-md shadow-2xl relative z-10"
          >
            <form onSubmit={handleSubmit} className="max-w-5xl mx-auto flex gap-4">
              <Input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your response here..."
                className="flex-1 border-3 border-yellow-300 focus:border-yellow-500 rounded-2xl bg-yellow-50/70 text-lg py-4 px-6 shadow-lg"
                autoComplete="off"
                disabled={processingChoice}
              />
              <Button 
                type="submit" 
                disabled={!input.trim() || processingChoice}
                className="px-10 py-4 bg-gradient-to-r from-yellow-400 to-orange-400 hover:from-yellow-500 hover:to-orange-500 text-gray-800 font-semibold rounded-2xl shadow-lg text-lg border-2 border-yellow-300 hover:border-orange-400"
              >
                ✨ Send
              </Button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// Export components
export { SparkyChatLesson, SparkyCharacter, type SparkyChatLessonProps }
