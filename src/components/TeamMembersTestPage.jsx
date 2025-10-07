import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from './shared/Header'
import Footer from './shared/Footer'
import TeamMembers from './shared/TeamMembers'

const TeamMembersTestPage = () => {
  const navigate = useNavigate()

  // Handle get started click
  const handleGetStartedClick = () => {
    navigate('/pricing')
  }

  // Set page title and scroll to top
  useEffect(() => {
    document.title = 'Team Members Test Page - Sprintix Studio Pte. Ltd.'
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="min-h-screen bg-white">
      <Header
        currentPage="about"
        onGetStarted={handleGetStartedClick}
      />

      {/* Test Page Header */}
      <section className="bg-violet-50 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-violet-950 mb-4">
            Our Team
          </h1>
          <p className="text-2xl text-violet-950 mb-12 max-w-3xl mx-auto leading-relaxed">
            Our team brings 15+ years of design experience across Southeast Asia's premium retail landscape.
          </p>

          {/* Team Member Cards */}
          <div className="grid md:grid-cols-3 gap-8">
            {/* Team Member 1 */}
            <div className="relative w-full aspect-square">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face"
                alt="John Anderson"
                className="w-full h-full object-cover rounded-2xl"
              />
              <div className="absolute bottom-4 left-4 right-4">
                <div className="bg-white mx-2 px-3 py-3 rounded-2xl">
                  <h3 className="text-sm font-bold text-gray-900 text-center mb-1">John Anderson</h3>
                  <p className="text-xs text-violet-700 text-center">Creative Director</p>
                </div>
              </div>
            </div>

            {/* Team Member 2 */}
            <div className="relative w-full aspect-square">
              <img
                src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face"
                alt="Sarah Chen"
                className="w-full h-full object-cover rounded-2xl"
              />
              <div className="absolute bottom-4 left-4 right-4">
                <div className="bg-white mx-2 px-3 py-3 rounded-2xl">
                  <h3 className="text-sm font-bold text-gray-900 text-center mb-1">Sarah Chen</h3>
                  <p className="text-xs text-violet-700 text-center">Lead Designer</p>
                </div>
              </div>
            </div>

            {/* Team Member 3 */}
            <div className="relative w-full aspect-square">
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face"
                alt="Michael Rodriguez"
                className="w-full h-full object-cover rounded-2xl"
              />
              <div className="absolute bottom-4 left-4 right-4">
                <div className="bg-white mx-2 px-3 py-3 rounded-2xl">
                  <h3 className="text-sm font-bold text-gray-900 text-center mb-1">Michael Rodriguez</h3>
                  <p className="text-xs text-violet-700 text-center">Operations Manager</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Members Component */}
      <TeamMembers />

      <Footer />
    </div>
  )
}

export default TeamMembersTestPage