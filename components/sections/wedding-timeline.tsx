"use client"

import type React from "react"
import { useSiteConfig } from "@/hooks/use-site-config"
import type { SiteConfig } from "@/lib/site-config"
import { motion } from "motion/react"
import { Cinzel } from "next/font/google"
import { CloudinaryImage } from "@/components/ui/cloudinary-image"

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "600"],
})

const WHITE = "#FFFFFF"
const WHITE_MUTED = "rgba(255, 255, 255, 0.88)"

const TITLE_SHADOW =
  "0 2px 6px rgba(0, 0, 0, 0.28), 0 0 18px rgba(0, 0, 0, 0.12)"
const TEXT_SHADOW = "0 1px 3px rgba(0,0,0,0.55), 0 2px 10px rgba(0,0,0,0.35)"
const ICON_SHADOW =
  "drop-shadow(0 2px 6px rgba(0,0,0,0.55)) drop-shadow(0 0 10px rgba(0,0,0,0.35))"

const LINE_COLOR = "rgba(255, 255, 255, 0.65)"
const TIMELINE_SVG_STROKE = WHITE

const displayScript = {
  fontFamily: "'Brightwall', cursive",
  fontWeight: 400,
} as const

const bodyFont: React.CSSProperties = {
  fontFamily: "'SortsMillGoudy', Georgia, 'Times New Roman', serif",
}

const ct = {
  label: "text-[11px] sm:text-xs md:text-sm",
  body: "text-xs sm:text-sm md:text-base",
  bodyLg: "text-sm sm:text-base md:text-lg",
  meta: "text-[10px] sm:text-xs md:text-sm",
} as const

type TimelineIcon = React.ComponentType<React.SVGProps<SVGSVGElement>>

interface TimelineEvent {
  time: string
  title: string
  description?: string
  location?: string
  icon: TimelineIcon
  imageSrc?: string
}

function buildTimelineEvents(siteConfig: SiteConfig): TimelineEvent[] {
  return [
    // {
    //   time: "2:30 PM",
    //   title: "Arrival",
    //   location: siteConfig.ceremony.location,
    //   icon: GuestsIcon,
    //   imageSrc: "/weddingtimeline/assemble.png",
    // },
    {
      time: "1:30 PM",
      title: "Assembly  ",
      location: siteConfig.ceremony.location,
      icon: GuestsIcon,
      imageSrc: "/weddingtimeline/arrivalimage.png",
    },
    {
      time: "2:00 PM",
      title: "Processional ",
      location: siteConfig.ceremony.location,
      icon: RingsIcon,
      imageSrc: "/weddingtimeline/WeddingCeremony.png",
    }, 
    {
      time: "3:30 PM",
      title: "Photos",
      location: siteConfig.ceremony.location,
      icon: RingsIcon,
      imageSrc: "/weddingtimeline/PhotoSession.png",
    },

    {
      time: "5:00 PM",
      title: "Cocktail Hour",
      location: siteConfig.ceremony.location,
      icon: CocktailIcon,
      imageSrc: "/weddingtimeline/CockTailHour.png",
    },

    {
      time: "6:00 PM",
      title: "Reception",
      location: siteConfig.ceremony.location,
      icon: DinnerIcon,
      imageSrc: "/weddingtimeline/reception welcom.png",
    },
    // {
    //   time: "7:00 PM",
    //   title: "Reception Program",
    //   location: siteConfig.reception.location,
    //   icon: FireworksIcon,
    //   imageSrc: "/weddingtimeline/dance.png",
    // },
    {
      time: "7:00 PM",
      title: "Dinner",
      location: siteConfig.ceremony.location,
      icon: DinnerIcon,
      imageSrc: "/weddingtimeline/DinnerService.png",
    },
     {
      time: "8:30 PM",
       title: "End of Program",
     location: siteConfig.ceremony.location,
     icon: DanceIcon,
     imageSrc: "/weddingtimeline/SendOff.png",
  },
  ]
}

