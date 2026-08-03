"use client"

import React from "react"
import { StorySection } from "@/components/StorySection"
import { Cinzel } from "next/font/google"

/** Blush pink motif — mirrors details.tsx & globals.css --color-motif-* */
const MOTIF = {
  cream: "#FFF8F8",
  lightBlush: "#F7DDE2",
  soft: "#FBECEF",
  accent: "#E8AEBE",
  deep: "#D98CA4",
  medium: "#F2C7D3",
  silver: "#EAD9DE",
} as const

const TEXT_DEEP = "#4A3540"
const TITLE_DEEP = MOTIF.deep
const ACCENT = MOTIF.deep

const sectionBackground = `linear-gradient(
  155deg,
  #FFFFFF 0%,
  ${MOTIF.cream} 38%,
  ${MOTIF.soft} 72%,
  ${MOTIF.lightBlush} 100%
)`

const displayScript = {
  fontFamily: "'Brightwall', cursive",
  fontWeight: 400,
} as const

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: "400",
})

const bodyFont: React.CSSProperties = {
  fontFamily: "'SortsMillGoudy', Georgia, 'Times New Roman', serif",
}

export function LoveStory() {
  return (
    <div id="love-story" className="relative isolate w-full overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{ background: sectionBackground }}
        aria-hidden
      />

      <div className="relative z-10 overflow-x-hidden">
        <div className="relative z-0 px-4 pb-2 pt-8 text-center sm:pt-10 md:pt-12">
          <p
            className={`${cinzel.className} text-[11px] sm:text-xs md:text-sm uppercase tracking-[0.2em] sm:tracking-[0.24em] mb-2`}
            style={{ color: ACCENT }}
          >
            Our Journey
          </p>
          <h1
            className="mx-auto mt-2 max-w-[16ch] leading-[1.08] sm:mt-3 md:max-w-none md:mt-4"
            style={{
              ...displayScript,
              fontSize: "clamp(2.35rem, 7.5vw, 4.25rem)",
              color: TITLE_DEEP,
              letterSpacing: "0.02em",
            }}
          >
            Our Love Story
          </h1>

          <p
            className="mx-auto mt-4 max-w-xl text-sm font-normal leading-snug tracking-[0.12em] sm:mt-5 sm:text-lg md:mt-6 md:text-xl lg:text-2xl"
            style={{ ...bodyFont, color: TEXT_DEEP, fontStyle: "italic" }}
          >
            &ldquo;11 Years of Love, Now Forever&rdquo;
          </p>

          <div className="flex items-center justify-center gap-2 pt-3 sm:pt-4">
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

        <StorySection
          layout="image-left"
          isFirst={true}
          title="Where It All Began"
          imageSrc="/envelope/image.png"
          text={
            <>
              <p className="mb-4">
                Back in 2015, we were just two people sharing the same office space—Ricky working, and Ivy finishing her college OJT. What started as simple, everyday conversations turned into a quiet, beautiful connection.
              </p>
              <p className="mb-4">
                When Ivy graduated a year later, our hearts were already sure, and we officially began our journey together. But among all the moments we shared during those courting days, the most precious was when Ricky shared his faith in God with Ivy. That moment didn&apos;t just change our relationship; it anchor-rooted our lives.
              </p>
              <p className="mb-4">
                Today, worshipping and serving together at Antioch Roadmap Church remains the heart of who we are.
              </p>
            </>
          }
        />

        <StorySection
          layout="image-right"
          isLast={true}
          title="Ready for Forever"
          imageSrc="/mobile-background/coupless (13).webp"
          text={
            <>
              <p className="mb-4">
                Through every season since—building careers side-by-side in the life insurance business, supporting each other&apos;s biggest dreams, and learning what true partnership really means—we&apos;ve grown closer with every step.
              </p>
              <p className="mb-4">
                Now, with full hearts and God&apos;s grace leading the way, we&apos;re ready to start our forever.
              </p>
            </>
          }
        />
        {/* <div className="relative z-0 px-4 pb-16 pt-8 text-center sm:pb-20 sm:pt-10 md:pb-24 md:pt-12">
          <div className="flex items-center justify-center gap-2 mb-5 sm:mb-6">
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
          <Link
            href="#guest-list"
            className={`${cinzel.className} group relative inline-flex items-center justify-center rounded-full border px-6 py-2.5 text-[0.7rem] font-semibold uppercase tracking-[0.18em] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 sm:px-8 sm:py-3 sm:text-xs md:px-10 md:py-3.5 md:text-sm`}
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
            <span className="relative z-10">Join us</span>
          </Link>
        </div> */}
      </div>
    </div>
  )
}
