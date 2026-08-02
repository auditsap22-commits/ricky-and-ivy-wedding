"use client"

import { useMemo, useState, type ReactNode } from "react"
import type { SiteConfig } from "@/lib/site-config"
import { ChevronDown } from "lucide-react"
import { Cinzel } from "next/font/google"
import { useSiteConfig } from "@/hooks/use-site-config"

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
  question: "text-xs sm:text-sm md:text-base",
} as const

const linkClass =
  "underline font-semibold transition-colors hover:opacity-80"

const cardStyle = {
  background: `linear-gradient(
    155deg,
    #FFFFFF 0%,
    ${MOTIF.cream} 38%,
    ${MOTIF.soft} 72%,
    ${MOTIF.lightBlush} 100%
  )`,
  borderColor: `color-mix(in srgb, ${MOTIF.silver} 72%, white)`,
  boxShadow: `0 16px 48px color-mix(in srgb, ${MOTIF.deep} 12%, transparent), inset 0 1px 0 rgba(255, 255, 255, 0.88)`,
} as const

const cardAmbientGlowStyle = {
  background: `linear-gradient(135deg, ${MOTIF.soft} 0%, ${MOTIF.lightBlush} 48%, ${MOTIF.medium} 100%)`,
} as const

interface FAQItem {
  question: string
  answer: string | ReactNode
}

function getFaqItems(siteConfig: SiteConfig): FAQItem[] {
  return [
    {
      question: "When is the wedding?",
      answer: `Our wedding will be held on ${siteConfig.ceremony.date} (${siteConfig.ceremony.day})`,
    },
    {
      question: "What time should I arrive for the ceremony?",
      answer: `Our ceremony will begin promptly at ${siteConfig.ceremony.time}. We kindly ask guests to arrive 30–45 minutes earlier to allow enough time for parking, walking to the ceremony area, and finding your seats so we can begin on time.`,
    },
    {
      question: "Where will the ceremony and reception take place?",
      answer: `The ceremony and reception will be held at ${siteConfig.ceremony.location}, ${siteConfig.ceremony.venue}. You can find detailed directions, addresses, and maps in the Details section above.`,
    },
    {
      question: "How do I RSVP?",
      answer: (
        <>
          Please RSVP using the{" "}
          <a
            href="#guest-list"
            className={linkClass}
            style={{ color: palette.accent }}
            onClick={(e) => {
              e.preventDefault()
              document.getElementById("guest-list")?.scrollIntoView({ behavior: "smooth" })
            }}
          >
            guest list
          </a>{" "}
          on this invitation: search for your name and confirm your attendance.
          {"\n"}
          Please respond by{" "}
          {siteConfig.details.rsvp.deadline.replace(/\.\s*$/, "")}.
          {"\n"}
          If you have questions, message{" "}

          or coordinator : {siteConfig.details.rsvp.coordinator} : {siteConfig.details.rsvp.phone} .
          <a
            href="https://www.facebook.com/d.allison.CADA"
            target="_blank"
            rel="noopener noreferrer"
            className={linkClass}
            style={{ color: palette.accent }}
          >
            {siteConfig.couple.bride}
          </a>{" "}
          or{" "}
          <a
            href="https://www.facebook.com/${siteConfig.couple.groom}"
            target="_blank"
            rel="noopener noreferrer"
            className={linkClass}
            style={{ color: palette.accent }}
          >
            {siteConfig.couple.groom}
          </a>{" "}
          on Messenger.
        </>
      ),
    },
    {
      question: 'Do we really need to RSVP? We already said "Yes" to the couple.',
      answer:
        "Yes, please. We will be needing your formal RSVP to consolidate guest details and finalize the headcount for catering and seating purposes.",
    },
    {
      question: "Can I sit anywhere at the reception?",
      answer:
        "Please don't. It took us a lot of effort and discussion to finish the seating arrangement, which is planned for everyone's convenience and preference.",
    },
    {
      question: 'Can I bring a "Plus One" to the event?',
      answer:
        "As much as we would love to accommodate all our friends and family, we have a limited number of guests. Please understand that this event is strictly by invitation only.",
    },
    {
      question: "Can I bring my child to the event?",
      answer:
        'As much as we each adore your little ones, we cannot include children at our ceremony and reception, other than those that are part of the entourage, due to constraints on our venue\'s capacity. We are looking forward to celebrating a Parents\' "Night Out" with you!',
    },
    {
      question:
        'I said "No" to the RSVP but I had a change of plans—I can attend now! What should I do?',
      answer:
        "Please check with us first as we have a strict guest list. If seats become available, we will let you know as soon as possible. Please do not attend unannounced, as we may not have any available seats for you.",
    },
    {
      question: "What if I RSVP'd but cannot attend?",
      answer:
        "We would love to have you at our wedding, but we understand that there are circumstances beyond our control. However, please let us know as soon as possible so we can reallocate your seat/s.",
    },
    {
      question: "Is there parking available?",
      answer:
        "Yes, parking is available at the venue, and parking attendants, along with our coordinators, will assist you on the day.",
    },
    // {
    //   question: "Will there be a wedding gift registry?",
    //   answer:
    //     "With all that we have, we are truly blessed. Your presence and prayers are what we request most. However, if you desire to give nonetheless, a monetary gift to help us begin our new life together would be humbly appreciated. You can find our gift registry information in the Gift Guide section.",
    // },
    {
      question: "Unplugged Ceremony",
      answer:
        "EYES UP, PHONES DOWN, HEARTS OPEN.\n\nThe greatest gift you can give us during our ceremony is your presence. We respectfully request that guests refrain from taking photos or videos during the ceremony so our official photographers can capture every moment without distraction. We promise to share the beautiful photos with you afterward!\n\nOur professional photographers will be capturing every beautiful memory, and we promise to share the photos with everyone afterwards.",
    },
    {
      question: "Can I take photos or videos during the reception?",
      answer:
        "Yes! While our I DO's will be unplugged, our reception will not be. As a couple who loves photos and memories, we would love for you to capture the fun moments throughout the evening. We prepared this celebration wholeheartedly and we want everyone to enjoy it fully.",
    },
    {
      question: "When is the appropriate time to leave?",
      answer:
        "It took us some time to plan for a heartfelt wedding that everyone would hopefully enjoy. We humbly request that you celebrate with us until the program ends. Please don't eat and run! Let's laugh, take pictures, sing, and have fun!",
    },
    {
      question: "What if I have dietary restrictions or allergies?",
      answer:
        "Please let us know about any dietary restrictions or allergies when you RSVP. We want to ensure everyone can enjoy the celebration comfortably.",
    },
    {
      question: "How can I help the couple have a great time during their wedding?",
      answer:
        "• Pray with us for favorable weather and the continuous blessings of our Lord as we enter this new chapter of our lives as husband and wife.\n\n• RSVP as soon as your schedule is cleared.\n\n• Dress appropriately and follow our wedding motif.\n\n• Be on time.\n\n• Follow the seating arrangement in the reception.\n\n• Stay until the end of the program.\n\n• Join the activities and enjoy!",
    },
  ]
}

