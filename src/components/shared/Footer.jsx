import React from 'react'
import { Link } from 'react-router-dom'
import MousePointer from 'lucide-react/dist/esm/icons/mouse-pointer'

const Footer = ({
  showScrollButtons = false
}) => {
  return (
    <footer className="bg-violet-950 text-white py-16">
      <div className="max-w-8xl mx-auto px-6 sm:px-8 lg:px-16">

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 mb-12">

          {/* Brand Section - Spans 2 columns */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-6">
              <Link to="/" className="text-2xl text-violet-50 font-bold tracking-tight hover:text-violet-300 transition-colors">
                sprintix®
              </Link>
            </div>
            <p className="text-violet-200 text-sm leading-relaxed mb-6 max-w-sm">
              Professional photo editing for e-commerce businesses. From background removal to creative graphics -
              we help your products stand out online.
            </p>

            {/* Security Badges */}
            <div className="flex flex-wrap items-center gap-4 mt-8">
              <img
                src="/images/security/Powered by Stripe - white.svg"
                alt="Powered by Stripe"
                className="h-6 opacity-80 hover:opacity-100 transition-opacity"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
              <div className="flex items-center gap-2 text-violet-300 text-xs">
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
                <span>SSL Secured</span>
              </div>
              <div className="flex items-center gap-2 text-violet-300 text-xs">
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Privacy Protected</span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold text-white text-sm uppercase tracking-wider mb-5">Services</h4>
            <ul className="space-y-3">
              <li><Link to="/pricing" className="text-violet-200 text-sm hover:text-white transition-colors">Photo Editing</Link></li>
              <li><Link to="/pricing" className="text-violet-200 text-sm hover:text-white transition-colors">Creative Graphics</Link></li>
              <li><Link to="/pricing" className="text-violet-200 text-sm hover:text-white transition-colors">Product Optimization</Link></li>
            </ul>
          </div>

          {/* Marketplaces */}
          <div>
            <h4 className="font-bold text-white text-sm uppercase tracking-wider mb-5">Marketplaces</h4>
            <ul className="space-y-3">
              <li className="text-violet-200 text-sm">Amazon</li>
              <li className="text-violet-200 text-sm">Lazada</li>
              <li className="text-violet-200 text-sm">Shopee</li>
              <li className="text-violet-200 text-sm">Zalora</li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-bold text-white text-sm uppercase tracking-wider mb-5">Company</h4>
            <ul className="space-y-3">
              <li><Link to="/about" className="text-violet-200 text-sm hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/pricing" className="text-violet-200 text-sm hover:text-white transition-colors">Pricing</Link></li>
              <li><Link to="/support" className="text-violet-200 text-sm hover:text-white transition-colors">Support</Link></li>
              <li><Link to="/careers" className="text-violet-200 text-sm hover:text-white transition-colors">Careers</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-bold text-white text-sm uppercase tracking-wider mb-5">Legal</h4>
            <ul className="space-y-3">
              <li><Link to="/privacy-policy" className="text-violet-200 text-sm hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link to="/cookie-policy" className="text-violet-200 text-sm hover:text-white transition-colors">Cookie Policy</Link></li>
              <li><Link to="/terms-of-service" className="text-violet-200 text-sm hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link to="/refund-policy" className="text-violet-200 text-sm hover:text-white transition-colors">Refund Policy</Link></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar - Contact & Copyright */}
        <div className="border-t border-violet-800 pt-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">

            {/* Contact Information */}
            <div className="text-violet-300 text-sm">
              <p>
                <span className="font-semibold text-white">Sprintix Studio</span>
                {' | '}
                60 Paya Lebar Road, #02-31A Paya Lebar Square, Singapore 409051
                {' | '}
                <a href="mailto:hello@sprintix.sg" className="hover:text-white transition-colors">hello@sprintix.sg</a>
                {' | '}
                <a href="tel:+6581234567" className="hover:text-white transition-colors">+65 8123 4567</a>
              </p>
            </div>

            {/* Copyright */}
            <div className="text-violet-300 text-sm">
              <p>© 2025 Sprintix Studio. All Rights Reserved.</p>
            </div>
          </div>
        </div>

      </div>
    </footer>
  )
}

export default Footer