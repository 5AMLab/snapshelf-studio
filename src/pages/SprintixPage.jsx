import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

// ─── Minimal nav (does not conflict with existing site header) ────────────────
function SprintixNav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-zinc-950/90 backdrop-blur-sm border-b border-zinc-800">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <span className="text-white font-bold text-xl tracking-tight">
          Sprintix<span className="text-lime-400">.</span>
        </span>
        <div className="hidden md:flex items-center gap-8 text-sm text-zinc-400">
          <a href="#solution" className="hover:text-white transition-colors">What We Do</a>
          <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
          <a href="#contact" className="hover:text-white transition-colors">Contact</a>
        </div>
        <a
          href="#contact"
          className="bg-lime-400 text-zinc-950 text-sm font-semibold px-5 py-2.5 rounded-lg hover:bg-lime-300 transition-colors"
        >
          Get Started
        </a>
      </div>
    </nav>
  )
}

// ─── Section wrapper helpers ──────────────────────────────────────────────────
function SectionLabel({ children }) {
  return (
    <span className="inline-block text-lime-400 text-xs font-bold uppercase tracking-widest mb-4">
      {children}
    </span>
  )
}

// ─── 1. Hero ─────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section className="bg-zinc-950 min-h-screen flex items-center pt-16">
      <div className="max-w-6xl mx-auto px-6 py-24 md:py-32">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-zinc-800 border border-zinc-700 rounded-full px-4 py-1.5 mb-10">
            <span className="w-2 h-2 bg-lime-400 rounded-full" />
            <span className="text-zinc-300 text-sm font-medium">E-commerce Growth Studio</span>
          </div>

          <h1 className="text-6xl md:text-8xl font-black text-white tracking-tight leading-none mb-6">
            Sprintix
            <span className="text-lime-400">.</span>
          </h1>

          <p className="text-2xl md:text-3xl text-zinc-300 font-medium mb-4 leading-snug">
            Your products. Looking right.<br />Selling right.
          </p>

          <p className="text-zinc-400 text-lg max-w-xl mb-12 leading-relaxed">
            We combine visual production and Lazada/Shopee campaign management —
            so your products look right and sell right, from the same team.
          </p>

          <div className="flex flex-wrap gap-4">
            <a
              href="#contact"
              className="bg-lime-400 text-zinc-950 font-bold px-8 py-4 rounded-xl text-base hover:bg-lime-300 transition-colors"
            >
              Get Started
            </a>
            <a
              href="#pricing"
              className="bg-transparent text-white border border-zinc-600 font-semibold px-8 py-4 rounded-xl text-base hover:border-zinc-400 hover:bg-zinc-800 transition-colors"
            >
              See Packages
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── 2. The Problem ───────────────────────────────────────────────────────────
const problems = [
  {
    icon: '📸',
    title: 'Great visuals, poor conversion',
    body: "Your visuals look great but campaigns aren't converting — because the creative wasn't built for platform performance.",
  },
  {
    icon: '📣',
    title: 'Ads running, visuals lagging',
    body: "Your campaigns are live but the visuals aren't built for Lazada or Shopee — wrong dimensions, wrong hooks, wrong hierarchy.",
  },
  {
    icon: '🔀',
    title: 'Two vendors, zero alignment',
    body: "You're managing two vendors who don't talk to each other — and the gap between creative and campaign shows in your results.",
  },
]

