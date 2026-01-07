"use client"

import { useGame } from "@/lib/game-context"

export function AnimatedBackground() {
  const { reducedMotion } = useGame()

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-secondary" />

      {/* Animated gradient orbs */}
      {!reducedMotion && (
        <>
          <div
            className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-gradient"
            style={{
              background: "radial-gradient(circle, oklch(0.7 0.25 330 / 0.15), transparent 70%)",
              animation: "float 8s ease-in-out infinite",
            }}
          />
          <div
            className="absolute bottom-1/4 -right-32 w-96 h-96 bg-accent/20 rounded-full blur-3xl"
            style={{
              background: "radial-gradient(circle, oklch(0.6 0.22 300 / 0.15), transparent 70%)",
              animation: "float 10s ease-in-out infinite reverse",
            }}
          />
          <div
            className="absolute top-3/4 left-1/3 w-64 h-64 bg-neon-cyan/10 rounded-full blur-3xl"
            style={{
              background: "radial-gradient(circle, oklch(0.75 0.15 200 / 0.1), transparent 70%)",
              animation: "float 12s ease-in-out infinite",
            }}
          />
        </>
      )}

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(oklch(0.7 0.25 330 / 0.3) 1px, transparent 1px),
            linear-gradient(90deg, oklch(0.7 0.25 330 / 0.3) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }}
      />
    </div>
  )
}
