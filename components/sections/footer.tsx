"use client"

import { useState, useEffect, useMemo, type ReactNode } from "react"
import { motion } from "motion/react"
import { Instagram, Twitter, Facebook, Music2 } from "lucide-react"
import { useSiteConfig } from "@/hooks/use-site-config"
import { Cinzel } from "next/font/google"
import Image from "next/image"

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
  weight: ["400", "600"],
})

const palette = {
  body: TEXT,
  heading: TEXT_DEEP,
  label: ACCENT,
  accent: NAME_COLOR,
  deep: TEXT_DEEP,
  cream: MOTIF.cream,
} as const

const bodyFont: React.CSSProperties = {
  fontFamily: "'SortsMillGoudy', Georgia, serif",
}

const ct = {
  label: "text-[11px] sm:text-xs md:text-sm",
  body: "text-xs sm:text-sm md:text-base",
  bodyLg: "text-sm sm:text-base md:text-lg",
  title: "text-lg sm:text-xl md:text-2xl lg:text-3xl",
  cardTitle: "text-sm sm:text-base md:text-lg",
} as const

const FOOTER_QUOTES = [
  `"I have found the one whom my soul loves." – Song of Solomon 3:4`,
  "Welcome to our wedding website! We've found a love that's a true blessing, and we give thanks to God for writing the beautiful story of our journey together.",
  "Thank you for your love, prayers, and support. We can't wait to celebrate this joyful day together!",
] as const

const toTitleCase = (str: string) =>
  str
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")

const cardStyle = {
  background: `linear-gradient(
    155deg,
    #FFFFFF 0%,
    ${MOTIF.cream} 38%,
    ${MOTIF.soft} 72%,
    ${MOTIF.lightBlush} 100%
  )`,
  borderWidth: "1px",
  borderStyle: "solid",
  borderColor: `color-mix(in srgb, ${MOTIF.silver} 72%, white)`,
  boxShadow: `0 16px 48px color-mix(in srgb, ${MOTIF.deep} 12%, transparent), inset 0 1px 0 rgba(255, 255, 255, 0.88)`,
} as const

function FooterCard({
  children,
  className = "",
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div
      className={`relative w-full min-w-0 rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 transition-all duration-300 hover:shadow-xl ${className}`}
      style={cardStyle}
    >
      <div className="relative z-[1] min-w-0">{children}</div>
    </div>
  )
}

function DetailRow({
  label,
  value,
}: {
  label: string
  value: string
}) {
  return (
    <div className="space-y-0.5">
      <p
        className={`${cinzel.className} ${ct.label} uppercase tracking-[0.14em] font-semibold`}
        style={{ color: palette.label }}
      >
        {label}
      </p>
      <p className={ct.body} style={{ ...bodyFont, color: palette.body }}>
        {value}
      </p>
    </div>
  )
}