function Problem() {
  return (
    <section className="bg-zinc-900 py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionLabel>The Problem</SectionLabel>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-12">
          Sound familiar?
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {problems.map((p) => (
            <div
              key={p.title}
              className="bg-zinc-800 border border-zinc-700 rounded-2xl p-8 hover:border-zinc-500 transition-colors"
            >
              <div className="text-3xl mb-5">{p.icon}</div>
              <h3 className="text-white font-bold text-lg mb-3">{p.title}</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── 3. Two-Lane Solution ─────────────────────────────────────────────────────
const visualServices = [
  'Product listing visuals',
  'Ad creative sets',
  'Store frontpage design',
  'Brand identity & packaging',
]

const campaignServices = [
  'Lazada/Shopee campaign strategy',
  'Sponsored ads management',
  'Promotional calendar planning',
  'Monthly performance reporting',
]

function Solution() {
  return (
    <section id="solution" className="bg-white py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionLabel>What We Do</SectionLabel>
        <h2 className="text-3xl md:text-4xl font-bold text-zinc-950 mb-4">
          Two lanes. One team.
        </h2>
        <p className="text-zinc-500 mb-14 max-w-lg">
          Built to work together — not bolted together.
        </p>

        <div className="grid md:grid-cols-2 gap-6 mb-10">
          {/* Visual Production */}
          <div className="bg-zinc-950 rounded-2xl p-10">
            <div className="w-10 h-10 bg-lime-400 rounded-lg flex items-center justify-center mb-6">
              <svg className="w-5 h-5 text-zinc-950" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-white font-bold text-xl mb-6">Visual Production</h3>
            <ul className="space-y-3">
              {visualServices.map((s) => (
                <li key={s} className="flex items-center gap-3 text-zinc-300 text-sm">
                  <span className="w-1.5 h-1.5 bg-lime-400 rounded-full flex-shrink-0" />
                  {s}
                </li>
              ))}
            </ul>
          </div>

          {/* Campaign Management */}
          <div className="bg-zinc-100 rounded-2xl p-10">
            <div className="w-10 h-10 bg-zinc-950 rounded-lg flex items-center justify-center mb-6">
              <svg className="w-5 h-5 text-lime-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-zinc-950 font-bold text-xl mb-6">Campaign Management</h3>
            <ul className="space-y-3">
              {campaignServices.map((s) => (
                <li key={s} className="flex items-center gap-3 text-zinc-600 text-sm">
                  <span className="w-1.5 h-1.5 bg-zinc-950 rounded-full flex-shrink-0" />
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="bg-lime-400 rounded-2xl px-10 py-6 text-center">
          <p className="text-zinc-950 font-bold text-lg">
            Both lanes. One team. Built to work together.
          </p>
        </div>
      </div>
    </section>
  )
}

// ─── 4. Why Sprintix ──────────────────────────────────────────────────────────
const differentiators = [
  {
    stat: 'SGD 1M+',
    label: 'in managed Lazada campaign sales',
  },
  {
    stat: 'Platform-first',
    label: 'Visuals built for conversion — not just aesthetics',
  },
  {
    stat: 'Capped intake',
    label: 'Boutique studio — we work with a limited number of clients',
  },
  {
    stat: 'SEA-native',
    label: 'We understand Lazada/Shopee buyer behaviour, mega sales timing, and platform algorithms',
  },
]

function WhySprintix() {
  return (
    <section className="bg-zinc-950 py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionLabel>Why Sprintix</SectionLabel>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-14">
          What sets us apart
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {differentiators.map((d) => (
            <div key={d.stat} className="border border-zinc-800 rounded-2xl p-8 hover:border-lime-400/40 transition-colors">
              <p className="text-lime-400 font-black text-2xl mb-3">{d.stat}</p>
              <p className="text-zinc-400 text-sm leading-relaxed">{d.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── 5. Pricing ───────────────────────────────────────────────────────────────
function PricingBadge({ children }) {
  return (
    <span className="inline-block bg-lime-400 text-zinc-950 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
      {children}
    </span>
  )
}

function PriceRow({ label, includes, price }) {
  return (
    <div className="grid grid-cols-3 gap-4 py-4 border-b border-zinc-100 last:border-0">
      <div className="font-semibold text-zinc-900 text-sm">{label}</div>
      <div className="text-zinc-500 text-sm leading-relaxed">{includes}</div>
      <div className="text-zinc-900 font-bold text-sm text-right">{price}</div>
    </div>
  )
}

function Pricing() {
  return (
    <section id="pricing" className="bg-zinc-50 py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionLabel>Pricing</SectionLabel>
        <h2 className="text-3xl md:text-4xl font-bold text-zinc-950 mb-4">
          Clear, honest pricing
        </h2>
        <p className="text-zinc-500 mb-14 max-w-lg">
          No hidden fees. No scope creep surprises.
        </p>

        {/* Bundled Packages — shown first and most prominent */}
        <div className="mb-14">
          <h3 className="text-zinc-950 font-bold text-xl mb-6">Bundled Packages</h3>
          <div className="grid md:grid-cols-3 gap-6">

            {/* Launch Pack */}
            <div className="bg-white border border-zinc-200 rounded-2xl p-8">
              <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-3">For SMEs going online</p>
              <h4 className="text-zinc-950 font-black text-2xl mb-2">Launch Pack</h4>
              <p className="text-zinc-900 font-bold text-xl mb-1">SGD 3,500 flat</p>
              <p className="text-zinc-500 text-sm mb-6">+ 10% revenue from month 2</p>
              <ul className="space-y-2.5 mb-8">
                {[
                  'Store frontpage design',
                  'Listing visuals (3 products)',
                  'Ad creative set',
                  'Campaign setup',
                  'First month management',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-zinc-600">
                    <span className="w-1.5 h-1.5 bg-lime-400 rounded-full mt-1.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <a
                href="#contact"
                className="block text-center bg-zinc-100 text-zinc-900 font-semibold px-6 py-3 rounded-xl text-sm hover:bg-zinc-200 transition-colors"
              >
                Enquire Now
              </a>
            </div>

            {/* Scale Pack */}
            <div className="bg-white border border-zinc-200 rounded-2xl p-8">
              <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-3">For sellers ready to grow</p>
              <h4 className="text-zinc-950 font-black text-2xl mb-2">Scale Pack</h4>
              <p className="text-zinc-900 font-bold text-xl mb-1">SGD 5,000 flat</p>
              <p className="text-zinc-500 text-sm mb-6">+ 10% revenue ongoing</p>
              <ul className="space-y-2.5 mb-8">
                {[
                  'Full store visual refresh',
                  'Listing visuals (5 products)',
                  'Ad creative set',
                  'Campaign audit',
                  'Ongoing campaign management',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-zinc-600">
                    <span className="w-1.5 h-1.5 bg-lime-400 rounded-full mt-1.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <a
                href="#contact"
                className="block text-center bg-zinc-100 text-zinc-900 font-semibold px-6 py-3 rounded-xl text-sm hover:bg-zinc-200 transition-colors"
              >
                Enquire Now
              </a>
            </div>

            {/* Sprint Pack — flagship, most prominent */}
            <div className="bg-zinc-950 rounded-2xl p-8 relative overflow-hidden">
              <div className="absolute top-5 right-5">
                <PricingBadge>Recommended</PricingBadge>
              </div>
              <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-3">Flagship retainer</p>
              <h4 className="text-white font-black text-2xl mb-2">Sprint Pack</h4>
              <p className="text-lime-400 font-bold text-xl mb-1">SGD 1,200/month</p>
              <p className="text-zinc-500 text-sm mb-6">+ 10% revenue</p>
              <ul className="space-y-2.5 mb-8">
                {[
                  'Monthly ad creative refresh (8 creatives)',
                  'Full campaign management',
                  'Monthly strategy call',
                  'Priority turnaround',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-zinc-300">
                    <span className="w-1.5 h-1.5 bg-lime-400 rounded-full mt-1.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <a
                href="#contact"
                className="block text-center bg-lime-400 text-zinc-950 font-bold px-6 py-3 rounded-xl text-sm hover:bg-lime-300 transition-colors"
              >
                Get This Pack
              </a>
            </div>
          </div>
        </div>

        {/* Standalone — Visual Production */}
        <div className="bg-white border border-zinc-200 rounded-2xl p-8 mb-6">
          <h3 className="text-zinc-950 font-bold text-lg mb-6">Standalone — Visual Production</h3>
          <div className="grid grid-cols-3 gap-4 pb-3 mb-1">
            <p className="text-xs font-bold text-zinc-400 uppercase tracking-wide">Service</p>
            <p className="text-xs font-bold text-zinc-400 uppercase tracking-wide">Includes</p>
            <p className="text-xs font-bold text-zinc-400 uppercase tracking-wide text-right">Price</p>
          </div>
          <PriceRow label="Listing Visual Pack" includes="6 optimised listing images per product" price="SGD 400–600" />
          <PriceRow label="Ad Creative Set" includes="10 static creatives (banner, story, square)" price="SGD 500–800" />
          <PriceRow label="Store Frontpage" includes="Full Lazada/Shopee store front" price="SGD 800–1,200" />
          <PriceRow label="Brand Identity" includes="Logo, colour, typography, usage guide" price="SGD 1,500–2,500" />
          <PriceRow label="Packaging Design" includes="Single SKU, print-ready" price="SGD 800–1,500" />
        </div>

        {/* Standalone — Campaign Management */}
        <div className="bg-white border border-zinc-200 rounded-2xl p-8 mb-8">
          <h3 className="text-zinc-950 font-bold text-lg mb-6">Standalone — Campaign Management</h3>
          <div className="grid grid-cols-3 gap-4 pb-3 mb-1">
            <p className="text-xs font-bold text-zinc-400 uppercase tracking-wide">Service</p>
            <p className="text-xs font-bold text-zinc-400 uppercase tracking-wide">Includes</p>
            <p className="text-xs font-bold text-zinc-400 uppercase tracking-wide text-right">Price</p>
          </div>
          <PriceRow label="Campaign Setup" includes="Architecture, ad setup, promo calendar" price="SGD 800 one-time" />
          <PriceRow label="Monthly Management" includes="Campaigns, sponsored ads, optimisation, reporting" price="10% of revenue generated" />
        </div>

        <div className="flex items-start gap-3 bg-zinc-100 rounded-xl px-6 py-4">
          <span className="text-zinc-400 text-sm mt-0.5">ⓘ</span>
          <p className="text-zinc-600 text-sm">
            We work with a limited number of clients. Retainer slots are capped.
          </p>
        </div>
      </div>
    </section>
  )
}

// ─── 6. Who This Is For ───────────────────────────────────────────────────────
const qualifiers = [
  'Lazada or Shopee sellers doing SGD 20k–100k/month',
  'Brand owners launching on marketplace for the first time',
  'SMEs that want one team managing visuals and campaigns — not two',
]

function WhoItsFor() {
  return (
    <section className="bg-zinc-950 py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <SectionLabel>Who This Is For</SectionLabel>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Built for sellers who are serious about growth
            </h2>
            <p className="text-zinc-400 text-base">
              Sprintix is a good fit if you recognise yourself in any of these.
            </p>
          </div>
          <div className="space-y-4">
            {qualifiers.map((q) => (
              <div key={q} className="flex items-start gap-4 bg-zinc-800 rounded-xl px-6 py-5 border border-zinc-700">
                <span className="w-6 h-6 bg-lime-400 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-3.5 h-3.5 text-zinc-950" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                <p className="text-zinc-200 text-sm leading-relaxed">{q}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── 7. CTA / Contact ─────────────────────────────────────────────────────────
function Contact() {
  return (
    <section id="contact" className="bg-white py-24 px-6">
      <div className="max-w-2xl mx-auto text-center">
        <SectionLabel>Get In Touch</SectionLabel>
        <h2 className="text-4xl md:text-5xl font-black text-zinc-950 mb-4">
          Ready to sprint?
        </h2>
        <p className="text-zinc-500 text-lg mb-10">
          Tell us about your store and we'll get back within 24 hours.
        </p>

        <div className="bg-zinc-950 rounded-2xl p-10 text-left mb-8">
          <div className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-zinc-400 text-xs font-semibold uppercase tracking-wide mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  placeholder="Jane Tan"
                  className="w-full bg-zinc-800 border border-zinc-700 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-lime-400 transition-colors placeholder:text-zinc-600"
                />
              </div>
              <div>
                <label className="block text-zinc-400 text-xs font-semibold uppercase tracking-wide mb-2">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="jane@yourstore.com"
                  className="w-full bg-zinc-800 border border-zinc-700 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-lime-400 transition-colors placeholder:text-zinc-600"
                />
              </div>
            </div>
            <div>
              <label className="block text-zinc-400 text-xs font-semibold uppercase tracking-wide mb-2">
                Your Store / Brand
              </label>
              <input
                type="text"
                placeholder="Store name or Lazada/Shopee URL"
                className="w-full bg-zinc-800 border border-zinc-700 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-lime-400 transition-colors placeholder:text-zinc-600"
              />
            </div>
            <div>
              <label className="block text-zinc-400 text-xs font-semibold uppercase tracking-wide mb-2">
                What are you looking for?
              </label>
              <textarea
                rows={4}
                placeholder="Tell us what you need — visuals, campaign management, or both..."
                className="w-full bg-zinc-800 border border-zinc-700 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-lime-400 transition-colors placeholder:text-zinc-600 resize-none"
              />
            </div>
            <button
              type="button"
              className="w-full bg-lime-400 text-zinc-950 font-bold py-4 rounded-xl text-base hover:bg-lime-300 transition-colors mt-2"
            >
              Book a Free Discovery Call
            </button>
          </div>
        </div>

        <p className="text-zinc-400 text-sm">
          Prefer email?{' '}
          <a
            href="mailto:hello@sprintix.co"
            className="text-zinc-700 font-semibold hover:text-zinc-900 transition-colors underline underline-offset-2"
          >
            hello@sprintix.co
          </a>
        </p>
      </div>
    </section>
  )
}

// ─── Minimal footer ───────────────────────────────────────────────────────────
function SprintixFooter() {
  return (
    <footer className="bg-zinc-950 border-t border-zinc-800 py-10 px-6">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="text-white font-bold text-lg">
          Sprintix<span className="text-lime-400">.</span>
        </span>
        <p className="text-zinc-500 text-sm">
          © {new Date().getFullYear()} Sprintix. E-commerce Growth Studio.
        </p>
        <Link to="/" className="text-zinc-500 text-sm hover:text-zinc-300 transition-colors">
          ← Back to SnapShelf Studio
        </Link>
      </div>
    </footer>
  )
}

// ─── Root component ───────────────────────────────────────────────────────────
export default function SprintixPage() {
  useEffect(() => {
    document.title = 'Sprintix — E-commerce Growth Studio'
  }, [])

  return (
    <div className="font-sans">
      <SprintixNav />
      <main>
        <Hero />
        <Problem />
        <Solution />
        <WhySprintix />
        <Pricing />
        <WhoItsFor />
        <Contact />
      </main>
      <SprintixFooter />
    </div>
  )
}
