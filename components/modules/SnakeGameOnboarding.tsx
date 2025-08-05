import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React from 'react'

/**
 * Props for SnakeGameOnboarding component
 */
export interface SnakeGameOnboardingProps {
  /**
   * Whether the onboarding modal is open
   */
  open: boolean
  /**
   * Callback when user starts the game
   */
  onStart: () => void
}

/**
 * Onboarding modal for Snake Game
 * Explains controls, objective, and tips before starting
 */
export function SnakeGameOnboarding({ open, onStart }: SnakeGameOnboardingProps) {
  return (
    <Dialog open={open}>
      <DialogContent className="max-w-md mx-auto" aria-modal="true" role="dialog" aria-labelledby="snake-onboarding-title" aria-describedby="snake-onboarding-desc">
        <DialogHeader>
          <DialogTitle id="snake-onboarding-title">How to Play Snake</DialogTitle>
          <DialogDescription id="snake-onboarding-desc">
            In this game, you control the snake by typing clear, step-by-step instructions. Your goal is to guide the snake to eat apples, collect keys, and avoid obstacles using prompt engineering skills.
          </DialogDescription>
          <ul className="list-disc pl-5 space-y-2 text-sm mt-2">
            <li>
              <span className="font-semibold">How to Play:</span> Type instructions like <span className="font-mono">go right 2 times then eat apple</span> or <span className="font-mono">go up 1 time, then go right 3 times, then eat apple</span>.
            </li>
            <li>
              <span className="font-semibold">Multi-step Planning:</span> You can chain actions using <span className="font-mono">then</span> to solve more complex levels.
            </li>
            <li>
              <span className="font-semibold">Objectives:</span> Eat the correct apple, collect keys, and avoid obstacles by planning your moves.
            </li>
            <li>
              <span className="font-semibold">Tips:</span> Read the level goal and plan your instructions before submitting. Try to be specific and clear!
            </li>
            <li>
              <span className="font-semibold">Example:</span> <span className="font-mono">go up 2 times, then go right 1 time, then get key, then go right 3 times, then eat apple</span>
            </li>
          </ul>
          <div className="mt-4 text-xs text-muted-foreground">
            <span>Want to see a visual demo? (Coming soon!)</span>
          </div>
        </DialogHeader>
        <div className="flex flex-col items-center gap-4 mt-4">
          <Image
            src="/content/Sparky Playful Robot Firefly.png"
            alt="Snake Game Mascot"
            width={120}
            height={120}
            className="rounded-lg"
            priority
          />
          <Button className="w-full" onClick={onStart} aria-label="Start the Snake Game">
            Start Game
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
