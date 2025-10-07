import React, { useState } from 'react'
import { FileText, Users, ShoppingBag, TrendingUp, Zap, CheckCircle, Copy, ExternalLink } from 'lucide-react'

const ProjectBriefTemplates = ({ onSelectTemplate, onClose }) => {
  const [selectedTemplate, setSelectedTemplate] = useState(null)
  const [copiedTemplate, setCopiedTemplate] = useState(null)

  const templates = [
    {
      id: 'ecommerce-product',
      title: 'E-commerce Product Listing',
      icon: <ShoppingBag className="w-6 h-6" />,
      description: 'Perfect for Shopee, Lazada, Amazon product photos',
      color: 'from-blue-500 to-purple-600',
      template: `📦 PRODUCT INFORMATION:
• Product name: [Your product name]
• Category: [e.g., Electronics, Fashion, Home & Garden]
• Target audience: [e.g., Young professionals, Parents, Gamers]
• Main selling points: [e.g., Durable, Affordable, Premium quality]

🎯 PROJECT GOALS:
• Platform focus: [Shopee/Lazada/Amazon - rank in order of priority]
• Background preference: [Remove completely/Replace with color/Keep original]
• Background color (if replacing): [e.g., White, Light grey, Gradient]
• Text/CTA needed: [YES/NO - if yes, specify promotion text]

🎨 STYLE PREFERENCES:
• Brand colors: [e.g., #FF6B6B, #4ECDC4 or "Blue and white"]
• Style preference: [Clean & minimal/Bold & colorful/Professional/Modern]
• Competitor references: [Any marketplace listings you admire]

📋 SPECIAL REQUIREMENTS:
• Complex items: [Hair, jewelry, glass, transparent objects - affects pricing]
• Angle preferences: [Front view priority, show multiple angles, etc.]
• Text to include: [Product name, key features, price, etc.]
• Urgent deadline: [Standard 48h/Rush 24h/Emergency 12h]

💾 ASSETS:
Cloud storage link: [Your Google Drive/Dropbox/OneDrive link]
Access permission: Please ensure link allows viewing/downloading`
    },
    {
      id: 'social-media',
      title: 'Social Media Campaign',
      icon: <Users className="w-6 h-6" />,
      description: 'Instagram posts, Facebook ads, TikTok content',
      color: 'from-pink-500 to-orange-500',
      template: `📱 SOCIAL MEDIA CAMPAIGN:
• Platform focus: [Instagram/Facebook/TikTok/LinkedIn - rank priority]
• Campaign type: [Product launch/Sale promotion/Brand awareness/Event]
• Target audience: [Age group, interests, demographics]
• Campaign message: [What's the main message/hook?]

🎯 CONTENT GOALS:
• Post type: [Feed post/Story/Reel/Ad creative]
• Call-to-action: [Shop now/Learn more/Sign up/Download]
• Promotion details: [Discount %, limited time, special offer]
• Brand personality: [Fun & playful/Professional/Trendy/Luxury]

🎨 VISUAL STYLE:
• Brand colors: [Hex codes or color names]
• Mood/vibe: [Energetic/Calm/Bold/Elegant/Fun]
• Text style: [Bold headers/Script fonts/Clean sans-serif]
• References: [Links to social posts you like the style of]

📝 COPY/TEXT REQUIREMENTS:
• Headlines: [Main message/hook text]
• Subtext: [Supporting information]
• CTA button text: [e.g., "Shop Now", "Learn More"]
• Hashtags: [Brand hashtags to include]
• Legal text: [Terms, conditions, fine print]

💾 ASSETS:
Cloud storage link: [Your Google Drive/Dropbox/OneDrive link]
Include: Product photos, logos, brand guidelines, previous social content
Access permission: Please ensure link allows viewing/downloading`
    },
    {
      id: 'marketing-campaign',
      title: 'Marketing Campaign Bundle',
      icon: <TrendingUp className="w-6 h-6" />,
      description: 'Complete campaign across multiple platforms',
      color: 'from-green-500 to-teal-600',
      template: `🚀 MARKETING CAMPAIGN OVERVIEW:
• Campaign name: [Internal reference name]
• Campaign goal: [Increase sales/Brand awareness/Product launch/Seasonal promotion]
• Target audience: [Demographics, interests, behavior]
• Campaign duration: [Start date - End date]
• Budget consideration: [Premium/Standard quality level]

📺 MULTI-PLATFORM STRATEGY:
• Primary platforms: [Shopee, Lazada, Instagram, Facebook - in priority order]
• Secondary platforms: [TikTok, Google Ads, Website, Email]
• Platform-specific goals: [Awareness on IG, conversions on Shopee, etc.]

🎨 BRAND GUIDELINES:
• Brand colors: [Primary and secondary color codes]
• Logo variations: [Include in asset folder]
• Typography preferences: [Modern, Classic, Bold, Script]
• Brand personality: [Professional, Fun, Luxury, Accessible]
• Do NOT use: [Colors, styles, competitors to avoid]

📋 CONTENT REQUIREMENTS:
• Hero message: [Main campaign headline]
• Key benefits: [3-5 main selling points]
• Promotional offer: [Discount, bundle deal, limited time offer]
• Legal requirements: [Terms, age restrictions, disclaimers]
• Contact information: [Website, phone, social handles]

🎯 DELIVERABLE PRIORITIES:
• Most important: [Which platform/format is priority #1]
• Rush items: [Any specific pieces needed first]
• Nice to have: [Lower priority items if budget allows]

💾 ASSETS FOLDER ORGANIZATION:
Cloud storage link: [Your organized Google Drive/Dropbox folder]

Please organize your folder like this:
📁 Campaign Assets/
  📁 Product Photos/
  📁 Logos & Brand Elements/
  📁 Previous Marketing Materials/
  📁 Competitor References/
  📁 Brand Guidelines (if available)/
  
Access permission: Please ensure link allows viewing/downloading`
    },
    {
      id: 'quick-edit',
      title: 'Quick Product Touch-up',
      icon: <Zap className="w-6 h-6" />,
      description: 'Simple background removal and color correction',
      color: 'from-yellow-500 to-red-500',
      template: `⚡ QUICK EDIT REQUEST:
• Number of products: [How many different products]
• Photos per product: [How many angles/shots per product]
• Background action: [Remove/Keep original/Replace with specific color]
• Background color: [If replacing - White/Grey/Transparent/Other: ___]

🎯 SIMPLE REQUIREMENTS:
• Platform destination: [Shopee/Lazada/Amazon/Instagram/Facebook]
• Quality level: [Standard cleanup/Professional enhancement]
• Color correction: [YES - enhance lighting and colors / NO - keep as-is]
• Special notes: [Any specific requests or avoid certain changes]

⚠️ COMPLEXITY CHECK:
• Hair in photos: [YES/NO - may require +$25 complex removal]
• Jewelry/chains: [YES/NO - may require +$25 complex removal]
• Glass/transparent items: [YES/NO - may require +$25 complex removal]
• Fur/detailed textures: [YES/NO - may require +$25 complex removal]

💾 ASSETS:
Cloud storage link: [Your Google Drive/Dropbox/OneDrive link]
File organization: Please name files clearly (Product1_Front, Product1_Side, etc.)
Access permission: Please ensure link allows viewing/downloading

📞 COMMUNICATION:
Preferred contact: [Email/WhatsApp]
Response time needed: [Standard/Urgent]
Questions? We'll clarify within 2 hours of receiving your brief.`
    },
    {
      id: 'custom-brief',
      title: 'Custom Project Brief',
      icon: <FileText className="w-6 h-6" />,
      description: 'Create your own detailed project brief',
      color: 'from-purple-500 to-indigo-600',
      template: `🎯 PROJECT OVERVIEW:
• Project type: [Describe your specific needs]
• Business/brand: [Your business name and industry]
• Target audience: [Who will see these designs]
• Main objective: [What you want to achieve]

📋 DETAILED REQUIREMENTS:
• Platform destinations: [Where these will be used]
• Quantity needed: [Number of assets/designs]
• Style preferences: [Describe your vision]
• Brand guidelines: [Colors, fonts, style do's and don'ts]

⚡ TECHNICAL SPECIFICATIONS:
• File format needs: [JPG/PNG/WebP preferences]
• Size requirements: [Any specific dimensions needed]
• Background preferences: [Remove/keep/replace with what]
• Text/copy requirements: [What text needs to be included]

🎨 CREATIVE DIRECTION:
• Mood/feeling: [How should the designs feel]
• Color scheme: [Specific colors or general palette]
• Reference examples: [Links to designs you like]
• Avoid: [Styles, colors, or approaches you don't want]

⏰ TIMELINE & BUDGET:
• Deadline: [When you need this completed]
• Budget consideration: [Any budget constraints or preferences]
• Priority order: [If some deliverables are more urgent than others]

💾 ASSETS:
Cloud storage link: [Your organized Google Drive/Dropbox folder]
Asset description: [Brief description of what you're providing]
Access permission: Please ensure link allows viewing/downloading

📞 ADDITIONAL NOTES:
[Any other important details, special requirements, or questions you have]`
    }
  ]

  const copyTemplate = (template) => {
    navigator.clipboard.writeText(template)
    setCopiedTemplate(template)
    setTimeout(() => setCopiedTemplate(null), 2000)
  }

  const handleSelectTemplate = (template) => {
    if (onSelectTemplate) {
      onSelectTemplate(template)
    }
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-2xl">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Project Brief Templates</h2>
            <p className="text-sm text-gray-600">Choose a template to help structure your project requirements</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            ✕
          </button>
        </div>

        <div className="p-6">
          {/* Template Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {templates.map((template) => (
              <div
                key={template.id}
                className="border border-gray-200 rounded-xl hover:shadow-lg transition-all duration-200 cursor-pointer group"
                onClick={() => setSelectedTemplate(template)}
              >
                <div className={`bg-gradient-to-br ${template.color} p-4 rounded-t-xl`}>
                  <div className="text-white">
                    {template.icon}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">{template.title}</h3>
                  <p className="text-sm text-gray-600 mb-4">{template.description}</p>
                  <div className="flex space-x-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        copyTemplate(template.template)
                      }}
                      className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center space-x-1"
                    >
                      {copiedTemplate === template.template ? (
                        <>
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          <span className="text-green-600">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleSelectTemplate(template)
                      }}
                      className="flex-1 px-3 py-2 text-sm bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                    >
                      Use Template
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Template Preview */}
          {selectedTemplate && (
            <div className="border border-gray-200 rounded-xl">
              <div className="border-b border-gray-200 p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg bg-gradient-to-br ${selectedTemplate.color}`}>
                      <div className="text-white">
                        {selectedTemplate.icon}
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{selectedTemplate.title}</h3>
                      <p className="text-sm text-gray-600">{selectedTemplate.description}</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => copyTemplate(selectedTemplate.template)}
                      className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2"
                    >
                      {copiedTemplate === selectedTemplate.template ? (
                        <>
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          <span className="text-green-600">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          <span>Copy Template</span>
                        </>
                      )}
                    </button>
                    <button
                      onClick={() => handleSelectTemplate(selectedTemplate)}
                      className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                    >
                      Use This Template
                    </button>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <pre className="whitespace-pre-wrap text-sm text-gray-700 bg-gray-50 p-4 rounded-lg overflow-x-auto">
                  {selectedTemplate.template}
                </pre>
              </div>
            </div>
          )}

          {/* Cloud Storage Instructions */}
          <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
            <h3 className="font-semibold text-blue-900 mb-4 flex items-center">
              <ExternalLink className="w-5 h-5 mr-2" />
              Cloud Storage Setup Instructions
            </h3>
            <div className="grid md:grid-cols-3 gap-6 text-sm">
              <div>
                <h4 className="font-semibold text-blue-900 mb-2">📁 Google Drive</h4>
                <ol className="text-blue-800 space-y-1">
                  <li>1. Upload your photos to a folder</li>
                  <li>2. Right-click folder → Share</li>
                  <li>3. Change to "Anyone with link can view"</li>
                  <li>4. Copy link and paste in your brief</li>
                </ol>
              </div>
              <div>
                <h4 className="font-semibold text-blue-900 mb-2">📦 Dropbox</h4>
                <ol className="text-blue-800 space-y-1">
                  <li>1. Upload photos to a folder</li>
                  <li>2. Click "Share" on the folder</li>
                  <li>3. Click "Create link"</li>
                  <li>4. Copy link and paste in your brief</li>
                </ol>
              </div>
              <div>
                <h4 className="font-semibold text-blue-900 mb-2">📧 WeTransfer</h4>
                <ol className="text-blue-800 space-y-1">
                  <li>1. Go to wetransfer.com</li>
                  <li>2. Upload your photos</li>
                  <li>3. Add our email as recipient</li>
                  <li>4. Include download link in brief</li>
                </ol>
              </div>
            </div>
            <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-sm text-yellow-800">
                <strong>💡 Pro Tip:</strong> Organize your files with clear names like "Product1_Front.jpg", "Product1_Side.jpg" 
                to help us understand your requirements faster.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectBriefTemplates