"use client"

import { GameProvider, useGame } from "@/lib/game-context"
import { AnimatedBackground } from "@/components/animated-background"
import { TopBar } from "@/components/top-bar"
import { OnboardingPanel } from "@/components/onboarding-panel"
import { PlayerCard } from "@/components/player-card"
import { PointsCard } from "@/components/points-card"
import { MilestonesCard } from "@/components/milestones-card"
import { LeaderboardCard } from "@/components/leaderboard-card"
import { MissionsPanel } from "@/components/missions-panel"
import { StreakIndicator } from "@/components/streak-indicator"
import { BadgesDisplay } from "@/components/badges-display"
import { SimulateButton } from "@/components/simulate-button"
import { Toaster } from "@/components/ui/toaster"

function MainContent() {
  const { isConnected } = useGame()

  if (!isConnected) {
    return <OnboardingPanel />
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column - Primary */}
        <div className="lg:col-span-7 space-y-6">
          <PlayerCard />
          <PointsCard />

          {/* Mobile only: Streak & Badges */}
          <div className="lg:hidden grid grid-cols-2 gap-4">
            <StreakIndicator />
            <BadgesDisplay />
          </div>

          {/* Mobile only: Missions */}
          <div className="lg:hidden">
            <MissionsPanel />
          </div>
        </div>

        {/* Right Column - Secondary */}
        <div className="lg:col-span-5 space-y-6">
          {/* Desktop only: Streak & Badges */}
          <div className="hidden lg:grid grid-cols-2 gap-4">
            <StreakIndicator />
            <BadgesDisplay />
          </div>

          <MilestonesCard />

          {/* Desktop only: Missions */}
          <div className="hidden lg:block">
            <MissionsPanel />
          </div>

          <LeaderboardCard />
        </div>
      </div>
    </main>
  )
}

export default function Home() {
  return (
    <GameProvider>
      <AnimatedBackground />
      <div className="min-h-screen flex flex-col">
        <TopBar />
        <MainContent />
        <SimulateButton />
      </div>
      <Toaster />
    </GameProvider>
  )
}
