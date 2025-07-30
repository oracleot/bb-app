"use client"
// import ProgressRing from '@/components/modules/ProgressRing'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

// Next.js expects: { children: React.ReactNode; params: { [key: string]: string } }

const screens = [
  { label: 'Concept', path: 'concept' },
  { label: 'Case Study', path: 'case-study' },
  { label: 'Connection', path: 'connection' },
  { label: 'Workshop', path: 'workshop' },
  { label: 'Takeaway', path: 'takeaway' },
]

export default function ModuleLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const currentScreenIdx = screens.findIndex((screen) => pathname.includes(screen.path));
  const safeScreenIdx = currentScreenIdx !== -1 ? currentScreenIdx : 0;

  return (
    <div className="flex flex-col min-h-screen">
      <nav className="flex items-center justify-between p-4">
        {/* Breadcrumbs */}
        <div className="flex gap-2">
          {screens.map((screen, idx) => (
            <Button
              key={screen.path}
              variant={safeScreenIdx === idx ? 'default' : 'outline'}
              disabled={safeScreenIdx !== idx}
            >
              {screen.label}
            </Button>
          ))}
        </div>
        {/* Exit Button */}
        <Link href="/dashboard">
          <Button variant="outline">Exit to Dashboard</Button>
        </Link>
      </nav>
      {/* Progress Indicator */}
      <div className="flex flex-col items-center py-2">
        <div className="w-full max-w-md h-4 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-4 bg-blue-500 transition-all duration-300"
            style={{ width: `${((safeScreenIdx + 1) / screens.length) * 100}%` }}
          />
        </div>
        <span className="mt-2 text-sm text-gray-600">
          Step {safeScreenIdx + 1} of {screens.length}
        </span>
      </div>
      <main className="flex-1">{children}</main>
      <div className="flex justify-start p-4">
        {/* Back Button only; Next button is now controlled by each step page */}
        <Link href={safeScreenIdx > 0 ? `/modules/prompt-basics/${screens[safeScreenIdx - 1].path}` : '#'}>
          <Button disabled={safeScreenIdx === 0}>Back</Button>
        </Link>
      </div>
    </div>
  )
}
