/**
 * Logos Component - Usage Examples
 *
 * This file demonstrates various ways to use the Logos component
 * across different pages and contexts.
 */

import Logos from './Logos'

// =============================================
// Example 1: Hero Section (Default Usage)
// =============================================
function HeroExample() {
  return (
    <section className="hero">
      {/* Other hero content */}

      <Logos variant="hero" />

      {/* More hero content */}
    </section>
  )
}

// =============================================
// Example 2: Footer Section
// =============================================
function FooterExample() {
  return (
    <footer>
      <Logos
        variant="footer"
        showTitle={true}
        title="Integrated with leading platforms"
      />
    </footer>
  )
}

// =============================================
// Example 3: About Page with Title & Subtitle
// =============================================
function AboutPageExample() {
  return (
    <section className="about">
      <Logos
        variant="default"
        showTitle={true}
        title="Trusted by leading platforms"
        subtitle="We optimize your product photos for every major marketplace"
      />
    </section>
  )
}

// =============================================
// Example 4: Compact Version for Smaller Sections
// =============================================
function CompactExample() {
  return (
    <div className="sidebar">
      <Logos variant="compact" />
    </div>
  )
}

// =============================================
// Example 5: Custom Logos Array
// =============================================
function CustomLogosExample() {
  const customLogos = [
    {
      name: 'Amazon',
      src: '/images/logos/amazon-logo.svg',
      width: 60,
      height: 20,
      className: 'col-span-2 max-h-10 w-full object-contain'
    },
    {
      name: 'Shopify',
      src: '/images/logos/shopify-logo.svg',
      width: 57,
      height: 17,
      className: 'col-span-2 max-h-8 w-full object-contain'
    }
    // Add more custom logos as needed
  ]

  return (
    <section>
      <Logos
        variant="default"
        logos={customLogos}
        showTitle={true}
        title="Featured Platforms"
      />
    </section>
  )
}

// =============================================
// Example 6: With Custom Styling & Animation
// =============================================
function AnimatedExample() {
  const [isVisible, setIsVisible] = useState(false)

  return (
    <section>
      <Logos
        variant="hero"
        className={`transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
      />
    </section>
  )
}

// =============================================
// AVAILABLE PROPS
// =============================================
/*
  variant (string):
    - 'hero' - For hero sections (default spacing)
    - 'footer' - For footer sections (compact, lower opacity)
    - 'compact' - For smaller sections/sidebars
    - 'default' - Standard layout

  title (string):
    - Optional heading above logos
    - Default: 'Trusted by leading platforms'

  subtitle (string):
    - Optional description below title
    - Default: ''

  showTitle (boolean):
    - Show/hide the title section
    - Default: false

  className (string):
    - Additional CSS classes for custom styling
    - Default: ''

  logos (array):
    - Custom array of logo objects
    - Default: Uses platform logos (Zalora, Shopee, Amazon, etc.)
    - Each logo object should have:
      {
        name: 'Logo Name',
        src: '/path/to/logo.svg',
        width: 60,
        height: 20,
        className: 'custom-classes'
      }
*/
