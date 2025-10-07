import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          stripe: ['@stripe/stripe-js', '@stripe/react-stripe-js'],
          icons: ['lucide-react', '@heroicons/react'],
          ui: ['./src/components/BeforeAfterSlider.jsx'],
          payment: ['./src/components/StripePayment.jsx', './src/pages/PaymentPage.jsx'],
          modals: [
            './src/components/PrivacyPolicy.jsx',
            './src/components/TermsOfService.jsx', 
            './src/components/CookiePolicy.jsx',
            './src/components/PricingPopup.jsx'
          ],
          ai: ['./src/utils/aiChatEngine.js', './src/components/AIChatWidget.jsx']
        }
      }
    },
    chunkSizeWarningLimit: 1000
  }
})
