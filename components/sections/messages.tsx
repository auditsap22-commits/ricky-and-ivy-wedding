"use client"

import { useRef, useState, useCallback, useEffect } from "react"
import { Section } from "@/components/section"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import MessageWallDisplay from "./message-wall-display"
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
const ACCENT = MOTIF.deep
const NAME_COLOR = "#C97A94"

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
  label: "text-[11px] sm:text-xs md:text-sm",
  body: "text-xs sm:text-sm md:text-base",
  bodyLg: "text-sm sm:text-base md:text-lg",
  formTitle: "text-sm sm:text-base md:text-lg",
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

const formCardStyle = containerStyle

interface Message {
  timestamp: string
  name: string
  message: string
}

interface MessageFormProps {
  onSuccess?: () => void
  onMessageSent?: () => void
}

function MessageForm({ onSuccess, onMessageSent }: MessageFormProps) {
  const siteConfig = useSiteConfig()
  const { brideNickname, groomNickname } = siteConfig.couple
  const coupleDisplayName = `${groomNickname} & ${brideNickname}`

  const formRef = useRef<HTMLFormElement>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const [nameValue, setNameValue] = useState("")
  const [messageValue, setMessageValue] = useState("")
  const [focusedField, setFocusedField] = useState<string | null>(null)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    const formData = new FormData(e.currentTarget)
    const name = formData.get("name") as string
    const message = formData.get("message") as string

    const googleFormData = new FormData()
    googleFormData.append("entry.405401269", name)
    googleFormData.append("entry.893740636", message)

    try {
      await fetch(siteConfig.googleAPI.messageForm, {
        method: "POST",
        mode: "no-cors",
        body: googleFormData,
      })

      toast({
        title: "Message sent",
        description: "Thank you for your kind words.",
        duration: 3000,
      })

      setIsSubmitted(true)
      setNameValue("")
      setMessageValue("")
      formRef.current?.reset()

      setTimeout(() => setIsSubmitted(false), 1000)

      if (onSuccess) onSuccess()
      if (onMessageSent) onMessageSent()
    } catch {
      toast({
        title: "Unable to send message",
        description: "Please try again in a moment.",
        variant: "destructive",
        duration: 3000,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const inputBorder = (field: string) =>
    focusedField === field
      ? ACCENT
      : `color-mix(in srgb, ${MOTIF.silver} 65%, white)`

  const inputClass = (field: string) =>
    `message-form-input w-full border-2 rounded-xl py-2 sm:py-2.5 md:py-3 px-3 sm:px-4 ${ct.body} placeholder:italic transition-all duration-300 bg-white shadow-sm hover:shadow-md focus:shadow-lg ${
      focusedField === field ? "shadow-lg" : ""
    }`

  return (
    <div className="relative w-full max-w-xl mx-auto">
      <style>{`
        .message-form-input::placeholder,
        .message-form-textarea::placeholder {
          color: #9CA3AF !important;
          opacity: 1 !important;
        }
      `}</style>

      <Card
        className={`relative w-full border backdrop-blur-md transition-all duration-500 overflow-hidden rounded-2xl ${
          isFocused ? "scale-[1.01]" : ""
        } ${isSubmitted ? "animate-bounce" : ""}`}
        style={formCardStyle}
      >
        {isSubmitted && (
          <div
            className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none"
            style={{ backgroundColor: `color-mix(in srgb, ${MOTIF.soft} 92%, white)` }}
          >
            <p
              className={`${cinzel.className} font-semibold ${ct.formTitle}`}
              style={{ color: NAME_COLOR }}
            >
              Sent!
            </p>
          </div>
        )}

        <CardContent className="relative p-4 sm:p-5 md:p-6 lg:p-8">
          <div className="text-center mb-4 sm:mb-5 md:mb-6">
            <h3
              className={`${cinzel.className} ${ct.formTitle} font-semibold mb-1.5`}
              style={{ color: NAME_COLOR }}
            >
              Share Your Love
            </h3>
            <p className={ct.body} style={{ ...bodyFont, color: TEXT }}>
              Leave a note for {coupleDisplayName} to read and keep.
            </p>
          </div>

          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="space-y-3 sm:space-y-4 md:space-y-5"
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          >
            <div className="space-y-1.5 sm:space-y-2">
              <label
                className={`${cinzel.className} ${ct.body} font-medium`}
                style={{ color: ACCENT }}
              >
                Your Name
              </label>
              <Input
                name="name"
                required
                value={nameValue}
                onChange={(e) => setNameValue(e.target.value)}
                onFocus={() => setFocusedField("name")}
                onBlur={() => setFocusedField(null)}
                placeholder="Full name"
                className={inputClass("name")}
                style={{
                  color: TEXT,
                  fontFamily: bodyFont.fontFamily,
                  borderColor: inputBorder("name"),
                }}
              />
            </div>

            <div className="space-y-1.5 sm:space-y-2">
              <div className="flex items-center justify-between gap-2">
                <label
                  className={`${cinzel.className} ${ct.body} font-medium`}
                  style={{ color: ACCENT }}
                >
                  Your Message
                </label>
                {messageValue && (
                  <span
                    className={`${ct.label} ${messageValue.length > 500 ? "text-red-500" : ""}`}
                    style={messageValue.length <= 500 ? { color: ACCENT } : undefined}
                  >
                    {messageValue.length}/500
                  </span>
                )}
              </div>
              <Textarea
                name="message"
                required
                value={messageValue}
                onChange={(e) => {
                  if (e.target.value.length <= 500) {
                    setMessageValue(e.target.value)
                  }
                }}
                onFocus={() => setFocusedField("message")}
                onBlur={() => setFocusedField(null)}
                placeholder={`Write your wishes, prayer, or kind words for ${coupleDisplayName}...`}
                className={`message-form-textarea ${inputClass("message")} min-h-[90px] sm:min-h-[110px] md:min-h-[130px] resize-none placeholder:leading-relaxed`}
                style={{
                  color: TEXT,
                  fontFamily: bodyFont.fontFamily,
                  borderColor: inputBorder("message"),
                }}
              />
            </div>

            <Button
              type="submit"
              disabled={isSubmitting || !nameValue.trim() || !messageValue.trim()}
              className={`${cinzel.className} w-full py-2.5 sm:py-3 px-5 rounded-full ${ct.btn} uppercase tracking-[0.18em] font-semibold transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none border`}
              style={{
                backgroundColor: ACCENT,
                borderColor: MOTIF.medium,
                color: MOTIF.cream,
                boxShadow: "0 6px 20px rgba(217, 140, 164, 0.28)",
              }}
              onMouseEnter={(e) => {
                if (!e.currentTarget.disabled) {
                  e.currentTarget.style.backgroundColor = MOTIF.accent
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = ACCENT
              }}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Sending...
                </span>
              ) : (
                "Send Message"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export function Messages() {
  const siteConfig = useSiteConfig()
  const { brideNickname, groomNickname } = siteConfig.couple
  const coupleDisplayName = `${groomNickname} & ${brideNickname}`

  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(false)

  const fetchMessages = useCallback(() => {
    setLoading(true)
    fetch("/api/messages", {
      cache: "no-store",
      headers: { "Cache-Control": "no-cache" },
    })
      .then((res) => res.json())
      .then((data) => {
        if (!Array.isArray(data)) {
          setMessages([])
          setLoading(false)
          return
        }
        const parsed = data.filter((m) => m.name || m.message || m.timestamp).reverse()
        setMessages(parsed)
        setLoading(false)
      })
      .catch((error) => {
        console.error("Failed to fetch messages:", error)
        setLoading(false)
      })
  }, [])

  useEffect(() => {
    fetchMessages()
  }, [fetchMessages])

  return (
    <Section
      id="messages"
      className="relative bg-transparent pt-8 pb-8 sm:pt-10 sm:pb-10 md:pt-12 md:pb-12 lg:pt-14 lg:pb-14"
    >
      <div className="relative z-10 max-w-6xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        {/* Header — outside container, on silk backdrop */}
        <div className="text-center mb-6 sm:mb-8 md:mb-10">
          <p
            className={`${cinzel.className} ${ct.label} uppercase tracking-[0.2em] sm:tracking-[0.24em] mb-2`}
            style={{ color: OUTSIDE_LABEL }}
          >
            For {coupleDisplayName}
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
            Love Notes &amp; Prayers
          </h2>
          <p
            className={`${ct.bodyLg} max-w-2xl mx-auto leading-relaxed px-2`}
            style={{ ...bodyFont, color: OUTSIDE_TEXT_MUTED }}
          >
            Share a short note, wish, or prayer for {coupleDisplayName}. Every message becomes part of their story.
          </p>

          <div className="flex items-center justify-center pt-2 sm:pt-3">
            <span className="h-px w-16 sm:w-24 md:w-32 bg-white/50" />
          </div>
        </div>

        {/* Form — independent container */}
        <div className="flex justify-center mb-8 sm:mb-10 md:mb-12">
          <MessageForm onMessageSent={fetchMessages} />
        </div>

        {/* Message wall header — outside container, on silk backdrop */}
        <div className="text-center mb-6 sm:mb-8 md:mb-10">
          <h3
            className={`${cinzel.className} text-sm sm:text-base md:text-lg lg:text-xl font-semibold mb-1.5 sm:mb-2`}
            style={{ color: OUTSIDE_TEXT }}
          >
            Messages from Loved Ones
          </h3>
          <p className={ct.body} style={{ ...bodyFont, color: OUTSIDE_TEXT_MUTED }}>
            Warm words from family and friends
          </p>
          <div className="flex items-center justify-center pt-2 sm:pt-3">
            <span className="h-px w-16 sm:w-24 md:w-32 bg-white/50" />
          </div>
        </div>

        {/* Each message — its own independent container */}
        <div className="relative max-w-4xl mx-auto">
          <MessageWallDisplay messages={messages} loading={loading} />
        </div>
      </div>
    </Section>
  )
}
