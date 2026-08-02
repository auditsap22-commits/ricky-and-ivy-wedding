"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { useState, useEffect } from "react"
import { Cinzel } from "next/font/google"

/** Blush pink motif — mirrors LoadingScreen & globals.css --color-motif-* */
const MOTIF = {
  cream: "#FFF8F8",
  lightBlush: "#F7DDE2",
  soft: "#FBECEF",
  accent: "#E8AEBE",
  deep: "#D98CA4",
  medium: "#F2C7D3",
  silver: "#EAD9DE",
} as const

const TEXT = "#5C4048"
const TEXT_DEEP = "#4A3540"
const ACCENT = MOTIF.deep
const NAME_COLOR = "#C97A94"

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "600"],
})

const bodyFont: React.CSSProperties = {
  fontFamily: "'SortsMillGoudy', Georgia, 'Times New Roman', serif",
}

const ct = {
  name: "text-xs sm:text-sm md:text-base",
  date: "text-[10px] sm:text-[11px] md:text-xs",
  message: "text-xs sm:text-sm md:text-base lg:text-lg",
  emptyTitle: "text-base sm:text-lg md:text-xl lg:text-2xl",
  emptyBody: "text-xs sm:text-sm md:text-base",
  badge: "text-[10px] sm:text-xs md:text-sm",
} as const

const messageCardStyle = {
  background: `linear-gradient(
    155deg,
    color-mix(in srgb, ${MOTIF.cream} 96%, white) 0%,
    color-mix(in srgb, ${MOTIF.soft} 92%, white) 42%,
    color-mix(in srgb, ${MOTIF.lightBlush} 88%, white) 78%,
    color-mix(in srgb, ${MOTIF.medium} 82%, white) 100%
  )`,
  borderColor: `color-mix(in srgb, ${MOTIF.silver} 72%, white)`,
  boxShadow: `0 20px 56px color-mix(in srgb, ${MOTIF.deep} 11%, transparent), inset 0 1px 0 rgba(255, 255, 255, 0.9)`,
} as const

interface Message {
  timestamp: string
  name: string
  message: string
}

interface MessageWallDisplayProps {
  messages: Message[]
  loading: boolean
}

export default function MessageWallDisplay({ messages, loading }: MessageWallDisplayProps) {
  const [visibleMessages, setVisibleMessages] = useState<Message[]>([])
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    if (messages.length > 0) {
      setIsAnimating(true)
      const timer = setTimeout(() => {
        setVisibleMessages(messages)
        setIsAnimating(false)
      }, 100)
      return () => clearTimeout(timer)
    } else {
      setVisibleMessages([])
    }
  }, [messages])

  if (loading) {
    return (
      <div className="space-y-3 sm:space-y-4 md:space-y-5">
        {[1, 2, 3].map((i) => (
          <Card
            key={i}
            className="rounded-2xl sm:rounded-3xl border"
            style={messageCardStyle}
          >
            <CardContent className="p-3 sm:p-4 md:p-5">
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center space-x-3">
                  <Skeleton
                    className="w-8 h-8 sm:w-9 sm:h-9 rounded-full"
                    style={{ backgroundColor: `color-mix(in srgb, ${MOTIF.silver} 55%, white)` }}
                  />
                  <div className="space-y-2">
                    <Skeleton
                      className="h-3 w-24 sm:w-32"
                      style={{ backgroundColor: `color-mix(in srgb, ${MOTIF.silver} 50%, white)` }}
                    />
                    <Skeleton
                      className="h-2.5 w-20"
                      style={{ backgroundColor: `color-mix(in srgb, ${MOTIF.silver} 40%, white)` }}
                    />
                  </div>
                </div>
              </div>
              <Skeleton
                className="h-14 sm:h-16 w-full rounded-lg"
                style={{ backgroundColor: `color-mix(in srgb, ${MOTIF.silver} 35%, white)` }}
              />
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (messages.length === 0) {
    return (
      <Card
        className="rounded-2xl sm:rounded-3xl border overflow-hidden"
        style={messageCardStyle}
      >
        <CardContent className="text-center py-8 sm:py-12 md:py-16 px-4">
          <h3
            className={`${cinzel.className} ${ct.emptyTitle} font-semibold mb-2 sm:mb-3`}
            style={{ color: NAME_COLOR }}
          >
            No messages yet
          </h3>
          <p
            className={`${ct.emptyBody} max-w-md mx-auto leading-relaxed mb-5 sm:mb-6`}
            style={{ ...bodyFont, color: TEXT }}
          >
            Be the first to leave a note for the happy couple.
          </p>
          <div className="flex justify-center">
            <span
              className={`${ct.badge} rounded-full border px-4 py-2`}
              style={{
                ...bodyFont,
                color: TEXT_DEEP,
                backgroundColor: `color-mix(in srgb, ${MOTIF.soft} 85%, white)`,
                borderColor: `color-mix(in srgb, ${MOTIF.silver} 72%, white)`,
              }}
            >
              Your message will appear here
            </span>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-3 sm:space-y-4 md:space-y-5">
      {visibleMessages.map((msg, index) => (
        <Card
          key={index}
          className={`relative overflow-hidden border transition-all duration-500 group transform rounded-2xl sm:rounded-3xl hover:scale-[1.01] ${
            isAnimating ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"
          }`}
          style={{
            ...messageCardStyle,
            transitionDelay: `${index * 100}ms`,
            animation: isAnimating ? "none" : "fadeInUp 0.6s ease-out forwards",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = `0 24px 64px color-mix(in srgb, ${MOTIF.deep} 14%, transparent), inset 0 1px 0 rgba(255, 255, 255, 0.9)`
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = messageCardStyle.boxShadow
          }}
        >
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
            style={{ background: `linear-gradient(to bottom right, color-mix(in srgb, ${MOTIF.accent} 8%, transparent), transparent)` }}
          />
          <div
            className="absolute top-0 left-0 w-full h-0.5 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
            style={{ backgroundColor: ACCENT }}
          />

          <CardContent className="relative p-3 sm:p-4 md:p-5">
            <div className="flex justify-between items-start mb-2 sm:mb-3">
              <div className="flex items-center space-x-2 sm:space-x-3 min-w-0 flex-1">
                <div
                  className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 shrink-0 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-md ring-2 ring-white"
                  style={{ backgroundColor: ACCENT }}
                >
                  <span className={`${cinzel.className} text-white text-[10px] sm:text-xs font-semibold`}>
                    {msg.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase()
                      .slice(0, 2)}
                  </span>
                </div>
                <div className="min-w-0 flex-1">
                  <h4
                    className={`${cinzel.className} ${ct.name} font-semibold truncate`}
                    style={{ color: NAME_COLOR }}
                  >
                    {msg.name}
                  </h4>
                  <span className={ct.date} style={{ color: ACCENT }}>
                    {new Date(msg.timestamp).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              </div>
            </div>

            <div className="relative pl-5 sm:pl-6 pr-2 sm:pr-4 py-1 sm:py-2">
              <span
                className="absolute left-0 top-0 text-2xl sm:text-3xl leading-none select-none"
                style={{ color: MOTIF.accent, opacity: 0.45, fontFamily: bodyFont.fontFamily }}
              >
                &ldquo;
              </span>
              <p
                className={`${ct.message} leading-relaxed italic relative z-10`}
                style={{ ...bodyFont, color: TEXT }}
              >
                {msg.message}
              </p>
            </div>
          </CardContent>
        </Card>
      ))}

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  )
}
