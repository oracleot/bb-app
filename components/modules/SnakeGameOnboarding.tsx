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
      <DialogContent className="max-w-md mx-auto">
        <DialogHeader>
          <DialogTitle>How to Play Snake</DialogTitle>
          <DialogDescription>
            <ul className="list-disc pl-5 space-y-2 text-sm">
              <li>
                <span className="font-semibold">Controls:</span> Use your <span className="font-mono">Arrow Keys</span> to move the snake.
              </li>
              <li>
                <span className="font-semibold">Objective:</span> Eat the food to grow longer. Avoid hitting the walls or yourself!
              </li>
              <li>
                <span className="font-semibold">Tips:</span> Plan your moves ahead and try not to trap yourself.
              </li>
            </ul>
          </DialogDescription>
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
          <Button className="w-full" onClick={onStart}>
            Start Game
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
