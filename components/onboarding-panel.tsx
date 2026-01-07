"use client"

import type React from "react"

import { useState } from "react"
import { useGame } from "@/lib/game-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Gamepad2, Trophy, Users, Zap, ArrowRight } from "lucide-react"

export function OnboardingPanel() {
  const { connectRiotId } = useGame()
  const [riotId, setRiotId] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (riotId.trim()) {
      connectRiotId(riotId.trim())
    }
  }

  const features = [
    { icon: Trophy, title: "Earn Rewards", description: "Unlock exclusive items as you play" },
    { icon: Users, title: "Climb Ranks", description: "Compete on the global leaderboard" },
    { icon: Zap, title: "Daily Missions", description: "Complete challenges for bonus points" },
  ]

  return (
    <div className="min-h-[60vh] flex items-center justify-center p-4">
      <div className="glass-card rounded-2xl p-8 md:p-12 max-w-2xl w-full text-center relative overflow-hidden">
        {/* Decorative glow */}
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-accent/20 rounded-full blur-3xl" />

        <div className="relative z-10">
          {/* Logo */}
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-primary/10 border border-primary/30 mb-6 animate-pulse-glow">
            <Gamepad2 className="w-10 h-10 text-primary" />
          </div>

          <h1 className="text-3xl md:text-4xl font-bold mb-4 neon-text" style={{ fontFamily: "var(--font-orbitron)" }}>
            Welcome to <span className="text-primary">VALO</span>REWARDS
          </h1>

          <p className="text-muted-foreground mb-8 text-lg">
            Track your progress, earn exclusive rewards, and climb the leaderboard
          </p>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {features.map((feature, i) => (
              <div
                key={i}
                className="p-4 rounded-xl bg-secondary/30 border border-border/30 hover:border-primary/30 transition-colors"
              >
                <feature.icon className="w-8 h-8 text-primary mx-auto mb-2" />
                <h3 className="font-semibold mb-1">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>

          {/* Connect Form */}
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <Input
              value={riotId}
              onChange={(e) => setRiotId(e.target.value)}
              placeholder="Enter your Riot ID..."
              className="flex-1 bg-input/50 border-border/50 focus:border-primary h-12 text-center sm:text-left"
            />
            <Button
              type="submit"
              size="lg"
              className="bg-primary hover:bg-primary/80 text-primary-foreground neon-glow transition-all duration-200 hover:scale-105 active:scale-95 h-12"
            >
              Get Started
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </form>

          <p className="text-xs text-muted-foreground mt-4">Demo mode - No actual Riot account required</p>
        </div>
      </div>
    </div>
  )
}
