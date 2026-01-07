"use client"

import { useGame } from "@/lib/game-context"
import { Flame } from "lucide-react"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export function StreakIndicator() {
  const { points, reducedMotion } = useGame()

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            className={`
              glass-card rounded-xl p-4 flex items-center gap-3 cursor-help
              hover:border-orange-500/30 transition-colors
            `}
          >
            <div
              className={`
                p-2 rounded-lg bg-orange-500/20
                ${!reducedMotion ? "animate-pulse" : ""}
              `}
            >
              <Flame className="w-6 h-6 text-orange-500" />
            </div>
            <div>
              <p
                className="text-2xl font-bold"
                style={{ fontFamily: "var(--font-orbitron)" }}
              >
                {points.streakDays}
              </p>
              <p className="text-xs text-muted-foreground">Streak Diário</p>
            </div>
          </div>
        </TooltipTrigger>
        <TooltipContent side="bottom" className="glass-card border-border/50">
          <p className="text-sm">
            <span className="font-medium text-orange-500">Streak Bonus!</span>
            <br />
            <p className="text-white">
              Jogue diariamente para ganhar 2x nas partidas!
            </p>
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
