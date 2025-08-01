"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

// Lesson script interface
interface LessonScript {
  id: string
  type: 'intro' | 'lesson' | 'activity' | 'completion'
  title?: string
  sparkyMessage: string
  expectedResponses?: string[] // What responses move to next script
  choices?: { text: string; value: string; isCorrect?: boolean }[]
  inputRequired?: boolean
  customValidation?: (input: string) => boolean
  delay?: number // Delay before showing this script in milliseconds
}

// Message interface for chat display
interface LessonMessage {
  id: string
  content: string
  role: 'sparky' | 'user'
  timestamp: Date
  isTyping?: boolean
}

// Main component props
interface SparkyLessonProps {
  lessonScripts: LessonScript[]
  onLessonComplete?: () => void
  className?: string
}

// Typing animation component
function TypingText({ 
  children, 
  onComplete, 
  speed = 50 
}: { 
  children: string
  onComplete?: () => void
  speed?: number 
}) {
  const [displayedText, setDisplayedText] = React.useState("")
  const [currentIndex, setCurrentIndex] = React.useState(0)

  React.useEffect(() => {
    if (currentIndex < children.length) {
      const timer = setTimeout(() => {
        setDisplayedText(children.slice(0, currentIndex + 1))
        setCurrentIndex(currentIndex + 1)
      }, speed)
      return () => clearTimeout(timer)
    } else if (onComplete) {
      onComplete()
    }
  }, [currentIndex, children, speed, onComplete])

  return (
    <span className="whitespace-pre-wrap break-words leading-relaxed">
      {displayedText}
      {currentIndex < children.length && (
        <motion.span
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 0.8, repeat: Infinity }}
          className="text-yellow-500"
        >
          |
        </motion.span>
      )}
    </span>
  )
}

// Floating sparks animation
function FloatingParticles() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-yellow-400 rounded-full opacity-60"
          style={{
            left: `${15 + i * 12}%`,
            top: `${25 + (i % 4) * 20}%`,
          }}
          animate={{
            y: [0, -15, 0],
            opacity: [0.6, 1, 0.6],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 2.5 + i * 0.3,
            repeat: Infinity,
            delay: i * 0.5,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  )
}

