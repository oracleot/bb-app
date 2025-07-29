import React from 'react'
interface ActivityFeedItem {
  achievement_type: string
  earned_at: string
  metadata?: Record<string, unknown>
}

interface ActivityFeedProps {
  activity: ActivityFeedItem[]
}

/**
 * ActivityFeed displays recent achievements and activity.
 */
export default function ActivityFeed({ activity }: ActivityFeedProps) {
  if (!activity?.length) {
    return <div className="mt-6 text-muted-foreground">No recent activity yet.</div>
  }
  return (
    <section className="mt-6">
      <h3 className="text-md font-semibold mb-2">Recent Activity</h3>
      <ul className="space-y-2">
        {activity.map((item, idx) => (
          <li key={idx} className="bg-muted rounded p-2 flex flex-col">
            <span className="font-medium">{item.achievement_type}</span>
            <span className="text-xs text-muted-foreground">{new Date(item.earned_at).toLocaleString()}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}
