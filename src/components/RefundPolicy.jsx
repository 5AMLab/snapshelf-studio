import React from 'react'
import { DollarSign, Clock, CheckCircle, XCircle, AlertCircle, Mail, Phone, MapPin } from 'lucide-react'

const RefundPolicy = () => {
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
            <DollarSign className="w-8 h-8 text-violet-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Refund Policy</h1>
          <p className="text-lg text-gray-600">
            Our commitment to customer satisfaction and refund terms
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>

        {/* Content */}
        <div className="bg-white rounded-2xl border border-violet-100 p-8 space-y-8">

          {/* Introduction */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Commitment</h2>
            <p className="text-gray-600 mb-4">
              At Sprintix Pte. Ltd., we are committed to delivering high-quality photo editing services that meet your expectations.
              If you're not satisfied with our work, we offer revisions and, in certain circumstances, refunds as outlined in this policy.
            </p>
            <div className="bg-violet-50 p-4 rounded-lg border border-violet-200">
              <p className="text-sm text-violet-800">
                <strong>Important:</strong> By placing an order with Sprintix, you agree to the terms outlined in this Refund Policy.
                Please read carefully before making a purchase.
              </p>
            </div>
          </section>

          {/* Revision Policy */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Revision Policy</h2>
            <p className="text-gray-600 mb-4">
              We want you to be completely satisfied with our work. Before requesting a refund, we encourage you to request revisions:
            </p>

            <div className="space-y-4">
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                  <CheckCircle className="w-5 h-5 mr-2 text-green-600" />
                  What's Included
                </h3>
                <ul className="text-sm text-gray-600 space-y-1 list-disc pl-5">
                  <li><strong>Free Revisions:</strong> 2 rounds of revisions included with every project</li>
                  <li><strong>Timeline:</strong> Revisions must be requested within 7 days of delivery</li>
                  <li><strong>Scope:</strong> Revisions must be within the original project brief and specifications</li>
                  <li><strong>Turnaround:</strong> Revision requests are processed within 24-48 hours</li>
                  <li><strong>Additional Revisions:</strong> Available for a fee if you exceed the included rounds</li>
                </ul>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <p className="text-sm text-blue-800">
                  <strong>How to Request Revisions:</strong> Contact us at hello@sprintix.sg with your order number and
                  specific revision requests. Please be as detailed as possible to ensure we address all your concerns.
                </p>
              </div>
            </div>
          </section>

          {/* Refund Eligibility */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Refund Eligibility</h2>

            <div className="space-y-6">
              {/* Full Refunds */}
              <div className="border-l-4 border-green-500 pl-4">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                  <CheckCircle className="w-5 h-5 mr-2 text-green-600" />
                  Full Refund (100%)
                </h3>
                <p className="text-sm text-gray-600 mb-2">
                  You are eligible for a full refund in the following cases:
                </p>
                <ul className="text-sm text-gray-600 space-y-1 list-disc pl-5">
                  <li>Service not delivered within the agreed timeline (excluding customer delays)</li>
                  <li>Major technical errors that make the files unusable</li>
                  <li>Service significantly different from what was agreed in the project brief</li>
                  <li>Cancellation requested within 24 hours of order placement (before work begins)</li>
                  <li>We are unable to complete the project due to technical limitations</li>
                </ul>
              </div>

              {/* Partial Refunds */}
              <div className="border-l-4 border-yellow-500 pl-4">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                  <AlertCircle className="w-5 h-5 mr-2 text-yellow-600" />
                  Partial Refund (50%)
                </h3>
                <p className="text-sm text-gray-600 mb-2">
                  You may be eligible for a partial refund in the following cases:
                </p>
                <ul className="text-sm text-gray-600 space-y-1 list-disc pl-5">
                  <li>Minor quality issues that cannot be resolved through revisions</li>
                  <li>Cancellation after work has begun but before 50% completion</li>
                  <li>Service partially meets expectations but falls short in some areas</li>
                  <li>Delivery delay of more than 3 business days (excluding customer delays)</li>
                </ul>
              </div>

              {/* No Refunds */}
              <div className="border-l-4 border-red-500 pl-4">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                  <XCircle className="w-5 h-5 mr-2 text-red-600" />
                  No Refund
                </h3>
                <p className="text-sm text-gray-600 mb-2">
                  Refunds will not be provided in the following situations:
                </p>
                <ul className="text-sm text-gray-600 space-y-1 list-disc pl-5">
                  <li>Change of mind after work is completed</li>
                  <li>Subjective dissatisfaction without specific technical issues</li>
                  <li>Customer-caused delays or lack of response to revision requests</li>
                  <li>Files already used in marketing, sales, or published online</li>
                  <li>Custom work completed according to the approved project brief</li>
                  <li>Refund request made more than 14 days after final delivery</li>
                  <li>Source files already downloaded or work already delivered</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Refund Process */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <Clock className="w-6 h-6 mr-2 text-violet-600" />
              Refund Process
            </h2>
            <p className="text-gray-600 mb-4">
              If you believe you're eligible for a refund, please follow these steps:
            </p>

            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">Step 1: Contact Us</h3>
                <p className="text-sm text-gray-600">
                  Email hello@sprintix.sg with your order number, invoice, and detailed explanation of the issue.
                  Include screenshots or examples if applicable.
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">Step 2: Review Process</h3>
                <p className="text-sm text-gray-600">
                  Our team will review your request within 2-3 business days. We may request additional information
                  or offer alternative solutions (revisions, partial credits, etc.).
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">Step 3: Decision</h3>
                <p className="text-sm text-gray-600">
                  We'll notify you of our decision via email. If approved, refunds are processed within 5-7 business days.
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">Step 4: Refund Processing</h3>
                <p className="text-sm text-gray-600">
                  Approved refunds are issued to the original payment method. Depending on your bank or payment provider,
                  it may take an additional 5-10 business days to appear in your account.
                </p>
              </div>
            </div>
          </section>

          {/* Payment Methods */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Refund Methods</h2>
            <p className="text-gray-600 mb-4">
              Refunds are issued to the original payment method:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">Credit/Debit Cards</h3>
                <p className="text-sm text-gray-600">
                  Processed through Stripe. Refunds appear within 5-10 business days depending on your card issuer.
                </p>
              </div>
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">Bank Transfers</h3>
                <p className="text-sm text-gray-600">
                  Direct refund to your bank account. May take 3-7 business days to process.
                </p>
              </div>
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">PayNow / PayLah</h3>
                <p className="text-sm text-gray-600">
                  Instant refund to your mobile number. Processing time: 1-2 business days.
                </p>
              </div>
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">Store Credit</h3>
                <p className="text-sm text-gray-600">
                  As an alternative, we can offer store credit for future projects (10% bonus on refund amount).
                </p>
              </div>
            </div>
          </section>

          {/* Important Terms */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Important Terms</h2>
            <div className="space-y-3">
              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                <h3 className="font-semibold text-yellow-900 mb-2">Non-Refundable Fees</h3>
                <p className="text-sm text-yellow-800">
                  Rush fees, express delivery charges, and third-party service fees are non-refundable.
                </p>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h3 className="font-semibold text-blue-900 mb-2">Dispute Resolution</h3>
                <p className="text-sm text-blue-800">
                  If you disagree with our refund decision, you may request escalation to management within 7 days.
                  Final decisions will be made within 14 days.
                </p>
              </div>

              <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                <h3 className="font-semibold text-red-900 mb-2">Chargeback Policy</h3>
                <p className="text-sm text-red-800">
                  Please contact us directly before filing a chargeback with your bank or payment provider.
                  Chargebacks filed without prior communication may result in account suspension, additional fees,
                  and legal action to recover costs. We're committed to resolving issues fairly.
                </p>
              </div>

              <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                <h3 className="font-semibold text-purple-900 mb-2">File Return & Deletion</h3>
                <p className="text-sm text-purple-800">
                  If a refund is issued, you must immediately delete all delivered files and cease using them in any capacity.
                  Continued use of refunded work may result in legal action. We reserve the right to request proof of deletion.
                </p>
              </div>

              <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-200">
                <h3 className="font-semibold text-indigo-900 mb-2">Intellectual Property Rights</h3>
                <p className="text-sm text-indigo-800">
                  Upon full refund, all intellectual property rights revert to Sprintix. You forfeit any license to use
                  the edited images. For partial refunds, limited usage rights may apply based on the specific agreement.
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2">Tax & GST Refunds</h3>
                <p className="text-sm text-gray-800">
                  Refunds include any GST or taxes paid. Tax refunds are processed according to Singapore tax regulations.
                  You may need to adjust your business records accordingly.
                </p>
              </div>
            </div>
          </section>

          {/* Contact Information */}
          <section className="bg-violet-50 p-6 rounded-lg border border-violet-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
            <p className="text-gray-600 mb-4">
              If you have questions about our refund policy or need to request a refund, please contact us:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-violet-600" />
                <div>
                  <p className="font-medium text-gray-900">Email</p>
                  <p className="text-gray-600">hello@sprintix.sg</p>
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
                  <p className="text-gray-600">60 Paya Lebar Road, #02-31A, Singapore 409051</p>
                </div>
              </div>
            </div>
            <div className="mt-6 p-4 bg-white rounded-lg border border-violet-200">
              <p className="text-sm text-gray-600">
                <strong>Response Time:</strong> We aim to respond to all refund requests within 2-3 business days.
                For urgent matters, please mark your email as "Refund Request - Urgent."
              </p>
            </div>
          </section>

          {/* Legal Notice */}
          <section className="border-t pt-6">
            <p className="text-sm text-gray-500 text-center">
              This Refund Policy is part of our Terms of Service and is governed by Singapore law.
              For complete terms, please review our <a href="/terms-of-service" className="text-violet-600 hover:underline">Terms of Service</a> and <a href="/privacy-policy" className="text-violet-600 hover:underline">Privacy Policy</a>.
            </p>
          </section>
        </div>

      </div>
    </div>
  )
}

export default RefundPolicy