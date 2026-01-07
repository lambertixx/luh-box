"use client"

import { useEffect, useState } from "react"
import { useGame } from "@/lib/game-context"
import { Progress } from "@/components/ui/progress"
import { Sparkles, Gift, TrendingUp } from "lucide-react"

export function PointsCard() {
  const { points, milestones, reducedMotion } = useGame()
  const [displayPoints, setDisplayPoints] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  // Find next milestone
  const nextMilestone = milestones.find((m) => m.status === "next") || milestones[milestones.length - 1]
  const prevMilestone = milestones.filter((m) => m.status === "unlocked").pop()
  const prevPoints = prevMilestone?.pointsRequired || 0
  const progressPercent = nextMilestone
    ? ((points.total - prevPoints) / (nextMilestone.pointsRequired - prevPoints)) * 100
    : 100

  // Animate count up
  useEffect(() => {
    if (reducedMotion) {
      setDisplayPoints(points.total)
      return
    }

    setIsAnimating(true)
    const duration = 1000
    const start = displayPoints
    const diff = points.total - start
    const startTime = Date.now()

    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3) // ease out cubic
      setDisplayPoints(Math.round(start + diff * eased))

      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        setIsAnimating(false)
      }
    }

    requestAnimationFrame(animate)
  }, [points.total, reducedMotion])

  return (
    <div className="glass-card rounded-2xl p-6 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />

      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-4">
          <div className="p-2 rounded-lg bg-primary/10">
            <Sparkles className="w-5 h-5 text-primary" />
          </div>
          <h3 className="font-semibold text-lg">Your Points</h3>
        </div>

        {/* Points Display */}
        <div className="mb-6">
          <div className="flex items-baseline gap-2">
            <span
              className={`text-5xl font-bold neon-text ${isAnimating ? "animate-count-up" : ""}`}
              style={{ fontFamily: "var(--font-orbitron)" }}
            >
              {displayPoints.toLocaleString()}
            </span>
            <span className="text-muted-foreground text-sm">pts</span>
          </div>
          <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
            <TrendingUp className="w-3 h-3 text-green-400" />
            Updated {points.lastUpdated}
          </p>
        </div>

        {/* Progress to Next Milestone */}
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Progress to next reward</span>
            <span className="font-medium">{Math.round(progressPercent)}%</span>
          </div>

          <div className="relative">
            <Progress value={progressPercent} className="h-3 bg-secondary/50" />
            <div
              className="absolute inset-0 h-3 rounded-full overflow-hidden"
              style={{
                background: `linear-gradient(90deg, oklch(0.7 0.25 330) 0%, oklch(0.6 0.22 300) 100%)`,
                width: `${progressPercent}%`,
                boxShadow: "0 0 10px oklch(0.7 0.25 330 / 0.5)",
              }}
            />
          </div>

          {/* Next Reward Preview */}
          <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/30 border border-border/20">
            <div className="text-2xl">{nextMilestone?.rewardIcon}</div>
            <div className="flex-1">
              <p className="font-medium">{nextMilestone?.rewardName}</p>
              <p className="text-xs text-muted-foreground">
                {(nextMilestone?.pointsRequired || 0) - points.total} points away
              </p>
            </div>
            <Gift className="w-5 h-5 text-primary" />
          </div>
        </div>

        <p className="text-xs text-muted-foreground text-center mt-4">Play matches to earn points</p>
      </div>
    </div>
  )
}
