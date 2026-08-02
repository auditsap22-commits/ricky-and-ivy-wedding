"use client"

import React, { useEffect, useMemo, useState, type CSSProperties } from "react"
import { siteConfig as defaultSiteConfig } from "@/content/site"
import { useSiteConfig } from "@/hooks/use-site-config"
import { parseWeddingDate } from "@/lib/wedding-date"

interface LoadingScreenProps {
  onComplete: () => void
}

/** Blush pink motif — mirrors globals.css --color-motif-* */
const MOTIF = {
  cream: "#FFF8F8",
  lightBlush: "#F7DDE2",
  soft: "#FBECEF",
  accent: "#E8AEBE",
  deep: "#D98CA4",
  medium: "#F2C7D3",
  silver: "#EAD9DE",
} as const
const MOTIF_COLORS = Object.values(MOTIF)

const TEXT = "#5C4048"
const TEXT_DEEP = "#4A3540"
const ACCENT = MOTIF.deep
const NAME_COLOR = "#C97A94"
const TOTAL_DURATION_MS = 15000

const PRELOAD_IMAGES = [
  "/decoration/oceanpastelbackground.png",
  "/decoration/top-left-corner-deco.png",
  "/decoration/bottom-right-corner-deco.png",
] as const

const BACKGROUND_IMAGE = "/Details/background.png"
const CORNER_DECO_CLASS =
  "block h-auto w-auto max-w-[104px] sm:max-w-[180px] md:max-w-[240px] lg:max-w-[280px]"

const BLANK_HOLD_MS = 800
const CONTENT_DELAY_MS = 1700

const displayScript: CSSProperties = {
  fontFamily: "'Brightwall', cursive",
  fontWeight: 400,
}
const bodySerif: CSSProperties = {
  fontFamily: "'SortsMillGoudy', Georgia, 'Times New Roman', serif",
  fontStyle: "normal",
}
const labelSerif: CSSProperties = {
  fontFamily: "var(--font-cinzel, 'Cinzel'), 'Times New Roman', serif",
  fontStyle: "normal",
  fontWeight: 500,
}

const NAME_SHADOW =
  "0 2px 4px rgba(255, 255, 255, 0.92), 0 0 20px rgba(232, 174, 190, 0.45)"

interface AmbientOrb {
  id: number
  x: number
  y: number
  size: number
  color: string
  opacity: number
  duration: number
  delay: number
  driftX: number
  driftY: number
}

interface SparkParticle {
  id: number
  x: number
  y: number
  size: number
  color: string
  opacity: number
  duration: number
  delay: number
  driftX: number
  driftY: number
  twinkleDuration: number
}

function createAmbientOrbs(count: number): AmbientOrb[] {
  return Array.from({ length: count }, (_, id) => ({
    id,
    x: 4 + Math.random() * 92,
    y: 6 + Math.random() * 88,
    size: 60 + Math.random() * 100,
    color: MOTIF_COLORS[Math.floor(Math.random() * MOTIF_COLORS.length)],
    opacity: 0.06 + Math.random() * 0.09,
    duration: 16 + Math.random() * 14,
    delay: Math.random() * 6,
    driftX: -14 + Math.random() * 28,
    driftY: -12 + Math.random() * 24,
  }))
}

function createSparkParticles(count: number): SparkParticle[] {
  return Array.from({ length: count }, (_, id) => ({
    id,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: 1.5 + Math.random() * 3,
    color: MOTIF_COLORS[Math.floor(Math.random() * MOTIF_COLORS.length)],
    opacity: 0.18 + Math.random() * 0.22,
    duration: 12 + Math.random() * 16,
    delay: Math.random() * 10,
    driftX: -10 + Math.random() * 20,
    driftY: -12 + Math.random() * 24,
    twinkleDuration: 3 + Math.random() * 4,
  }))
}

