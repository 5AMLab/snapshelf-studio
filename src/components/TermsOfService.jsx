import React from 'react'
import { Link } from 'react-router-dom'
import { FileText, Users, DollarSign, Shield, AlertTriangle, Gavel, Clock, Globe } from 'lucide-react'

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

/* ── Page ───────────────────────────────────────────────────── */
const TermsOfService = () => {
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
            Terms of Service
          </h1>
          <p className="text-zinc-400 text-base max-w-xl">
            The legal agreement between you and Sprintix Pte. Ltd.
          </p>
          <p className="text-zinc-600 text-sm mt-3">Last updated: {lastUpdated}</p>
        </div>
      </section>

      {/* ── Body ────────────────────────────────────────────── */}
      <main className="max-w-5xl mx-auto px-6 py-16 space-y-16">

        {/* Agreement to Terms */}
        <section>
          <SectionLabel>Overview</SectionLabel>
          <SectionHeading>Agreement to Terms</SectionHeading>
          <p className="text-zinc-600 text-base mb-6">
            Welcome to Sprintix Pte. Ltd. ("we," "our," or "us"). These Terms of Service ("Terms") govern
            your use of our website, services, and products. By accessing or using our services, you agree
            to be bound by these Terms.
          </p>
          <Highlight>
            <p className="text-zinc-700 text-base">
              <span className="font-semibold text-zinc-900">Important:</span>{' '}
              If you do not agree to these Terms, please do not use our services. By using our services,
              you represent that you are at least 18 years old and have the legal capacity to enter into
              this agreement.
            </p>
          </Highlight>
        </section>

        {/* Our Services */}
        <section>
          <SectionLabel>Services</SectionLabel>
          <SectionHeading icon={Users}>Our Services</SectionHeading>
          <p className="text-zinc-600 text-base mb-6">
            Sprintix Pte. Ltd. provides professional e-commerce visual production and marketplace growth
            services, including:
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <Card>
              <h3 className="font-bold text-zinc-900 mb-3" style={{ fontFamily: 'Syne, sans-serif' }}>
                Visual Production
              </h3>
              <ul className="text-base text-zinc-600 space-y-1.5">
                <li>• Brand identity design</li>
                <li>• E-commerce listing image creation</li>
                <li>• Performance creative for ads</li>
                <li>• Image SEO &amp; metadata optimisation</li>
              </ul>
            </Card>
            <Card>
              <h3 className="font-bold text-zinc-900 mb-3" style={{ fontFamily: 'Syne, sans-serif' }}>
                Marketplace Growth
              </h3>
              <ul className="text-base text-zinc-600 space-y-1.5">
                <li>• Lazada &amp; Shopee campaign management</li>
                <li>• Store setup &amp; brand development</li>
                <li>• Campaign performance reporting</li>
                <li>• Custom growth solutions</li>
              </ul>
            </Card>
          </div>
        </section>

        {/* User Accounts and Responsibilities */}
        <section>
          <SectionLabel>Your Responsibilities</SectionLabel>
          <SectionHeading>User Accounts and Responsibilities</SectionHeading>

          <div className="space-y-4">
            <Card>
              <h3 className="font-bold text-zinc-900 mb-3" style={{ fontFamily: 'Syne, sans-serif' }}>
                Account Creation
              </h3>
              <ul className="text-base text-zinc-600 space-y-1.5 list-disc pl-5">
                <li>You must provide accurate and complete information when creating an account</li>
                <li>You are responsible for maintaining the confidentiality of your account credentials</li>
                <li>You must notify us immediately of any unauthorized use of your account</li>
                <li>You may only create one account unless expressly permitted by us</li>
              </ul>
            </Card>

            <Card>
              <h3 className="font-bold text-zinc-900 mb-3" style={{ fontFamily: 'Syne, sans-serif' }}>
                Acceptable Use
              </h3>
              <p className="text-base text-zinc-600 mb-3">
                You agree to use our services only for lawful purposes. You will not:
              </p>
              <ul className="text-base text-zinc-600 space-y-1.5 list-disc pl-5">
                <li>Submit content that infringes on intellectual property rights</li>
                <li>Upload illegal, harmful, or offensive material</li>
                <li>Attempt to gain unauthorized access to our systems</li>
                <li>Use our services to compete with or harm our business</li>
                <li>Submit content containing malware or malicious code</li>
                <li>Violate any applicable laws or regulations</li>
              </ul>
            </Card>

            <Card>
              <h3 className="font-bold text-zinc-900 mb-3" style={{ fontFamily: 'Syne, sans-serif' }}>
                Content Submission
              </h3>
              <p className="text-base text-zinc-600 mb-3">
                When you submit content to us, you represent and warrant that:
              </p>
              <ul className="text-base text-zinc-600 space-y-1.5 list-disc pl-5">
                <li>You own all rights to the content or have permission to use it</li>
                <li>The content does not violate any third-party rights</li>
                <li>You have the right to grant us the licenses described in these Terms</li>
                <li>The content is accurate and not misleading</li>
              </ul>
            </Card>
          </div>
        </section>

        {/* Payment Terms */}
        <section>
          <SectionLabel>Billing</SectionLabel>
          <SectionHeading icon={DollarSign}>Payment Terms</SectionHeading>

          <div className="space-y-5">
            <AccentBar>
              <h3 className="font-bold text-zinc-900" style={{ fontFamily: 'Syne, sans-serif' }}>
                Pricing and Fees
              </h3>
              <p className="text-base text-zinc-600">
                Service fees are clearly displayed on our website and may vary based on project complexity,
                turnaround time, and service level selected. All prices are in SGD unless otherwise specified.
              </p>
            </AccentBar>

            <AccentBar>
              <h3 className="font-bold text-zinc-900" style={{ fontFamily: 'Syne, sans-serif' }}>
                Payment Processing
              </h3>
              <p className="text-base text-zinc-600">
                Payments are processed securely through Stripe. By providing payment information, you authorise
                us to charge the specified amount for services rendered.
              </p>
            </AccentBar>

            <AccentBar>
              <h3 className="font-bold text-zinc-900" style={{ fontFamily: 'Syne, sans-serif' }}>
                Refund Policy
              </h3>
              <p className="text-base text-zinc-600">
                We offer refunds for services not yet started within 24 hours of payment. Once work has begun,
                refunds are handled on a case-by-case basis. Completed work is non-refundable unless there are
                significant quality issues that cannot be resolved through revisions.
              </p>
            </AccentBar>

            <AccentBar>
              <h3 className="font-bold text-zinc-900" style={{ fontFamily: 'Syne, sans-serif' }}>
                Disputed Charges
              </h3>
              <p className="text-base text-zinc-600">
                Please contact us directly before disputing charges with your payment provider. We will work
                with you to resolve any billing issues promptly.
              </p>
            </AccentBar>
          </div>
        </section>

        {/* Intellectual Property */}
        <section>
          <SectionLabel>Ownership</SectionLabel>
          <SectionHeading icon={Shield}>Intellectual Property Rights</SectionHeading>

          <div className="space-y-4">
            <Highlight>
              <h3 className="font-bold text-zinc-900 mb-2" style={{ fontFamily: 'Syne, sans-serif' }}>
                Your Content
              </h3>
              <p className="text-base text-zinc-600 mb-2">
                You retain ownership of all content you submit to us. However, you grant us a limited,
                non-exclusive licence to use, modify, and process your content solely for the purpose of
                providing our services.
              </p>
              <p className="text-base text-zinc-600">
                This licence includes the right to make backup copies, perform technical modifications
                necessary for processing, and create derivative works as part of our service delivery.
              </p>
            </Highlight>

            <Highlight>
              <h3 className="font-bold text-zinc-900 mb-2" style={{ fontFamily: 'Syne, sans-serif' }}>
                Our Deliverables
              </h3>
              <p className="text-base text-zinc-600 mb-2">
                Upon full payment, you receive full ownership and commercial usage rights to the final
                edited images and designs we create for you.
              </p>
              <p className="text-base text-zinc-600">
                We may retain samples of our work for portfolio and marketing purposes, with any identifying
                information removed unless you provide explicit permission.
              </p>
            </Highlight>

            <Highlight>
              <h3 className="font-bold text-zinc-900 mb-2" style={{ fontFamily: 'Syne, sans-serif' }}>
                Platform and Technology
              </h3>
              <p className="text-base text-zinc-600">
                Our website, software, designs, logos, and other intellectual property remain our exclusive
                property. You may not copy, reproduce, or distribute any part of our platform without
                written permission.
              </p>
            </Highlight>
          </div>
        </section>

        {/* Service Levels */}
        <section>
          <SectionLabel>Delivery</SectionLabel>
          <SectionHeading icon={Clock}>Service Levels and Guarantees</SectionHeading>

          <div className="grid gap-4">
            <Card>
              <h3 className="font-bold text-zinc-900 mb-3" style={{ fontFamily: 'Syne, sans-serif' }}>
                Turnaround Times
              </h3>
              <ul className="text-base text-zinc-600 space-y-1.5">
                <li>• <strong className="text-zinc-900">Standard:</strong> 2–3 business days</li>
                <li>• <strong className="text-zinc-900">Express:</strong> 24–48 hours</li>
                <li>• <strong className="text-zinc-900">Rush:</strong> Same day (additional fees apply)</li>
                <li>• Custom projects may require longer timeframes</li>
              </ul>
            </Card>

            <Card>
              <h3 className="font-bold text-zinc-900 mb-2" style={{ fontFamily: 'Syne, sans-serif' }}>
                Quality Guarantee
              </h3>
              <p className="text-base text-zinc-600">
                We provide up to 3 rounds of revisions at no additional cost to ensure your satisfaction.
                Additional revisions may incur extra charges.
              </p>
            </Card>

            <Card>
              <h3 className="font-bold text-zinc-900 mb-2" style={{ fontFamily: 'Syne, sans-serif' }}>
                File Delivery
              </h3>
              <p className="text-base text-zinc-600">
                Final files are delivered in your requested format via secure download link. Files are
                available for download for 30 days after delivery.
              </p>
            </Card>
          </div>
        </section>

        {/* Limitation of Liability */}
        <section>
          <SectionLabel>Liability</SectionLabel>
          <SectionHeading icon={AlertTriangle}>Limitation of Liability</SectionHeading>

          <div className="bg-zinc-950 rounded-2xl p-8 space-y-6">
            <p className="text-zinc-400 text-base">
              <span className="font-semibold text-white">Important legal notice:</span>{' '}
              Please read this section carefully as it limits our liability.
            </p>

            <div className="space-y-5">
              <div>
                <h3 className="font-bold text-white mb-2" style={{ fontFamily: 'Syne, sans-serif' }}>
                  Service Limitations
                </h3>
                <p className="text-zinc-400 text-base">
                  Our services are provided "as is" without warranties of any kind. We do not guarantee
                  that our services will meet your specific requirements or be error-free.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-white mb-2" style={{ fontFamily: 'Syne, sans-serif' }}>
                  Liability Cap
                </h3>
                <p className="text-zinc-400 text-base">
                  Our total liability for any claims arising from or related to our services will not
                  exceed the amount you paid us for the specific service giving rise to the claim.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-white mb-2" style={{ fontFamily: 'Syne, sans-serif' }}>
                  Excluded Damages
                </h3>
                <p className="text-zinc-400 text-base">
                  We will not be liable for indirect, incidental, special, consequential, or punitive
                  damages, including lost profits, business interruption, or loss of data.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Indemnification */}
        <section>
          <SectionLabel>Indemnification</SectionLabel>
          <SectionHeading>Indemnification</SectionHeading>
          <p className="text-zinc-600 text-base mb-5">
            You agree to indemnify and hold harmless Sprintix Pte. Ltd., its employees, and partners from
            any claims, damages, or expenses arising from:
          </p>
          <ul className="text-base text-zinc-600 space-y-2 list-disc pl-5">
            <li>Your use of our services</li>
            <li>Content you submit to us</li>
            <li>Your violation of these Terms</li>
            <li>Your violation of any third-party rights</li>
            <li>Any illegal or unauthorised use of our services through your account</li>
          </ul>
        </section>

        {/* Termination */}
        <section>
          <SectionLabel>Account</SectionLabel>
          <SectionHeading>Termination</SectionHeading>

          <div className="space-y-5">
            <AccentBar>
              <h3 className="font-bold text-zinc-900" style={{ fontFamily: 'Syne, sans-serif' }}>
                By You
              </h3>
              <p className="text-base text-zinc-600">
                You may terminate your account at any time by contacting us. Upon termination, you remain
                responsible for any outstanding payments for services already provided.
              </p>
            </AccentBar>

            <AccentBar>
              <h3 className="font-bold text-zinc-900" style={{ fontFamily: 'Syne, sans-serif' }}>
                By Us
              </h3>
              <p className="text-base text-zinc-600">
                We may terminate or suspend your account immediately if you violate these Terms, engage in
                fraudulent activity, or for any other reason at our sole discretion.
              </p>
            </AccentBar>

            <AccentBar>
              <h3 className="font-bold text-zinc-900" style={{ fontFamily: 'Syne, sans-serif' }}>
                Effect of Termination
              </h3>
              <p className="text-base text-zinc-600">
                Upon termination, your right to use our services ceases immediately. Provisions regarding
                intellectual property, payment obligations, and limitation of liability survive termination.
              </p>
            </AccentBar>
          </div>
        </section>

        {/* Governing Law */}
        <section>
          <SectionLabel>Legal</SectionLabel>
          <SectionHeading icon={Gavel}>Governing Law and Disputes</SectionHeading>

          <div className="grid md:grid-cols-2 gap-4">
            <Highlight>
              <h3 className="font-bold text-zinc-900 mb-2" style={{ fontFamily: 'Syne, sans-serif' }}>
                Governing Law
              </h3>
              <p className="text-base text-zinc-600">
                These Terms are governed by the laws of Singapore. Any disputes will be resolved in the
                courts of Singapore.
              </p>
            </Highlight>

            <Highlight>
              <h3 className="font-bold text-zinc-900 mb-2" style={{ fontFamily: 'Syne, sans-serif' }}>
                Dispute Resolution
              </h3>
              <p className="text-base text-zinc-600">
                We encourage resolving disputes through direct communication first. For formal disputes,
                we prefer mediation before litigation.
              </p>
            </Highlight>
          </div>
        </section>

        {/* Changes to Terms */}
        <section>
          <SectionLabel>Updates</SectionLabel>
          <SectionHeading>Changes to These Terms</SectionHeading>
          <p className="text-zinc-600 text-base mb-5">
            We may update these Terms from time to time to reflect changes in our services, legal
            requirements, or business practices.
          </p>
          <Highlight>
            <p className="text-zinc-700 text-base">
              <span className="font-semibold text-zinc-900">Notice of changes:</span>{' '}
              We will notify you of material changes by email or website notice at least 30 days before
              they take effect. Continued use of our services after changes constitutes acceptance of the
              new Terms.
            </p>
          </Highlight>
        </section>

        {/* Entire Agreement */}
        <section>
          <SectionLabel>Summary</SectionLabel>
          <SectionHeading>Entire Agreement</SectionHeading>
          <p className="text-zinc-600 text-base">
            These Terms, together with our{' '}
            <Link to="/privacy-policy" className="text-lime-600 hover:text-lime-700 underline underline-offset-2">
              Privacy Policy
            </Link>{' '}
            and any additional terms for specific services, constitute the entire agreement between you
            and Sprintix Pte. Ltd. If any provision is found unenforceable, the remainder will remain in
            full force and effect.
          </p>
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
            Questions about these Terms?
          </h2>
          <p className="text-zinc-400 text-base mb-10">
            If you have questions about these Terms or need to contact us for any reason:
          </p>

          <div className="grid sm:grid-cols-2 gap-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-lime-400 flex items-center justify-center flex-shrink-0">
                <Globe className="w-5 h-5 text-zinc-900" />
              </div>
              <div>
                <p className="font-semibold text-white mb-0.5">Email</p>
                <p className="text-zinc-400 text-base">legal@sprintix.asia</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-lime-400 flex items-center justify-center flex-shrink-0">
                <Gavel className="w-5 h-5 text-zinc-900" />
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
            <Link to="/cookie-policy" className="hover:text-lime-400 transition-colors">Cookie Policy</Link>
            <Link to="/refund-policy" className="hover:text-lime-400 transition-colors">Refund Policy</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default TermsOfService
