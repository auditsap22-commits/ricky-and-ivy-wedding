"use client"

import { useState } from "react"
import { Cinzel } from "next/font/google"
import { useSiteConfig } from "@/hooks/use-site-config"
import Image from "next/image"

const MOTIF = {
  cream: "#FFF8F8",
} as const

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

const bodyFont: React.CSSProperties = {
  fontFamily: "'SortsMillGoudy', Georgia, 'Times New Roman', serif",
}

const ct = {
  body: "text-xs sm:text-sm md:text-base",
  bodyLg: "text-sm sm:text-base md:text-lg",
  label: "text-[11px] sm:text-xs md:text-sm",
} as const

export function Registry() {
  const siteConfig = useSiteConfig()
  const registryItems = Object.values(siteConfig.giftRegistry ?? {})
  const [activeQr, setActiveQr] = useState(registryItems[0]?.id ?? "")
  const activeItem = registryItems.find((item) => item.id === activeQr) ?? registryItems[0]
  const { brideNickname, groomNickname } = siteConfig.couple

  return (
    <section
      id="registry"
      className="relative z-10 bg-transparent pt-8 pb-8 sm:pt-10 sm:pb-10 md:pt-12 md:pb-12 lg:pt-14 lg:pb-14"
    >
      <div className="relative z-20 mx-auto max-w-3xl px-4 text-center sm:px-6 md:px-8">
        <p
          className={`${cinzel.className} ${ct.label} uppercase tracking-[0.2em] sm:tracking-[0.24em] mb-2`}
          style={{ color: OUTSIDE_LABEL }}
        >
          With gratitude
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
          Gift Guide
        </h2>
        <p
          className={`${ct.bodyLg} mx-auto max-w-2xl whitespace-pre-line leading-relaxed px-2`}
          style={{ ...bodyFont, color: OUTSIDE_TEXT_MUTED }}
        >
          {`As love is what this day is all about,\nyour presence is already the greatest gift we could ever ask for.\nHowever, if you'd like to give, a monetary gift toward our future would be most appreciated.`}
        </p>
        <div className="flex items-center justify-center pt-2 sm:pt-3">
          <span className="h-px w-16 sm:w-24 md:w-32 bg-white/50" />
        </div>

        {registryItems.length > 0 && activeItem && (
          <div className="mt-6 sm:mt-8 md:mt-10">
            {registryItems.length > 1 && (
              <div className="mb-5 flex flex-wrap items-center justify-center gap-2 sm:mb-6">
                {registryItems.map((item) => {
                  const isActive = item.id === activeQr
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setActiveQr(item.id)}
                      className={`${cinzel.className} rounded-full border px-4 py-2 ${ct.label} font-semibold uppercase tracking-[0.16em] transition-all duration-300 sm:px-5 sm:py-2.5 sm:tracking-[0.2em]`}
                      style={
                        isActive
                          ? {
                              backgroundColor: "rgba(255, 255, 255, 0.92)",
                              borderColor: "rgba(255, 255, 255, 0.95)",
                              color: "#5C4048",
                            }
                          : {
                              backgroundColor: "rgba(255, 255, 255, 0.12)",
                              borderColor: "rgba(255, 255, 255, 0.45)",
                              color: OUTSIDE_TEXT,
                            }
                      }
                    >
                      {item.label}
                    </button>
                  )
                })}
              </div>
            )}

            <p
              className={`${cinzel.className} ${ct.label} mb-4 font-semibold uppercase tracking-[0.18em] sm:mb-5`}
              style={{ color: OUTSIDE_TEXT }}
            >
              {activeItem.label}
            </p>

            <div className="mx-auto mb-4 inline-flex sm:mb-5">
              <div className="relative h-44 w-44 rounded-xl bg-white/90 p-2 sm:h-52 sm:w-52 md:h-56 md:w-56">
                <Image
                  src={activeItem.src}
                  alt={`${activeItem.label} QR code`}
                  fill
                  className="rounded-lg object-contain p-1"
                  sizes="(max-width: 640px) 176px, 224px"
                />
              </div>
            </div>

            {activeItem.accountNumber && (
              <div className="mx-auto max-w-sm">
                <p
                  className={`${cinzel.className} ${ct.label} mb-1 font-semibold uppercase tracking-[0.14em]`}
                  style={{ color: OUTSIDE_TEXT }}
                >
                  Account Details
                </p>
                <p className={ct.bodyLg} style={{ ...bodyFont, color: OUTSIDE_TEXT_MUTED }}>
                  {activeItem.accountNumber}
                </p>
              </div>
            )}

            <div className="mt-6 space-y-2 sm:mt-8">
              <div className="flex items-center justify-center pt-2 sm:pt-3">
                <span className="h-px w-16 sm:w-24 md:w-32 bg-white/50" />
              </div>
              <p
                className={`${ct.body} pt-4 leading-relaxed`}
                style={{ ...bodyFont, color: OUTSIDE_TEXT_MUTED }}
              >
                Thank you from the bottom of our hearts.
              </p>
              <p
                className={`${ct.body} italic leading-relaxed`}
                style={{ ...bodyFont, color: OUTSIDE_TEXT_MUTED }}
              >
                With love,
                <br />
                {groomNickname} and {brideNickname}
              </p>
            </div>
          </div>
        )}

        {registryItems.length === 0 && (
          <p
            className={`${ct.bodyLg} mt-6 leading-relaxed sm:mt-8`}
            style={{ ...bodyFont, color: OUTSIDE_TEXT_MUTED }}
          >
            Registry details will be shared soon.
          </p>
        )}
      </div>
    </section>
  )
}
