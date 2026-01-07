"use client"

import { useState } from "react"
import { useGame } from "@/lib/game-context"
import { Button } from "@/components/ui/button"
import { Zap } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { Confetti } from "./confetti"

export function SimulateButton() {
  const { simulateMatch, isConnected, reducedMotion } = useGame()
  const { toast } = useToast()
  const [showConfetti, setShowConfetti] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)

  const handleSimulate = () => {
    if (!isConnected) return

    setIsAnimating(true)
    setTimeout(() => setIsAnimating(false), 300)

    const { pointsGained, milestoneUnlocked } = simulateMatch()

    if (milestoneUnlocked) {
      setShowConfetti(true)
      toast({
        title: "🎉 Desbloqueado!",
        description: `+${pointsGained} pontos! Você ganhou: ${milestoneUnlocked.rewardName}`,
      })
      setTimeout(() => setShowConfetti(false), 3000)
    } else {
      toast({
        title: `+${pointsGained} pontos ganhos!`,
        description: "Partida sincronizada! Continue jogando!",
      })
    }
  }

  if (!isConnected) return null

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {showConfetti && !reducedMotion && <Confetti />}
      <Button
        onClick={handleSimulate}
        size="lg"
        className={`
          bg-gradient-to-r from-primary to-accent text-primary-foreground
          neon-glow shadow-2xl
          transition-all duration-200
          ${isAnimating ? "scale-95" : "hover:scale-105"}
          active:scale-95
        `}
        style={{ fontFamily: "var(--font-orbitron)" }}
      >
        <Zap className="w-5 h-5 mr-2" />
        Simular partida
      </Button>
    </div>
  )
}