export function Footer() {
  const siteConfig = useSiteConfig()
  const year = new Date().getFullYear()
  const ceremonyDate = siteConfig.ceremony.date
  const ceremonyTime = siteConfig.ceremony.time
  const receptionTime = siteConfig.reception.time
  const ceremonyVenue = siteConfig.ceremony.location
  const receptionVenue = siteConfig.reception.location
  const ceremonyAddress = siteConfig.ceremony.venue
  const receptionAddress = siteConfig.reception.venue

  const brideNickname = siteConfig.couple.brideNickname
  const groomNickname = siteConfig.couple.groomNickname
  const coupleDisplayName = `${groomNickname} & ${brideNickname}`

  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0)
  const [displayedText, setDisplayedText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    if (isPaused) {
      const pauseTimeout = setTimeout(() => setIsPaused(false), 3000)
      return () => clearTimeout(pauseTimeout)
    }

    if (isDeleting) {
      if (displayedText.length > 0) {
        const deleteTimeout = setTimeout(() => {
          setDisplayedText(displayedText.slice(0, -1))
        }, 30)
        return () => clearTimeout(deleteTimeout)
      }
      setIsDeleting(false)
      setCurrentQuoteIndex((prev) => (prev + 1) % FOOTER_QUOTES.length)
      return
    }

    const currentQuote = FOOTER_QUOTES[currentQuoteIndex]
    if (displayedText.length < currentQuote.length) {
      const typeTimeout = setTimeout(() => {
        setDisplayedText(currentQuote.slice(0, displayedText.length + 1))
      }, 50)
      return () => clearTimeout(typeTimeout)
    }

    setIsPaused(true)
    setIsDeleting(true)
  }, [displayedText, isDeleting, isPaused, currentQuoteIndex])

  const fadeInUp = {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" },
  }

  const staggerChildren = {
    animate: { transition: { staggerChildren: 0.15 } },
  }

  const nav = useMemo(
    () =>
      [
        { label: "Home", href: "#home" },
        { label: "Events", href: "#details" },
        { label: "RSVP", href: "#guest-list" },
        { label: "Messages", href: "#messages" },
      ] as const,
    []
  )

  return (
    <div className="relative isolate w-full overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{ background: sectionBackground }}
        aria-hidden
      />

      <footer className="relative z-10 pt-8 pb-8 sm:pt-10 sm:pb-10 md:pt-12 md:pb-12 lg:pt-14 lg:pb-14">
        {/* Monogram + couple header */}
        <div className="relative z-10 flex flex-col items-center mb-6 sm:mb-8 md:mb-10 px-6 sm:px-10">
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col items-center"
          >
            <div className="relative w-44 h-44 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-72 lg:h-72">
              <Image
                src={siteConfig.couple.monogram}
                alt={`${coupleDisplayName} monogram`}
                fill
                className="object-contain"
                priority={false}
                sizes="(max-width: 640px) 176px, (max-width: 1024px) 256px, 288px"
              />
            </div>
          </motion.div>

          <div className="mt-4 sm:mt-5 md:mt-6 text-center max-w-md">
            <h2
              className="mx-auto whitespace-nowrap leading-[1.1]"
              style={{
                ...displayScript,
                fontSize: "clamp(2rem, 6.5vw, 3.5rem)",
                color: NAME_COLOR,
                letterSpacing: "0.03em",
                textShadow: NAME_SHADOW,
              }}
            >
              {coupleDisplayName}
            </h2>
            <p
              className={`${ct.bodyLg} mt-2 sm:mt-3 italic`}
              style={{
                ...bodyFont,
                color: ACCENT,
                letterSpacing: "0.04em",
              }}
            >
              {ceremonyDate}
            </p>
          </div>

          <div className="flex items-center justify-center pt-3 sm:pt-4">
            <span
              className="h-px w-16 sm:w-24 md:w-32"
              style={{ backgroundColor: `color-mix(in srgb, ${MOTIF.silver} 75%, white)` }}
            />
          </div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 pb-4 sm:pb-6 min-w-0">
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-4 gap-5 sm:gap-6 md:gap-8 mb-8 sm:mb-10 items-start"
            variants={staggerChildren}
            initial="initial"
            animate="animate"
          >
            {/* Couple info + quote */}
            <motion.div className="lg:col-span-2 min-w-0" variants={fadeInUp}>
              <div className="mb-5 sm:mb-6">
                <h3
                  className={`${cinzel.className} ${ct.title} font-semibold leading-tight mb-4`}
                  style={{ color: palette.heading }}
                >
                  {coupleDisplayName}
                </h3>
                <div className="space-y-3 sm:space-y-4">
                  <DetailRow label="Wedding Date" value={ceremonyDate} />
                  <DetailRow label="Venue" value={toTitleCase(ceremonyVenue)} />
                </div>
              </div>

              <FooterCard>
                <p
                  className={`${cinzel.className} ${ct.label} uppercase tracking-[0.14em] font-semibold mb-3`}
                  style={{ color: palette.label }}
                >
                  A Note From Us
                </p>
                <blockquote
                  className={`${ct.bodyLg} italic leading-relaxed min-h-[4.5rem] sm:min-h-[5rem]`}
                  style={{ ...bodyFont, color: palette.body }}
                >
                  &ldquo;{displayedText}
                  <span
                    className="inline-block w-0.5 h-4 sm:h-5 ml-1 animate-pulse align-middle"
                    style={{ backgroundColor: ACCENT }}
                  />
                  &rdquo;
                </blockquote>
                <div className="flex items-center gap-1.5 mt-3 sm:mt-4">
                  {FOOTER_QUOTES.map((_, i) => (
                    <div
                      key={i}
                      className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-opacity"
                      style={{
                        backgroundColor: palette.accent,
                        opacity: i === currentQuoteIndex ? 1 : 0.35,
                      }}
                    />
                  ))}
                </div>
              </FooterCard>
            </motion.div>

            {/* Event details — ceremony and reception always separate */}
            <motion.div className="space-y-4 sm:space-y-5 min-w-0" variants={fadeInUp}>
              <FooterCard>
                <h4
                  className={`${cinzel.className} ${ct.cardTitle} font-semibold mb-3`}
                  style={{ color: palette.heading }}
                >
                  Ceremony & Reception
                </h4>
                <div className="space-y-3">
                  <DetailRow label="Venue" value={toTitleCase(ceremonyVenue)} />
                  {ceremonyAddress && ceremonyAddress !== ceremonyVenue && (
                    <DetailRow label="Address" value={toTitleCase(ceremonyAddress)} />
                  )}
                  <DetailRow label="Time" value={ceremonyTime} />
                </div>
              </FooterCard>

              {/* <FooterCard>
                <h4
                  className={`${cinzel.className} ${ct.cardTitle} font-semibold mb-3`}
                  style={{ color: palette.heading }}
                >
                  Reception
                </h4>
                <div className="space-y-3">
                  <DetailRow label="Venue" value={toTitleCase(receptionVenue)} />
                  {receptionAddress && receptionAddress !== receptionVenue && (
                    <DetailRow label="Address" value={toTitleCase(receptionAddress)} />
                  )}
                  <DetailRow label="Time" value={receptionTime} />
                </div>
              </FooterCard> */}

              <FooterCard>
                <h4 className={`${cinzel.className} ${ct.cardTitle} font-semibold mb-3`} style={{ color: palette.heading }}>
                  RSVP Deadline
                </h4>
                <div className="space-y-2">
                  <DetailRow label="Please respond by" value={siteConfig.details.rsvp.deadline} />
                  <p className={`${ct.body} leading-relaxed`} style={{ ...bodyFont, color: palette.body, opacity: 0.9 }}>
                    Please confirm your attendance by this date.
                  </p>
                </div>
              </FooterCard>
            </motion.div>

            {/* Social + links */}
            <motion.div className="space-y-5 sm:space-y-6 min-w-0" variants={fadeInUp}>
              <div>
                <h4
                  className={`${cinzel.className} ${ct.cardTitle} font-semibold mb-3 sm:mb-4 flex items-center gap-2`}
                  style={{ color: palette.heading }}
                >
                  <span
                    className="w-1.5 h-6 sm:h-7 rounded-full flex-shrink-0"
                    style={{ backgroundColor: ACCENT }}
                  />
                  Follow Us
                </h4>
                <div className="flex items-center gap-2 sm:gap-2.5 flex-wrap">
                  {(
                    [
                      { href: "https://www.facebook.com", Icon: Facebook, label: "Facebook" },
                      { href: "https://www.instagram.com/", Icon: Instagram, label: "Instagram" },
                      { href: "https://www.youtube.com", Icon: Music2, label: "YouTube" },
                      { href: "https://x.com/", Icon: Twitter, label: "Twitter" },
                    ] as const
                  ).map(({ href, Icon, label }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center h-10 w-10 sm:h-11 sm:w-11 rounded-full transition-all duration-200 hover:scale-110"
                      style={{
                        borderWidth: "1px",
                        borderStyle: "solid",
                        borderColor: `color-mix(in srgb, white 65%, ${MOTIF.silver})`,
                        backgroundColor: "#FFFFFF",
                        color: ACCENT,
                        boxShadow: `0 4px 12px color-mix(in srgb, ${MOTIF.silver} 12%, transparent)`,
                      }}
                      aria-label={label}
                    >
                      <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                    </a>
                  ))}
                </div>
              </div>

              <div>
                <h5
                  className={`${cinzel.className} ${ct.body} font-semibold mb-2.5 sm:mb-3 uppercase tracking-[0.1em]`}
                  style={{ color: palette.label }}
                >
                  Quick Links
                </h5>
                <div className="space-y-1.5 sm:space-y-2">
                  {nav.map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      className={`block ${ct.body} leading-relaxed transition-colors duration-200 hover:opacity-80`}
                      style={{ ...bodyFont, color: palette.body }}
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Bottom bar */}
          <motion.div
            className="pt-6 sm:pt-8 border-t"
            style={{ borderColor: `color-mix(in srgb, ${MOTIF.silver} 72%, white)` }}
            variants={fadeInUp}
          >
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6">
              <div className="text-center md:text-left min-w-0">
                <p className={`${ct.body} leading-relaxed`} style={{ ...bodyFont, color: palette.body }}>
                  © {year} {coupleDisplayName} — crafted with love, prayers, and gratitude.
                </p>
                <p className={`${ct.body} mt-1 leading-relaxed opacity-90`} style={{ ...bodyFont, color: palette.body }}>
                  This celebration site was designed to share our story and joy with you.
                </p>
              </div>
              <div className="text-center md:text-right space-y-1 min-w-0">
                <p className={ct.body} style={{ ...bodyFont, color: palette.body, opacity: 0.9 }}>
                  Developed by{" "}
                  <a
                    href="https://lance28-beep.github.io/portfolio-website/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline font-semibold transition-colors hover:opacity-80"
                    style={{ color: palette.accent }}
                  >
                    Lance Valle
                  </a>
                </p>
                <p className={ct.body} style={{ ...bodyFont, color: palette.body, opacity: 0.9 }}>
                  Want a website like this? Visit{" "}
                  <a
                    href="https://www.facebook.com/WeddingInvitationNaga"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline font-semibold transition-colors hover:opacity-80"
                    style={{ color: palette.accent }}
                  >
                    Wedding Invitation Naga
                  </a>
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </footer>
    </div>
  )
}
