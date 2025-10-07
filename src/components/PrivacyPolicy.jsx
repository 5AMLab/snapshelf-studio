import React from 'react'
import { Shield, User, Mail, Eye, Lock, Globe, Calendar, Phone, MapPin } from 'lucide-react'

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button - Top Left */}
        <div className="mb-8">
          <button
            onClick={() => window.history.back()}
            className="text-violet-600 hover:text-violet-700 font-medium flex items-center"
          >
            ← Back to Website
          </button>
        </div>
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-violet-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8 text-violet-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
          <p className="text-lg text-gray-600">
            How Sprintix Pte. Ltd. collects, uses, and protects your personal information
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>

        {/* Content */}
        <div className="bg-white rounded-2xl border border-violet-100 p-8 space-y-8">
          
          {/* Introduction */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Commitment to Your Privacy</h2>
            <p className="text-gray-600 mb-4">
              At Sprintix Pte. Ltd. ("we," "our," or "us"), we are committed to protecting your privacy and handling your personal information with care. This Privacy Policy explains how we collect, use, share, and protect your personal information when you use our website and services.
            </p>
            <p className="text-gray-600">
              By using our services, you agree to the collection and use of information in accordance with this policy. If you do not agree with this policy, please do not use our services.
            </p>
          </section>

          {/* Information We Collect */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <User className="w-6 h-6 mr-2 text-violet-600" />
              Information We Collect
            </h2>
            
            <div className="space-y-6">
              {/* Personal Information */}
              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                  <Mail className="w-5 h-5 mr-2 text-violet-600" />
                  Personal Information You Provide
                </h3>
                <p className="text-gray-600 mb-3">
                  When you use our services, we collect information you voluntarily provide to us:
                </p>
                <ul className="text-sm text-gray-600 space-y-1 list-disc pl-5">
                  <li><strong>Contact Information:</strong> Name, email address, phone number</li>
                  <li><strong>Project Information:</strong> Project briefs, requirements, goals, platform preferences</li>
                  <li><strong>Asset Information:</strong> Product photos, logos, brand materials, upload links</li>
                  <li><strong>Payment Information:</strong> Billing details (processed securely by third-party providers)</li>
                  <li><strong>Communication Records:</strong> Messages, support tickets, feedback</li>
                  <li><strong>Account Information:</strong> User preferences, service history</li>
                </ul>
              </div>

              {/* Automatically Collected Information */}
              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                  <Eye className="w-5 h-5 mr-2 text-violet-600" />
                  Information Automatically Collected
                </h3>
                <p className="text-gray-600 mb-3">
                  We automatically collect certain information when you visit our website:
                </p>
                <ul className="text-sm text-gray-600 space-y-1 list-disc pl-5">
                  <li><strong>Usage Data:</strong> Pages visited, time spent, clicks, navigation patterns</li>
                  <li><strong>Device Information:</strong> Browser type, operating system, screen resolution</li>
                  <li><strong>Location Data:</strong> IP address, general geographic location</li>
                  <li><strong>Cookies:</strong> Website preferences, session data, analytics information</li>
                  <li><strong>Log Data:</strong> Server logs, error reports, performance metrics</li>
                </ul>
              </div>

              {/* Third-Party Information */}
              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                  <Globe className="w-5 h-5 mr-2 text-violet-600" />
                  Information from Third Parties
                </h3>
                <p className="text-gray-600 mb-3">
                  We may receive information from third-party services:
                </p>
                <ul className="text-sm text-gray-600 space-y-1 list-disc pl-5">
                  <li><strong>Social Media:</strong> Profile information if you connect social accounts</li>
                  <li><strong>Analytics Services:</strong> Google Analytics, Facebook Pixel data</li>
                  <li><strong>Payment Processors:</strong> Stripe, PayPal transaction confirmations</li>
                  <li><strong>Cloud Storage:</strong> Metadata from Google Drive, Dropbox links you share</li>
                </ul>
              </div>
            </div>
          </section>

          {/* How We Use Your Information */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">How We Use Your Information</h2>
            
            <div className="grid gap-6">
              {/* Service Delivery */}
              <div className="border-l-4 border-violet-500 pl-4">
                <h3 className="font-semibold text-gray-900 mb-2">Service Delivery</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Process your design projects and deliver completed work</li>
                  <li>• Communicate about project status, requirements, and revisions</li>
                  <li>• Provide customer support and respond to inquiries</li>
                  <li>• Manage your account and service preferences</li>
                </ul>
              </div>

              {/* Business Operations */}
              <div className="border-l-4 border-violet-500 pl-4">
                <h3 className="font-semibold text-gray-900 mb-2">Business Operations</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Process payments and manage billing</li>
                  <li>• Analyze usage patterns to improve our services</li>
                  <li>• Conduct quality assurance and performance monitoring</li>
                  <li>• Maintain security and prevent fraud</li>
                </ul>
              </div>

              {/* Marketing & Communications */}
              <div className="border-l-4 border-violet-500 pl-4">
                <h3 className="font-semibold text-gray-900 mb-2">Marketing & Communications</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Send service updates, newsletters, and promotional materials</li>
                  <li>• Personalize your experience and recommendations</li>
                  <li>• Conduct market research and gather feedback</li>
                  <li>• Display relevant advertisements (with your consent)</li>
                </ul>
              </div>

              {/* Legal Requirements */}
              <div className="border-l-4 border-violet-500 pl-4">
                <h3 className="font-semibold text-gray-900 mb-2">Legal Requirements</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Comply with applicable laws and regulations</li>
                  <li>• Respond to legal requests and court orders</li>
                  <li>• Protect our rights and enforce our terms of service</li>
                  <li>• Investigate and prevent illegal activities</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Legal Basis for Processing */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Legal Basis for Processing</h2>
            <p className="text-gray-600 mb-4">
              We process your personal information based on the following legal grounds:
            </p>
            <div className="space-y-3">
              <div className="bg-violet-50 p-4 rounded-lg">
                <h3 className="font-semibold text-violet-900 mb-2">Contract Performance</h3>
                <p className="text-sm text-violet-800">
                  Processing necessary to fulfill our service contract with you (project delivery, communication, support)
                </p>
              </div>
              <div className="bg-violet-50 p-4 rounded-lg">
                <h3 className="font-semibold text-violet-900 mb-2">Legitimate Interests</h3>
                <p className="text-sm text-violet-800">
                  Business operations, service improvement, security, and fraud prevention
                </p>
              </div>
              <div className="bg-violet-50 p-4 rounded-lg">
                <h3 className="font-semibold text-violet-900 mb-2">Consent</h3>
                <p className="text-sm text-violet-800">
                  Marketing communications, analytics, and non-essential cookies (where required)
                </p>
              </div>
              <div className="bg-violet-50 p-4 rounded-lg">
                <h3 className="font-semibold text-violet-900 mb-2">Legal Obligation</h3>
                <p className="text-sm text-violet-800">
                  Compliance with tax, accounting, and other legal requirements
                </p>
              </div>
            </div>
          </section>

          {/* How We Share Your Information */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">How We Share Your Information</h2>
            <p className="text-gray-600 mb-4">
              We do not sell your personal information. We may share your information in the following circumstances:
            </p>
            <div className="space-y-4">
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">Service Providers</h3>
                <p className="text-sm text-gray-600">
                  With trusted third-party providers who help us deliver our services: payment processors (Stripe), 
                  email services (Formspree), cloud storage providers, and analytics services (Google Analytics).
                </p>
              </div>
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">Legal Requirements</h3>
                <p className="text-sm text-gray-600">
                  When required by law, court order, or to protect our rights, users' safety, or prevent fraud.
                </p>
              </div>
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">Business Transfer</h3>
                <p className="text-sm text-gray-600">
                  In the event of a merger, acquisition, or sale of assets, your information may be transferred 
                  to the new owner with the same privacy protections.
                </p>
              </div>
            </div>
          </section>

          {/* Data Security */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <Lock className="w-6 h-6 mr-2 text-violet-600" />
              Data Security
            </h2>
            <p className="text-gray-600 mb-4">
              We implement appropriate technical and organizational measures to protect your personal information:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">Technical Measures</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• SSL/TLS encryption for data transmission</li>
                  <li>• Secure servers and databases</li>
                  <li>• Regular security updates and patches</li>
                  <li>• Access controls and authentication</li>
                </ul>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">Organizational Measures</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Staff training on data protection</li>
                  <li>• Limited access on need-to-know basis</li>
                  <li>• Regular security audits and assessments</li>
                  <li>• Incident response procedures</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Data Retention */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <Calendar className="w-6 h-6 mr-2 text-violet-600" />
              Data Retention
            </h2>
            <p className="text-gray-600 mb-4">
              We retain your personal information only as long as necessary for the purposes outlined in this policy:
            </p>
            <div className="space-y-3">
              <div className="border-l-4 border-violet-500 pl-4">
                <h3 className="font-semibold text-gray-900">Project Data</h3>
                <p className="text-sm text-gray-600">
                  Contact information, project briefs, and completed work: 3 years after project completion
                </p>
              </div>
              <div className="border-l-4 border-violet-500 pl-4">
                <h3 className="font-semibold text-gray-900">Marketing Data</h3>
                <p className="text-sm text-gray-600">
                  Email communications and preferences: Until you unsubscribe or request deletion
                </p>
              </div>
              <div className="border-l-4 border-violet-500 pl-4">
                <h3 className="font-semibold text-gray-900">Analytics Data</h3>
                <p className="text-sm text-gray-600">
                  Website usage and analytics: 26 months (Google Analytics default)
                </p>
              </div>
              <div className="border-l-4 border-violet-500 pl-4">
                <h3 className="font-semibold text-gray-900">Legal Requirements</h3>
                <p className="text-sm text-gray-600">
                  Financial records and legal documents: 7 years (Singapore tax requirements)
                </p>
              </div>
            </div>
          </section>

          {/* Your Rights */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Rights</h2>
            <p className="text-gray-600 mb-4">
              You have the following rights regarding your personal information:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">Access & Portability</h3>
                <p className="text-sm text-gray-600">
                  Request a copy of your personal information and receive it in a portable format
                </p>
              </div>
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">Rectification</h3>
                <p className="text-sm text-gray-600">
                  Request correction of inaccurate or incomplete information
                </p>
              </div>
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">Erasure</h3>
                <p className="text-sm text-gray-600">
                  Request deletion of your personal information (subject to legal requirements)
                </p>
              </div>
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">Restriction</h3>
                <p className="text-sm text-gray-600">
                  Limit how we process your information in certain circumstances
                </p>
              </div>
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">Objection</h3>
                <p className="text-sm text-gray-600">
                  Object to processing based on legitimate interests or for marketing purposes
                </p>
              </div>
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">Withdraw Consent</h3>
                <p className="text-sm text-gray-600">
                  Withdraw consent for marketing communications or analytics at any time
                </p>
              </div>
            </div>
          </section>

          {/* International Transfers */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">International Data Transfers</h2>
            <p className="text-gray-600 mb-4">
              Your information may be transferred to and processed in countries other than Singapore, including:
            </p>
            <div className="bg-blue-50 p-4 rounded-lg">
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• <strong>United States:</strong> Google Analytics, payment processors</li>
                <li>• <strong>European Union:</strong> Cloud storage providers, email services</li>
                <li>• <strong>Other jurisdictions:</strong> As required for service delivery</li>
              </ul>
              <p className="text-sm text-blue-800 mt-3">
                We ensure adequate protection through standard contractual clauses, adequacy decisions, 
                or other approved mechanisms.
              </p>
            </div>
          </section>

          {/* Children's Privacy */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Children's Privacy</h2>
            <p className="text-gray-600">
              Our services are not intended for children under 18. We do not knowingly collect personal information 
              from children under 18. If you are a parent or guardian and believe your child has provided us with 
              personal information, please contact us immediately.
            </p>
          </section>

          {/* Changes to This Policy */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Changes to This Policy</h2>
            <p className="text-gray-600 mb-4">
              We may update this Privacy Policy from time to time to reflect changes in our practices, 
              technology, legal requirements, or other factors.
            </p>
            <div className="bg-violet-50 p-4 rounded-lg border border-violet-200">
              <p className="text-sm text-violet-800">
                <strong>Material Changes:</strong> We will notify you by email or website notice 30 days before 
                significant changes take effect. Continued use of our services after changes constitutes acceptance.
              </p>
            </div>
          </section>

          {/* Contact Information */}
          <section className="bg-violet-50 p-6 rounded-lg border border-violet-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
            <p className="text-gray-600 mb-4">
              If you have questions about this Privacy Policy or wish to exercise your rights, please contact us:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-violet-600" />
                <div>
                  <p className="font-medium text-gray-900">Email</p>
                  <p className="text-gray-600">privacy@sprintix.asia</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-violet-600" />
                <div>
                  <p className="font-medium text-gray-900">Phone</p>
                  <p className="text-gray-600">+65 8123 4567</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-violet-600" />
                <div>
                  <p className="font-medium text-gray-900">Address</p>
                  <p className="text-gray-600">Singapore</p>
                </div>
              </div>
            </div>
            <div className="mt-6 p-4 bg-white rounded-lg border border-violet-200">
              <p className="text-sm text-gray-600">
                <strong>Response Time:</strong> We will respond to your privacy requests within 30 days. 
                For urgent matters, please mark your email as "Privacy Request - Urgent."
              </p>
            </div>
          </section>
        </div>

      </div>
    </div>
  )
}

export default PrivacyPolicy