export function WeddingTimeline() {
  const siteConfig = useSiteConfig()
  const { brideNickname, groomNickname } = siteConfig.couple
  const coupleDisplayName = `${groomNickname} & ${brideNickname}`
  const timelineEvents = buildTimelineEvents(siteConfig)

  return (
    <section
      id="wedding-timeline"
      className="relative z-10 overflow-hidden bg-transparent py-10 sm:py-12 md:py-16 lg:py-20"
    >
      {/* Header */}
      <div className="relative z-10 mx-auto mb-8 max-w-5xl px-6 text-center sm:mb-10 sm:px-10 md:mb-12 md:px-12">
        <p
          className={`${cinzel.className} ${ct.label} mb-2 uppercase tracking-[0.2em] sm:tracking-[0.24em]`}
          style={{ color: WHITE_MUTED, textShadow: TEXT_SHADOW }}
        >
          With {coupleDisplayName}
        </p>
        <h2
          className="mx-auto my-4 text-center leading-[1.08] sm:my-5 md:my-6"
          style={{
            ...displayScript,
            fontSize: "clamp(1.55rem, 4.1vw + 0.65rem, 4.25rem)",
            color: WHITE,
            letterSpacing: "0.02em",
            textShadow: TITLE_SHADOW,
          }}
        >
          Wedding Timeline
        </h2>
        <p
          className={`${ct.bodyLg} mx-auto max-w-2xl px-2 leading-relaxed`}
          style={{ ...bodyFont, color: WHITE_MUTED, textShadow: TEXT_SHADOW }}
        >
          Our day, moment by moment — a simple overview of the key moments, from arrival to farewell.
        </p>
        <div className="flex items-center justify-center pt-2 sm:pt-3">
          <span className="h-px w-16 bg-white/50 sm:w-24 md:w-32" />
        </div>
      </div>

      {/* Timeline */}
      <div className="relative z-10 mx-auto max-w-6xl px-3 sm:px-5 lg:px-8">
        <div
          className="absolute inset-y-0 left-1/2 z-0 w-[2px] -translate-x-1/2 pointer-events-none sm:w-px opacity-80"
          style={{
            background: `linear-gradient(to bottom, transparent, ${LINE_COLOR}, transparent)`,
          }}
        />

        <div className="space-y-7 sm:space-y-8 md:space-y-10 lg:space-y-12">
          {timelineEvents.map((event, index) => (
            <TimelineItem key={`${event.title}-${event.time}-${index}`} event={event} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

function TimelineItem({ event, index }: { event: TimelineEvent; index: number }) {
  const Icon = event.icon
  const isEven = index % 2 === 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="relative z-10"
    >
      <div className="hidden md:grid grid-cols-[1fr_auto_1fr] items-center gap-x-10 lg:gap-x-14">
        <div className={isEven ? "" : "text-right"}>
          <div className="flex items-center justify-end gap-4">
            {!isEven ? (
              <TimelineText event={event} align="right" />
            ) : (
              <IconMark Icon={Icon} imageSrc={event.imageSrc} />
            )}
            <div className="hidden h-px w-10 bg-white/65 opacity-70 lg:block" />
          </div>
        </div>

        <div className="relative flex items-center justify-center">
          <div className="h-2 w-2 rounded-full bg-white" />
        </div>

        <div>
          <div className="flex items-center justify-start gap-4">
            <div className="hidden h-px w-10 bg-white/65 opacity-70 lg:block" />
            {isEven ? (
              <TimelineText event={event} align="left" />
            ) : (
              <IconMark Icon={Icon} imageSrc={event.imageSrc} />
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-x-4 sm:gap-x-6 md:hidden">
        <div className={isEven ? "" : "text-right"}>
          <div className="flex items-center justify-end gap-3">
            {!isEven ? (
              <TimelineText event={event} align="right" />
            ) : (
              <IconMark Icon={Icon} imageSrc={event.imageSrc} mobile />
            )}
            <div className="h-px w-6 bg-white/65 opacity-70" />
          </div>
        </div>

        <div className="relative flex items-center justify-center">
          <div className="h-2 w-2 rounded-full bg-white" />
        </div>

        <div>
          <div className="flex items-center justify-start gap-3">
            <div className="h-px w-6 bg-white/65 opacity-70" />
            {isEven ? (
              <TimelineText event={event} align="left" />
            ) : (
              <IconMark Icon={Icon} imageSrc={event.imageSrc} mobile />
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function TimelineText({
  event,
  align,
}: {
  event: TimelineEvent
  align: "left" | "right"
}) {
  const textAlign = align === "right" ? "text-right" : "text-left"

  return (
    <div className={`max-w-md ${textAlign} ${align === "right" ? "ml-auto" : "mr-auto"}`}>
      <p
        className={`${cinzel.className} ${ct.label} uppercase tracking-[0.2em] sm:tracking-[0.22em]`}
        style={{ color: WHITE, textShadow: TEXT_SHADOW }}
      >
        {event.title}
      </p>
      <p
        className={`${ct.body} mt-0.5 italic`}
        style={{ ...bodyFont, color: WHITE_MUTED, textShadow: TEXT_SHADOW }}
      >
        at {event.time}
      </p>

      {event.description && (
        <p
          className={`${ct.body} mt-1.5 leading-relaxed opacity-90`}
          style={{ ...bodyFont, color: WHITE_MUTED, textShadow: TEXT_SHADOW }}
        >
          {event.description}
        </p>
      )}

      {event.location && (
        <p
          className={`${ct.body} mt-1.5 leading-relaxed opacity-85`}
          style={{ ...bodyFont, color: WHITE_MUTED, textShadow: TEXT_SHADOW }}
        >
          {event.location}
        </p>
      )}
    </div>
  )
}

function IconMark({
  Icon,
  mobile,
  imageSrc,
}: {
  Icon: TimelineIcon
  mobile?: boolean
  imageSrc?: string
}) {
  if (imageSrc) {
    return (
      <CloudinaryImage
        src={imageSrc}
        alt=""
        width={96}
        height={96}
        className={`${
          mobile ? "h-16 w-16" : "h-18 w-18 lg:h-22 lg:w-22"
        } object-contain`}
        style={{ filter: `${ICON_SHADOW} brightness(0) invert(1)` }}
      />
    )
  }

  return (
    <div
      className={`${
        mobile ? "h-14 w-14" : "h-16 w-16 lg:h-18 lg:w-18"
      } flex items-center justify-center rounded-full border border-white/45 bg-white/15`}
      style={{ filter: ICON_SHADOW }}
    >
      <Icon
        className={`${mobile ? "h-7 w-7" : "h-8 w-8 lg:h-9 lg:w-9"}`}
        style={{ color: WHITE }}
      />
    </div>
  )
}

const iconStroke = TIMELINE_SVG_STROKE

function GuestsIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 32 32" fill="none" stroke={iconStroke} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M11 16a4 4 0 1 0-4-4 4 4 0 0 0 4 4Z" />
      <path d="M21 16a3.5 3.5 0 1 0-3.5-3.5A3.5 3.5 0 0 0 21 16Z" />
      <path d="M4 24.5c1.2-3 3.9-4.5 7-4.5s5.8 1.5 7 4.5" />
      <path d="M17.5 19.5A6 6 0 0 1 26 24" />
    </svg>
  )
}

function RingsIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 32 32" fill="none" stroke={iconStroke} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="20" r="6" />
      <circle cx="20" cy="20" r="6" />
      <path d="M14 9 16 5l2 4" />
      <path d="M13 7h6" />
    </svg>
  )
}

function FireworksIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 32 32" fill="none" stroke={iconStroke} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M16 5v4" />
      <path d="M9 7l2.5 2.5" />
      <path d="M23 7 20.5 9.5" />
      <path d="M8 14h4" />
      <path d="M20 14h4" />
      <path d="M11 21 8 24" />
      <path d="M21 21 24 24" />
      <circle cx="16" cy="14" r="3" />
    </svg>
  )
}

function DinnerIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 32 32" fill="none" stroke={iconStroke} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="16" cy="16" r="7" />
      <path d="M7 8v12" />
      <path d="M9.5 8v12" />
      <path d="M23 8v12" />
      <path d="M5 24h22" />
    </svg>
  )
}

function CocktailIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 32 32" fill="none" stroke={iconStroke} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M8 28h16" />
      <path d="M16 28V12" />
      <path d="M10 12h12l-1-4H11l-1 4Z" />
      <circle cx="16" cy="8" r="2" />
      <path d="M12 16h8" />
    </svg>
  )
}

function DanceIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 32 32" fill="none" stroke={iconStroke} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="10" cy="12" r="3" />
      <circle cx="22" cy="12" r="3" />
      <path d="M10 15v6a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-6" />
      <path d="M12 23v2" />
      <path d="M20 23v2" />
      <path d="M8 18h16" />
      <path d="M16 5v4" />
      <path d="M13 7l3-2 3 2" />
    </svg>
  )
}
