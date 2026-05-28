import React from 'react'
import { Link } from 'react-router-dom'
import { Shield, User, Mail, Eye, Lock, Globe, Calendar, Phone, MapPin } from 'lucide-react'

// ── Shared legal page shell ────────────────────────────────────────────────────
function LegalNav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-zinc-950/95 backdrop-blur-md border-b border-zinc-800/60">
      <div className="max-w-4xl mx-auto px-6 h-[68px] flex items-center justify-between">
        <Link to="/">
          <span className="text-white font-black text-2xl tracking-tight" style={{ fontFamily: "'Syne', sans-serif" }}>
            Sprintix<span className="text-lime-400">.</span>
          </span>
        </Link>
        <Link to="/" className="text-zinc-400 text-sm font-medium hover:text-white transition-colors flex items-center gap-2">
          ← Back to Home
        </Link>
      </div>
    </nav>
  )
}

function SectionLabel({ children }) {
  return <span className="text-lime-600 text-xs font-bold uppercase tracking-widest">{children}</span>
}

function SectionHeading({ icon: Icon, children }) {
  return (
    <h2 className="text-2xl font-black text-zinc-950 mb-6 flex items-center gap-3" style={{ fontFamily: "'Syne', sans-serif" }}>
      {Icon && <span className="w-8 h-8 bg-zinc-950 rounded-lg flex items-center justify-center flex-shrink-0">
        <Icon className="w-4 h-4 text-lime-400" />
      </span>}
      {children}
    </h2>
  )
}

function Card({ children, className = '' }) {
  return (
    <div className={`border border-zinc-100 rounded-2xl p-6 ${className}`}>{children}</div>
  )
}

function AccentBar({ children }) {
  return (
    <div className="border-l-4 border-lime-400 pl-5">{children}</div>
  )
}

function Highlight({ children, className = '' }) {
  return (
    <div className={`bg-zinc-50 border border-zinc-100 rounded-2xl p-5 ${className}`}>{children}</div>
  )
}