// Sparky character with enhanced animations
function SparkyCharacter({ 
  isActive = false, 
  isSpeaking = false 
}: { 
  isActive?: boolean
  isSpeaking?: boolean 
}) {
  return (
    <motion.div
      className="relative"
      animate={{
        y: [0, -10, 0],
        rotate: [0, 3, 0, -3, 0],
      }}
      transition={{
        duration: 3.5,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      <motion.div
        className="relative w-20 h-20 sm:w-24 sm:h-24"
        animate={isSpeaking ? {
          scale: [1, 1.15, 1],
          filter: ["brightness(1)", "brightness(1.3)", "brightness(1)"]
        } : isActive ? {
          scale: [1, 1.08, 1],
          filter: ["brightness(1)", "brightness(1.1)", "brightness(1)"]
        } : {}}
        transition={{
          duration: isSpeaking ? 0.6 : 1.2,
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
          className="absolute inset-0 bg-yellow-400 rounded-full opacity-25 blur-lg"
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.25, 0.5, 0.25],
          }}
          transition={{
            duration: 2.2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Sparks when speaking or active */}
        {(isSpeaking || isActive) && <FloatingParticles />}
      </motion.div>
    </motion.div>
  )
}

// Choice buttons for activities
function ChoiceButtons({ 
  choices, 
  onChoice 
}: { 
  choices: { text: string; value: string; isCorrect?: boolean }[]
  onChoice: (value: string, isCorrect?: boolean) => void 
}) {
  return (
    <div className="flex flex-wrap gap-3 mt-4">
      {choices.map((choice, index) => (
        <motion.button
          key={choice.value}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onChoice(choice.value, choice.isCorrect)}
          className={cn(
            "px-4 py-2 rounded-xl font-medium shadow-lg transition-all duration-200",
            choice.isCorrect 
              ? "bg-gradient-to-r from-green-400 to-emerald-400 hover:from-green-500 hover:to-emerald-500 text-white"
              : "bg-gradient-to-r from-yellow-400 to-orange-400 hover:from-yellow-500 hover:to-orange-500 text-gray-800"
          )}
        >
          {choice.text}
        </motion.button>
      ))}
    </div>
  )
}

// Main lesson component
function SparkyLesson({ lessonScripts, onLessonComplete, className }: SparkyLessonProps) {
  const [currentScriptIndex, setCurrentScriptIndex] = React.useState(0)
  const [messages, setMessages] = React.useState<LessonMessage[]>([])
  const [input, setInput] = React.useState("")
  const [isTyping, setIsTyping] = React.useState(false)
  const [waitingForResponse, setWaitingForResponse] = React.useState(false)
  const [showChoices, setShowChoices] = React.useState(false)
  const inputRef = React.useRef<HTMLInputElement>(null)
  const messagesEndRef = React.useRef<HTMLDivElement>(null)

  const currentScript = lessonScripts[currentScriptIndex]

  // Auto-scroll to bottom
  React.useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])

  const startScript = React.useCallback((script: LessonScript) => {
    setIsTyping(true)
    setWaitingForResponse(false)
    setShowChoices(false)

    // Add Sparky's message
    const sparkyMessage: LessonMessage = {
      id: `sparky-${script.id}`,
      content: script.sparkyMessage,
      role: 'sparky',
      timestamp: new Date(),
      isTyping: true
    }

    setMessages(prev => [...prev, sparkyMessage])
  }, [])

  const proceedToNext = React.useCallback(() => {
    const nextIndex = currentScriptIndex + 1
    if (nextIndex < lessonScripts.length) {
      setCurrentScriptIndex(nextIndex)
      setTimeout(() => {
        startScript(lessonScripts[nextIndex])
      }, 500)
    } else {
      // Lesson complete
      onLessonComplete?.()
    }
  }, [currentScriptIndex, lessonScripts, onLessonComplete, startScript])

  // Start first script
  React.useEffect(() => {
    if (currentScript && messages.length === 0) {
      startScript(currentScript)
    }
  }, [currentScript, messages.length, startScript])

  const onTypingComplete = React.useCallback(() => {
    setIsTyping(false)
    setWaitingForResponse(true)
    
    // Show choices if available
    if (currentScript.choices) {
      setShowChoices(true)
    }
    
    // Focus input for text responses
    if (currentScript.inputRequired || currentScript.expectedResponses) {
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [currentScript])

  const handleChoice = React.useCallback((value: string) => {
    // Add user's choice as message
    const userMessage: LessonMessage = {
      id: `user-choice-${Date.now()}`,
      content: value,
      role: 'user',
      timestamp: new Date()
    }
    setMessages(prev => [...prev, userMessage])
    
    // Move to next script after a brief delay
    setTimeout(() => {
      proceedToNext()
    }, 1000)
  }, [proceedToNext])

  const handleSubmit = React.useCallback((e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || !waitingForResponse) return

    const userMessage: LessonMessage = {
      id: `user-${Date.now()}`,
      content: input.trim(),
      role: 'user',
      timestamp: new Date()
    }
    setMessages(prev => [...prev, userMessage])

    // Check if response is valid
    const isValidResponse = currentScript.expectedResponses
      ? currentScript.expectedResponses.some(expected => 
          input.toLowerCase().includes(expected.toLowerCase())
        )
      : currentScript.customValidation
      ? currentScript.customValidation(input.trim())
      : true

    setInput("")
    
    if (isValidResponse) {
      setTimeout(() => {
        proceedToNext()
      }, 1000)
    } else {
      // Could add hint or encouragement here
      setTimeout(() => {
        proceedToNext() // For now, proceed anyway
      }, 1000)
    }
  }, [input, waitingForResponse, currentScript, proceedToNext])

  return (
    <div className={cn(
      "flex flex-col h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-pink-50 overflow-hidden",
      className
    )}>
      {/* Sparky floating in top area */}
      <div className="relative h-32 flex items-center justify-center">
        <SparkyCharacter isActive={!isTyping} isSpeaking={isTyping} />
      </div>

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto px-4 pb-4">
        <div className="max-w-4xl mx-auto space-y-6">
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className={cn(
                "flex w-full",
                message.role === 'user' ? "justify-end" : "justify-start"
              )}
            >
              <div
                className={cn(
                  "max-w-[85%] rounded-2xl px-6 py-4 shadow-lg",
                  message.role === 'user' 
                    ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white"
                    : "bg-white border-2 border-yellow-200 text-gray-800"
                )}
              >
                {message.role === 'sparky' && (
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xl">🟡</span>
                    <span className="font-bold text-yellow-700">Sparky:</span>
                  </div>
                )}
                
                {message.isTyping ? (
                  <TypingText onComplete={onTypingComplete} speed={30}>
                    {message.content}
                  </TypingText>
                ) : (
                  <div className="whitespace-pre-wrap break-words leading-relaxed">
                    {message.content}
                  </div>
                )}

                {/* Show choices after typing is complete */}
                {message.role === 'sparky' && 
                 showChoices && 
                 !isTyping && 
                 currentScript.choices && (
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
        {waitingForResponse && !showChoices && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="border-t border-yellow-200 p-4 bg-white/80 backdrop-blur-sm"
          >
            <form onSubmit={handleSubmit} className="max-w-4xl mx-auto flex gap-3">
              <Input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your response here..."
                className="flex-1 border-2 border-yellow-200 focus:border-yellow-400 rounded-xl bg-yellow-50/50 text-lg py-3"
                autoComplete="off"
              />
              <Button 
                type="submit" 
                disabled={!input.trim()}
                className="px-8 py-3 bg-gradient-to-r from-yellow-400 to-orange-400 hover:from-yellow-500 hover:to-orange-500 text-gray-800 font-medium rounded-xl shadow-lg text-lg"
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
export { SparkyLesson, type LessonScript, type SparkyLessonProps }
