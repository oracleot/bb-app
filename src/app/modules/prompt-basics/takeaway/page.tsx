"use client"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useStepCompletion } from '@/hooks/useStepCompletion'
import { StepCompletionCheckbox } from '@/components/modules/StepCompletionCheckbox'
import { getMostRecentStep } from '@/lib/supabase/getMostRecentStep'
import { useCurrentUser } from '@/hooks/useCurrentUser'
import { Button } from '@/components/ui/button'
import { TakeawayForm } from "@/components/modules/TakeawayForm"
import { createClient } from '@/lib/supabase/client'

const moduleId = 1
const step = "takeaway"
const stepOrder = ["concept", "case-study", "connection", "workshop", "takeaway"]

export default function TakeawayScreen() {
  const router = useRouter()
  const { userId, isLoading: userLoading, error: userError } = useCurrentUser()
  const { isCompleted, isLoading, error, completeStep } = useStepCompletion({ userId: userId ?? '', moduleId, step })

  useEffect(() => {
    if (!userId) return
    async function checkStepAccess() {
      const supabase = await createClient()
      // Fetch all completed steps for this user/module
      const { data, error } = await supabase
        .from('user_progress')
        .select('step')
        .eq('user_id', userId!)
        .eq('module_id', moduleId)
      if (error) return
      const completedSteps = (data ?? []).map((row: { step: string }) => row.step)
      // Find index of current step
      const currentIdx = stepOrder.indexOf(step)
      // Check if all previous steps are completed
      const missingPrevIdx = [...Array(currentIdx).keys()].find((idx: number) => !completedSteps.includes(stepOrder[idx]))
      if (typeof missingPrevIdx === 'number') {
        // Find last completed step in order
        const lastCompletedIdx = Math.max(...completedSteps.map((s: string) => stepOrder.indexOf(s)).filter((idx: number) => idx >= 0))
        const fallbackStep = lastCompletedIdx >= 0 ? stepOrder[lastCompletedIdx] : stepOrder[0]
        router.replace(`/modules/prompt-basics/${fallbackStep}`)
      }
    }
    checkStepAccess()
  }, [router, userId])

  function handleNext() {
    const nextIdx = stepOrder.indexOf(step) + 1
    if (nextIdx < stepOrder.length) {
      router.push(`/modules/prompt-basics/${stepOrder[nextIdx]}`)
    }
  }

  if (userLoading) {
    return <div className="p-6">Loading user...</div>
  }
  if (userError || !userId) {
    return <div className="p-6 text-destructive">Unable to load user context.</div>
  }

  return (
    <section className="p-6">
      <h1 className="text-2xl font-bold mb-4">Reflection: Word Power</h1>
      <TakeawayForm />
      {/* Add text input for reflection, celebration animation on submit */}
      <StepCompletionCheckbox
        isCompleted={isCompleted}
        isLoading={isLoading}
        error={error}
        onComplete={completeStep}
      />
      <div className="flex justify-between mt-8">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.back()}
        >
          Back
        </Button>
        <Button
          type="button"
          disabled={!isCompleted || isLoading}
          onClick={handleNext}
        >
          Next
        </Button>
      </div>
    </section>
  )
}