// ── Main component ─────────────────────────────────────────────────────────────
const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-white font-sans antialiased">
      <LegalNav />

      {/* Hero header */}
      <div className="bg-zinc-950 pt-[68px]">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <SectionLabel>Legal</SectionLabel>
          <h1 className="text-5xl font-black text-white mt-3 mb-4" style={{ fontFamily: "'Syne', sans-serif" }}>
            Privacy Policy
          </h1>
          <p className="text-zinc-400 text-lg max-w-xl leading-relaxed">
            How Sprintix Pte. Ltd. collects, uses, and protects your personal information.
          </p>
          <p className="text-zinc-600 text-sm mt-4">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-16 space-y-14">

        {/* Introduction */}
        <section>
          <h2 className="text-2xl font-black text-zinc-950 mb-4" style={{ fontFamily: "'Syne', sans-serif" }}>
            Our Commitment to Your Privacy
          </h2>
          <p className="text-zinc-600 text-base leading-relaxed mb-4">
            At Sprintix Pte. Ltd. ("we," "our," or "us"), we are committed to protecting your privacy and handling your personal information with care. This Privacy Policy explains how we collect, use, share, and protect your personal information when you use our website and services.
          </p>
          <p className="text-zinc-600 text-base leading-relaxed">
            By using our services, you agree to the collection and use of information in accordance with this policy. If you do not agree with this policy, please do not use our services.
          </p>
        </section>

        {/* Information We Collect */}
        <section>
          <SectionHeading icon={User}>Information We Collect</SectionHeading>
          <div className="space-y-4">
            <Card>
              <h3 className="font-bold text-zinc-950 mb-3 flex items-center gap-2">
                <Mail className="w-4 h-4 text-lime-600" /> Personal Information You Provide
              </h3>
              <p className="text-zinc-600 text-base mb-3">When you use our services, we collect information you voluntarily provide:</p>
              <ul className="text-base text-zinc-600 space-y-1.5 list-disc pl-5">
                <li><strong className="text-zinc-800">Contact Information:</strong> Name, email address, phone number</li>
                <li><strong className="text-zinc-800">Project Information:</strong> Project briefs, requirements, goals, platform preferences</li>
                <li><strong className="text-zinc-800">Asset Information:</strong> Product photos, logos, brand materials, upload links</li>
                <li><strong className="text-zinc-800">Payment Information:</strong> Billing details (processed securely by third-party providers)</li>
                <li><strong className="text-zinc-800">Communication Records:</strong> Messages, support tickets, feedback</li>
                <li><strong className="text-zinc-800">Account Information:</strong> User preferences, service history</li>
              </ul>
            </Card>

            <Card>
              <h3 className="font-bold text-zinc-950 mb-3 flex items-center gap-2">
                <Eye className="w-4 h-4 text-lime-600" /> Information Automatically Collected
              </h3>
              <p className="text-zinc-600 text-base mb-3">We automatically collect certain information when you visit our website:</p>
              <ul className="text-base text-zinc-600 space-y-1.5 list-disc pl-5">
                <li><strong className="text-zinc-800">Usage Data:</strong> Pages visited, time spent, clicks, navigation patterns</li>
                <li><strong className="text-zinc-800">Device Information:</strong> Browser type, operating system, screen resolution</li>
                <li><strong className="text-zinc-800">Location Data:</strong> IP address, general geographic location</li>
                <li><strong className="text-zinc-800">Cookies:</strong> Website preferences, session data, analytics information</li>
                <li><strong className="text-zinc-800">Log Data:</strong> Server logs, error reports, performance metrics</li>
              </ul>
            </Card>

            <Card>
              <h3 className="font-bold text-zinc-950 mb-3 flex items-center gap-2">
                <Globe className="w-4 h-4 text-lime-600" /> Information from Third Parties
              </h3>
              <p className="text-zinc-600 text-base mb-3">We may receive information from third-party services:</p>
              <ul className="text-base text-zinc-600 space-y-1.5 list-disc pl-5">
                <li><strong className="text-zinc-800">Social Media:</strong> Profile information if you connect social accounts</li>
                <li><strong className="text-zinc-800">Analytics Services:</strong> Google Analytics, Facebook Pixel data</li>
                <li><strong className="text-zinc-800">Payment Processors:</strong> Stripe transaction confirmations</li>
                <li><strong className="text-zinc-800">Cloud Storage:</strong> Metadata from Google Drive, Dropbox links you share</li>
              </ul>
            </Card>
          </div>
        </section>

        {/* How We Use Your Information */}
        <section>
          <SectionHeading>How We Use Your Information</SectionHeading>
          <div className="space-y-5">
            {[
              {
                title: 'Service Delivery',
                items: [
                  'Process your design projects and deliver completed work',
                  'Communicate about project status, requirements, and revisions',
                  'Provide customer support and respond to inquiries',
                  'Manage your account and service preferences',
                ],
              },
              {
                title: 'Business Operations',
                items: [
                  'Process payments and manage billing',
                  'Analyze usage patterns to improve our services',
                  'Conduct quality assurance and performance monitoring',
                  'Maintain security and prevent fraud',
                ],
              },
              {
                title: 'Marketing & Communications',
                items: [
                  'Send service updates, newsletters, and promotional materials',
                  'Personalise your experience and recommendations',
                  'Conduct market research and gather feedback',
                  'Display relevant advertisements (with your consent)',
                ],
              },
              {
                title: 'Legal Requirements',
                items: [
                  'Comply with applicable laws and regulations',
                  'Respond to legal requests and court orders',
                  'Protect our rights and enforce our terms of service',
                  'Investigate and prevent illegal activities',
                ],
              },
            ].map((block) => (
              <AccentBar key={block.title}>
                <h3 className="font-bold text-zinc-950 mb-2">{block.title}</h3>
                <ul className="text-base text-zinc-600 space-y-1">
                  {block.items.map((item) => <li key={item}>• {item}</li>)}
                </ul>
              </AccentBar>
            ))}
          </div>
        </section>

        {/* Legal Basis */}
        <section>
          <SectionHeading>Legal Basis for Processing</SectionHeading>
          <p className="text-zinc-600 text-base mb-5">We process your personal information based on the following legal grounds:</p>
          <div className="space-y-3">
            {[
              { title: 'Contract Performance', body: 'Processing necessary to fulfil our service contract with you (project delivery, communication, support).' },
              { title: 'Legitimate Interests', body: 'Business operations, service improvement, security, and fraud prevention.' },
              { title: 'Consent', body: 'Marketing communications, analytics, and non-essential cookies (where required).' },
              { title: 'Legal Obligation', body: 'Compliance with tax, accounting, and other legal requirements.' },
            ].map((item) => (
              <Highlight key={item.title}>
                <h3 className="font-bold text-zinc-950 mb-1">{item.title}</h3>
                <p className="text-zinc-600 text-base">{item.body}</p>
              </Highlight>
            ))}
          </div>
        </section>

        {/* How We Share */}
        <section>
          <SectionHeading>How We Share Your Information</SectionHeading>
          <p className="text-zinc-600 text-base mb-5">We do not sell your personal information. We may share it in the following circumstances:</p>
          <div className="space-y-4">
            {[
              { title: 'Service Providers', body: 'With trusted third-party providers who help us deliver our services: payment processors (Stripe), email services, cloud storage providers, and analytics services (Google Analytics).' },
              { title: 'Legal Requirements', body: 'When required by law, court order, or to protect our rights, users\' safety, or prevent fraud.' },
              { title: 'Business Transfer', body: 'In the event of a merger, acquisition, or sale of assets, your information may be transferred to the new owner with the same privacy protections.' },
            ].map((item) => (
              <Card key={item.title}>
                <h3 className="font-bold text-zinc-950 mb-2">{item.title}</h3>
                <p className="text-base text-zinc-600">{item.body}</p>
              </Card>
            ))}
          </div>
        </section>

        {/* Data Security */}
        <section>
          <SectionHeading icon={Lock}>Data Security</SectionHeading>
          <p className="text-zinc-600 text-base mb-5">We implement appropriate technical and organisational measures to protect your personal information:</p>
          <div className="grid md:grid-cols-2 gap-4">
            <Card>
              <h3 className="font-bold text-zinc-950 mb-3">Technical Measures</h3>
              <ul className="text-base text-zinc-600 space-y-1.5">
                <li>• SSL/TLS encryption for data transmission</li>
                <li>• Secure servers and databases</li>
                <li>• Regular security updates and patches</li>
                <li>• Access controls and authentication</li>
              </ul>
            </Card>
            <Card>
              <h3 className="font-bold text-zinc-950 mb-3">Organisational Measures</h3>
              <ul className="text-base text-zinc-600 space-y-1.5">
                <li>• Staff training on data protection</li>
                <li>• Limited access on need-to-know basis</li>
                <li>• Regular security audits and assessments</li>
                <li>• Incident response procedures</li>
              </ul>
            </Card>
          </div>
        </section>

        {/* Data Retention */}
        <section>
          <SectionHeading icon={Calendar}>Data Retention</SectionHeading>
          <p className="text-zinc-600 text-base mb-5">We retain your personal information only as long as necessary:</p>
          <div className="space-y-4">
            {[
              { title: 'Project Data', body: 'Contact information, project briefs, and completed work: 3 years after project completion.' },
              { title: 'Marketing Data', body: 'Email communications and preferences: until you unsubscribe or request deletion.' },
              { title: 'Analytics Data', body: 'Website usage and analytics: 26 months (Google Analytics default).' },
              { title: 'Legal Requirements', body: 'Financial records and legal documents: 7 years (Singapore tax requirements).' },
            ].map((item) => (
              <AccentBar key={item.title}>
                <h3 className="font-bold text-zinc-950 mb-1">{item.title}</h3>
                <p className="text-base text-zinc-600">{item.body}</p>
              </AccentBar>
            ))}
          </div>
        </section>

        {/* Your Rights */}
        <section>
          <SectionHeading>Your Rights</SectionHeading>
          <p className="text-zinc-600 text-base mb-5">You have the following rights regarding your personal information:</p>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { title: 'Access & Portability', body: 'Request a copy of your personal information in a portable format.' },
              { title: 'Rectification', body: 'Request correction of inaccurate or incomplete information.' },
              { title: 'Erasure', body: 'Request deletion of your personal information (subject to legal requirements).' },
              { title: 'Restriction', body: 'Limit how we process your information in certain circumstances.' },
              { title: 'Objection', body: 'Object to processing based on legitimate interests or for marketing purposes.' },
              { title: 'Withdraw Consent', body: 'Withdraw consent for marketing communications or analytics at any time.' },
            ].map((item) => (
              <Card key={item.title}>
                <h3 className="font-bold text-zinc-950 mb-2">{item.title}</h3>
                <p className="text-base text-zinc-600">{item.body}</p>
              </Card>
            ))}
          </div>
        </section>

        {/* International Transfers */}
        <section>
          <SectionHeading>International Data Transfers</SectionHeading>
          <p className="text-zinc-600 text-base mb-4">Your information may be transferred to and processed in countries other than Singapore:</p>
          <Highlight>
            <ul className="text-base text-zinc-600 space-y-1.5">
              <li>• <strong className="text-zinc-800">United States:</strong> Google Analytics, payment processors</li>
              <li>• <strong className="text-zinc-800">European Union:</strong> Cloud storage providers, email services</li>
              <li>• <strong className="text-zinc-800">Other jurisdictions:</strong> As required for service delivery</li>
            </ul>
            <p className="text-base text-zinc-600 mt-3">
              We ensure adequate protection through standard contractual clauses, adequacy decisions, or other approved mechanisms.
            </p>
          </Highlight>
        </section>

        {/* Children's Privacy */}
        <section>
          <SectionHeading>Children's Privacy</SectionHeading>
          <p className="text-zinc-600 text-base leading-relaxed">
            Our services are not intended for children under 18. We do not knowingly collect personal information from children. If you are a parent or guardian and believe your child has provided us with personal information, please contact us immediately.
          </p>
        </section>

        {/* Changes */}
        <section>
          <SectionHeading>Changes to This Policy</SectionHeading>
          <p className="text-zinc-600 text-base mb-4">
            We may update this Privacy Policy from time to time to reflect changes in our practices, technology, legal requirements, or other factors.
          </p>
          <Highlight>
            <p className="text-base text-zinc-600">
              <strong className="text-zinc-800">Material Changes:</strong> We will notify you by email or website notice 30 days before significant changes take effect. Continued use of our services after changes constitutes acceptance.
            </p>
          </Highlight>
        </section>

        {/* Contact */}
        <section className="bg-zinc-950 rounded-2xl p-10">
          <SectionLabel>Contact</SectionLabel>
          <h2 className="text-2xl font-black text-white mt-3 mb-6" style={{ fontFamily: "'Syne', sans-serif" }}>
            Questions about this policy?
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex items-start gap-3">
              <span className="w-8 h-8 bg-lime-400 rounded-lg flex items-center justify-center flex-shrink-0">
                <Mail className="w-4 h-4 text-zinc-950" />
              </span>
              <div>
                <p className="text-zinc-400 text-xs font-semibold uppercase tracking-wide mb-1">Email</p>
                <a href="mailto:privacy@sprintix.co" className="text-white text-base hover:text-lime-400 transition-colors">privacy@sprintix.co</a>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="w-8 h-8 bg-lime-400 rounded-lg flex items-center justify-center flex-shrink-0">
                <MapPin className="w-4 h-4 text-zinc-950" />
              </span>
              <div>
                <p className="text-zinc-400 text-xs font-semibold uppercase tracking-wide mb-1">Based in</p>
                <p className="text-white text-base">Singapore</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="w-8 h-8 bg-lime-400 rounded-lg flex items-center justify-center flex-shrink-0">
                <Calendar className="w-4 h-4 text-zinc-950" />
              </span>
              <div>
                <p className="text-zinc-400 text-xs font-semibold uppercase tracking-wide mb-1">Response time</p>
                <p className="text-white text-base">Within 30 days</p>
              </div>
            </div>
          </div>
        </section>

      </div>

      {/* Footer */}
      <footer className="border-t border-zinc-100 py-8 px-6">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-zinc-400 text-sm">© {new Date().getFullYear()} Sprintix Pte. Ltd. All rights reserved.</p>
          <div className="flex gap-5">
            <Link to="/terms-of-service" className="text-zinc-400 text-sm hover:text-zinc-700 transition-colors">Terms of Service</Link>
            <Link to="/privacy-policy" className="text-zinc-400 text-sm hover:text-zinc-700 transition-colors">Privacy Policy</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default PrivacyPolicy
