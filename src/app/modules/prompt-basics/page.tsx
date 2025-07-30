import { redirect } from 'next/navigation'

export default function Module1Page() {
  redirect('/modules/prompt-basics/concept')
  return null
}
