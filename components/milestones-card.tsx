"use client"

import { useState } from "react"
import { useGame } from "@/lib/game-context"
import { Button } from "@/components/ui/button"
import { Check, Lock, ChevronRight, Plus, Info } from "lucide-react"
import { Confetti } from "./confetti"
import { useToast } from "@/hooks/use-toast"

export function MilestonesCard() {
  const { milestones, points, addPoints, reducedMotion } = useGame()
  const { toast } = useToast()
  const [showConfetti, setShowConfetti] = useState(false)

  const handleSimulatePoints = () => {
    const result = addPoints(10)

    if (result.milestoneUnlocked) {
      setShowConfetti(true)
      toast({
        title: "🎉 Milestone Unlocked!",
        description: `You earned: ${result.milestoneUnlocked.rewardName}`,
      })
      setTimeout(() => setShowConfetti(false), 3000)
    } else {
      toast({
        title: "+10 Points",
        description: "Keep playing to unlock rewards!",
      })
    }
  }

  return (
    <div className="glass-card rounded-2xl p-6 relative overflow-hidden">
      {showConfetti && !reducedMotion && <Confetti />}

      <div className="flex items-center justify-between mb-6">
        <h3 className="font-semibold text-lg">Reward Milestones</h3>
        <Button
          onClick={handleSimulatePoints}
          size="sm"
          variant="outline"
          className="border-primary/50 text-primary hover:bg-primary/10 bg-transparent"
        >
          <Plus className="w-4 h-4 mr-1" />
          Simulate +10
        </Button>
      </div>

      {/* Timeline */}
      <div className="space-y-1">
        {milestones.map((milestone, index) => (
          <MilestoneItem
            key={milestone.id}
            milestone={milestone}
            currentPoints={points.total}
            isLast={index === milestones.length - 1}
          />
        ))}
      </div>

      {/* Disclaimer */}
      <div className="flex items-start gap-2 mt-4 p-3 rounded-lg bg-secondary/20 text-xs text-muted-foreground">
        <Info className="w-4 h-4 mt-0.5 shrink-0" />
        <p>Rewards are subject to change. Keep earning points to secure your rewards!</p>
      </div>
    </div>
  )
}

function MilestoneItem({
  milestone,
  currentPoints,
  isLast,
}: {
  milestone: {
    id: number
    pointsRequired: number
    rewardName: string
    rewardIcon: string
    status: "locked" | "next" | "unlocked"
  }
  currentPoints: number
  isLast: boolean
}) {
  const isUnlocked = milestone.status === "unlocked"
  const isNext = milestone.status === "next"

  return (
    <div className="flex items-start gap-3">
      {/* Timeline indicator */}
      <div className="flex flex-col items-center">
        <div
          className={`
            w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all
            ${
              isUnlocked
                ? "bg-primary border-primary text-primary-foreground"
                : isNext
                  ? "border-primary bg-primary/20 text-primary animate-pulse-glow"
                  : "border-border bg-secondary text-muted-foreground"
            }
          `}
        >
          {isUnlocked ? (
            <Check className="w-4 h-4" />
          ) : isNext ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <Lock className="w-3 h-3" />
          )}
        </div>
        {!isLast && <div className={`w-0.5 h-8 ${isUnlocked ? "bg-primary" : "bg-border"}`} />}
      </div>

      {/* Content */}
      <div
        className={`
          flex-1 p-3 rounded-lg transition-all -mt-1
          ${isNext ? "bg-primary/10 border border-primary/30" : "bg-secondary/20 border border-transparent"}
          ${isUnlocked ? "opacity-60" : ""}
        `}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl">{milestone.rewardIcon}</span>
            <div>
              <p className={`font-medium ${isNext ? "text-primary" : ""}`}>{milestone.rewardName}</p>
              <p className="text-xs text-muted-foreground">{milestone.pointsRequired.toLocaleString()} points</p>
            </div>
          </div>
          {isNext && (
            <span className="text-xs font-medium text-primary px-2 py-1 bg-primary/20 rounded-full">NEXT</span>
          )}
        </div>
      </div>
    </div>
  )
}
