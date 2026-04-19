"use client"

import { useEffect, useMemo, useState, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Script from "next/script"
import { Search, CheckCircle2, XCircle, Loader2, ShoppingCart, Share2, MessageCircle, Sparkles, Globe2, Shield, Zap, QrCode } from "lucide-react"

declare global {
  interface Window { Razorpay: new (opts: Record<string, unknown>) => { open: () => void } }
}
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import Breadcrumb from "@/components/Breadcrumb"

// TLD catalog — sell price shown, cost kept internal. Edit here to adjust markup.
type Tld = { tld: string; price: number; strike?: number; renew: number; tag?: string }

const TLDS: Tld[] = [
  { tld: "com",    price: 899,  strike: 1299, renew: 1299, tag: "Most popular" },
  { tld: "in",     price: 499,  strike: 899,  renew: 899 },
  { tld: "org",    price: 699,  strike: 1299, renew: 1299 },
  { tld: "net",    price: 999,  strike: 1569, renew: 1569 },
  { tld: "co",     price: 2199, strike: 2899, renew: 2899 },
  { tld: "io",     price: 3499, strike: 4499, renew: 4499, tag: "Startup" },
  { tld: "ai",     price: 7999, strike: 9999, renew: 9999, tag: "AI brands" },
  { tld: "app",    price: 1499, strike: 1899, renew: 1899 },
  { tld: "dev",    price: 1499, strike: 1899, renew: 1899 },
  { tld: "online", price: 99,   strike: 3139, renew: 3139, tag: "Year 1 deal" },
  { tld: "shop",   price: 299,  strike: 3999, renew: 3999 },
  { tld: "store",  price: 199,  strike: 5999, renew: 5999 },
  { tld: "tech",   price: 599,  strike: 4999, renew: 4999 },
  { tld: "site",   price: 149,  strike: 2999, renew: 2999 },
  { tld: "xyz",    price: 199,  strike: 999,  renew: 999 },
]

const TLD_MAP = Object.fromEntries(TLDS.map(t => [t.tld, t])) as Record<string, Tld>

const WHATSAPP = "971542416803"

function priceFor(tld: string): Tld {
  return TLD_MAP[tld] || { tld, price: 999, renew: 999 }
}

function formatINR(n: number) {
  return "₹" + n.toLocaleString("en-IN")
}

type CheckResult = {
  domain: string
  tld: string
  available: boolean | null
  message?: string
}

function DomainsInner() {
  const sp = useSearchParams()
  const router = useRouter()
  const initialQ = sp.get("q") || ""
  const [query, setQuery] = useState(initialQ)
  const [results, setResults] = useState<CheckResult[]>([])
  const [loading, setLoading] = useState(false)
  const [cart, setCart] = useState<string[]>([])

  // restore cart
  useEffect(() => {
    try {
      const saved = localStorage.getItem("9ruby:domains:cart")
      if (saved) setCart(JSON.parse(saved))
    } catch {}
  }, [])

  useEffect(() => {
    try { localStorage.setItem("9ruby:domains:cart", JSON.stringify(cart)) } catch {}
  }, [cart])

  useEffect(() => { if (initialQ) runSearch(initialQ) }, []) // eslint-disable-line

  async function runSearch(raw: string) {
    const clean = raw.trim().toLowerCase().replace(/^https?:\/\//, "").replace(/\/.*$/, "")
    if (!clean) return
    setLoading(true)
    setResults([])
    const url = new URL(window.location.href)
    url.searchParams.set("q", clean)
    router.replace(url.pathname + "?" + url.searchParams.toString(), { scroll: false })

    const base = clean.includes(".") ? clean.split(".")[0] : clean
    const requestedTld = clean.includes(".") ? clean.split(".").slice(1).join(".") : null
    const tldList = requestedTld
      ? [requestedTld, ...TLDS.filter(t => t.tld !== requestedTld).slice(0, 7).map(t => t.tld)]
      : TLDS.slice(0, 8).map(t => t.tld)

    const checks = await Promise.all(tldList.map(async (tld) => {
      try {
        const r = await fetch(`/api/domains/check?domain=${encodeURIComponent(base + "." + tld)}`)
        return await r.json() as CheckResult
      } catch {
        return { domain: base + "." + tld, tld, available: null, message: "Error" }
      }
    }))
    setResults(checks)
    setLoading(false)
  }

  function toggleCart(domain: string) {
    setCart(c => c.includes(domain) ? c.filter(d => d !== domain) : [...c, domain])
  }

  const cartTotal = useMemo(() => cart.reduce((sum, d) => {
    const tld = d.split(".").slice(1).join(".")
    return sum + priceFor(tld).price
  }, 0), [cart])

  function shareLink() {
    const url = window.location.href
    if (navigator.share) navigator.share({ title: "9Ruby Domains", url }).catch(() => {})
    else { navigator.clipboard.writeText(url); alert("Link copied") }
  }

  function whatsappCheckout() {
    if (!cart.length) return
    const lines = cart.map(d => {
      const tld = d.split(".").slice(1).join(".")
      return `• ${d} — ${formatINR(priceFor(tld).price)}/yr`
    }).join("\n")
    const msg = `Hi 9Ruby, I want to register these domains:\n\n${lines}\n\nTotal: ${formatINR(cartTotal)}`
    const url = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`
    window.open(url, "_blank")
  }

  const [showQR, setShowQR] = useState(false)

  function payViaRazorpay() {
    setShowQR(true)
  }

  return (
    <div style={{ background: "var(--surface)", minHeight: "100vh" }}>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="afterInteractive" />
      <Navbar />
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Domains" }]} />

      {/* Hero */}
      <section className="px-6 pt-16 pb-12 md:pt-24 md:pb-16">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs tracking-wide mb-6"
               style={{ background: "rgba(139,107,61,0.08)", color: "#8B6B3D" }}>
            <Sparkles size={12} /> 9Ruby Domains — transparent pricing
          </div>
          <h1 className="font-serif italic text-5xl md:text-7xl leading-tight mb-4" style={{ color: "var(--ink)" }}>
            Find your domain.
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto mb-10" style={{ color: "var(--ink-muted)" }}>
            One clean price. No upsell traps. We buy from the best registrars, you get the domain under 9Ruby care.
          </p>

          {/* Search */}
          <form onSubmit={(e) => { e.preventDefault(); runSearch(query) }}
                className="flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto">
            <div className="flex-1 flex items-center gap-3 px-5 py-4 rounded-xl border"
                 style={{ background: "var(--surface-elevated)", borderColor: "rgba(0,0,0,0.08)" }}>
              <Search size={18} style={{ color: "var(--ink-soft)" }} />
              <input
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="yourbrand.com"
                className="flex-1 bg-transparent outline-none text-base"
                style={{ color: "var(--ink)" }}
              />
            </div>
            <button type="submit"
                    className="px-6 py-4 rounded-xl font-medium text-white transition-opacity hover:opacity-90"
                    style={{ background: "#8B6B3D" }}>
              {loading ? <Loader2 className="animate-spin" size={18} /> : "Search"}
            </button>
          </form>
        </div>
      </section>

      {/* Results */}
      {(results.length > 0 || loading) && (
        <section className="px-6 pb-16">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm uppercase tracking-wider" style={{ color: "var(--ink-soft)" }}>
                Availability
              </h2>
              <button onClick={shareLink}
                      className="inline-flex items-center gap-2 text-sm hover:opacity-70"
                      style={{ color: "var(--ink-muted)" }}>
                <Share2 size={14} /> Share
              </button>
            </div>
            <div className="rounded-2xl overflow-hidden border" style={{ borderColor: "rgba(0,0,0,0.08)", background: "var(--surface-elevated)" }}>
              {loading && results.length === 0 && (
                <div className="p-8 flex items-center justify-center gap-3" style={{ color: "var(--ink-soft)" }}>
                  <Loader2 className="animate-spin" size={18} /> Checking registries…
                </div>
              )}
              {results.map((r, i) => {
                const p = priceFor(r.tld)
                const inCart = cart.includes(r.domain)
                return (
                  <div key={r.domain + i}
                       className="flex flex-wrap items-center gap-4 px-5 py-4"
                       style={{ borderTop: i === 0 ? "none" : "1px solid rgba(0,0,0,0.06)" }}>
                    <div className="flex items-center gap-3 flex-1 min-w-[220px]">
                      {r.available === true && <CheckCircle2 size={18} className="text-green-600" />}
                      {r.available === false && <XCircle size={18} style={{ color: "var(--ink-soft)" }} />}
                      {r.available === null && <Loader2 size={18} style={{ color: "var(--ink-soft)" }} />}
                      <span className="font-medium text-base" style={{ color: "var(--ink)" }}>{r.domain}</span>
                      {p.tag && <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full"
                                      style={{ background: "rgba(139,107,61,0.08)", color: "#8B6B3D" }}>{p.tag}</span>}
                    </div>
                    <div className="text-right">
                      {p.strike && <div className="text-xs line-through" style={{ color: "var(--ink-soft)" }}>{formatINR(p.strike)}</div>}
                      <div className="text-lg font-semibold" style={{ color: "var(--ink)" }}>{formatINR(p.price)}<span className="text-xs font-normal" style={{ color: "var(--ink-muted)" }}>/yr</span></div>
                      <div className="text-[10px]" style={{ color: "var(--ink-soft)" }}>renews at {formatINR(p.renew)}</div>
                    </div>
                    <button
                      disabled={r.available === false}
                      onClick={() => toggleCart(r.domain)}
                      className="px-4 py-2 rounded-lg text-sm font-medium transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                      style={inCart
                        ? { background: "#8B6B3D", color: "white" }
                        : { background: "rgba(0,0,0,0.05)", color: "var(--ink)" }}>
                      {r.available === false ? "Taken" : inCart ? "In cart" : "Add"}
                    </button>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* TLD pricing grid */}
      <section className="px-6 py-16" style={{ background: "var(--surface-soft, rgba(0,0,0,0.02))" }}>
        <div className="max-w-6xl mx-auto">
          <h2 className="font-serif italic text-4xl md:text-5xl mb-3" style={{ color: "var(--ink)" }}>All extensions.</h2>
          <p className="mb-10" style={{ color: "var(--ink-muted)" }}>Year-one pricing. Renews at the price shown below.</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {TLDS.map(t => (
              <div key={t.tld}
                   className="p-5 rounded-xl border transition-colors hover:border-[#8B6B3D]"
                   style={{ background: "var(--surface-elevated)", borderColor: "rgba(0,0,0,0.08)" }}>
                <div className="flex items-baseline gap-1 mb-3">
                  <span className="text-xl font-medium" style={{ color: "#8B6B3D" }}>.{t.tld}</span>
                </div>
                {t.strike && <div className="text-xs line-through" style={{ color: "var(--ink-soft)" }}>{formatINR(t.strike)}</div>}
                <div className="text-lg font-semibold" style={{ color: "var(--ink)" }}>{formatINR(t.price)}<span className="text-xs font-normal" style={{ color: "var(--ink-muted)" }}>/yr</span></div>
                {t.tag && <div className="text-[10px] uppercase tracking-wider mt-2" style={{ color: "#8B6B3D" }}>{t.tag}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why 9Ruby */}
      <section className="px-6 py-16">
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8">
          {[
            { icon: Globe2, title: "All major registrars", body: "We source from Namecheap, Hostinger, GoDaddy — you get the best price, we handle the mess." },
            { icon: Shield, title: "Privacy included", body: "WHOIS privacy and SSL guidance included with every registration. No upsell pop-ups." },
            { icon: Zap,    title: "Fast handover", body: "Most domains delivered within hours. Transfer codes and DNS support included." },
          ].map(({ icon: Icon, title, body }) => (
            <div key={title}>
              <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
                   style={{ background: "rgba(139,107,61,0.08)", color: "#8B6B3D" }}>
                <Icon size={18} />
              </div>
              <h3 className="text-lg font-medium mb-2" style={{ color: "var(--ink)" }}>{title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: "var(--ink-muted)" }}>{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Sticky cart */}
      {cart.length > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
          <div className="flex items-center gap-3 px-5 py-3 rounded-full shadow-lg border"
               style={{ background: "var(--surface-elevated)", borderColor: "rgba(0,0,0,0.08)" }}>
            <ShoppingCart size={16} style={{ color: "#8B6B3D" }} />
            <span className="text-sm" style={{ color: "var(--ink)" }}>
              {cart.length} domain{cart.length > 1 ? "s" : ""} · <strong>{formatINR(cartTotal)}</strong>
            </span>
            <button onClick={payViaRazorpay}
                    className="ml-2 inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium text-white hover:opacity-90"
                    style={{ background: "#8B6B3D" }}>
              <QrCode size={14} /> Pay now
            </button>
            <button onClick={whatsappCheckout}
                    className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium text-white hover:opacity-90"
                    style={{ background: "#25D366" }}>
              <MessageCircle size={14} /> WhatsApp
            </button>
          </div>
        </div>
      )}

      {/* Razorpay QR modal */}
      {showQR && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
             style={{ background: "rgba(0,0,0,0.6)" }}
             onClick={() => setShowQR(false)}>
          <div className="rounded-2xl p-8 max-w-sm w-full text-center"
               style={{ background: "var(--surface-elevated)" }}
               onClick={e => e.stopPropagation()}>
            <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-serif italic text-lg mx-auto mb-4" style={{ background: "#8B6B3D" }}>9</div>
            <h3 className="text-xl font-semibold mb-1" style={{ color: "var(--ink)" }}>Pay via 9Ruby</h3>
            <p className="text-sm mb-5" style={{ color: "var(--ink-muted)" }}>Scan the QR code or tap the button to pay {formatINR(cartTotal)}</p>
            {/* QR via Google Charts API */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`https://chart.googleapis.com/chart?chs=240x240&cht=qr&chl=${encodeURIComponent("https://razorpay.me/@9ruby?amount=" + cartTotal * 100)}&choe=UTF-8`}
              alt="Razorpay QR"
              width={240} height={240}
              className="mx-auto rounded-xl mb-5"
            />
            <a href={`https://razorpay.me/@9ruby?amount=${cartTotal * 100}`}
               target="_blank"
               className="block w-full px-5 py-3 rounded-xl font-medium text-white mb-3"
               style={{ background: "#8B6B3D" }}>
              Open payment link
            </a>
            <button onClick={() => setShowQR(false)} className="text-sm" style={{ color: "var(--ink-soft)" }}>Close</button>
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}

export default function DomainsPage() {
  return (
    <Suspense fallback={<div />}>
      <DomainsInner />
    </Suspense>
  )
}
