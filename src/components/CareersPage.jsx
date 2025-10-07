import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { 
  MapPin, 
  Clock, 
  DollarSign, 
  Briefcase, 
  ArrowRight,
  CheckCircle,
  Send,
  ExternalLink,
  Mail
} from 'lucide-react'

const CareersPage = () => {
  const [selectedJob, setSelectedJob] = useState(null)

  // Set page title and scroll to top
  useEffect(() => {
    document.title = 'Careers - Join Sprintix Studio Pte. Ltd. | Photo Editing Jobs'
    window.scrollTo(0, 0)
  }, [])

  // Job listings data
  const jobListings = [
    {
      id: 'photo-editor-001',
      title: 'Photo Editor',
      department: 'Creative',
      location: 'Remote',
      type: 'Full-time',
      salary: 'SGD 3,500 - 5,500',
      experience: '2-4 years',
      posted: '2 days ago',
      featured: true,
      description: 'Join our creative team as a Photo Editor and help transform thousands of product images for e-commerce businesses across Southeast Asia.',
      responsibilities: [
        'Edit and enhance product photography for e-commerce platforms',
        'Perform background removal, color correction, and image optimization',
        'Create compelling social media graphics and marketing materials',
        'Collaborate with clients to understand their brand requirements',
        'Maintain high quality standards while meeting tight deadlines',
        'Use Adobe Creative Suite (Photoshop, Illustrator) and other editing tools',
        'Quality check and review work from junior team members',
        'Stay updated with latest design trends and e-commerce best practices'
      ],
      requirements: [
        '2+ years of professional photo editing experience',
        'Expert proficiency in Adobe Photoshop and Illustrator',
        'Experience with e-commerce product photography',
        'Strong understanding of color theory and composition',
        'Portfolio showcasing product editing and enhancement work',
        'Excellent attention to detail and quality standards',
        'Ability to work efficiently under tight deadlines',
        'Good communication skills in English',
        'Experience with Shopee, Lazada, or Amazon listings preferred'
      ],
      benefits: [
        'Competitive salary with performance bonuses',
        'Remote work flexibility',
        'Professional development budget',
        'Latest Adobe Creative Suite license',
        '21 days annual leave + public holidays',
        'Medical and dental coverage',
        'Team building events and company retreats',
        'Career growth opportunities'
      ],
      skills: ['Adobe Photoshop', 'Adobe Illustrator', 'Photo Editing', 'E-commerce', 'Color Correction'],
      applicationUrl: 'mailto:careers@snapshelfstudio.com?subject=Application: Photo Editor Position&body=Hi SnapShelf Studio Team,%0A%0AI am interested in the Photo Editor position. Please find my resume and portfolio attached.%0A%0ABest regards'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Simple Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="text-xl font-semibold text-gray-900">
              SnapShelf Studio
            </Link>
            <Link 
              to="/" 
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              ← Back to Main Site
            </Link>
          </div>
        </div>
      </header>
      
      {/* Simple Hero */}
      <section className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Join Our Team
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We're looking for talented photo editors to help grow our creative team. 
            Work remotely and help transform e-commerce through visual content.
          </p>
        </div>
      </section>

      {/* Job Listings */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Open Positions</h2>

          {/* Job Cards */}
          <div className="space-y-6">
            {jobListings.map((job) => (
              <div key={job.id} className="bg-white border border-gray-200 rounded-lg p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{job.title}</h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        {job.location}
                      </span>
                      <span className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {job.type}
                      </span>
                      <span className="flex items-center">
                        <DollarSign className="w-4 h-4 mr-1" />
                        {job.salary}
                      </span>
                    </div>
                  </div>
                  <a
                    href={job.applicationUrl}
                    className="px-4 py-2 bg-gray-900 text-white rounded hover:bg-gray-800 transition-colors text-sm font-medium"
                  >
                    Apply
                  </a>
                </div>

                <p className="text-gray-600 mb-4">{job.description}</p>

                {/* Skills */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-2">
                    {job.skills.map((skill, index) => (
                      <span 
                        key={index}
                        className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Expandable Details */}
                <div>
                  <button
                    onClick={() => setSelectedJob(selectedJob === job.id ? null : job.id)}
                    className="flex items-center text-gray-600 hover:text-gray-900 text-sm font-medium"
                  >
                    <span>{selectedJob === job.id ? 'Hide' : 'View'} Details</span>
                    <ArrowRight className={`w-4 h-4 ml-1 transition-transform ${
                      selectedJob === job.id ? 'rotate-90' : ''
                    }`} />
                  </button>

                  {selectedJob === job.id && (
                    <div className="mt-6 space-y-6 border-t border-gray-100 pt-6">
                      {/* Responsibilities */}
                      <div>
                        <h4 className="font-medium text-gray-900 mb-3">Responsibilities</h4>
                        <ul className="space-y-1">
                          {job.responsibilities.map((responsibility, index) => (
                            <li key={index} className="flex items-start">
                              <span className="w-2 h-2 bg-gray-400 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                              <span className="text-gray-600 text-sm">{responsibility}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Requirements */}
                      <div>
                        <h4 className="font-medium text-gray-900 mb-3">Requirements</h4>
                        <ul className="space-y-1">
                          {job.requirements.map((requirement, index) => (
                            <li key={index} className="flex items-start">
                              <span className="w-2 h-2 bg-gray-400 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                              <span className="text-gray-600 text-sm">{requirement}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Benefits */}
                      <div>
                        <h4 className="font-medium text-gray-900 mb-3">Benefits</h4>
                        <ul className="space-y-1">
                          {job.benefits.map((benefit, index) => (
                            <li key={index} className="flex items-start">
                              <span className="w-2 h-2 bg-gray-400 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                              <span className="text-gray-600 text-sm">{benefit}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Apply */}
                      <div className="bg-gray-50 rounded p-4">
                        <p className="text-gray-600 text-sm mb-3">
                          Ready to apply? Send your resume and portfolio to get started.
                        </p>
                        <a
                          href={job.applicationUrl}
                          className="inline-flex items-center text-gray-900 hover:text-gray-700 font-medium text-sm"
                        >
                          <Mail className="w-4 h-4 mr-2" />
                          careers@snapshelfstudio.com
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* General Application */}
          <div className="mt-8 p-6 bg-white border border-gray-200 rounded-lg text-center">
            <h3 className="font-semibold text-gray-900 mb-2">Don't See a Perfect Match?</h3>
            <p className="text-gray-600 text-sm mb-4">
              We're always looking for talented people. Send us your information and we'll keep you in mind for future opportunities.
            </p>
            <a
              href="mailto:careers@snapshelfstudio.com?subject=General Application"
              className="inline-flex items-center text-gray-900 hover:text-gray-700 font-medium text-sm"
            >
              <Mail className="w-4 h-4 mr-2" />
              Send General Application
            </a>
          </div>
        </div>
      </section>

      {/* Simple Footer */}
      <footer className="bg-white border-t border-gray-200 py-8">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="text-sm text-gray-600">
            <p className="mb-2">© 2025 SnapShelf Studio. All rights reserved.</p>
            <div className="space-x-4">
              <Link to="/privacy-policy" className="hover:text-gray-900">Privacy Policy</Link>
              <span>•</span>
              <Link to="/terms-of-service" className="hover:text-gray-900">Terms of Service</Link>
              <span>•</span>
              <a href="mailto:careers@snapshelfstudio.com" className="hover:text-gray-900">careers@snapshelfstudio.com</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default CareersPage