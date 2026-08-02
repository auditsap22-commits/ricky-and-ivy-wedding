"use client"

import { useEffect, useRef } from "react"
import { Section } from "@/components/section"
import { useSiteConfig } from "@/hooks/use-site-config"
import { useAudio } from "@/contexts/audio-context"
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
const ACCENT = MOTIF.deep

const OUTSIDE_TEXT = MOTIF.cream
const OUTSIDE_TEXT_MUTED = "rgba(255, 252, 248, 0.88)"
const OUTSIDE_LABEL = "rgba(255, 252, 248, 0.72)"
const OUTSIDE_TITLE_SHADOW =
  "0 2px 6px rgba(0, 0, 0, 0.28), 0 0 18px rgba(0, 0, 0, 0.12)"

const displayScript = {
  fontFamily: "'Brightwall', cursive",
  fontWeight: 400,
} as const

interface SpotifyPlaybackUpdate {
  playingURI: string
  isPaused: boolean
  isBuffering: boolean
  duration: number
  position: number
}

interface SpotifyEmbedController {
  addListener: (
    event: "playback_update" | "playback_started" | "ready",
    callback: (event: { data: SpotifyPlaybackUpdate }) => void
  ) => void
  removeListener: (
    event: "playback_update" | "playback_started" | "ready",
    callback: (event: { data: SpotifyPlaybackUpdate }) => void
  ) => void
  destroy: () => void
}

interface SpotifyIframeApi {
  createController: (
    element: HTMLElement,
    options: { uri: string; width?: string; height?: string },
    callback: (controller: SpotifyEmbedController) => void
  ) => void
}

declare global {
  interface Window {
    onSpotifyIframeApiReady?: (api: SpotifyIframeApi) => void
  }
}

let cachedSpotifyIframeApi: SpotifyIframeApi | null = null
const spotifyApiReadyQueue: Array<(api: SpotifyIframeApi) => void> = []

function getSpotifyUri(spotifyUrl: string): string {
  const match = spotifyUrl.match(
    /open\.spotify\.com\/(playlist|album|track|episode)\/([^/?]+)/
  )
  if (!match) return spotifyUrl
  return `spotify:${match[1]}:${match[2]}`
}

function loadSpotifyIframeApi(onReady: (api: SpotifyIframeApi) => void) {
  if (cachedSpotifyIframeApi) {
    onReady(cachedSpotifyIframeApi)
    return
  }

  spotifyApiReadyQueue.push(onReady)

  if (spotifyApiReadyQueue.length > 1) return

  const previousReady = window.onSpotifyIframeApiReady
  window.onSpotifyIframeApiReady = (IFrameAPI) => {
    cachedSpotifyIframeApi = IFrameAPI
    previousReady?.(IFrameAPI)
    spotifyApiReadyQueue.splice(0).forEach((callback) => callback(IFrameAPI))
  }

  const existingScript = document.querySelector(
    'script[src="https://open.spotify.com/embed/iframe-api/v1"]'
  )
  if (!existingScript) {
    const script = document.createElement("script")
    script.src = "https://open.spotify.com/embed/iframe-api/v1"
    script.async = true
    document.body.appendChild(script)
  }
}

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "600"],
})

const bodyFont: React.CSSProperties = {
  fontFamily: "'SortsMillGoudy', Georgia, serif",
}

const ct = {
  label: "text-[11px] sm:text-xs md:text-sm",
  body: "text-xs sm:text-sm md:text-base lg:text-lg",
  btn: "text-xs sm:text-sm md:text-base",
} as const

