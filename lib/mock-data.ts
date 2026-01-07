// Mock data service layer - swap this with real Riot API integration later
// All data fetching is isolated here for easy replacement

export interface User {
  riotId: string
  avatarUrl: string
  region: string
}

export interface Stats {
  mostPlayedAgent: string
  agentImage: string
  matches: number
  winrate: number
  kda: string
}

export interface Points {
  total: number
  lastUpdated: string
  streakDays: number
}

export interface Milestone {
  id: number
  pointsRequired: number
  rewardName: string
  rewardIcon: string
  status: "locked" | "next" | "unlocked"
}

export interface LeaderboardEntry {
  rank: number
  riotId: string
  points: number
  avatarUrl: string
  change: "up" | "down" | "same"
  isCurrentUser?: boolean
}

export interface Mission {
  id: number
  title: string
  progress: number
  total: number
  pointsReward: number
}

export interface Badge {
  id: string
  name: string
  icon: string
  earned: boolean
}

// Mock user data
export const mockUser: User = {
  riotId: "PhoenixRising",
  avatarUrl: "/gamer-avatar-cyberpunk.jpg",
  region: "NA1",
}

export const mockStats: Stats = {
  mostPlayedAgent: "Jett",
  agentImage: "/jett-valorant-agent-silhouette-blue-wind.jpg",
  matches: 247,
  winrate: 58.3,
  kda: "1.42",
}

export const mockPoints: Points = {
  total: 2450,
  lastUpdated: "2 horas atrás",
  streakDays: 4,
}

export const mockMilestones: Milestone[] = [
  {
    id: 1,
    pointsRequired: 500,
    rewardName: "Insígnia Inicial",
    rewardIcon: "🏅",
    status: "unlocked",
  },
  {
    id: 2,
    pointsRequired: 1000,
    rewardName: "Arma de Bronze",
    rewardIcon: "🔫",
    status: "unlocked",
  },
  {
    id: 3,
    pointsRequired: 2000,
    rewardName: "Spray de Prata",
    rewardIcon: "🎨",
    status: "unlocked",
  },
  {
    id: 4,
    pointsRequired: 3000,
    rewardName: "Título de Ouro",
    rewardIcon: "👑",
    status: "next",
  },
  {
    id: 5,
    pointsRequired: 5000,
    rewardName: "Cartão de Platina",
    rewardIcon: "💎",
    status: "locked",
  },
  {
    id: 6,
    pointsRequired: 7500,
    rewardName: "Skin de Diamante",
    rewardIcon: "⚔️",
    status: "locked",
  },
  {
    id: 7,
    pointsRequired: 10000,
    rewardName: "Pacote Radiante",
    rewardIcon: "✨",
    status: "locked",
  },
]

export const mockLeaderboard: LeaderboardEntry[] = [
  {
    rank: 1,
    riotId: "TenZ_Fan",
    points: 12500,
    avatarUrl: "/esports-player-avatar-1.jpg",
    change: "same",
  },
  {
    rank: 2,
    riotId: "RadiantQueen",
    points: 11200,
    avatarUrl: "/gamer-girl-avatar.jpg",
    change: "up",
  },
  {
    rank: 3,
    riotId: "AceKiller99",
    points: 9800,
    avatarUrl: "/skull-gaming-avatar.jpg",
    change: "down",
  },
  {
    rank: 4,
    riotId: "JettMain420",
    points: 8500,
    avatarUrl: "/wind-gaming-avatar.jpg",
    change: "up",
  },
  {
    rank: 5,
    riotId: "SageHealer",
    points: 7200,
    avatarUrl: "/healer-gaming-avatar.jpg",
    change: "same",
  },
  {
    rank: 42,
    riotId: "PhoenixRising",
    points: 2450,
    avatarUrl: "/gamer-avatar-cyberpunk.jpg",
    change: "up",
    isCurrentUser: true,
  },
]

export const mockMissions: Mission[] = [
  { id: 1, title: "Ganhe 1 partida", progress: 0, total: 1, pointsReward: 50 },
  { id: 2, title: "Faça 10 abates", progress: 7, total: 10, pointsReward: 30 },
  { id: 3, title: "Jogue 2 jogos", progress: 1, total: 2, pointsReward: 25 },
]

export const mockBadges: Badge[] = [
  { id: "clutch", name: "Decisivo", icon: "🎯", earned: true },
  { id: "grinder", name: "Persistente", icon: "⚡", earned: true },
  { id: "mvp", name: "MVP", icon: "🏆", earned: false },
  { id: "streak", name: "Mestre da Streak", icon: "🔥", earned: true },
]

// Simulate adding points from a match
export function simulateMatchCompleted(currentPoints: number): {
  pointsGained: number
  missionUpdates: Mission[]
  newTotal: number
} {
  const pointsGained = Math.floor(Math.random() * 16) + 5 // 5-20 points
  const newTotal = currentPoints + pointsGained

  // Randomly update mission progress
  const missionUpdates = mockMissions.map((mission) => ({
    ...mission,
    progress: Math.min(
      mission.progress + Math.floor(Math.random() * 2),
      mission.total
    ),
  }))

  return { pointsGained, missionUpdates, newTotal }
}

// Get milestone status based on points
export function getMilestoneStatus(
  milestone: Milestone,
  currentPoints: number
): "locked" | "next" | "unlocked" {
  if (currentPoints >= milestone.pointsRequired) return "unlocked"

  const nextMilestone = mockMilestones.find(
    (m) => currentPoints < m.pointsRequired
  )
  if (nextMilestone && nextMilestone.id === milestone.id) return "next"

  return "locked"
}