function DottedRule({ compact = false }: { compact?: boolean }) {
  return (
    <div
      className={
        compact
          ? "w-[3.25rem] border-t border-dotted md:w-[4rem]"
          : "flex-1 border-t border-dotted"
      }
      style={{ borderColor: MOTIF.silver }}
    />
  )
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const siteConfig = useSiteConfig()
  const [loadPercent, setLoadPercent] = useState(0)
  const [decorVisible, setDecorVisible] = useState(false)
  const [contentVisible, setContentVisible] = useState(false)

  useEffect(() => {
    PRELOAD_IMAGES.forEach((src) => {
      const img = new Image()
      img.src = src
    })
  }, [])

  useEffect(() => {
    const decorTimer = setTimeout(() => setDecorVisible(true), BLANK_HOLD_MS)
    const showTimer = setTimeout(() => setContentVisible(true), CONTENT_DELAY_MS)
    return () => {
      clearTimeout(decorTimer)
      clearTimeout(showTimer)
    }
  }, [])

  useEffect(() => {
    const startedAt = performance.now()
    let frameId = 0
    let completed = false

    const finish = () => {
      if (completed) return
      completed = true
      onComplete()
    }

    const hardCapTimer = setTimeout(finish, TOTAL_DURATION_MS)

    const tick = (now: number) => {
      const elapsed = now - startedAt
      const next = Math.min(100, Math.round((elapsed / TOTAL_DURATION_MS) * 100))
      setLoadPercent(next)
      if (next < 100) frameId = requestAnimationFrame(tick)
    }
    frameId = requestAnimationFrame(tick)

    return () => {
      clearTimeout(hardCapTimer)
      cancelAnimationFrame(frameId)
    }
  }, [onComplete])

  const fade = (delay: number): CSSProperties => ({
    transition: `opacity 0.85s ease ${delay}ms, transform 0.85s ease ${delay}ms`,
    opacity: contentVisible ? 1 : 0,
    transform: contentVisible ? "translateY(0)" : "translateY(16px)",
  })

  const groomNickname = siteConfig.couple.groomNickname || siteConfig.couple.groom
  const brideNickname = siteConfig.couple.brideNickname || siteConfig.couple.bride

  const ceremonyDate =
    siteConfig.ceremony.date ?? siteConfig.wedding.date ?? defaultSiteConfig.ceremony.date
  const parsedDate = useMemo(
    () =>
      parseWeddingDate(ceremonyDate, parseWeddingDate(defaultSiteConfig.ceremony.date)),
    [ceremonyDate],
  )
  const ceremonyDay = (
    siteConfig.ceremony.day ?? parsedDate.dayOfWeek ?? defaultSiteConfig.ceremony.day
  ).toUpperCase()
  const ceremonyTime =
    siteConfig.ceremony.time ??
    siteConfig.wedding.time ??
    defaultSiteConfig.ceremony.time
  const { month, day: dateNum, year } = parsedDate
  const ambientOrbs = useMemo(() => createAmbientOrbs(5), [])
  const sparkParticles = useMemo(() => createSparkParticles(16), [])

  return (
    <div className="fixed inset-0 z-30 isolate flex min-h-screen items-center justify-center overflow-hidden">
      {/* Background image with blush wash */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('${BACKGROUND_IMAGE}')` }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,rgba(255,248,248,0.58)_0%,rgba(251,236,239,0.32)_48%,rgba(232,174,190,0.14)_100%)]"
        aria-hidden
      />

      {/* Soft ambient particles */}
      <div className="particle-field particle-field-visible pointer-events-none absolute inset-0 z-[1]" aria-hidden>
        <div className="particle-gradient" />
        {ambientOrbs.map((orb) => (
          <span
            key={`orb-${orb.id}`}
            className="particle-orb"
            style={{
              left: `${orb.x}%`,
              top: `${orb.y}%`,
              width: orb.size,
              height: orb.size,
              backgroundColor: orb.color,
              opacity: orb.opacity,
              animationDuration: `${orb.duration}s`,
              animationDelay: `${orb.delay}s`,
              ["--drift-x" as string]: `${orb.driftX}px`,
              ["--drift-y" as string]: `${orb.driftY}px`,
            }}
          />
        ))}
        {sparkParticles.map((particle) => (
          <span
            key={`spark-${particle.id}`}
            className="particle-spark"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: particle.size,
              height: particle.size,
              backgroundColor: particle.color,
              color: particle.color,
              opacity: particle.opacity,
              animationDuration: `${particle.duration}s, ${particle.twinkleDuration}s`,
              animationDelay: `${particle.delay}s, ${particle.delay * 0.4}s`,
              ["--drift-x" as string]: `${particle.driftX}px`,
              ["--drift-y" as string]: `${particle.driftY}px`,
            }}
          />
        ))}
      </div>

      {/* Corner decorations */}
      <div
        className={`decor-corner decor-top-left pointer-events-none absolute left-0 top-0 z-[2]${decorVisible ? " decor-visible" : ""}`}
        style={decorVisible ? undefined : { opacity: 0, visibility: "hidden" }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        {/* <img src="/decoration/top-left-corner-deco.png" alt="" className={CORNER_DECO_CLASS} /> */}
      </div>

      <div
        className={`decor-corner decor-bottom-right pointer-events-none absolute bottom-0 right-0 z-[2]${decorVisible ? " decor-visible" : ""}`}
        style={decorVisible ? undefined : { opacity: 0, visibility: "hidden" }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        {/* <img src="/decoration/bottom-right-corner-deco.png" alt="" className={CORNER_DECO_CLASS} /> */}
      </div>

      <div className="relative z-10 mx-auto flex h-[100dvh] max-h-[100dvh] w-full max-w-[340px] flex-col items-center justify-center px-2.5 pt-[calc(0.25rem+env(safe-area-inset-top,0px))] pb-[calc(0.25rem+env(safe-area-inset-bottom,0px))] max-[375px]:max-w-[320px] sm:max-w-[580px] sm:px-6 sm:pb-10 sm:pt-[calc(3rem+env(safe-area-inset-top,0px))] md:px-8 md:pt-[calc(3.25rem+env(safe-area-inset-top,0px))]">
        <div
          className="flex h-auto w-full shrink-0 flex-col px-4 py-3 [@media(max-height:667px)]:px-3.5 [@media(max-height:667px)]:py-2.5 [@media(max-height:700px)]:h-full [@media(max-height:700px)]:min-h-0 sm:h-auto sm:max-h-none sm:px-8 sm:py-5 md:px-10 md:py-6"
          style={{
            background: "color-mix(in srgb, var(--color-motif-cream) 90%, white)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            borderRadius: "1.125rem",
            border: "1px solid color-mix(in srgb, var(--color-motif-silver) 65%, transparent)",
            boxShadow:
              "0 4px 24px color-mix(in srgb, var(--color-motif-deep) 10%, transparent), inset 0 1px 0 rgba(255, 255, 255, 0.88)",
            visibility: contentVisible ? "visible" : "hidden",
          }}
        >
          <div
            className="mx-auto flex h-auto w-full max-w-[288px] shrink-0 flex-col items-center gap-y-3 text-center [@media(max-height:667px)]:max-w-[272px] [@media(max-height:667px)]:gap-y-2 [@media(max-height:700px)]:h-full [@media(max-height:700px)]:min-h-0 [@media(max-height:700px)]:justify-evenly [@media(max-height:700px)]:gap-y-0 sm:h-auto sm:max-w-[440px] sm:justify-start sm:gap-y-0 md:max-w-[480px]"
            style={{
              color: TEXT,
              WebkitFontSmoothing: "antialiased",
            }}
          >
            {/* SAVE THE DATE — arch */}
            <div style={{ ...fade(0) }} className="w-full pt-0.5 sm:mb-0 sm:mt-8 md:mt-10">
              <div>
                <svg
                  viewBox="0 0 300 100"
                  className="mx-auto h-[52px] w-full [@media(max-height:667px)]:h-[48px] md:hidden"
                  aria-hidden
                  overflow="visible"
                >
                  <defs>
                    <path id="loadingArcMob" d="M 6 80 A 178 178 0 0 1 294 80" fill="none" />
                  </defs>
                  <text fill={ACCENT} style={{ ...labelSerif, fontSize: "21px", letterSpacing: "0.22em" }}>
                    <textPath href="#loadingArcMob" startOffset="50%" textAnchor="middle">
                      SAVE THE DATE
                    </textPath>
                  </text>
                </svg>

                <svg
                  viewBox="0 0 480 130"
                  className="mx-auto hidden h-[90px] w-full md:block"
                  aria-hidden
                  overflow="visible"
                >
                  <defs>
                    <path id="loadingArcDsk" d="M 10 104 A 280 280 0 0 1 470 104" fill="none" />
                  </defs>
                  <text fill={ACCENT} style={{ ...labelSerif, fontSize: "34px", letterSpacing: "0.24em" }}>
                    <textPath href="#loadingArcDsk" startOffset="50%" textAnchor="middle">
                      SAVE THE DATE
                    </textPath>
                  </text>
                </svg>
              </div>
            </div>

            {/* Invitation copy */}
            <div style={{ ...fade(100) }} className="flex w-full flex-col items-center gap-1.5 sm:mt-4 md:gap-2">
              <div className="flex w-full max-w-[260px] items-center justify-center gap-1.5 md:max-w-[320px] md:gap-2">
                <DottedRule compact />
                <p
                  className="shrink-0 text-[10px] tracking-[0.14em] uppercase [@media(max-height:667px)]:text-[9px] md:text-[12px] md:tracking-[0.18em]"
                  style={{ ...labelSerif, color: TEXT_DEEP, opacity: 0.92 }}
                >
                  With joy in our hearts
                </p>
                <DottedRule compact />
              </div>
              <p
                className="max-w-[260px] text-[13px] leading-[1.5] [@media(max-height:667px)]:text-[12px] [@media(max-height:667px)]:leading-[1.45] md:max-w-none md:text-[15px] md:leading-[1.6]"
                style={{ ...bodySerif, color: TEXT, fontStyle: "italic" }}
              >
                we invite you to witness
                <br className="md:hidden" />
                {" "}the wedding of
              </p>
            </div>

            {/* Couple names */}
            <div style={{ ...fade(220) }} className="flex w-full flex-col items-center gap-2 sm:mt-7 md:mt-8 md:gap-4">
              <h1
                className="w-full leading-[1] sm:mt-0"
                style={{
                  ...displayScript,
                  fontSize: "clamp(44px, 12vw, 80px)",
                  color: NAME_COLOR,
                  fontWeight: 400,
                  letterSpacing: "0.01em",
                  textShadow: NAME_SHADOW,
                }}
              >
                {groomNickname}
              </h1>

              <div className="flex w-full max-w-[200px] items-center justify-center gap-1.5 md:max-w-[280px] md:gap-3">
                <DottedRule compact />
                <span
                  className="shrink-0 text-[13px] italic md:text-[16px]"
                  style={{ ...bodySerif, color: TEXT, fontStyle: "italic" }}
                >
                  and
                </span>
                <DottedRule compact />
              </div>

              <h1
                className="w-full leading-[1]"
                style={{
                  ...displayScript,
                  fontSize: "clamp(44px, 12vw, 80px)",
                  color: NAME_COLOR,
                  fontWeight: 400,
                  letterSpacing: "0.01em",
                  textShadow: NAME_SHADOW,
                }}
              >
                {brideNickname}
              </h1>
            </div>

            {/* Together with their families */}
            <div style={{ ...fade(520) }} className="w-full sm:mt-6">
              <p
                className="w-full text-[12px] leading-[1.55] [@media(max-height:667px)]:text-[11px] [@media(max-height:667px)]:leading-[1.5] md:text-[15px] md:leading-[1.75]"
                style={{ ...bodySerif, color: TEXT }}
              >
                Together with their families
                <br />
                invite you to their wedding celebration
              </p>
            </div>

            {/* Date block */}
            <div style={{ ...fade(620) }} className="w-full sm:mt-5">
              <div
                className="mx-auto grid w-full max-w-[240px] gap-y-0 [@media(max-height:667px)]:max-w-[228px] md:max-w-[340px]"
                style={{
                  gridTemplateColumns: "1fr auto 1fr",
                  gridTemplateRows: "auto auto auto",
                }}
              >
                <div
                  className="col-start-2 row-start-1 border-x border-t border-dotted px-1.5 pb-0 pt-0.5 text-center md:px-2"
                  style={{ borderColor: MOTIF.silver }}
                >
                  <span
                    className="text-[10px] tracking-[0.14em] uppercase [@media(max-height:667px)]:text-[9px] md:text-[12px] md:tracking-[0.18em]"
                    style={{ ...labelSerif, color: TEXT_DEEP }}
                  >
                    {month}
                  </span>
                </div>

                <div className="col-start-1 row-start-2 flex flex-col justify-center gap-[2px] px-0.5 md:px-1">
                  <div className="border-t border-dotted" style={{ borderColor: MOTIF.silver }} />
                  <span
                    className="text-center text-[10px] tracking-[0.12em] uppercase [@media(max-height:667px)]:text-[9px] md:text-[12px]"
                    style={{ ...labelSerif, color: TEXT_DEEP }}
                  >
                    {ceremonyDay}
                  </span>
                  <div className="border-t border-dotted" style={{ borderColor: MOTIF.silver }} />
                </div>

                <div
                  className="col-start-2 row-start-2 flex items-center justify-center border-x border-dotted px-1 pb-0 pt-0 md:px-1.5"
                  style={{ borderColor: MOTIF.silver }}
                >
                  <span
                    className="leading-[0.85]"
                    style={{
                      ...labelSerif,
                      fontSize: "clamp(44px, 12vw, 68px)",
                      color: ACCENT,
                      fontWeight: 600,
                    }}
                  >
                    {dateNum}
                  </span>
                </div>

                <div className="col-start-3 row-start-2 flex flex-col justify-center gap-[2px] px-0.5 md:px-1">
                  <div className="border-t border-dotted" style={{ borderColor: MOTIF.silver }} />
                  <span
                    className="whitespace-nowrap text-center text-[10px] tracking-[0.1em] uppercase [@media(max-height:667px)]:text-[9px] md:text-[12px]"
                    style={{ ...labelSerif, color: TEXT_DEEP }}
                  >
                    At {ceremonyTime}
                  </span>
                  <div className="border-t border-dotted" style={{ borderColor: MOTIF.silver }} />
                </div>

                <div
                  className="col-start-2 row-start-3 border-x border-b border-dotted px-1.5 pb-0.5 pt-0 text-center md:px-2"
                  style={{ borderColor: MOTIF.silver }}
                >
                  <span
                    className="text-[14px] leading-none tracking-[0.08em] [@media(max-height:667px)]:text-[13px] md:text-[18px] md:tracking-[0.1em]"
                    style={{ ...labelSerif, color: TEXT_DEEP, fontWeight: 600 }}
                  >
                    {year}
                  </span>
                </div>
              </div>
            </div>

            {/* at / venue */}
            <div style={{ ...fade(720) }} className="flex w-full flex-col items-center sm:mt-5">
              <div className="flex items-center justify-center gap-1.5 md:gap-2">
                <DottedRule compact />
                <span
                  className="text-[13px] italic md:text-[15px]"
                  style={{ ...bodySerif, color: TEXT, fontStyle: "italic" }}
                >
                  at
                </span>
                <DottedRule compact />
              </div>
              <p
                className="mt-1.5 text-[13px] leading-snug [@media(max-height:667px)]:text-[12px] md:mt-2.5 md:text-[16px]"
                style={{ ...bodySerif, color: TEXT }}
              >
                {siteConfig.ceremony.location}
              </p>
            </div>

            {/* Closing line + loading indicator */}
            <div style={{ ...fade(840) }} className="flex w-full flex-col items-center gap-2 px-0.5 sm:mt-7 sm:gap-4">
              <p
                className="text-[12px] leading-[1.55] [@media(max-height:667px)]:text-[11px] md:text-[15px] md:leading-relaxed"
                style={{ ...bodySerif, color: TEXT }}
              >
                Your presence, prayers, and love will mean the world to us.
              </p>

              <div className="w-full max-w-[200px] pb-0.5 md:max-w-[320px]">
                <p
                  className="loading-dots-text text-[10px] tracking-[0.18em] uppercase [@media(max-height:667px)]:text-[9px] md:text-[12px] md:tracking-[0.22em]"
                  style={{ ...labelSerif, color: ACCENT, opacity: 0.95, letterSpacing: "0.18em" }}
                  aria-live="polite"
                >
                  Loading {loadPercent}%
                </p>
                <div
                  className="mt-1.5 h-[2.5px] w-full overflow-hidden rounded-full md:mt-2 md:h-[3px]"
                  style={{ backgroundColor: `${MOTIF.medium}66` }}
                >
                  <div
                    className="h-full rounded-full transition-[width] duration-150 ease-out"
                    style={{
                      width: `${loadPercent}%`,
                      background: `linear-gradient(90deg, ${MOTIF.soft}, ${MOTIF.accent}, ${MOTIF.deep})`,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .loading-dots-text {
          animation: loadingPulse 2s ease-in-out infinite;
        }

        @keyframes loadingPulse {
          0%, 100% { opacity: 0.65; }
          50%       { opacity: 1; }
        }

        .decor-corner {
          opacity: 0;
          will-change: transform, opacity;
        }

        .decor-top-left {
          transform: translate(-12%, -12%);
          transition:
            opacity 1.35s cubic-bezier(0.16, 1, 0.3, 1) 0.06s,
            transform 1.65s cubic-bezier(0.16, 1, 0.3, 1) 0.06s;
        }

        .decor-bottom-right {
          transform: translate(12%, 12%);
          transition:
            opacity 1.35s cubic-bezier(0.16, 1, 0.3, 1) 0.22s,
            transform 1.65s cubic-bezier(0.16, 1, 0.3, 1) 0.22s;
        }

        .decor-corner.decor-visible {
          opacity: 1;
          transform: translate(0, 0);
        }

        .particle-field {
          opacity: 0.55;
          animation: particleFieldIntro 1.1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .particle-field-visible {
          opacity: 0.55;
        }

        @keyframes particleFieldIntro {
          0% {
            opacity: 0.45;
          }
          100% {
            opacity: 0.55;
          }
        }

        .particle-gradient {
          position: absolute;
          inset: -20%;
          background:
            radial-gradient(circle at 14% 18%, ${MOTIF.lightBlush}30 0%, transparent 40%),
            radial-gradient(circle at 86% 14%, ${MOTIF.accent}28 0%, transparent 38%),
            radial-gradient(circle at 78% 82%, ${MOTIF.medium}24 0%, transparent 42%),
            radial-gradient(circle at 20% 78%, ${MOTIF.soft}32 0%, transparent 38%),
            radial-gradient(circle at 50% 50%, ${MOTIF.cream}22 0%, transparent 52%);
          animation: gradientBreath 22s ease-in-out infinite alternate;
        }

        .particle-orb,
        .particle-spark {
          position: absolute;
          border-radius: 9999px;
          will-change: transform, opacity;
          animation-name: particleDrift;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
          animation-direction: alternate;
        }

        .particle-orb {
          filter: blur(38px);
          transform: translate3d(-50%, -50%, 0);
        }

        .particle-spark {
          transform: translate3d(-50%, -50%, 0);
          box-shadow: 0 0 6px color-mix(in srgb, currentColor 35%, transparent);
          animation-name: particleDrift, particleTwinkleOpacity;
        }

        @keyframes particleTwinkleOpacity {
          0%, 100% {
            opacity: 0.12;
          }
          50% {
            opacity: 0.45;
          }
        }

        @keyframes gradientBreath {
          0% {
            transform: scale(1) translate3d(0, 0, 0);
            opacity: 0.85;
          }
          100% {
            transform: scale(1.06) translate3d(0, -1.5%, 0);
            opacity: 1;
          }
        }

        @keyframes particleDrift {
          0% {
            transform: translate3d(calc(-50% + 0px), calc(-50% + 0px), 0);
          }
          100% {
            transform: translate3d(
              calc(-50% + var(--drift-x, 12px)),
              calc(-50% + var(--drift-y, -18px)),
              0
            );
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .loading-dots-text {
            animation: none !important;
          }

          .particle-field {
            animation: none !important;
            opacity: 0.55;
          }

          .particle-gradient,
          .particle-orb,
          .particle-spark {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  )
}
