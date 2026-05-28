import React from 'react'
import { Link } from 'react-router-dom'
import { Shield, Cookie, Eye, Target, Settings, Calendar, Mail, Globe } from 'lucide-react'

/* ── Shared helpers ─────────────────────────────────────────── */
function LegalNav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-zinc-950/95 backdrop-blur-sm border-b border-zinc-800">
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="font-black text-xl text-white tracking-tight" style={{ fontFamily: 'Syne, sans-serif' }}>
          Sprintix
        </Link>
        <Link
          to="/"
          className="text-sm text-zinc-400 hover:text-lime-400 transition-colors duration-200 flex items-center gap-1.5"
        >
          ← Back to Home
        </Link>
      </div>
    </nav>
  )
}

function SectionLabel({ children }) {
  return (
    <span className="inline-block text-xs font-semibold uppercase tracking-widest text-lime-600 mb-3">
      {children}
    </span>
  )
}

function SectionHeading({ icon: Icon, children }) {
  return (
    <h2
      className="text-2xl font-black text-zinc-900 mb-5 flex items-center gap-3"
      style={{ fontFamily: 'Syne, sans-serif' }}
    >
      {Icon && (
        <span className="w-8 h-8 rounded-lg bg-lime-400 flex items-center justify-center flex-shrink-0">
          <Icon className="w-4 h-4 text-zinc-900" />
        </span>
      )}
      {children}
    </h2>
  )
}

function Card({ children, className = '' }) {
  return (
    <div className={`border border-zinc-100 rounded-2xl p-6 ${className}`}>
      {children}
    </div>
  )
}

function AccentBar({ children }) {
  return (
    <div className="border-l-4 border-lime-400 pl-5 space-y-1">
      {children}
    </div>
  )
}

function Highlight({ children, className = '' }) {
  return (
    <div className={`bg-zinc-50 border border-zinc-100 rounded-2xl p-5 ${className}`}>
      {children}
    </div>
  )
}

/* ── Cookie type card ───────────────────────────────────────── */
function CookieTypeCard({ icon: Icon, title, badge, badgeStyle = 'lime', description, examples }) {
  const badgeClasses = {
    lime: 'bg-lime-100 text-lime-800',
    zinc: 'bg-zinc-100 text-zinc-700',
  }

  return (
    <Card>
      <div className="flex items-center gap-3 mb-3">
        <span className="w-8 h-8 rounded-lg bg-lime-400 flex items-center justify-center flex-shrink-0">
          <Icon className="w-4 h-4 text-zinc-900" />
        </span>
        <h3 className="font-bold text-zinc-900" style={{ fontFamily: 'Syne, sans-serif' }}>
          {title}
        </h3>
        <span className={`ml-auto text-xs font-semibold px-2.5 py-1 rounded-lg ${badgeClasses[badgeStyle]}`}>
          {badge}
        </span>
      </div>
      <p className="text-base text-zinc-600 mb-3">{description}</p>
      <Highlight>
        <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wide mb-2">Examples</p>
        <ul className="text-sm text-zinc-600 space-y-1">
          {examples.map((ex, i) => (
            <li key={i}>• {ex}</li>
          ))}
        </ul>
      </Highlight>
    </Card>
  )
}

/* ── Re-open consent banner helper ──────────────────────────── */
function reopenCookieBanner() {
  localStorage.removeItem('sprintix-cookie-consent')
  window.location.reload()
}

