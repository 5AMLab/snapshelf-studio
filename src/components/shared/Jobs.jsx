import React, { useState } from 'react'

const Jobs = () => {
  const [expandedJob, setExpandedJob] = useState(null)

  const toggleJobDescription = (jobId) => {
    setExpandedJob(expandedJob === jobId ? null : jobId)
  }

  const jobsData = [
    {
      id: 1,
      title: "Senior Graphic Designer",
      type: "Full-time • Remote/Singapore",
      description: (
        <div>
          <p className="mb-3">Lead visual design for e-commerce clients across Southeast Asia.</p>
          <p className="font-semibold mb-2">Requirements:</p>
          <ul className="list-disc list-inside space-y-1 mb-3">
            <li>3+ years design experience</li>
            <li>Adobe Creative Suite proficiency</li>
            <li>E-commerce/marketplace design knowledge</li>
          </ul>
          <p className="font-semibold mb-2">You'll work on:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Product visuals and infographics</li>
            <li>Marketing materials for luxury brands</li>
            <li>Platform-optimized graphics</li>
          </ul>
        </div>
      )
    },
    {
      id: 2,
      title: "Photo Editor",
      type: "Part-time • Remote",
      description: (
        <div>
          <p className="mb-3">Product photography editing specialist for e-commerce platforms.</p>
          <p className="font-semibold mb-2">Requirements:</p>
          <ul className="list-disc list-inside space-y-1 mb-3">
            <li>Advanced Photoshop skills</li>
            <li>Portfolio demonstrating quality work</li>
            <li>Attention to detail</li>
          </ul>
          <p className="font-semibold mb-2">Daily tasks:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Background removal and replacement</li>
            <li>Color correction and retouching</li>
            <li>Image optimization for marketplaces</li>
          </ul>
        </div>
      )
    },
    {
      id: 3,
      title: "Project Manager",
      type: "Full-time • Singapore",
      description: (
        <div>
          <p className="mb-3">Coordinate client projects and manage creative team workflow.</p>
          <p className="font-semibold mb-2">Requirements:</p>
          <ul className="list-disc list-inside space-y-1 mb-3">
            <li>Project management experience preferred</li>
            <li>Strong communication skills</li>
            <li>Detail-oriented and organized</li>
          </ul>
          <p className="font-semibold mb-2">Responsibilities:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Client communication and project updates</li>
            <li>Timeline management and delivery coordination</li>
            <li>Quality assurance oversight</li>
          </ul>
        </div>
      )
    },
    {
      id: 4,
      title: "Marketing Specialist",
      type: "Full-time • Remote/Singapore",
      description: (
        <div>
          <p className="mb-3">Drive growth through digital marketing and client acquisition.</p>
          <p className="font-semibold mb-2">Requirements:</p>
          <ul className="list-disc list-inside space-y-1 mb-3">
            <li>Digital marketing experience</li>
            <li>SEO knowledge preferred</li>
            <li>Content creation skills</li>
          </ul>
          <p className="font-semibold mb-2">Focus areas:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Social media management</li>
            <li>Client acquisition campaigns</li>
            <li>Marketing content development</li>
          </ul>
        </div>
      )
    }
  ]
  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Jobs Section */}
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-5xl md:text-6xl font-bold mb-8">
            <span className="text-transparent bg-clip-text bg-gradient-to-t from-violet-300 to-violet-700">Join Us</span>
          </h3>
          <p className="text-xl text-violet-950 mb-12 max-w-3xl mx-auto">
            We're always looking for talented individuals to join our growing team.
          </p>

          <div className="space-y-4">
            {jobsData.map((job) => (
              <div key={job.id} className="bg-gradient-to-r from-violet-100 to-purple-100 rounded-2xl overflow-hidden">
                {/* Job Header - Clickable */}
                <div
                  className="p-4 cursor-pointer hover:bg-opacity-80 transition-all"
                  onClick={() => toggleJobDescription(job.id)}
                >
                  {/* Desktop Layout */}
                  <div className="hidden md:flex items-center justify-between">
                    <div className="flex items-center flex-1">
                      <h4 className="text-base font-semibold text-violet-950 w-80 text-left">{job.title}</h4>
                      <p className="text-violet-700 w-60 text-left">{job.type}</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <button className="bg-violet-600 text-white px-4 py-1 rounded-lg hover:bg-violet-700 transition-colors flex-shrink-0">
                        Apply Now
                      </button>
                      <svg
                        className={`w-5 h-5 text-violet-600 transition-transform duration-300 ${
                          expandedJob === job.id ? 'rotate-180' : ''
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>

                  {/* Mobile Layout */}
                  <div className="md:hidden space-y-3">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h4 className="text-base font-semibold text-violet-950 text-left">{job.title}</h4>
                        <p className="text-violet-700 text-left text-sm mt-1">{job.type}</p>
                      </div>
                      <svg
                        className={`w-5 h-5 text-violet-600 transition-transform duration-300 flex-shrink-0 ml-2 ${
                          expandedJob === job.id ? 'rotate-180' : ''
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                    <button className="w-full bg-violet-600 text-white px-4 py-2 rounded-lg hover:bg-violet-700 transition-colors text-sm">
                      Apply Now
                    </button>
                  </div>
                </div>

                {/* Expandable Job Description */}
                {expandedJob === job.id && (
                  <div className="px-4 pb-4 border-t border-violet-200">
                    <div className="pt-4 text-violet-950 leading-relaxed text-left">
                      {job.description}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <p className="text-violet-950 mb-4">
              Don't see a role that fits? We'd still love to hear from you.
            </p>
            <a
              href="mailto:careers@sprintix.asia"
              className="inline-flex items-center text-violet-600 hover:text-violet-700 font-semibold"
            >
              Send us your resume
              <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Jobs