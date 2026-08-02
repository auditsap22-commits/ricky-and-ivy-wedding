"use client"

import { useSiteConfig } from "@/hooks/use-site-config"
import { Cormorant_Garamond, Cinzel } from "next/font/google"

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

const NAME_SHADOW =
  "0 2px 4px rgba(255, 255, 255, 0.92), 0 0 20px rgba(232, 174, 190, 0.45)"

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
})

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: "400",
})

const displayScript = {
  fontFamily: "'Brightwall', cursive",
  fontWeight: 400,
} as const

const cardStyle = {
  background: `linear-gradient(
    155deg,
    color-mix(in srgb, ${MOTIF.cream} 94%, white) 0%,
    color-mix(in srgb, ${MOTIF.soft} 92%, white) 48%,
    color-mix(in srgb, ${MOTIF.lightBlush} 88%, white) 100%
  )`,
  borderColor: `color-mix(in srgb, ${MOTIF.silver} 72%, white)`,
  boxShadow: `0 16px 48px color-mix(in srgb, ${MOTIF.deep} 12%, transparent), inset 0 1px 0 rgba(255, 255, 255, 0.88)`,
} as const

export function Welcome() {
  const siteConfig = useSiteConfig()
  const brideName = siteConfig.couple.brideNickname || siteConfig.couple.bride
  const groomName = siteConfig.couple.groomNickname || siteConfig.couple.groom

  return (
    <section
      id="welcome"
      className="relative bg-transparent pt-12 pb-4 sm:pt-16 sm:pb-6 md:pt-20 md:pb-8"
    >
      <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 md:px-8">
        <div
          className="relative overflow-hidden rounded-2xl border px-4 py-6 sm:rounded-3xl sm:px-5 sm:py-8 md:rounded-[2rem] md:px-8 md:py-10 lg:px-10 lg:py-12"
          style={cardStyle}
        >
          <div className="relative space-y-4 text-center sm:space-y-6 md:space-y-7 lg:space-y-8">
            <div className="space-y-1 sm:space-y-1.5 md:space-y-2.5">
              <p
                className={`${cormorant.className} text-xs uppercase tracking-[0.24em] sm:text-sm sm:tracking-[0.28em] md:text-base`}
                style={{ color: ACCENT }}
              >
                {siteConfig.couple.groomNickname} &amp; {siteConfig.couple.brideNickname}
              </p>
              <h2
                className="mx-auto mt-4 max-w-[18ch] leading-[1.08] sm:mt-5 md:mt-6 md:max-w-none"
                style={{
                  ...displayScript,
                  fontSize: "clamp(2.35rem, 7.5vw, 4.25rem)",
                  color: NAME_COLOR,
                  letterSpacing: "0.02em",
                  textShadow: NAME_SHADOW,
                }}
              >
                Welcome to our forever
              </h2>

              <div className="space-y-0.5 sm:space-y-1">
                <p
                  className={`${cormorant.className} text-sm italic leading-relaxed sm:text-base md:text-lg`}
                  style={{ color: TEXT }}
                >
                  &quot;I have found the one whom my soul loves.&quot;
                </p>
                <p
                  className={`${cormorant.className} text-sm italic leading-relaxed sm:text-base md:text-lg`}
                  style={{ color: ACCENT }}
                >
                  Song of Solomon 3:4
                </p>
              </div>

              <div className="flex items-center justify-center gap-2 pt-1">
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
            </div>

            <div
              className={`${cormorant.className} space-y-3 text-sm leading-relaxed sm:space-y-4 sm:text-base sm:leading-7 md:space-y-5 md:text-lg md:leading-8`}
              style={{ color: TEXT }}
            >
              <p>
                Our love is a blessing we hold close to our hearts, and we are deeply grateful to God
                for gently guiding our story and bringing our lives together in such a beautiful way.
                With hearts full of joy and thanksgiving, we are so happy to share this special moment
                of our journey with you. Your love, prayers, and support have meant so much to us,
                and it would mean the world to celebrate this meaningful day surrounded by the people
                who have been part of our lives and our story.
              </p>
              <p>
                As you prepare to celebrate with us, please feel free to browse through the important
                information and helpful reminders. Everything you need to know for the day is here.
                Your presence and shared joy will truly make this celebration even more special for us.
              </p>

              <div className="space-y-5 pt-3 sm:space-y-6 sm:pt-4 md:space-y-7 md:pt-5">
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

                <div
                  className="mx-auto max-w-md rounded-xl px-4 py-4 sm:rounded-2xl sm:px-6 sm:py-5"
                  style={{
                    border: `1px solid color-mix(in srgb, ${MOTIF.silver} 68%, white)`,
                    backgroundColor: `color-mix(in srgb, ${MOTIF.cream} 78%, white)`,
                  }}
                >
                  <p
                    className={`${cormorant.className} mb-2 text-xs uppercase tracking-[0.22em] sm:mb-2.5 sm:text-sm sm:tracking-[0.26em]`}
                    style={{ color: ACCENT }}
                  >
                    Share in our joy
                  </p>
                  <p
                    className="mb-3 text-sm leading-relaxed sm:mb-3.5 sm:text-base md:text-lg"
                    style={{ color: TEXT }}
                  >
                    As you celebrate with us, please use our official hashtag when posting your photos
                    and memories.
                  </p>
                  <p
                    className={`${cormorant.className} text-base tracking-[0.06em] sm:text-lg sm:tracking-[0.08em] md:text-xl`}
                    style={{ color: TEXT_DEEP }}
                  >
                    {siteConfig.snapShare.hashtag.join(" ")}
                  </p>
                </div>

                <div className="space-y-1.5 pt-1 sm:space-y-2">
                  <p
                    className={`${cormorant.className} text-sm italic sm:text-base md:text-lg`}
                    style={{ color: ACCENT }}
                  >
                    With all our love,
                  </p>
                  <p
                    className={`${cinzel.className} text-xl tracking-[0.1em] sm:text-2xl sm:tracking-[0.14em] md:text-3xl`}
                    style={{ color: TEXT_DEEP }}
                  >
                    {groomName} &amp; {brideName}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
