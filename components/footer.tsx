import { siteConfig } from "@/content/site"

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

export function Footer() {
  return (
    <div className="relative isolate w-full overflow-hidden">
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

      <footer
        className="relative z-10 overflow-hidden border-t pt-8 pb-8 sm:pt-10 sm:pb-10"
        style={{
          borderColor: `color-mix(in srgb, ${MOTIF.silver} 72%, white)`,
        }}
      >
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="text-center mb-8 sm:mb-10">
            <p
              className="text-[11px] sm:text-xs uppercase tracking-[0.2em] mb-2 font-semibold"
              style={{ color: ACCENT }}
            >
              With Love
            </p>
            <h3
              className="whitespace-nowrap leading-[1.08]"
              style={{
                ...displayScript,
                fontSize: "clamp(1.5rem, 4vw + 0.5rem, 2.5rem)",
                color: NAME_COLOR,
                textShadow: NAME_SHADOW,
              }}
            >
              {siteConfig.couple.bride} & {siteConfig.couple.groom}
            </h3>
            <p className="text-sm mt-2" style={{ color: TEXT }}>
              {siteConfig.wedding.date}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h4
                className="font-semibold mb-2 tracking-[0.16em] uppercase text-xs"
                style={{ color: TEXT_DEEP }}
              >
                Ceremony
              </h4>
              <p className="text-sm" style={{ color: TEXT }}>
                {siteConfig.ceremony.location}
              </p>
            </div>
            <div>
              <h4
                className="font-semibold mb-2 tracking-[0.16em] uppercase text-xs"
                style={{ color: TEXT_DEEP }}
              >
                Reception
              </h4>
              <p className="text-sm" style={{ color: TEXT }}>
                {siteConfig.reception.location}
              </p>
            </div>
            <div>
              <h4
                className="font-semibold mb-2 tracking-[0.16em] uppercase text-xs"
                style={{ color: TEXT_DEEP }}
              >
                Celebrate With Us
              </h4>
              <p className="text-sm" style={{ color: TEXT }}>
                {siteConfig.ceremony.venue}
              </p>
            </div>
          </div>

          <div
            className="mt-8 pt-8 text-center text-sm border-t"
            style={{
              borderColor: `color-mix(in srgb, ${MOTIF.silver} 72%, white)`,
              color: ACCENT,
            }}
          >
            <p>With love and gratitude • {new Date().getFullYear()}</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
