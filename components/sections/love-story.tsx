"use client"

import React from "react"
import Link from "next/link"
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

const BACKGROUND_IMAGE = "/Details/background.png"

const sectionWash = `linear-gradient(
  180deg,
  color-mix(in srgb, ${MOTIF.cream} 93%, transparent) 0%,
  color-mix(in srgb, ${MOTIF.soft} 88%, transparent) 45%,
  color-mix(in srgb, ${MOTIF.lightBlush} 84%, transparent) 100%
), radial-gradient(ellipse at center, rgba(255,248,248,0.62) 0%, rgba(251,236,239,0.48) 48%, rgba(232,174,190,0.32) 100%)`

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
        className="pointer-events-none absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-[0.22]"
        style={{ backgroundImage: `url('${BACKGROUND_IMAGE}')` }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{ background: sectionWash }}
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
          title="You are Invited to Celebrate With Us"
          imageSrc="/mobile-background/coupless (12).webp"
          text={
            <>
              <p className="mb-4">
                Some moments are meant to be shared with the people who matter most.
              </p>
              <p className="mb-4">
                We&apos;re getting married on September 18, 2026, and we would be truly honored to have you there with us.
              </p>
            </>
          }
        />

        <StorySection
          layout="image-right"
          imageSrc="/mobile-background/coupless (9).webp"
          title="For Being Here With Us"
          text={
            <>
              <p className="mb-4">
                Some celebrations are only truly complete with loved ones near.
              </p>
              <p className="mb-4">
                Whether you&apos;re traveling far or coming from just around the corner, your presence will make this day all the more meaningful.
              </p>
            </>
          }
        />

        <StorySection
          layout="image-left"
          imageSrc="/mobile-background/coupless (3).webp"
          title="For the Love and Support"
          text={
            <>
              <p>
                We would not be who we are without the people who lifted us along the way.
              </p>
              <p className="mb-4">
                To our families and friends, thank you for your guidance, encouragement, and love that carried us to this moment.
              </p>
              <p className="mb-4">
                Every kind word, every gesture of support, has shaped this day in ways words can hardly capture.
              </p>
            </>
          }
        />

        <StorySection
          layout="image-right"
          imageSrc="/mobile-background/coupless (6).webp"
          title="Becoming Family"
          text={
            <>
              <p>
                This day isn&apos;t just about the two of us—it&apos;s about all of us.
              </p>
              <p className="mb-4">
                To both of our families coming together, thank you for welcoming us with open arms. We&apos;re honored to now call each other family.
              </p>
            </>
          }
        />

        <StorySection
          layout="image-left"
          imageSrc="/mobile-background/coupless (10).webp"
          title="Mark Your Calendars"
          text={
            <>
              <p>
                September 18, 2026, 2:00 PM, at the William Cameron Forbes Ballroom, Baguio Country Club—a day we&apos;ll always treasure.
              </p>
              <p className="mb-4">
                We can&apos;t wait to celebrate this milestone surrounded by the people we love most—thank you for being one of them.
              </p>
            </>
          }
        />

        <StorySection
          layout="image-right"
          imageSrc="/mobile-background/coupless (2).webp"
          title="With Gratitude, Always"
          text={
            <>
              <p>
                Words can only say so much, but our gratitude runs deep.
              </p>
              <p className="mb-4">
                Thank you for your love, your blessings, and for being part of our lives on this special day. We carry your presence with us always.
              </p>
            </>
          }
        />

        <StorySection
          layout="image-left"
          isLast={true}
          imageSrc="/mobile-background/coupless (13).webp"
          title="Thank You for Being Part of Our Family"
          text={
            <>
              <p>
                Every celebration is made richer by the people who show up for it.
              </p>
              <p className="mb-4">
                Thank you, from the bottom of our hearts, for being here, for your love, and for being part of our family.
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
