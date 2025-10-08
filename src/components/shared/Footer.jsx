import React from 'react'
import { Link } from 'react-router-dom'
import MousePointer from 'lucide-react/dist/esm/icons/mouse-pointer'

const Footer = ({
  showScrollButtons = false
}) => {
  return (
    <footer className="bg-violet-950 text-white py-4 sm:py-6 lg:py-8">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">

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
              <img
                src="/images/security/ssl-badge-wh.svg"
                alt="SSL Secured"
                className="h-6 opacity-80 hover:opacity-100 transition-opacity"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
              <img
                src="/images/security/privacy-badge-wh-01.svg"
                alt="Privacy Protected"
                className="h-6 opacity-80 hover:opacity-100 transition-opacity"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
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
          <div className="text-violet-300 text-sm text-left">
            <p>
              <span className="font-semibold text-white">Sprintix Studio</span>
              <br />
              60 Paya Lebar Road, #02-31A Paya Lebar Square, Singapore 409051
              {' | '}
              <a href="mailto:hello@sprintix.sg" className="hover:text-white transition-colors">hello@sprintix.sg</a>
              {' | '}
              <a href="tel:+6581234567" className="hover:text-white transition-colors">+65 8123 4567</a>
              <br />
              © 2025 Sprintix Studio. All Rights Reserved.
            </p>
          </div>
        </div>

      </div>
    </footer>
  )
}

export default Footer