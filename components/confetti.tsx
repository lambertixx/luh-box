"use client"

import { useEffect, useState } from "react"

export function Confetti() {
  const [particles, setParticles] = useState<
    Array<{
      id: number
      x: number
      color: string
      delay: number
      size: number
    }>
  >([])

  useEffect(() => {
    const colors = ["oklch(0.7 0.25 330)", "oklch(0.6 0.22 300)", "oklch(0.75 0.15 200)", "oklch(0.8 0.2 60)"]

    const newParticles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      color: colors[Math.floor(Math.random() * colors.length)],
      delay: Math.random() * 0.5,
      size: Math.random() * 8 + 4,
    }))

    setParticles(newParticles)
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-50">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute"
          style={{
            left: `${particle.x}%`,
            top: "-20px",
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: particle.color,
            borderRadius: Math.random() > 0.5 ? "50%" : "2px",
            animation: `confetti-fall 2s ease-out ${particle.delay}s forwards`,
          }}
        />
      ))}
    </div>
  )
}