const containerStyle = {
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

export function WeddingPlaylist() {
  const siteConfig = useSiteConfig()
  const { title, subtitle, playlistName, spotifyUrl } = siteConfig.playlist
  const spotifyUri = getSpotifyUri(spotifyUrl)
  const embedContainerRef = useRef<HTMLDivElement>(null)
  const controllerRef = useRef<SpotifyEmbedController | null>(null)
  const playbackStateRef = useRef<"playing" | "paused">("paused")
  const { pauseMusic, resumeMusic } = useAudio()

  useEffect(() => {
    const container = embedContainerRef.current
    if (!container) return

    let mounted = true

    const handlePlaybackStateChange = (isPlaying: boolean) => {
      if (isPlaying && playbackStateRef.current !== "playing") {
        playbackStateRef.current = "playing"
        pauseMusic()
      } else if (!isPlaying && playbackStateRef.current === "playing") {
        playbackStateRef.current = "paused"
        resumeMusic()
      }
    }

    const initController = (IFrameAPI: SpotifyIframeApi) => {
      if (!mounted || !embedContainerRef.current) return

      IFrameAPI.createController(
        embedContainerRef.current,
        {
          uri: spotifyUri,
          width: "100%",
          height: "352",
        },
        (EmbedController) => {
          if (!mounted) return

          controllerRef.current = EmbedController

          const handlePlaybackUpdate = (event: { data: SpotifyPlaybackUpdate }) => {
            handlePlaybackStateChange(!event.data.isPaused)
          }

          const handlePlaybackStarted = () => {
            handlePlaybackStateChange(true)
          }

          EmbedController.addListener("playback_update", handlePlaybackUpdate)
          EmbedController.addListener("playback_started", handlePlaybackStarted)
        }
      )
    }

    loadSpotifyIframeApi(initController)

    return () => {
      mounted = false
      if (playbackStateRef.current === "playing") {
        resumeMusic()
      }
      playbackStateRef.current = "paused"
      controllerRef.current?.destroy()
      controllerRef.current = null
    }
  }, [pauseMusic, resumeMusic, spotifyUri])

  return (
    <Section
      id="playlist"
      className="relative bg-transparent pt-8 pb-8 sm:pt-10 sm:pb-10 md:pt-12 md:pb-12 lg:pt-14 lg:pb-14"
    >
      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 md:px-8">
        {/* Header — outside container, on silk backdrop */}
        <div className="text-center mb-6 sm:mb-8 md:mb-10">
          <p
            className={`${cinzel.className} ${ct.label} uppercase tracking-[0.2em] sm:tracking-[0.24em] mb-2`}
            style={{ color: OUTSIDE_LABEL }}
          >
            {playlistName}
          </p>
          <h2
            className="mx-auto my-4 max-w-[16ch] leading-[1.08] sm:my-5 md:my-6 md:max-w-none"
            style={{
              ...displayScript,
              fontSize: "clamp(2.35rem, 7.5vw, 4.25rem)",
              color: OUTSIDE_TEXT,
              letterSpacing: "0.02em",
              textShadow: OUTSIDE_TITLE_SHADOW,
            }}
          >
            {title}
          </h2>
          <p
            className={`${ct.body} max-w-lg mx-auto leading-relaxed px-2`}
            style={{ ...bodyFont, color: OUTSIDE_TEXT_MUTED }}
          >
            {subtitle}
          </p>
          <div className="flex items-center justify-center pt-2 sm:pt-3">
            <span className="h-px w-16 sm:w-24 md:w-32 bg-white/50" />
          </div>
        </div>

        <div
          className="relative overflow-hidden rounded-2xl border px-4 py-6 sm:rounded-3xl sm:px-6 sm:py-8 md:rounded-[2rem] md:px-8 md:py-10 lg:px-10 lg:py-11"
          style={containerStyle}
        >
            {/* Spotify embed */}
            <div
              ref={embedContainerRef}
              title={`${playlistName} — Spotify playlist`}
              className="w-full min-h-[232px] md:min-h-[352px] rounded-xl overflow-hidden [&_iframe]:border-0"
            />

            <div className="flex justify-center mt-5 sm:mt-6">
              <a
                href={spotifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`${cinzel.className} ${ct.btn} inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-2.5 sm:py-3 rounded-full uppercase tracking-[0.12em] font-semibold transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] border`}
                style={{
                  backgroundColor: ACCENT,
                  borderColor: MOTIF.medium,
                  color: MOTIF.cream,
                  boxShadow: "0 6px 20px rgba(217, 140, 164, 0.28)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = MOTIF.accent
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = ACCENT
                }}
              >
                Open in Spotify
              </a>
            </div>
        </div>
      </div>
    </Section>
  )
}