function FaqAnswer({ answer }: { answer: string | ReactNode }) {
  if (typeof answer !== "string") {
    return (
      <div
        className={`${ct.body} leading-relaxed whitespace-pre-line`}
        style={{ ...bodyFont, color: palette.body }}
      >
        {answer}
      </div>
    )
  }

  if (answer.includes("[RSVP_LINK]")) {
    return (
      <p
        className={`${ct.body} leading-relaxed whitespace-pre-line`}
        style={{ ...bodyFont, color: palette.body }}
      >
        {answer.split("[RSVP_LINK]")[0]}
        <a
          href="#guest-list"
          className={linkClass}
          style={{ color: palette.accent }}
          onClick={(e) => {
            e.preventDefault()
            document.getElementById("guest-list")?.scrollIntoView({ behavior: "smooth" })
          }}
        >
          {answer.match(/\[RSVP_LINK\](.*?)\[\/RSVP_LINK\]/)?.[1]}
        </a>
        {answer.split("[/RSVP_LINK]")[1]}
      </p>
    )
  }

  return (
    <p
      className={`${ct.body} leading-relaxed whitespace-pre-line`}
      style={{ ...bodyFont, color: palette.body }}
    >
      {answer}
    </p>
  )
}

export function FAQ() {
  const siteConfig = useSiteConfig()
  const { brideNickname, groomNickname } = siteConfig.couple
  const coupleDisplayName = `${groomNickname} & ${brideNickname}`
  const faqItems = useMemo(() => getFaqItems(siteConfig), [siteConfig])
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="relative isolate w-full overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{ background: sectionBackground }}
        aria-hidden
      />

      <section
        id="faq"
        className="relative z-10 pt-8 pb-8 sm:pt-10 sm:pb-10 md:pt-12 md:pb-12 lg:pt-14 lg:pb-14 isolate overflow-hidden"
      >
      {/* Header */}
      <div className="relative z-20 text-center mb-6 sm:mb-8 md:mb-10 px-6 sm:px-10 md:px-12">
        <p
          className={`${cinzel.className} ${ct.label} uppercase tracking-[0.2em] sm:tracking-[0.24em] mb-2`}
          style={{ color: ACCENT }}
        >
          For {coupleDisplayName}
        </p>
        <h2
          className="mx-auto my-4 whitespace-nowrap text-center sm:my-5 md:my-6 leading-[1.08]"
          style={{
            ...displayScript,
            fontSize: "clamp(1.35rem, 3.2vw + 0.5rem, 4.25rem)",
            color: NAME_COLOR,
            letterSpacing: "0.02em",
            textShadow: NAME_SHADOW,
          }}
        >
          Frequently Asked Questions
        </h2>
        <p
          className={`${ct.bodyLg} max-w-2xl mx-auto leading-relaxed px-2`}
          style={{ ...bodyFont, color: TEXT }}
        >
          Helpful notes so you can simply arrive, celebrate, and enjoy this new chapter with us.
        </p>
        <div className="flex items-center justify-center pt-2 sm:pt-3">
          <span
            className="h-px w-16 sm:w-24 md:w-32"
            style={{ backgroundColor: `color-mix(in srgb, ${MOTIF.silver} 75%, white)` }}
          />
        </div>
      </div>

      {/* FAQ accordion */}
      <div className="relative z-20 max-w-3xl mx-auto px-4 sm:px-6 md:px-8 my-6 sm:my-8 md:my-10 mb-12 sm:mb-16 md:mb-20">
        <div className="relative">
          <div
            className="pointer-events-none absolute -inset-1 rounded-2xl opacity-50 blur-2xl sm:-inset-2"
            style={cardAmbientGlowStyle}
            aria-hidden
          />
          <div
            className="relative z-20 rounded-xl sm:rounded-2xl border overflow-hidden"
            style={cardStyle}
          >
            <div
              className="pointer-events-none absolute inset-0 rounded-xl sm:rounded-2xl ring-1 ring-inset ring-white/35"
              aria-hidden
            />

            <div className="relative z-20 p-3 sm:p-4 md:p-5 space-y-2 sm:space-y-2.5">
              {faqItems.map((item, index) => {
                const isOpen = openIndex === index
                const contentId = `faq-item-${index}`
                return (
                  <div
                    key={index}
                    className="relative z-20 rounded-xl border transition-all duration-300"
                    style={{
                      borderColor: isOpen
                        ? `color-mix(in srgb, ${ACCENT} 35%, white)`
                        : `color-mix(in srgb, ${MOTIF.silver} 30%, white)`,
                      backgroundColor: "#FFFFFF",
                      boxShadow: isOpen
                        ? `0 4px 16px color-mix(in srgb, ${ACCENT} 8%, transparent)`
                        : "none",
                    }}
                  >
                    <button
                      onClick={() => toggleItem(index)}
                      className="group w-full px-3 sm:px-4 md:px-5 py-2.5 sm:py-3 flex items-center justify-between text-left outline-none transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                      style={{ outlineColor: ACCENT }}
                      aria-expanded={isOpen}
                      aria-controls={contentId}
                    >
                      <span
                        className={`${cinzel.className} ${ct.question} font-semibold pr-3 leading-snug transition-colors duration-200`}
                        style={{ color: isOpen ? palette.accent : palette.heading }}
                      >
                        {item.question}
                      </span>
                      <ChevronDown
                        size={18}
                        className={`flex-shrink-0 w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                        style={{ color: isOpen ? palette.accent : palette.label }}
                        aria-hidden
                      />
                    </button>

                    <div
                      id={contentId}
                      role="region"
                      className={`grid transition-all duration-300 ease-out ${
                        isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <div
                          className="px-3 sm:px-4 md:px-5 pb-3 sm:pb-4 pt-0 border-t"
                          style={{ borderColor: `color-mix(in srgb, ${MOTIF.silver} 25%, white)` }}
                        >
                          <FaqAnswer answer={item.answer} />
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
    </div>
  )
}
