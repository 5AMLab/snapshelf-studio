import React, { useState, useEffect, useRef, useCallback } from 'react'
import { Link } from 'react-router-dom'

// ─────────────────────────────────────────────────────────────────────────────
// Scroll-triggered animation hook
// ─────────────────────────────────────────────────────────────────────────────
function useInView(threshold = 0.12) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.unobserve(el)
        }
      },
      { threshold }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  return [ref, inView]
}

const fadeUp = (inView, delay = 0) =>
  `transition-all duration-700 ${delay ? `delay-[${delay}ms]` : ''} ${
    inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
  }`

// ─────────────────────────────────────────────────────────────────────────────
// 1. Navigation
// ─────────────────────────────────────────────────────────────────────────────
function Nav() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { label: 'Services', href: '#services' },
    { label: 'Packages', href: '#packages' },
    { label: 'Why Us', href: '#why' },
    { label: 'Contact', href: '#contact' },
  ]

  const scrollTo = (href) => {
    setOpen(false)
    const el = document.querySelector(href)
    el?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-zinc-950/95 backdrop-blur-md border-b border-zinc-800/60 shadow-xl' : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-[68px] flex items-center justify-between">
        {/* Logo */}
        <a href="#hero" onClick={(e) => { e.preventDefault(); document.querySelector('#hero')?.scrollIntoView({ behavior: 'smooth' }) }}>
          <span
            className="text-white font-black text-2xl tracking-tight"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            Sprintix<span className="text-lime-400">.</span>
          </span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <button
              key={l.href}
              onClick={() => scrollTo(l.href)}
              className="text-zinc-400 text-sm font-medium hover:text-white transition-colors"
            >
              {l.label}
            </button>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:block">
          <button
            onClick={() => scrollTo('#contact')}
            className="bg-lime-400 text-zinc-950 text-sm font-bold px-5 py-2.5 rounded-lg hover:bg-lime-300 active:scale-95 transition-all"
          >
            Book a Call
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden flex flex-col gap-1.5 w-6"
          aria-label="Toggle menu"
        >
          <span className={`block h-0.5 bg-white transition-all duration-300 ${open ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block h-0.5 bg-white transition-all duration-300 ${open ? 'opacity-0' : ''}`} />
          <span className={`block h-0.5 bg-white transition-all duration-300 ${open ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden bg-zinc-950 border-t border-zinc-800 overflow-hidden transition-all duration-300 ${
          open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-6 py-4 flex flex-col gap-1">
          {links.map((l) => (
            <button
              key={l.href}
              onClick={() => scrollTo(l.href)}
              className="text-left text-zinc-300 text-base font-medium py-3 border-b border-zinc-800/60 hover:text-white transition-colors"
            >
              {l.label}
            </button>
          ))}
          <button
            onClick={() => scrollTo('#contact')}
            className="mt-3 bg-lime-400 text-zinc-950 font-bold px-5 py-3 rounded-lg text-base"
          >
            Book a Call
          </button>
        </div>
      </div>
    </nav>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// 2. Hero
// ─────────────────────────────────────────────────────────────────────────────
function Hero() {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 80)
    return () => clearTimeout(t)
  }, [])

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center bg-zinc-950 overflow-hidden"
    >
      {/* Subtle dot-grid texture */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />

      {/* Accent glow */}
      <div
        className="absolute top-1/4 right-0 w-[600px] h-[600px] opacity-10 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, #a3e635 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-32 pb-20">
        {/* Studio badge */}
        <div
          className={`inline-flex items-center gap-2 bg-zinc-800/80 border border-zinc-700 rounded-full px-4 py-1.5 mb-10 transition-all duration-700 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
        >
          <span className="w-2 h-2 bg-lime-400 rounded-full animate-pulse" />
          <span className="text-zinc-300 text-sm font-medium tracking-wide">Boutique E-commerce Growth Studio · Singapore</span>
        </div>

        {/* Main headline */}
        <h1
          className={`transition-all duration-700 delay-100 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
          style={{ fontFamily: "'Syne', sans-serif" }}
        >
          <span className="block text-white font-black leading-none"
            style={{ fontSize: 'clamp(3.5rem, 10vw, 8rem)', letterSpacing: '-0.03em' }}>
            Look right.
          </span>
          <span className="block text-lime-400 font-black leading-none"
            style={{ fontSize: 'clamp(3.5rem, 10vw, 8rem)', letterSpacing: '-0.03em' }}>
            Sell right.
          </span>
        </h1>

        {/* Subheading */}
        <p
          className={`mt-8 text-zinc-400 text-lg md:text-xl leading-relaxed max-w-2xl transition-all duration-700 delay-200 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
        >
          Sprintix is a boutique e-commerce growth studio combining visual production
          and Lazada/Shopee campaign management — from one team.
        </p>

        {/* CTAs */}
        <div
          className={`mt-10 flex flex-wrap gap-4 transition-all duration-700 delay-300 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
        >
          <button
            onClick={() => document.querySelector('#packages')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-lime-400 text-zinc-950 font-bold text-base px-8 py-4 rounded-xl hover:bg-lime-300 active:scale-95 transition-all"
          >
            See Our Packages
          </button>
          <button
            onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="border border-zinc-600 text-white font-semibold text-base px-8 py-4 rounded-xl hover:border-zinc-400 hover:bg-zinc-800/50 transition-all"
          >
            Book a Free Call
          </button>
        </div>

        {/* Platform logos */}
        <div
          className={`mt-16 pt-10 border-t border-zinc-800 transition-all duration-700 delay-[400ms] ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
        >
          <p className="text-zinc-600 text-xs font-semibold uppercase tracking-widest mb-6">We work across</p>
          <div className="flex flex-wrap items-center gap-8">
            {[
              { src: '/images/logos/lazada-logo.svg', alt: 'Lazada', h: 'h-6' },
              { src: '/images/Shopee-horizontal-logo.svg', alt: 'Shopee', h: 'h-5' },
              { src: '/images/logos/shopify-logo.svg', alt: 'Shopify', h: 'h-6' },
            ].map(({ src, alt, h }) => (
              <img
                key={alt}
                src={src}
                alt={alt}
                className={`${h} opacity-40 brightness-0 invert hover:opacity-70 transition-opacity`}
                onError={(e) => { e.target.style.display = 'none' }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-zinc-950 to-transparent pointer-events-none" />
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// 3. Services
// ─────────────────────────────────────────────────────────────────────────────
const SERVICES = [
  {
    num: '01',
    title: 'Brand Identity Design',
    body: 'Logos, colour systems, typography, and usage guidelines built for e-commerce.',
  },
  {
    num: '02',
    title: 'E-commerce Visual Design',
    body: 'Product listing images, store frontpage design, and platform-ready visuals.',
  },
  {
    num: '03',
    title: 'Performance Creative',
    body: 'Ad creatives built to convert — banners, stories, and square formats for sponsored ads.',
  },
  {
    num: '04',
    title: 'Store Setup & Brand Development',
    body: 'Full store setup and brand application across Shopify, Lazada, or Shopee storefronts.',
  },
  {
    num: '05',
    title: 'Search Engine Optimisation',
    body: 'On-page SEO for product listings and store discoverability.',
  },
  {
    num: '06',
    title: 'Marketplace Campaign Management',
    body: 'Lazada and Shopee campaign strategy, sponsored ads, and promotional calendar management.',
  },
  {
    num: '07',
    title: 'Campaign Performance Reporting',
    body: 'Monthly sales and campaign reports with actionable insights.',
  },
]

function Services() {
  const [ref, inView] = useInView()

  return (
    <section id="services" className="bg-white py-24 px-6">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <div className={fadeUp(inView)}>
          <span className="text-lime-600 text-xs font-bold uppercase tracking-widest">What We Do</span>
          <h2
            className="text-4xl md:text-5xl font-black text-zinc-950 mt-3 mb-14"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            Seven ways we grow<br className="hidden md:block" /> your store.
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SERVICES.map((s, i) => (
            <div
              key={s.num}
              className={`group border border-zinc-100 rounded-2xl p-8 hover:border-zinc-300 hover:shadow-md transition-all duration-300 ${fadeUp(inView, i * 60)}`}
            >
              <span className="text-zinc-300 text-xs font-mono font-bold">{s.num}</span>
              <h3 className="text-zinc-950 font-bold text-lg mt-3 mb-2 group-hover:text-zinc-800 transition-colors">
                {s.title}
              </h3>
              <p className="text-zinc-500 text-sm leading-relaxed">{s.body}</p>
            </div>
          ))}

          {/* Eighth slot — CTA card */}
          <div className="bg-zinc-950 rounded-2xl p-8 flex flex-col justify-between">
            <p className="text-zinc-400 text-sm leading-relaxed">
              Not sure which service fits? Let's talk — we'll tell you exactly what you need.
            </p>
            <button
              onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="mt-8 self-start bg-lime-400 text-zinc-950 font-bold text-sm px-5 py-2.5 rounded-lg hover:bg-lime-300 transition-colors"
            >
              Get in Touch
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// 4. Two-Lane Model
// ─────────────────────────────────────────────────────────────────────────────
const VISUAL_ITEMS = [
  'Brand Identity Design',
  'E-commerce Visual Design',
  'Performance Creative',
  'Store Setup & Brand Development',
  'SEO',
]

const CAMPAIGN_ITEMS = [
  'Marketplace Campaign Management',
  'Sponsored Ads',
  'Promotional Calendar',
  'Performance Reporting',
]

function TwoLane() {
  const [ref, inView] = useInView()

  return (
    <section className="bg-zinc-950 py-24 px-6">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <div className={fadeUp(inView)}>
          <span className="text-lime-400 text-xs font-bold uppercase tracking-widest">The Model</span>
          <h2
            className="text-4xl md:text-5xl font-black text-white mt-3 mb-14"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            One Studio.<br className="hidden md:block" /> Two Lanes.
          </h2>
        </div>

        <div className={`grid md:grid-cols-2 gap-6 mb-8 ${fadeUp(inView, 100)}`}>
          {/* Visual Production */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-10">
            <div className="w-10 h-10 bg-lime-400 rounded-xl flex items-center justify-center mb-7">
              <svg className="w-5 h-5 text-zinc-950" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-white font-bold text-xl mb-6">Visual Production</h3>
            <ul className="space-y-3">
              {VISUAL_ITEMS.map((item) => (
                <li key={item} className="flex items-center gap-3 text-zinc-400 text-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-lime-400 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Campaign Management */}
          <div className="bg-zinc-100 rounded-2xl p-10">
            <div className="w-10 h-10 bg-zinc-950 rounded-xl flex items-center justify-center mb-7">
              <svg className="w-5 h-5 text-lime-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-zinc-950 font-bold text-xl mb-6">Campaign Management</h3>
            <ul className="space-y-3">
              {CAMPAIGN_ITEMS.map((item) => (
                <li key={item} className="flex items-center gap-3 text-zinc-600 text-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-zinc-950 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom line */}
        <div className={`bg-lime-400 rounded-2xl px-10 py-6 ${fadeUp(inView, 200)}`}>
          <p className="text-zinc-950 font-bold text-base md:text-lg text-center leading-relaxed">
            Most sellers patch this together with two separate vendors. We do both —<br className="hidden md:block" />
            so visuals and campaigns are built to work together from day one.
          </p>
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// 5. Why Sprintix
// ─────────────────────────────────────────────────────────────────────────────
const WHY = [
  {
    stat: 'SGD 1M+',
    label: 'In managed Lazada campaign sales',
    sub: 'Real results, real revenue.',
  },
  {
    stat: 'Platform Native',
    label: 'We know Lazada and Shopee inside out',
    sub: 'Algorithms, mega sales, buyer behaviour — we live in it.',
  },
  {
    stat: 'Integrated',
    label: 'Visuals and campaigns from the same team',
    sub: 'Built to work together from day one.',
  },
  {
    stat: 'Boutique & Capped',
    label: 'We work with a limited number of clients',
    sub: "You get real attention, not a ticket number.",
  },
]

function WhySprintix() {
  const [ref, inView] = useInView()

  return (
    <section id="why" className="bg-white py-24 px-6">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <div className={fadeUp(inView)}>
          <span className="text-lime-600 text-xs font-bold uppercase tracking-widest">Why Sprintix</span>
          <h2
            className="text-4xl md:text-5xl font-black text-zinc-950 mt-3 mb-14"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            What sets us apart.
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {WHY.map((w, i) => (
            <div
              key={w.stat}
              className={`border border-zinc-100 rounded-2xl p-8 hover:border-lime-200 hover:shadow-sm transition-all ${fadeUp(inView, i * 70)}`}
            >
              <p
                className="text-zinc-950 font-black text-2xl mb-3"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                {w.stat}
              </p>
              <p className="text-zinc-700 font-semibold text-sm mb-2">{w.label}</p>
              <p className="text-zinc-400 text-xs leading-relaxed">{w.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// 6. Packages
// ─────────────────────────────────────────────────────────────────────────────
function PricingRow({ label, includes, price }) {
  return (
    <div className="grid grid-cols-3 gap-4 py-4 border-b border-zinc-100 last:border-0 items-start">
      <p className="font-semibold text-zinc-900 text-sm">{label}</p>
      <p className="text-zinc-500 text-sm leading-relaxed">{includes}</p>
      <p className="text-zinc-900 font-bold text-sm text-right">{price}</p>
    </div>
  )
}

const STANDALONE_VISUAL = [
  { label: 'Listing Visual Pack', includes: '6 optimised listing images per product', price: 'SGD 400–600' },
  { label: 'Ad Creative Set', includes: '10 static creatives (banner, story, square)', price: 'SGD 500–800' },
  { label: 'Store Frontpage Design', includes: 'Full Lazada/Shopee store front layout', price: 'SGD 800–1,200' },
  { label: 'Brand Identity', includes: 'Logo, colour, typography, usage guide', price: 'SGD 1,500–2,500' },
]

const STANDALONE_CAMPAIGN = [
  { label: 'Campaign Setup', includes: 'Full campaign architecture, ad setup, promo calendar', price: 'SGD 800 one-time' },
  { label: 'Monthly Management', includes: 'Campaigns, sponsored ads, optimisation, reporting', price: '10% of revenue' },
]

function Packages() {
  const [ref, inView] = useInView()

  return (
    <section id="packages" className="bg-zinc-50 py-24 px-6">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <div className={fadeUp(inView)}>
          <span className="text-lime-600 text-xs font-bold uppercase tracking-widest">Our Packages</span>
          <h2
            className="text-4xl md:text-5xl font-black text-zinc-950 mt-3 mb-3"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            Flexible structures.
          </h2>
          <p className="text-zinc-500 mb-14 text-lg">For where you are right now.</p>
        </div>

        {/* ── Bundled packages ── */}
        <div className={`mb-14 ${fadeUp(inView, 80)}`}>
          <h3 className="text-zinc-950 font-bold text-xl mb-6">Bundled Packages</h3>
          <div className="grid md:grid-cols-3 gap-6">

            {/* Launch Pack */}
            <div className="bg-white border border-zinc-200 rounded-2xl p-8 flex flex-col">
              <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2">For SMEs going online</p>
              <h4
                className="text-zinc-950 font-black text-2xl mb-1"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                Launch Pack
              </h4>
              <p className="text-zinc-900 font-bold text-xl mt-2">SGD 3,500 flat</p>
              <p className="text-zinc-500 text-sm mb-7">+ 10% revenue from month 2</p>
              <ul className="space-y-2.5 flex-1">
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
              <button
                onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="mt-8 w-full text-center bg-zinc-100 text-zinc-900 font-semibold px-6 py-3 rounded-xl text-sm hover:bg-zinc-200 transition-colors"
              >
                Enquire Now
              </button>
            </div>

            {/* Scale Pack */}
            <div className="bg-white border border-zinc-200 rounded-2xl p-8 flex flex-col">
              <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2">For existing sellers</p>
              <h4
                className="text-zinc-950 font-black text-2xl mb-1"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                Scale Pack
              </h4>
              <p className="text-zinc-900 font-bold text-xl mt-2">SGD 5,000 flat</p>
              <p className="text-zinc-500 text-sm mb-7">+ 10% revenue ongoing</p>
              <ul className="space-y-2.5 flex-1">
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
              <button
                onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="mt-8 w-full text-center bg-zinc-100 text-zinc-900 font-semibold px-6 py-3 rounded-xl text-sm hover:bg-zinc-200 transition-colors"
              >
                Enquire Now
              </button>
            </div>

            {/* Sprint Pack — flagship / recommended */}
            <div className="bg-zinc-950 rounded-2xl p-8 flex flex-col relative overflow-hidden">
              {/* glow */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-lime-400 opacity-10 rounded-full pointer-events-none blur-2xl" />

              <div className="flex items-start justify-between mb-2">
                <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Flagship retainer</p>
                <span className="bg-lime-400 text-zinc-950 text-[10px] font-black uppercase tracking-wide px-2.5 py-1 rounded-full">
                  Most Popular
                </span>
              </div>
              <h4
                className="text-white font-black text-2xl mb-1"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                Sprint Pack
              </h4>
              <p className="text-lime-400 font-bold text-xl mt-2">SGD 1,200/month</p>
              <p className="text-zinc-500 text-sm mb-7">+ 10% revenue</p>
              <ul className="space-y-2.5 flex-1">
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
              <button
                onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="mt-8 w-full text-center bg-lime-400 text-zinc-950 font-bold px-6 py-3 rounded-xl text-sm hover:bg-lime-300 transition-colors"
              >
                Get This Pack
              </button>
            </div>
          </div>
        </div>

        {/* ── Standalone tables ── */}
        <div className={`space-y-5 mb-8 ${fadeUp(inView, 160)}`}>
          <div className="bg-white border border-zinc-200 rounded-2xl p-8">
            <h3 className="text-zinc-950 font-bold text-lg mb-6">Standalone — Visual Production</h3>
            <div className="grid grid-cols-3 gap-4 pb-3">
              {['Service', 'Includes', 'Price'].map((h) => (
                <p key={h} className={`text-xs font-bold text-zinc-400 uppercase tracking-wide ${h === 'Price' ? 'text-right' : ''}`}>{h}</p>
              ))}
            </div>
            {STANDALONE_VISUAL.map((row) => <PricingRow key={row.label} {...row} />)}
          </div>

          <div className="bg-white border border-zinc-200 rounded-2xl p-8">
            <h3 className="text-zinc-950 font-bold text-lg mb-6">Standalone — Campaign Management</h3>
            <div className="grid grid-cols-3 gap-4 pb-3">
              {['Service', 'Includes', 'Price'].map((h) => (
                <p key={h} className={`text-xs font-bold text-zinc-400 uppercase tracking-wide ${h === 'Price' ? 'text-right' : ''}`}>{h}</p>
              ))}
            </div>
            {STANDALONE_CAMPAIGN.map((row) => <PricingRow key={row.label} {...row} />)}
          </div>
        </div>

        {/* Note */}
        <div className={`flex items-start gap-3 bg-zinc-100 rounded-xl px-6 py-4 ${fadeUp(inView, 200)}`}>
          <span className="text-zinc-400 text-sm mt-0.5">ⓘ</span>
          <p className="text-zinc-600 text-sm">
            Retainer slots are limited. We keep our client list small on purpose.
          </p>
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// 7. Who This Is For
// ─────────────────────────────────────────────────────────────────────────────
const WHO = [
  "You're selling on Lazada or Shopee and doing SGD 20k–100k/month.",
  "You're an SME launching on marketplace for the first time and want it done right.",
  "You want one team handling visuals and campaigns — not two vendors who don't talk to each other.",
]

function WhoItsFor() {
  const [ref, inView] = useInView()

  return (
    <section className="bg-zinc-950 py-24 px-6">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className={fadeUp(inView)}>
            <span className="text-lime-400 text-xs font-bold uppercase tracking-widest">Who This Is For</span>
            <h2
              className="text-4xl md:text-5xl font-black text-white mt-3"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              You're a fit if...
            </h2>
            <p className="text-zinc-400 mt-5 text-base leading-relaxed">
              We don't work with everyone. Here's who gets the most out of working with Sprintix.
            </p>
          </div>

          <div className={`space-y-4 ${fadeUp(inView, 100)}`}>
            {WHO.map((q, i) => (
              <div
                key={i}
                className="flex items-start gap-4 bg-zinc-800/60 border border-zinc-700/60 rounded-2xl px-6 py-5 hover:border-zinc-600 transition-colors"
              >
                <span className="w-7 h-7 bg-lime-400 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-4 h-4 text-zinc-950" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
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

// ─────────────────────────────────────────────────────────────────────────────
// 8. Contact / CTA
// ─────────────────────────────────────────────────────────────────────────────
function Contact() {
  const [ref, inView] = useInView()
  const [form, setForm] = useState({ name: '', email: '', store: '', message: '' })
  const [sent, setSent] = useState(false)

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const onSubmit = (e) => {
    e.preventDefault()
    // Placeholder — wire to backend/Formspree/Calendly when ready
    setSent(true)
  }

  const inputClass =
    'w-full bg-zinc-800 border border-zinc-700 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-lime-400 transition-colors placeholder:text-zinc-600'

  return (
    <section id="contact" className="bg-white py-24 px-6">
      <div className="max-w-2xl mx-auto text-center" ref={ref}>
        <div className={fadeUp(inView)}>
          <span className="text-lime-600 text-xs font-bold uppercase tracking-widest">Get In Touch</span>
          <h2
            className="text-4xl md:text-5xl font-black text-zinc-950 mt-3 mb-3"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            Ready to sprint?
          </h2>
          <p className="text-zinc-500 text-lg mb-10">
            Tell us about your store. We'll get back within 24 hours.
          </p>
        </div>

        <div className={`bg-zinc-950 rounded-2xl p-8 md:p-10 text-left ${fadeUp(inView, 100)}`}>
          {sent ? (
            <div className="py-12 text-center">
              <div className="w-14 h-14 bg-lime-400 rounded-full flex items-center justify-center mx-auto mb-5">
                <svg className="w-7 h-7 text-zinc-950" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-white font-bold text-xl mb-2">We got your message.</h3>
              <p className="text-zinc-400 text-sm">Expect a reply within 24 hours.</p>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-zinc-400 text-xs font-semibold uppercase tracking-wide mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="Jane Tan"
                    value={form.name}
                    onChange={onChange}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="block text-zinc-400 text-xs font-semibold uppercase tracking-wide mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="jane@yourstore.com"
                    value={form.email}
                    onChange={onChange}
                    className={inputClass}
                  />
                </div>
              </div>
              <div>
                <label className="block text-zinc-400 text-xs font-semibold uppercase tracking-wide mb-2">
                  Store URL <span className="text-zinc-600 normal-case font-normal">(optional)</span>
                </label>
                <input
                  type="url"
                  name="store"
                  placeholder="https://www.lazada.sg/shop/yourstore"
                  value={form.store}
                  onChange={onChange}
                  className={inputClass}
                />
              </div>
              <div>
                <label className="block text-zinc-400 text-xs font-semibold uppercase tracking-wide mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  required
                  rows={4}
                  placeholder="Tell us what you need — visuals, campaign management, or both..."
                  value={form.message}
                  onChange={onChange}
                  className={`${inputClass} resize-none`}
                />
              </div>
              <button
                type="submit"
                className="w-full bg-lime-400 text-zinc-950 font-bold py-4 rounded-xl text-base hover:bg-lime-300 active:scale-[0.99] transition-all mt-2"
              >
                Book a Free Discovery Call
              </button>
            </form>
          )}
        </div>

        <div className={`mt-6 space-y-2 ${fadeUp(inView, 200)}`}>
          <p className="text-zinc-500 text-sm">
            Or email us directly at{' '}
            <a
              href="mailto:hello@sprintix.co"
              className="text-zinc-700 font-semibold hover:text-zinc-900 underline underline-offset-2 transition-colors"
            >
              hello@sprintix.co
            </a>
          </p>
          <p className="text-zinc-400 text-xs">Based in Singapore. Serving SEA.</p>
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// 9. Footer
// ─────────────────────────────────────────────────────────────────────────────
function Footer() {
  const links = [
    { label: 'Services', href: '#services' },
    { label: 'Packages', href: '#packages' },
    { label: 'Contact', href: '#contact' },
  ]

  const scrollTo = (href) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer className="bg-zinc-950 border-t border-zinc-800 py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-10">
          {/* Brand */}
          <div>
            <span
              className="text-white font-black text-2xl"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              Sprintix<span className="text-lime-400">.</span>
            </span>
            <p className="text-zinc-500 text-sm mt-2 max-w-xs leading-relaxed">
              Your products. Looking right. Selling right.
            </p>
          </div>

          {/* Footer nav */}
          <div className="flex flex-wrap gap-6">
            {links.map((l) => (
              <button
                key={l.href}
                onClick={() => scrollTo(l.href)}
                className="text-zinc-500 text-sm hover:text-zinc-300 transition-colors"
              >
                {l.label}
              </button>
            ))}
            <a
              href="mailto:hello@sprintix.co"
              className="text-zinc-500 text-sm hover:text-zinc-300 transition-colors"
            >
              hello@sprintix.co
            </a>
          </div>
        </div>

        <div className="border-t border-zinc-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-zinc-600 text-xs">© {new Date().getFullYear()} Sprintix. All rights reserved.</p>
          <div className="flex gap-5">
            <Link to="/privacy-policy" className="text-zinc-600 text-xs hover:text-zinc-400 transition-colors">Privacy Policy</Link>
            <Link to="/terms-of-service" className="text-zinc-600 text-xs hover:text-zinc-400 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Root component
// ─────────────────────────────────────────────────────────────────────────────
export default function SprintixHome() {
  useEffect(() => {
    document.title = 'Sprintix — E-commerce Growth Studio'
  }, [])

  return (
    <div className="font-sans antialiased">
      <Nav />
      <main>
        <Hero />
        <Services />
        <TwoLane />
        <WhySprintix />
        <Packages />
        <WhoItsFor />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
