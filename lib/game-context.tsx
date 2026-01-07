"use client"

import { createContext, useContext, useState, useCallback, type ReactNode } from "react"
import {
  mockUser,
  mockStats,
  mockPoints,
  mockMilestones,
  mockLeaderboard,
  mockMissions,
  mockBadges,
  simulateMatchCompleted,
  getMilestoneStatus,
  type User,
  type Stats,
  type Points,
  type Milestone,
  type LeaderboardEntry,
  type Mission,
  type Badge,
} from "./mock-data"

interface GameState {
  user: User | null
  stats: Stats
  points: Points
  milestones: Milestone[]
  leaderboard: LeaderboardEntry[]
  missions: Mission[]
  badges: Badge[]
  isConnected: boolean
  isLoading: boolean
  reducedMotion: boolean
  soundEnabled: boolean
}

interface GameContextType extends GameState {
  connectRiotId: (riotId: string) => void
  disconnect: () => void
  simulateMatch: () => { pointsGained: number; milestoneUnlocked: Milestone | null }
  syncMatches: () => Promise<void>
  toggleReducedMotion: () => void
  toggleSound: () => void
  addPoints: (amount: number) => { milestoneUnlocked: Milestone | null }
}

const GameContext = createContext<GameContextType | null>(null)

export function GameProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<GameState>({
    user: null,
    stats: mockStats,
    points: mockPoints,
    milestones: mockMilestones,
    leaderboard: mockLeaderboard,
    missions: mockMissions,
    badges: mockBadges,
    isConnected: false,
    isLoading: false,
    reducedMotion: false,
    soundEnabled: true,
  })

  const connectRiotId = useCallback((riotId: string) => {
    setState((prev) => ({
      ...prev,
      user: { ...mockUser, riotId },
      isConnected: true,
    }))
  }, [])

  const disconnect = useCallback(() => {
    setState((prev) => ({
      ...prev,
      user: null,
      isConnected: false,
    }))
  }, [])

  const addPoints = useCallback((amount: number) => {
    let milestoneUnlocked: Milestone | null = null

    setState((prev) => {
      const newTotal = prev.points.total + amount

      // Check for milestone unlock
      const newMilestones = prev.milestones.map((m) => {
        const newStatus = getMilestoneStatus(m, newTotal)
        if (m.status === "next" && newStatus === "unlocked") {
          milestoneUnlocked = { ...m, status: "unlocked" }
        }
        return { ...m, status: newStatus }
      })

      // Update leaderboard position
      const newLeaderboard = prev.leaderboard.map((entry) =>
        entry.isCurrentUser ? { ...entry, points: newTotal } : entry,
      )

      return {
        ...prev,
        points: { ...prev.points, total: newTotal, lastUpdated: "Just now" },
        milestones: newMilestones,
        leaderboard: newLeaderboard,
      }
    })

    return { milestoneUnlocked }
  }, [])

  const simulateMatch = useCallback(() => {
    const { pointsGained, missionUpdates, newTotal } = simulateMatchCompleted(state.points.total)

    let milestoneUnlocked: Milestone | null = null

    setState((prev) => {
      // Check for milestone unlock
      const newMilestones = prev.milestones.map((m) => {
        const newStatus = getMilestoneStatus(m, newTotal)
        if (m.status === "next" && newStatus === "unlocked") {
          milestoneUnlocked = { ...m, status: "unlocked" }
        }
        return { ...m, status: newStatus }
      })

      // Update leaderboard position
      const newLeaderboard = prev.leaderboard.map((entry) =>
        entry.isCurrentUser ? { ...entry, points: newTotal } : entry,
      )

      return {
        ...prev,
        points: { ...prev.points, total: newTotal, lastUpdated: "Just now" },
        missions: missionUpdates,
        milestones: newMilestones,
        leaderboard: newLeaderboard,
      }
    })

    return { pointsGained, milestoneUnlocked }
  }, [state.points.total])

  const syncMatches = useCallback(async () => {
    setState((prev) => ({ ...prev, isLoading: true }))
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setState((prev) => ({ ...prev, isLoading: false }))
  }, [])

  const toggleReducedMotion = useCallback(() => {
    setState((prev) => ({ ...prev, reducedMotion: !prev.reducedMotion }))
  }, [])

  const toggleSound = useCallback(() => {
    setState((prev) => ({ ...prev, soundEnabled: !prev.soundEnabled }))
  }, [])

  return (
    <GameContext.Provider
      value={{
        ...state,
        connectRiotId,
        disconnect,
        simulateMatch,
        syncMatches,
        toggleReducedMotion,
        toggleSound,
        addPoints,
      }}
    >
      {children}
    </GameContext.Provider>
  )
}

export function useGame() {
  const context = useContext(GameContext)
  if (!context) {
    throw new Error("useGame must be used within a GameProvider")
  }
  return context
}