/* ── Page ───────────────────────────────────────────────────── */
const CookiePolicy = () => {
  const lastUpdated = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <div className="min-h-screen bg-white">
      <LegalNav />

      {/* ── Hero ────────────────────────────────────────────── */}
      <section className="bg-zinc-950 pt-32 pb-20 px-6">
        <div className="max-w-5xl mx-auto">
          <SectionLabel>Legal</SectionLabel>
          <h1
            className="text-4xl sm:text-5xl font-black text-white leading-tight mb-4"
            style={{ fontFamily: 'Syne, sans-serif' }}
          >
            Cookie Policy
          </h1>
          <p className="text-zinc-400 text-base max-w-xl">
            How Sprintix uses cookies to enhance your browsing experience.
          </p>
          <p className="text-zinc-600 text-sm mt-3">Last updated: {lastUpdated}</p>
        </div>
      </section>

      {/* ── Body ────────────────────────────────────────────── */}
      <main className="max-w-5xl mx-auto px-6 py-16 space-y-16">

        {/* What Are Cookies */}
        <section>
          <SectionLabel>Overview</SectionLabel>
          <SectionHeading icon={Cookie}>What Are Cookies?</SectionHeading>
          <p className="text-zinc-600 text-base mb-4">
            Cookies are small text files placed on your computer or mobile device when you visit a website.
            They are widely used to make websites work efficiently and to provide information to website owners.
          </p>
          <p className="text-zinc-600 text-base">
            At Sprintix, we use cookies to enhance your browsing experience, analyse site usage, and help
            us provide better services tailored to your needs.
          </p>
        </section>

        {/* Types of Cookies */}
        <section>
          <SectionLabel>Cookie Types</SectionLabel>
          <SectionHeading>Types of Cookies We Use</SectionHeading>

          <div className="grid gap-4">
            <CookieTypeCard
              icon={Settings}
              title="Necessary Cookies"
              badge="Always Active"
              badgeStyle="lime"
              description="Essential for the website to function properly. They enable core functionality such as security, network management, and accessibility."
              examples={[
                'Session management and user authentication',
                'Form data persistence (contact forms, package selections)',
                'Security tokens and CSRF protection',
                'Load balancing and website functionality',
              ]}
            />
            <CookieTypeCard
              icon={Eye}
              title="Analytics Cookies"
              badge="Optional"
              badgeStyle="zinc"
              description="Help us understand how visitors interact with our website by collecting and reporting information anonymously."
              examples={[
                'Google Analytics for website traffic analysis',
                'Page views and user behaviour tracking',
                'Performance monitoring and optimisation',
                'Popular content and feature usage statistics',
              ]}
            />
            <CookieTypeCard
              icon={Target}
              title="Marketing Cookies"
              badge="Optional"
              badgeStyle="zinc"
              description="Used to track visitors across websites to display relevant advertisements and measure campaign effectiveness."
              examples={[
                'Facebook Pixel for social media advertising',
                'Google Ads conversion tracking',
                'Retargeting and remarketing pixels',
                'Campaign effectiveness measurement',
              ]}
            />
            <CookieTypeCard
              icon={Settings}
              title="Functional Cookies"
              badge="Optional"
              badgeStyle="zinc"
              description="Enable enhanced functionality and personalisation, such as chat widgets and personalised content."
              examples={[
                'Live chat widgets and customer support tools',
                'User preferences and settings',
                'Language and region settings',
                'Personalised content recommendations',
              ]}
            />
          </div>
        </section>

        {/* Cookie Duration */}
        <section>
          <SectionLabel>Retention</SectionLabel>
          <SectionHeading icon={Calendar}>How Long Do Cookies Last?</SectionHeading>

          <div className="space-y-5">
            <AccentBar>
              <h3 className="font-bold text-zinc-900" style={{ fontFamily: 'Syne, sans-serif' }}>
                Session Cookies
              </h3>
              <p className="text-base text-zinc-600">
                Temporary cookies deleted when you close your browser. Used for essential functions
                like maintaining your session during your visit.
              </p>
            </AccentBar>
            <AccentBar>
              <h3 className="font-bold text-zinc-900" style={{ fontFamily: 'Syne, sans-serif' }}>
                Persistent Cookies
              </h3>
              <p className="text-base text-zinc-600">
                Remain on your device for a specified period (typically 30 days to 2 years) or until
                you manually delete them. Used for analytics and user preferences.
              </p>
            </AccentBar>
          </div>
        </section>

        {/* Managing Cookies */}
        <section>
          <SectionLabel>Your Control</SectionLabel>
          <SectionHeading>Managing Your Cookie Preferences</SectionHeading>

          <div className="space-y-4">
            <Highlight>
              <h3 className="font-bold text-zinc-900 mb-2" style={{ fontFamily: 'Syne, sans-serif' }}>
                On Our Website
              </h3>
              <p className="text-base text-zinc-600 mb-4">
                You can manage your cookie preferences at any time using our cookie consent tool.
              </p>
              <button
                onClick={reopenCookieBanner}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-lime-400 text-zinc-900 text-sm font-bold rounded-xl hover:bg-lime-300 transition-colors"
              >
                <Settings className="w-4 h-4" />
                Manage Cookie Preferences
              </button>
            </Highlight>

            <Highlight>
              <h3 className="font-bold text-zinc-900 mb-2" style={{ fontFamily: 'Syne, sans-serif' }}>
                In Your Browser
              </h3>
              <p className="text-base text-zinc-600 mb-3">
                You can also control cookies directly through your browser settings:
              </p>
              <ul className="text-base text-zinc-600 space-y-1.5">
                <li>• <strong className="text-zinc-900">Chrome:</strong> Settings → Privacy and Security → Cookies</li>
                <li>• <strong className="text-zinc-900">Firefox:</strong> Options → Privacy &amp; Security → Cookies</li>
                <li>• <strong className="text-zinc-900">Safari:</strong> Preferences → Privacy → Cookies</li>
                <li>• <strong className="text-zinc-900">Edge:</strong> Settings → Privacy → Cookies</li>
              </ul>
            </Highlight>
          </div>
        </section>

        {/* Third-Party Services */}
        <section>
          <SectionLabel>Third Parties</SectionLabel>
          <SectionHeading icon={Globe}>Third-Party Services</SectionHeading>
          <p className="text-zinc-600 text-base mb-6">
            We use the following third-party services that may set cookies on your device:
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <Card>
              <h3 className="font-bold text-zinc-900 mb-2" style={{ fontFamily: 'Syne, sans-serif' }}>
                Google Analytics
              </h3>
              <p className="text-base text-zinc-600 mb-3">
                Website traffic analysis and user behaviour tracking.
              </p>
              <a
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-lime-600 hover:text-lime-700 font-medium transition-colors"
              >
                Privacy Policy →
              </a>
            </Card>
            <Card>
              <h3 className="font-bold text-zinc-900 mb-2" style={{ fontFamily: 'Syne, sans-serif' }}>
                Facebook Pixel
              </h3>
              <p className="text-base text-zinc-600 mb-3">
                Social media advertising and conversion tracking.
              </p>
              <a
                href="https://www.facebook.com/privacy/explanation"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-lime-600 hover:text-lime-700 font-medium transition-colors"
              >
                Privacy Policy →
              </a>
            </Card>
          </div>
        </section>

        {/* Updates */}
        <section>
          <SectionLabel>Updates</SectionLabel>
          <SectionHeading>Updates to This Policy</SectionHeading>
          <p className="text-zinc-600 text-base mb-5">
            We may update this Cookie Policy from time to time to reflect changes in our practices or
            for operational, legal, or regulatory reasons.
          </p>
          <Highlight>
            <p className="text-zinc-700 text-base">
              <span className="font-semibold text-zinc-900">Notice of changes:</span>{' '}
              We will notify you of any material changes by posting the updated policy on our website
              with a revised "Last updated" date.
            </p>
          </Highlight>
        </section>
      </main>

      {/* ── Contact block ────────────────────────────────────── */}
      <section className="bg-zinc-950 py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <SectionLabel>Get in Touch</SectionLabel>
          <h2
            className="text-3xl font-black text-white mb-3"
            style={{ fontFamily: 'Syne, sans-serif' }}
          >
            Questions about cookies?
          </h2>
          <p className="text-zinc-400 text-base mb-10">
            If you have questions about this Cookie Policy or our use of cookies, contact us:
          </p>

          <div className="grid sm:grid-cols-2 gap-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-lime-400 flex items-center justify-center flex-shrink-0">
                <Mail className="w-5 h-5 text-zinc-900" />
              </div>
              <div>
                <p className="font-semibold text-white mb-0.5">Email</p>
                <p className="text-zinc-400 text-base">hello@sprintix.asia</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-lime-400 flex items-center justify-center flex-shrink-0">
                <Globe className="w-5 h-5 text-zinc-900" />
              </div>
              <div>
                <p className="font-semibold text-white mb-0.5">Business Address</p>
                <p className="text-zinc-400 text-base">Singapore</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ──────────────────────────────────────────── */}
      <footer className="bg-zinc-950 border-t border-zinc-800 py-8 px-6">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-zinc-600 text-sm">
            © {new Date().getFullYear()} Sprintix Pte. Ltd. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-zinc-600">
            <Link to="/privacy-policy" className="hover:text-lime-400 transition-colors">Privacy Policy</Link>
            <Link to="/terms-of-service" className="hover:text-lime-400 transition-colors">Terms of Service</Link>
            <Link to="/refund-policy" className="hover:text-lime-400 transition-colors">Refund Policy</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default CookiePolicy
