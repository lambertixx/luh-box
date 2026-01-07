"use client"

import { useGame } from "@/lib/game-context"
import { Progress } from "@/components/ui/progress"
import { Target, Sparkles } from "lucide-react"

export function MissionsPanel() {
  const { missions } = useGame()

  return (
    <div className="glass-card rounded-2xl p-6">
      <div className="flex items-center gap-2 mb-4">
        <Target className="w-5 h-5 text-primary" />
        <h3 className="font-semibold">Daily Missions</h3>
      </div>

      <div className="space-y-4">
        {missions.map((mission) => {
          const isComplete = mission.progress >= mission.total
          const percent = (mission.progress / mission.total) * 100

          return (
            <div
              key={mission.id}
              className={`
                p-3 rounded-lg border transition-all
                ${isComplete ? "bg-primary/10 border-primary/30" : "bg-secondary/20 border-border/20"}
              `}
            >
              <div className="flex items-center justify-between mb-2">
                <span className={`text-sm font-medium ${isComplete ? "text-primary" : ""}`}>{mission.title}</span>
                <span className="text-xs flex items-center gap-1 text-muted-foreground">
                  <Sparkles className="w-3 h-3 text-primary" />+{mission.pointsReward}
                </span>
              </div>

              <div className="relative">
                <Progress value={percent} className="h-2 bg-secondary/50" />
                {!isComplete && (
                  <div
                    className="absolute inset-0 h-2 rounded-full overflow-hidden"
                    style={{
                      background: `linear-gradient(90deg, oklch(0.7 0.25 330) 0%, oklch(0.6 0.22 300) 100%)`,
                      width: `${percent}%`,
                    }}
                  />
                )}
              </div>

              <p className="text-xs text-muted-foreground mt-1.5">
                {mission.progress}/{mission.total}
              </p>
            </div>
          )
        })}
      </div>
    </div>
  )
}
