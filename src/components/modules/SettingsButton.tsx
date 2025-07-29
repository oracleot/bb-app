// import type { Database } from "@/types/database" // Uncomment after running Supabase type generation
import { Button } from "@/components/ui/button"
import Link from "next/link"




/**
 * SettingsButton links to the user's profile/settings page.
 */
export default function SettingsButton() {
  return (
    <Link href="/auth/profile">
      <Button variant="outline" className="w-full mt-4">
        Profile & Settings
      </Button>
    </Link>
  )
}
