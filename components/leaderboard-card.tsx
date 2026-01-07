"use client"

import { useState } from "react"
import { useGame } from "@/lib/game-context"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { TrendingUp, TrendingDown, Minus, Search, Crown } from "lucide-react"

export function LeaderboardCard() {
  const { leaderboard } = useGame()
  const [activeTab, setActiveTab] = useState<"global" | "amigos">("global")
  const [search, setSearch] = useState("")

  const top3 = leaderboard.slice(0, 3)
  const rest = leaderboard
    .slice(3)
    .filter((entry) =>
      entry.riotId.toLowerCase().includes(search.toLowerCase())
    )
  const currentUser = leaderboard.find((e) => e.isCurrentUser)

  return (
    <div className="glass-card rounded-2xl p-6">
      <h3 className="font-semibold text-lg mb-4">Placar</h3>

      {/* Tabs */}
      <div className="flex gap-2 mb-4">
        {(["global", "amigos"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`
              px-4 py-2 rounded-lg text-sm font-medium transition-all
              ${
                activeTab === tab
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary/30 text-muted-foreground hover:text-foreground"
              }
            `}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {activeTab === "global" ? (
        <>
          {/* Podium */}
          <div className="flex items-end justify-center gap-2 mb-6 h-36">
            {/* 2nd Place */}
            <PodiumEntry entry={top3[1]} position={2} />
            {/* 1st Place */}
            <PodiumEntry entry={top3[0]} position={1} />
            {/* 3rd Place */}
            <PodiumEntry entry={top3[2]} position={3} />
          </div>

          {/* Search */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Procurar jogadores..."
              className="pl-9 bg-input/50 border-border/50"
            />
          </div>

          {/* List */}
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {rest.map((entry) => (
              <LeaderboardRow key={entry.rank} entry={entry} />
            ))}
          </div>

          {/* Current User Pinned */}
          {currentUser && currentUser.rank > 3 && (
            <div className="mt-4 pt-4 border-t border-border/30">
              <p className="text-xs text-muted-foreground mb-2">Sua posição</p>
              <LeaderboardRow entry={currentUser} highlighted />
            </div>
          )}
        </>
      ) : (
        <div className="flex flex-col items-center justify-center h-48 text-center">
          <p className="text-muted-foreground mb-2">Nenhum amigo adicionado</p>
          <p className="text-xs text-muted-foreground">
            Conecte-se com amigos para competir!
          </p>
        </div>
      )}
    </div>
  )
}

function PodiumEntry({
  entry,
  position,
}: {
  entry?: { riotId: string; points: number; avatarUrl: string }
  position: 1 | 2 | 3
}) {
  if (!entry) return null

  const heights = { 1: "h-28", 2: "h-20", 3: "h-16" }
  const colors = {
    1: "from-yellow-500/30 to-yellow-500/10 border-yellow-500/50",
    2: "from-slate-400/30 to-slate-400/10 border-slate-400/50",
    3: "from-amber-700/30 to-amber-700/10 border-amber-700/50",
  }
  const glows = {
    1: "0 0 20px oklch(0.8 0.15 85 / 0.4)",
    2: "0 0 15px oklch(0.7 0.02 250 / 0.3)",
    3: "0 0 15px oklch(0.6 0.1 50 / 0.3)",
  }

  return (
    <div className="flex flex-col items-center">
      <div className="relative mb-2">
        <Avatar
          className={`
            ${position === 1 ? "w-14 h-14" : "w-10 h-10"} 
            ring-2 ring-offset-2 ring-offset-background
            ${
              position === 1
                ? "ring-yellow-500"
                : position === 2
                ? "ring-slate-400"
                : "ring-amber-700"
            }
          `}
          style={{ boxShadow: glows[position] }}
        >
          <AvatarImage src={entry.avatarUrl || "/placeholder.svg"} />
          <AvatarFallback className="bg-secondary">
            {entry.riotId.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        {position === 1 && (
          <Crown className="absolute -top-3 left-1/2 -translate-x-1/2 w-5 h-5 text-yellow-500" />
        )}
      </div>
      <div
        className={`
          ${heights[position]} w-20 rounded-t-lg bg-gradient-to-t border-t border-x
          ${colors[position]}
          flex flex-col items-center justify-start pt-2
        `}
      >
        <span className="text-xs font-medium truncate w-full text-center px-1">
          {entry.riotId}
        </span>
        <span className="text-xs text-muted-foreground">
          {entry.points.toLocaleString()}
        </span>
      </div>
    </div>
  )
}

function LeaderboardRow({
  entry,
  highlighted = false,
}: {
  entry: {
    rank: number
    riotId: string
    points: number
    avatarUrl: string
    change: "up" | "down" | "same"
    isCurrentUser?: boolean
  }
  highlighted?: boolean
}) {
  return (
    <div
      className={`
        flex items-center gap-3 p-2 rounded-lg transition-all
        ${
          highlighted || entry.isCurrentUser
            ? "bg-primary/10 border border-primary/30"
            : "hover:bg-secondary/30"
        }
      `}
    >
      <span className="w-6 text-center text-sm font-medium text-muted-foreground">
        {entry.rank}
      </span>
      <Avatar className="w-8 h-8">
        <AvatarImage src={entry.avatarUrl || "/placeholder.svg"} />
        <AvatarFallback className="bg-secondary text-xs">
          {entry.riotId.slice(0, 2).toUpperCase()}
        </AvatarFallback>
      </Avatar>
      <div className="flex-1 min-w-0">
        <p className="font-medium text-sm truncate">{entry.riotId}</p>
      </div>
      <span className="text-sm text-muted-foreground">
        {entry.points.toLocaleString()}
      </span>
      <div className="w-4">
        {entry.change === "up" && (
          <TrendingUp className="w-4 h-4 text-green-400" />
        )}
        {entry.change === "down" && (
          <TrendingDown className="w-4 h-4 text-red-400" />
        )}
        {entry.change === "same" && (
          <Minus className="w-4 h-4 text-muted-foreground" />
        )}
      </div>
    </div>
  )
}
