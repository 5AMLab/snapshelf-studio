import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'serve-deck',
      configureServer(server) {
        server.middlewares.use('/deck', (req, res, next) => {
          const file = path.resolve(__dirname, 'public/deck/index.html')
          if (fs.existsSync(file)) {
            res.setHeader('Content-Type', 'text/html')
            res.end(fs.readFileSync(file))
          } else {
            next()
          }
        })
        server.middlewares.use('/founders', (req, res, next) => {
          const file = path.resolve(__dirname, 'public/founders/index.html')
          if (fs.existsSync(file)) {
            res.setHeader('Content-Type', 'text/html')
            res.end(fs.readFileSync(file))
          } else {
            next()
          }
        })
      }
    }
  ],
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
