"use client"

import { useState } from "react"
import { useGame } from "@/lib/game-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import {
  Settings,
  Volume2,
  VolumeX,
  Sparkles,
  LogOut,
  Gamepad2,
} from "lucide-react"

export function TopBar() {
  const {
    user,
    isConnected,
    connectRiotId,
    disconnect,
    reducedMotion,
    soundEnabled,
    toggleReducedMotion,
    toggleSound,
  } = useGame()
  const [riotIdInput, setRiotIdInput] = useState("")
  const [showInput, setShowInput] = useState(false)

  const handleConnect = () => {
    if (riotIdInput.trim()) {
      connectRiotId(riotIdInput.trim())
      setRiotIdInput("")
      setShowInput(false)
    }
  }

  return (
    <header className="sticky top-0 z-50 glass-card border-b border-border/50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="relative">
            <Gamepad2 className="w-8 h-8 text-primary" />
            <div className="absolute inset-0 w-8 h-8 text-primary blur-md opacity-50" />
          </div>
          <span
            className="text-xl font-bold tracking-wider neon-text hidden sm:block"
            style={{ fontFamily: "var(--font-orbitron)" }}
          >
            LUH<span className="text-primary">BOX</span>
          </span>
        </div>

        {/* Connect Button / User Chip */}
        <div className="flex items-center gap-3">
          {!isConnected ? (
            showInput ? (
              <div className="flex items-center gap-2">
                <Input
                  value={riotIdInput}
                  onChange={(e) => setRiotIdInput(e.target.value)}
                  placeholder="Riot ID..."
                  className="w-40 sm:w-56 bg-input/50 border-border/50 focus:border-primary"
                  onKeyDown={(e) => e.key === "Enter" && handleConnect()}
                  autoFocus
                />
                <Button
                  onClick={handleConnect}
                  size="sm"
                  className="bg-primary hover:bg-primary/80 text-primary-foreground neon-glow transition-all duration-200 active:scale-95"
                >
                  Conectar
                </Button>
                <Button
                  onClick={() => setShowInput(false)}
                  size="sm"
                  variant="ghost"
                >
                  Cancelar
                </Button>
              </div>
            ) : (
              <Button
                onClick={() => setShowInput(true)}
                className="bg-primary hover:bg-primary/80 text-primary-foreground neon-glow transition-all duration-200 hover:scale-105 active:scale-95"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Conectar Riot ID
              </Button>
            )
          ) : (
            <div className="flex items-center gap-2 px-3 py-1.5 glass-card rounded-full">
              <Avatar className="w-8 h-8 ring-2 ring-primary/50">
                <AvatarImage
                  src={user?.avatarUrl || "/placeholder.svg"}
                  alt={user?.riotId}
                />
                <AvatarFallback className="bg-primary/20 text-primary text-xs">
                  {user?.riotId?.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <span className="font-medium text-sm">{user?.riotId}</span>
              <span className="text-xs text-muted-foreground">
                #{user?.region}
              </span>
            </div>
          )}

          {/* Settings Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-secondary/50"
              >
                <Settings className="w-5 h-5" />
                <span className="sr-only">Settings</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="glass-card border-border/50"
            >
              <DropdownMenuItem
                onClick={toggleReducedMotion}
                className="cursor-pointer"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Reduzir efeitos: {reducedMotion ? "On" : "Off"}
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={toggleSound}
                className="cursor-pointer"
              >
                {soundEnabled ? (
                  <Volume2 className="w-4 h-4 mr-2" />
                ) : (
                  <VolumeX className="w-4 h-4 mr-2" />
                )}
                Volume: {soundEnabled ? "On" : "Off"}
              </DropdownMenuItem>
              {isConnected && (
                <>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={disconnect}
                    className="cursor-pointer text-destructive"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Desconectar
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
