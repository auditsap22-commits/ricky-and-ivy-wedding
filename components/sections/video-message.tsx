"use client"

import { Section } from "@/components/section"
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

const OUTSIDE_TEXT = MOTIF.cream
const OUTSIDE_TEXT_MUTED = "rgba(255, 252, 248, 0.88)"
const OUTSIDE_LABEL = "rgba(255, 252, 248, 0.72)"
const OUTSIDE_TITLE_SHADOW =
  "0 2px 6px rgba(0, 0, 0, 0.28), 0 0 18px rgba(0, 0, 0, 0.12)"

const displayScript = {
  fontFamily: "'Brightwall', cursive",
  fontWeight: 400,
} as const

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "600"],
})

const DRIVE_URL =
  "https://drive.google.com/drive/folders/1fH_NKSGFyW1DupwtElpS-cZIldXJ3280?usp=sharing"

const bodyFont: React.CSSProperties = {
  fontFamily: "'SortsMillGoudy', Georgia, 'Times New Roman', serif",
}

const ct = {
  label: "text-[11px] sm:text-xs md:text-sm",
  body: "text-xs sm:text-sm md:text-base lg:text-lg",
  btn: "text-xs sm:text-sm",
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

export function VideoMessage() {
  return (
      <Section
        id="video-message"
        className="relative bg-transparent pt-8 pb-8 sm:pt-10 sm:pb-10 md:pt-12 md:pb-12 lg:pt-14 lg:pb-14"
      >
        <div className="mx-auto max-w-4xl px-4 sm:px-6 md:px-8 pb-2 sm:pb-3">
          {/* Header — outside container, on silk backdrop */}
          <div className="text-center mb-6 sm:mb-8 md:mb-10">
            <p
              className={`${cinzel.className} ${ct.label} uppercase tracking-[0.2em] sm:tracking-[0.24em] mb-2`}
              style={{ color: OUTSIDE_LABEL }}
            >
              A Message We Will Treasure
            </p>
            <h2
              className="mx-auto my-4 max-w-[18ch] leading-[1.08] sm:my-5 md:my-6 md:max-w-none"
              style={{
                ...displayScript,
                fontSize: "clamp(2.35rem, 7.5vw, 4.25rem)",
                color: OUTSIDE_TEXT,
                letterSpacing: "0.02em",
                textShadow: OUTSIDE_TITLE_SHADOW,
              }}
            >
              Send us a video message
            </h2>
            <div className="flex items-center justify-center pt-2 sm:pt-3">
              <span className="h-px w-16 sm:w-24 md:w-32 bg-white/50" />
            </div>
          </div>

          <div
            className="relative overflow-hidden rounded-2xl border px-4 py-6 sm:rounded-3xl sm:px-5 sm:py-8 md:rounded-[2rem] md:px-8 md:py-10 lg:px-10 lg:py-11"
            style={containerStyle}
          >
            <div className="relative space-y-4 text-center sm:space-y-5 md:space-y-6">
              <div
                className={`${ct.body} leading-relaxed space-y-2.5 sm:space-y-3`}
                style={{ ...bodyFont, color: TEXT }}
              >
                <p>
                  As we begin this new chapter under the Lord&apos;s guidance, we are
                  deeply grateful for everyone He has placed in our lives.
                </p>
                <p className="italic" style={{ color: ACCENT }}>
                  You are a blessing we hold close to our hearts.
                </p>
                <p>
                  We would love to receive a short video message from you—something we
                  can keep and look back on through the years ahead.
                </p>
                <p>
                  Your words will make our wedding day, and our life together, even more
                  meaningful. Thank you for your love and support.
                </p>
              </div>

              <div className="flex items-center justify-center gap-2">
                <span
                  className="h-px w-10 sm:w-16 md:w-20"
                  style={{ backgroundColor: `color-mix(in srgb, ${MOTIF.silver} 75%, white)` }}
                />
                <span
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ backgroundColor: MOTIF.accent }}
                />
                <span
                  className="h-px w-10 sm:w-16 md:w-20"
                  style={{ backgroundColor: `color-mix(in srgb, ${MOTIF.silver} 75%, white)` }}
                />
              </div>

              <div className="space-y-3 sm:space-y-4 pt-2 mt-10 sm:mt-12 md:mt-14">
                <p className={ct.body} style={{ ...bodyFont, color: TEXT_DEEP }}>
                  Upload your video message here:
                </p>

                <a
                  href={DRIVE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${cinzel.className} inline-flex items-center justify-center rounded-full px-6 py-2.5 sm:px-8 sm:py-3 ${ct.btn} uppercase tracking-[0.18em] font-semibold border transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]`}
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
                  Upload Video Message
                </a>
              </div>
            </div>
          </div>
        </div>
      </Section>
  )
}
