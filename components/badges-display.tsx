"use client"

import { useGame } from "@/lib/game-context"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export function BadgesDisplay() {
  const { badges } = useGame()
  const earnedBadges = badges.filter((b) => b.earned)

  if (earnedBadges.length === 0) return null

  return (
    <div className="glass-card rounded-xl p-4">
      <h4 className="text-sm font-medium text-muted-foreground mb-3">Earned Badges</h4>
      <div className="flex flex-wrap gap-2">
        <TooltipProvider>
          {earnedBadges.map((badge) => (
            <Tooltip key={badge.id}>
              <TooltipTrigger asChild>
                <div
                  className="
                    px-3 py-1.5 rounded-full bg-secondary/50 border border-border/30
                    flex items-center gap-1.5 cursor-help
                    hover:border-primary/30 hover:bg-primary/10 transition-all
                  "
                >
                  <span>{badge.icon}</span>
                  <span className="text-xs font-medium">{badge.name}</span>
                </div>
              </TooltipTrigger>
              <TooltipContent className="glass-card border-border/50">
                <p className="text-sm">Badge: {badge.name}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </TooltipProvider>
      </div>
    </div>
  )
}
