import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import SprintixStudio from './components/SnapShelfStudio'
import ShopifyPage from './components/platforms/ShopifyPage'
import AboutUs from './components/AboutUs'
import PhotoEditing from './components/services/PhotoEditing'
import BackgroundRemoval from './components/services/BackgroundRemoval'
import BulkProcessing from './components/services/BulkProcessing'
import BannerPackPage from './components/services/BannerPackPage'
import AmazonMarketplacePage from './components/platforms/AmazonMarketplacePage'
import HealthBeauty from './components/categories/HealthBeauty'
import SportsLifestyle from './components/categories/SportsLifestyle'
import PricingPage from './components/PricingPage'
import PackagesPage from './pages/PackagesPage'
import ServicesPage from './pages/ServicesPage'
import CareersPage from './components/CareersPage'
import HelpCenter from './components/HelpCenter'
import LazadaPage from './components/platforms/LazadaPage'
import CheckoutPage from './components/CheckoutPage'
import ProjectDetailsPage from './pages/ProjectDetailsPage'
import PaymentPage from './pages/PaymentPage'
import StreamlinedBookingPage from './pages/StreamlinedBookingPage'
import OrderSuccessPage from './pages/OrderSuccessPage'
import OrderTrackingPage from './pages/OrderTrackingPage'
import OrderSummaryPage from './pages/OrderSummaryPage'
import PrivacyPolicy from './components/PrivacyPolicy'
import TermsOfService from './components/TermsOfService'
import RefundPolicy from './components/RefundPolicy'
import CookiePolicy from './components/CookiePolicy'
import CookieConsent from './components/CookieConsent'
import AnimationTest from './components/AnimationTest'
import HeroToCollageDemo from './components/HeroToCollageDemo'
import AnimatedHeroTest from './components/AnimatedHeroTest'
import GalleryTest from './components/GalleryTest'
import HeroTestPage from './components/HeroTestPage'
import FeatureV2Test from './pages/FeatureV2Test'
import CTATestPage from './components/CTATestPage'
import InteractiveCardGalleryTest from './components/InteractiveCardGalleryTest'
import ServicesCarouselTest from './components/ServicesCarouselTest'
import PricingTestPage from './components/PricingTestPage'
import TeamMembersTestPage from './components/TeamMembersTestPage'
import AdminDashboard from './components/AdminDashboard'
import AdminLogin from './components/AdminLogin'
import ProtectedRoute from './components/ProtectedRoute'
import { ModalProvider } from './context/ModalContext'
import ModalManager from './components/ModalManager'

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <ModalProvider>
        <Routes>
          <Route path="/" element={<SprintixStudio />} />
          <Route path="/shopify" element={<ShopifyPage />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/photo-editing" element={<PhotoEditing />} />
          <Route path="/background-removal" element={<BackgroundRemoval />} />
          <Route path="/bulk-processing" element={<BulkProcessing />} />
          <Route path="/banner-pack" element={<BannerPackPage />} />
          <Route path="/amazon-marketplace" element={<AmazonMarketplacePage />} />
          <Route path="/health-beauty" element={<HealthBeauty />} />
          <Route path="/sports-lifestyle" element={<SportsLifestyle />} />
          <Route path="/packages" element={<PackagesPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/checkout/details" element={<ProjectDetailsPage />} />
          <Route path="/checkout/payment" element={<PaymentPage />} />
          <Route path="/book" element={<StreamlinedBookingPage />} />
          <Route path="/checkout/summary" element={<OrderSummaryPage />} />
          <Route path="/checkout/success" element={<OrderSuccessPage />} />
          <Route path="/track" element={<OrderTrackingPage />} />
          <Route path="/track/:orderId" element={<OrderTrackingPage />} />
          <Route path="/careers" element={<CareersPage />} />
          <Route path="/support" element={<HelpCenter />} />
          <Route path="/faq" element={<HelpCenter />} />
          <Route path="/lazada" element={<LazadaPage />} />
          <Route path="/animation-test" element={<AnimationTest />} />
          <Route path="/hero-collage-demo" element={<HeroToCollageDemo />} />
          <Route path="/animated-hero-test" element={<AnimatedHeroTest />} />
          <Route path="/gallery-test" element={<GalleryTest />} />
          <Route path="/hero-test" element={<HeroTestPage />} />
          <Route path="/feature-v2-test" element={<FeatureV2Test />} />
          <Route path="/cta-test" element={<CTATestPage />} />
          <Route path="/interactive-gallery-test" element={<InteractiveCardGalleryTest />} />
          <Route path="/services-carousel-test" element={<ServicesCarouselTest />} />
          <Route path="/pricing-test" element={<PricingTestPage />} />
          <Route path="/team-members-test" element={<TeamMembersTestPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/cookie-policy" element={<CookiePolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/refund-policy" element={<RefundPolicy />} />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
        <ModalManager />
        <CookieConsent />
      </ModalProvider>
    </Router>
  )
}

export default App