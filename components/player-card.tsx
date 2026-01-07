"use client"

import type React from "react"

import { useGame } from "@/lib/game-context"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { RefreshCw, Target, Percent, Swords } from "lucide-react"

export function PlayerCard() {
  const { user, stats, isLoading, syncMatches, reducedMotion } = useGame()

  return (
    <div className="glass-card rounded-2xl p-6 relative overflow-hidden group">
      {/* Background glow on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-3">
            <Avatar className="w-14 h-14 ring-2 ring-primary/50 ring-offset-2 ring-offset-background">
              <AvatarImage src={user?.avatarUrl || "/placeholder.svg"} alt={user?.riotId} />
              <AvatarFallback className="bg-primary/20 text-primary">
                {user?.riotId?.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-xl font-bold">{user?.riotId}</h2>
              <p className="text-sm text-muted-foreground">#{user?.region}</p>
            </div>
          </div>

          <Button
            onClick={syncMatches}
            disabled={isLoading}
            variant="outline"
            size="sm"
            className="border-border/50 hover:border-primary/50 hover:bg-primary/10 transition-all bg-transparent"
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? "animate-spin" : ""}`} />
            Sync
          </Button>
        </div>

        {/* Agent Hero Card */}
        <div className="relative rounded-xl overflow-hidden mb-6 bg-gradient-to-br from-secondary to-background border border-border/30">
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent z-10" />

          <img
            src={stats.agentImage || "/placeholder.svg"}
            alt={stats.mostPlayedAgent}
            className={`w-full h-64 object-cover ${!reducedMotion ? "group-hover:scale-105 transition-transform duration-700" : ""}`}
          />

          <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Most Played Agent</p>
            <h3 className="text-3xl font-bold neon-text" style={{ fontFamily: "var(--font-orbitron)" }}>
              {stats.mostPlayedAgent}
            </h3>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-4">
          <StatItem icon={Target} label="Matches" value={stats.matches.toString()} />
          <StatItem icon={Percent} label="Winrate" value={`${stats.winrate}%`} color="text-green-400" />
          <StatItem icon={Swords} label="KDA" value={stats.kda} />
        </div>
      </div>
    </div>
  )
}

function StatItem({
  icon: Icon,
  label,
  value,
  color = "text-foreground",
}: {
  icon: React.ElementType
  label: string
  value: string
  color?: string
}) {
  return (
    <div className="text-center p-3 rounded-lg bg-secondary/30 border border-border/20">
      <Icon className="w-4 h-4 mx-auto mb-1 text-muted-foreground" />
      <p className={`text-lg font-bold ${color}`}>{value}</p>
      <p className="text-xs text-muted-foreground">{label}</p>
    </div>
  )
}
