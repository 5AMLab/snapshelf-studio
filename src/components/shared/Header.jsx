import React, { useState, useRef, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Bars3Icon as Menu, XMarkIcon as X, ChevronDownIcon } from '@heroicons/react/24/outline'

const Header = ({
  scrollToSection,
  onGetStarted
}) => {
  const location = useLocation()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState(null)
  const [mobileDropdowns, setMobileDropdowns] = useState({})
  const [isHeaderVisible, setIsHeaderVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const dropdownTimeoutRef = useRef({})

  // Navigation data structure
  const navigationData = {
    pricing: {
      label: 'Pricing',
      items: [
        { 
          label: 'Pricing Plans', 
          to: '/pricing',
          description: 'Transparent pricing for photo editing'
        },
        { label: 'Help Center', to: '/support', description: 'Get support, FAQ, and guidance' }
      ]
    },
    creativeKits: {
      label: 'Creative Kits',
      items: [
        { 
          label: 'Creative Kits', 
          to: '/packages',
          description: 'Conversion‑focused visuals, ready fast'
        }
      ]
    },
  }

  const handleGetStartedClick = () => {
    if (onGetStarted) {
      onGetStarted()
    } else if (scrollToSection) {
      scrollToSection('booking')
    } else {
      // Fallback: redirect to home page with booking section
      window.location.href = '/#booking'
    }
    setIsMenuOpen(false)
    setActiveDropdown(null)
  }

  // Desktop dropdown handlers
  const handleMouseEnter = (dropdownKey) => {
    if (dropdownTimeoutRef.current[dropdownKey]) {
      clearTimeout(dropdownTimeoutRef.current[dropdownKey])
    }
    setActiveDropdown(dropdownKey)
  }

  const handleMouseLeave = (dropdownKey) => {
    dropdownTimeoutRef.current[dropdownKey] = setTimeout(() => {
      setActiveDropdown(null)
    }, 150)
  }

  // Mobile dropdown toggle
  const toggleMobileDropdown = (dropdownKey) => {
    setMobileDropdowns(prev => ({
      ...prev,
      [dropdownKey]: !prev[dropdownKey]
    }))
  }

  // Handle click outside to close dropdowns
  useEffect(() => {
    const handleClickOutside = () => {
      setActiveDropdown(null)
    }
    
    if (activeDropdown) {
      document.addEventListener('click', handleClickOutside)
      return () => document.removeEventListener('click', handleClickOutside)
    }
  }, [activeDropdown])

  // Auto-hide header on scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      
      // Always show header at the very top
      if (currentScrollY < 10) {
        setIsHeaderVisible(true)
        setLastScrollY(currentScrollY)
        return
      }
      
      // Hide header when scrolling down, show when scrolling up
      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        // Scrolling down & past header height
        setIsHeaderVisible(false)
      } else if (currentScrollY < lastScrollY) {
        // Scrolling up
        setIsHeaderVisible(true)
      }
      
      setLastScrollY(currentScrollY)
    }

    // Throttle scroll events
    let ticking = false
    const throttledHandleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll()
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', throttledHandleScroll, { passive: true })
    return () => window.removeEventListener('scroll', throttledHandleScroll)
  }, [lastScrollY])


  const handleItemClick = (item) => {
    if (item.action) {
      item.action()
    }
    setActiveDropdown(null)
    setIsMenuOpen(false)
  }

  const renderDropdownContent = (dropdownKey, isMobile = false) => {
    const dropdown = navigationData[dropdownKey]
    if (!dropdown) return null

    const containerClasses = isMobile 
      ? "bg-gray-50 border-t border-gray-200"
      : "absolute left-0 top-full mt-1 w-80 bg-white border border-gray-200 rounded-br-md rounded-bl-md z-[1010]"

    const contentClasses = isMobile 
      ? "px-4 py-3 space-y-2"
      : "p-4 space-y-1"

    return (
      <div className={containerClasses}>
        <div className={contentClasses}>
          {dropdown.items.map((item, index) => {
            const itemClasses = isMobile
              ? `block w-full text-left px-3 py-2 text-sm rounded-md transition-colors ${
                  item.isHighlight 
                    ? 'bg-violet-100 text-violet-800 font-medium hover:bg-violet-200' 
                    : 'text-violet-950 hover:bg-violet-100'
                }`
              : `block w-full text-left px-3 py-2 rounded-md transition-colors hover:bg-violet-100 ${
                  item.isHighlight 
                    ? 'bg-violet-50 border border-violet-200' 
                    : ''
                }`

            if (item.external) {
              return (
                <a
                  key={index}
                  href={item.to}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={itemClasses}
                  onClick={() => !isMobile && setActiveDropdown(null)}
                >
                  <div className={`${item.isHighlight ? 'text-violet-800 font-medium' : 'text-gray-900 font-medium'} text-left`}>
                    {item.label}
                  </div>
                  {item.description && !isMobile && (
                    <div className="text-sm text-gray-500 mt-1 text-left">{item.description}</div>
                  )}
                </a>
              )
            }

            if (item.action) {
              return (
                <button
                  key={index}
                  onClick={() => handleItemClick(item)}
                  className={itemClasses}
                >
                  <div className={`${item.isHighlight ? 'text-violet-800 font-medium' : 'text-gray-900 font-medium'} text-left`}>
                    {item.label}
                  </div>
                  {item.description && !isMobile && (
                    <div className="text-sm text-gray-500 mt-1 text-left">{item.description}</div>
                  )}
                </button>
              )
            }

            return (
              <Link
                key={index}
                to={item.to}
                className={itemClasses}
                onClick={() => handleItemClick(item)}
              >
                <div className={`${item.isHighlight ? 'text-violet-800 font-medium' : 'text-gray-900 font-medium'} text-left`}>
                  {item.label}
                </div>
                {item.description && !isMobile && (
                  <div className="text-sm text-gray-500 mt-1 text-left">{item.description}</div>
                )}
              </Link>
            )
          })}
        </div>
      </div>
    )
  }

  const renderDesktopNavItem = (dropdownKey) => {
    const dropdown = navigationData[dropdownKey]
    const isActive = activeDropdown === dropdownKey

    return (
      <div
        key={dropdownKey}
        className="relative"
        onMouseEnter={() => handleMouseEnter(dropdownKey)}
        onMouseLeave={() => handleMouseLeave(dropdownKey)}
      >
        <button className="text-md text-violet-950 font-semibold hover:text-violet-600 transition-colors tracking-[0.015em] flex items-center space-x-1 py-6">
          <span>{dropdown.label}</span>
          <ChevronDownIcon className={`w-4 h-4 transition-transform ${isActive ? 'rotate-180' : ''}`} />
        </button>
        
        {isActive && renderDropdownContent(dropdownKey)}
      </div>
    )
  }

  const renderMobileNavItem = (dropdownKey) => {
    const dropdown = navigationData[dropdownKey]
    const isOpen = mobileDropdowns[dropdownKey]

    return (
      <div key={dropdownKey}>
        <button
          onClick={() => toggleMobileDropdown(dropdownKey)}
          className="block w-full text-left px-4 py-3 text-violet-950 hover:text-violet-700 hover:bg-violet-50 rounded-br-md rounded-bl-md transition-colors flex items-center justify-between"
        >
          <span>{dropdown.label}</span>
          <ChevronDownIcon className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>
        
        {isOpen && renderDropdownContent(dropdownKey, true)}
      </div>
    )
  }

  // Header classes with auto-hide functionality
  const headerClasses = `
    w-full bg-violet-100 backdrop-blur-lg relative z-[1000]
    transform transition-transform duration-300 ease-in-out
    ${isHeaderVisible ? 'translate-y-0' : '-translate-y-full'}
  `.trim()

  return (
    <nav 
      className={headerClasses}
    >
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 transition-opacity">
            <span className="text-4xl md:text-4xl font-[700] hover:text-violet-600 text-violet-950 tracking-tight font-sans">
              sprintix®
              </span>

          </Link>
          
          {/* Right aligned navigation */}
          <div className="hidden md:flex items-center space-x-12">
            <Link
              to="/services"
              className={`relative text-base font-semibold transition-colors tracking-tight uppercase group py-2 ${
                location.pathname === '/services' ? 'text-violet-400' : 'text-violet-950 hover:text-violet-400'
              }`}
            >
              Services
              <span className={`absolute bottom-1 left-0 w-full h-[3px] bg-violet-400 transform origin-left transition-transform duration-300 ${
                location.pathname === '/services' ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
              }`} />
            </Link>
            <Link
              to="/pricing"
              className={`relative text-base font-semibold transition-colors tracking-tight uppercase group py-2 ${
                location.pathname === '/pricing' ? 'text-violet-400' : 'text-violet-950 hover:text-violet-400'
              }`}
            >
              Pricing
              <span className={`absolute bottom-1 left-0 w-full h-[3px] bg-violet-400 transform origin-left transition-transform duration-300 ${
                location.pathname === '/pricing' ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
              }`} />
            </Link>
            <Link
              to="/about"
              className={`relative text-base font-semibold transition-colors tracking-tight uppercase group py-2 ${
                location.pathname === '/about' ? 'text-violet-400' : 'text-violet-950 hover:text-violet-400'
              }`}
            >
              About Us
              <span className={`absolute bottom-1 left-0 w-full h-[3px] bg-violet-400 transform origin-left transition-transform duration-300 ${
                location.pathname === '/about' ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
              }`} />
            </Link>
            <Link
              to="/support"
              className={`relative text-base font-semibold transition-colors tracking-tight uppercase group py-2 ${
                location.pathname === '/support' ? 'text-violet-400' : 'text-violet-950 hover:text-violet-400'
              }`}
            >
              Support
              <span className={`absolute bottom-1 left-0 w-full h-[3px] bg-violet-400 transform origin-left transition-transform duration-300 ${
                location.pathname === '/support' ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
              }`} />
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-3 ml-auto"
          >
            {isMenuOpen ? <X className="w-8 h-8 text-violet-950" /> : <Menu className="w-8 h-8 text-violet-950" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-sm border-t border-gray-100 absolute top-full left-0 right-0 z-[1010] shadow-lg">
          <div className="px-4 py-4 space-y-3">
            {/* Mobile navigation links */}
            <Link
              to="/services"
              className="block w-full text-center px-4 py-4 text-xl text-violet-900 font-semibold hover:text-violet-400 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Services
            </Link>
            <Link
              to="/pricing"
              className="block w-full text-center px-4 py-4 text-xl text-violet-900 font-semibold hover:text-violet-400 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Pricing
            </Link>
            <Link
              to="/about"
              className="block w-full text-center px-4 py-4 text-xl text-violet-900 font-semibold hover:text-violet-400 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              About Us
            </Link>
            <Link
              to="/support"
              className="block w-full text-center px-4 py-4 text-xl text-violet-900 font-semibold hover:text-violet-400 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Support
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Header