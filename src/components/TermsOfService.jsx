import React from 'react'
import { FileText, Users, DollarSign, Shield, AlertTriangle, Gavel, Clock, Globe } from 'lucide-react'

const TermsOfService = () => {
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
            <FileText className="w-8 h-8 text-violet-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Terms of Service</h1>
          <p className="text-lg text-gray-600">
            The legal agreement between you and Sprintix Pte. Ltd.
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>

        {/* Content */}
        <div className="bg-white rounded-2xl border border-violet-100 p-8 space-y-8">
          
          {/* Introduction */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Agreement to Terms</h2>
            <p className="text-gray-600 mb-4">
              Welcome to Sprintix Pte. Ltd. ("we," "our," or "us"). These Terms of Service ("Terms") govern your use of our website, services, and products. By accessing or using our services, you agree to be bound by these Terms.
            </p>
            <div className="bg-violet-50 p-4 rounded-lg border border-violet-200">
              <p className="text-sm text-violet-800">
                <strong>Important:</strong> If you do not agree to these Terms, please do not use our services. By using our services, you represent that you are at least 18 years old and have the legal capacity to enter into this agreement.
              </p>
            </div>
          </section>

          {/* Services Description */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Users className="w-6 h-6 mr-2 text-violet-600" />
              Our Services
            </h2>
            <p className="text-gray-600 mb-4">
              Sprintix Pte. Ltd. provides professional photo editing and design services, including:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">Photo Editing Services</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Background removal and replacement</li>
                  <li>• Product photo enhancement</li>
                  <li>• Color correction and adjustment</li>
                  <li>• Image retouching and cleanup</li>
                </ul>
              </div>
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">Design Services</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Marketing materials creation</li>
                  <li>• Product catalog design</li>
                  <li>• Social media graphics</li>
                  <li>• Custom design solutions</li>
                </ul>
              </div>
            </div>
          </section>

          {/* User Accounts and Responsibilities */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">User Accounts and Responsibilities</h2>
            
            <div className="space-y-6">
              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Account Creation</h3>
                <ul className="text-sm text-gray-600 space-y-1 list-disc pl-5">
                  <li>You must provide accurate and complete information when creating an account</li>
                  <li>You are responsible for maintaining the confidentiality of your account credentials</li>
                  <li>You must notify us immediately of any unauthorized use of your account</li>
                  <li>You may only create one account unless expressly permitted by us</li>
                </ul>
              </div>

              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Acceptable Use</h3>
                <p className="text-gray-600 mb-3">You agree to use our services only for lawful purposes. You will not:</p>
                <ul className="text-sm text-gray-600 space-y-1 list-disc pl-5">
                  <li>Submit content that infringes on intellectual property rights</li>
                  <li>Upload illegal, harmful, or offensive material</li>
                  <li>Attempt to gain unauthorized access to our systems</li>
                  <li>Use our services to compete with or harm our business</li>
                  <li>Submit content containing malware or malicious code</li>
                  <li>Violate any applicable laws or regulations</li>
                </ul>
              </div>

              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Content Submission</h3>
                <p className="text-gray-600 mb-3">When you submit content to us, you represent and warrant that:</p>
                <ul className="text-sm text-gray-600 space-y-1 list-disc pl-5">
                  <li>You own all rights to the content or have permission to use it</li>
                  <li>The content does not violate any third-party rights</li>
                  <li>You have the right to grant us the licenses described in these Terms</li>
                  <li>The content is accurate and not misleading</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Payment Terms */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <DollarSign className="w-6 h-6 mr-2 text-violet-600" />
              Payment Terms
            </h2>
            
            <div className="space-y-4">
              <div className="border-l-4 border-violet-500 pl-4">
                <h3 className="font-semibold text-gray-900 mb-2">Pricing and Fees</h3>
                <p className="text-sm text-gray-600">
                  Service fees are clearly displayed on our website and may vary based on project complexity, 
                  turnaround time, and service level selected. All prices are in USD unless otherwise specified.
                </p>
              </div>

              <div className="border-l-4 border-violet-500 pl-4">
                <h3 className="font-semibold text-gray-900 mb-2">Payment Processing</h3>
                <p className="text-sm text-gray-600">
                  Payments are processed securely through Stripe. By providing payment information, you authorize 
                  us to charge the specified amount for services rendered.
                </p>
              </div>

              <div className="border-l-4 border-violet-500 pl-4">
                <h3 className="font-semibold text-gray-900 mb-2">Refund Policy</h3>
                <p className="text-sm text-gray-600">
                  We offer refunds for services not yet started within 24 hours of payment. Once work has begun, 
                  refunds are handled on a case-by-case basis. Completed work is non-refundable unless there are 
                  significant quality issues that cannot be resolved through revisions.
                </p>
              </div>

              <div className="border-l-4 border-violet-500 pl-4">
                <h3 className="font-semibold text-gray-900 mb-2">Disputed Charges</h3>
                <p className="text-sm text-gray-600">
                  Please contact us directly before disputing charges with your payment provider. We will work 
                  with you to resolve any billing issues promptly.
                </p>
              </div>
            </div>
          </section>

          {/* Intellectual Property */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Shield className="w-6 h-6 mr-2 text-violet-600" />
              Intellectual Property Rights
            </h2>
            
            <div className="space-y-6">
              <div className="bg-purple-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-purple-900 mb-3">Your Content</h3>
                <p className="text-sm text-purple-800 mb-3">
                  You retain ownership of all content you submit to us. However, you grant us a limited, 
                  non-exclusive license to use, modify, and process your content solely for the purpose of 
                  providing our services.
                </p>
                <p className="text-sm text-purple-800">
                  This license includes the right to make backup copies, perform technical modifications 
                  necessary for processing, and create derivative works as part of our service delivery.
                </p>
              </div>

              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-blue-900 mb-3">Our Deliverables</h3>
                <p className="text-sm text-blue-800 mb-3">
                  Upon full payment, you receive full ownership and commercial usage rights to the final 
                  edited images and designs we create for you.
                </p>
                <p className="text-sm text-violet-800">
                  We may retain samples of our work for portfolio and marketing purposes, with any identifying 
                  information removed unless you provide explicit permission.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Platform and Technology</h3>
                <p className="text-sm text-gray-600">
                  Our website, software, designs, logos, and other intellectual property remain our exclusive 
                  property. You may not copy, reproduce, or distribute any part of our platform without 
                  written permission.
                </p>
              </div>
            </div>
          </section>

          {/* Service Levels and Guarantees */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Clock className="w-6 h-6 mr-2 text-violet-600" />
              Service Levels and Guarantees
            </h2>
            
            <div className="grid gap-4">
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">Turnaround Times</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• <strong>Standard:</strong> 2-3 business days</li>
                  <li>• <strong>Express:</strong> 24-48 hours</li>
                  <li>• <strong>Rush:</strong> Same day (additional fees apply)</li>
                  <li>• Custom projects may require longer timeframes</li>
                </ul>
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">Quality Guarantee</h3>
                <p className="text-sm text-gray-600">
                  We provide up to 3 rounds of revisions at no additional cost to ensure your satisfaction. 
                  Additional revisions may incur extra charges.
                </p>
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">File Delivery</h3>
                <p className="text-sm text-gray-600">
                  Final files are delivered in your requested format via secure download link. Files are 
                  available for download for 30 days after delivery.
                </p>
              </div>
            </div>
          </section>

          {/* Limitation of Liability */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <AlertTriangle className="w-6 h-6 mr-2 text-violet-600" />
              Limitation of Liability
            </h2>
            
            <div className="bg-violet-50 p-6 rounded-lg border border-violet-200">
              <p className="text-sm text-violet-800 mb-4">
                <strong>IMPORTANT LEGAL NOTICE:</strong> Please read this section carefully as it limits our liability.
              </p>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-violet-900 mb-2">Service Limitations</h3>
                  <p className="text-sm text-violet-800">
                    Our services are provided "as is" without warranties of any kind. We do not guarantee 
                    that our services will meet your specific requirements or be error-free.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-violet-900 mb-2">Liability Cap</h3>
                  <p className="text-sm text-violet-800">
                    Our total liability for any claims arising from or related to our services will not 
                    exceed the amount you paid us for the specific service giving rise to the claim.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-violet-900 mb-2">Excluded Damages</h3>
                  <p className="text-sm text-violet-800">
                    We will not be liable for indirect, incidental, special, consequential, or punitive 
                    damages, including lost profits, business interruption, or loss of data.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Indemnification */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Indemnification</h2>
            <p className="text-gray-600 mb-4">
              You agree to indemnify and hold harmless Sprintix Pte. Ltd., its employees, and partners from any claims, 
              damages, or expenses arising from:
            </p>
            <ul className="text-sm text-gray-600 space-y-1 list-disc pl-5">
              <li>Your use of our services</li>
              <li>Content you submit to us</li>
              <li>Your violation of these Terms</li>
              <li>Your violation of any third-party rights</li>
              <li>Any illegal or unauthorized use of our services through your account</li>
            </ul>
          </section>

          {/* Termination */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Termination</h2>
            
            <div className="space-y-4">
              <div className="border-l-4 border-violet-500 pl-4">
                <h3 className="font-semibold text-gray-900 mb-2">By You</h3>
                <p className="text-sm text-gray-600">
                  You may terminate your account at any time by contacting us. Upon termination, you remain 
                  responsible for any outstanding payments for services already provided.
                </p>
              </div>

              <div className="border-l-4 border-violet-500 pl-4">
                <h3 className="font-semibold text-gray-900 mb-2">By Us</h3>
                <p className="text-sm text-gray-600">
                  We may terminate or suspend your account immediately if you violate these Terms, engage in 
                  fraudulent activity, or for any other reason at our sole discretion.
                </p>
              </div>

              <div className="border-l-4 border-violet-500 pl-4">
                <h3 className="font-semibold text-gray-900 mb-2">Effect of Termination</h3>
                <p className="text-sm text-gray-600">
                  Upon termination, your right to use our services ceases immediately. Provisions regarding 
                  intellectual property, payment obligations, and limitation of liability survive termination.
                </p>
              </div>
            </div>
          </section>

          {/* Governing Law */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Gavel className="w-6 h-6 mr-2 text-violet-600" />
              Governing Law and Disputes
            </h2>
            
            <div className="space-y-4">
              <div className="bg-violet-50 p-4 rounded-lg">
                <h3 className="font-semibold text-violet-900 mb-2">Governing Law</h3>
                <p className="text-sm text-violet-800">
                  These Terms are governed by the laws of Singapore. Any disputes will be resolved in the 
                  courts of Singapore.
                </p>
              </div>

              <div className="bg-violet-50 p-4 rounded-lg">
                <h3 className="font-semibold text-violet-900 mb-2">Dispute Resolution</h3>
                <p className="text-sm text-violet-800">
                  We encourage resolving disputes through direct communication first. For formal disputes, 
                  we prefer mediation before litigation.
                </p>
              </div>
            </div>
          </section>

          {/* Changes to Terms */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Changes to These Terms</h2>
            <p className="text-gray-600 mb-4">
              We may update these Terms from time to time to reflect changes in our services, legal requirements, 
              or business practices.
            </p>
            <div className="bg-violet-50 p-4 rounded-lg border border-violet-200">
              <p className="text-sm text-violet-800">
                <strong>Notice of Changes:</strong> We will notify you of material changes by email or website 
                notice at least 30 days before they take effect. Continued use of our services after changes 
                constitutes acceptance of the new Terms.
              </p>
            </div>
          </section>

          {/* Contact Information */}
          <section className="bg-violet-50 p-6 rounded-lg border border-violet-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <Globe className="w-6 h-6 mr-2 text-violet-600" />
              Contact Information
            </h2>
            <p className="text-gray-600 mb-4">
              If you have questions about these Terms or need to contact us for any reason:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-violet-600 rounded-full"></div>
                <div>
                  <p className="font-medium text-gray-900">Email</p>
                  <p className="text-gray-600">legal@sprintix.asia</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-violet-600 rounded-full"></div>
                <div>
                  <p className="font-medium text-gray-900">Business Address</p>
                  <p className="text-gray-600">Singapore</p>
                </div>
              </div>
            </div>
          </section>

          {/* Entire Agreement */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Entire Agreement</h2>
            <p className="text-gray-600">
              These Terms, together with our Privacy Policy and any additional terms for specific services, 
              constitute the entire agreement between you and Sprintix Pte. Ltd. If any provision is found 
              unenforceable, the remainder will remain in full force and effect.
            </p>
          </section>
        </div>

      </div>
    </div>
  )
}

export default TermsOfService