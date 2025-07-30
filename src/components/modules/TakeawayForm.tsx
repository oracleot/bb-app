import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import { Button } from '@/components/ui/button'

const takeawaySchema = z.object({
  reflection: z.string().min(2, 'Please share your reflection'),
})

export function TakeawayForm() {
  const form = useForm<z.infer<typeof takeawaySchema>>({
    resolver: zodResolver(takeawaySchema),
    defaultValues: { reflection: '' },
  })

  function onSubmit(values: z.infer<typeof takeawaySchema>) {
    // TODO: Save reflection to Supabase
    // Show celebration animation
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="reflection"
          render={({ field }) => (
            <FormItem>
              <FormLabel>What did you learn about the power of words?</FormLabel>
              <FormControl>
                <textarea {...field} className="border rounded px-2 py-1 w-full min-h-[80px]" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
