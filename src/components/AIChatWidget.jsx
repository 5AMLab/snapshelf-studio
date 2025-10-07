import React, { useState, useEffect, useRef } from 'react'
import { MessageCircle, MessageCircleMore, X, Send, Phone, Mail, Clock, Bot, User, Zap, ArrowRight } from 'lucide-react'
import { AIChatEngine } from '../utils/aiChatEngine.js'
import './AnimatedAI.css'

const AIChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])
  const [isTyping, setIsTyping] = useState(false)
  const [chatEngine] = useState(new AIChatEngine())
  const [showQuickActions, setShowQuickActions] = useState(true)
  const [leadInfo, setLeadInfo] = useState(null)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const addMessage = (text, sender, quickActions = null) => {
    const newMessage = {
      id: Date.now(),
      text,
      sender,
      timestamp: new Date(),
      quickActions
    }
    setMessages(prev => [...prev, newMessage])
    
    if (sender === 'ai' && quickActions) {
      setShowQuickActions(true)
    }
  }

  // Initialize chat when opened
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeResponse = chatEngine.generateResponse("hello")
      addMessage(welcomeResponse.text, 'ai', welcomeResponse.quickActions)
    }
  }, [isOpen, messages.length, chatEngine])

  const handleSendMessage = async (messageText = message) => {
    if (!messageText.trim()) return

    // Add user message
    addMessage(messageText, 'user')
    setMessage('')
    setShowQuickActions(false)
    setIsTyping(true)

    // Simulate AI thinking time
    setTimeout(() => {
      const response = chatEngine.generateResponse(messageText, messages)
      
      setIsTyping(false)
      addMessage(response.text, 'ai', response.quickActions)
      
      // Update lead qualification
      if (response.shouldQualifyLead) {
        setLeadInfo(chatEngine.getConversationSummary())
      }
    }, 1000 + Math.random() * 1000) // 1-2 second delay for realism
  }

  const handleQuickAction = (actionQuery) => {
    handleSendMessage(actionQuery)
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleHandoffToHuman = () => {
    const handoffMessage = `I'd like to connect you with our human support team who can provide more detailed assistance.\n\n**Quick options:**\n📱 WhatsApp: +65 8123 4567 (instant reply)\n📧 Email: hello@sprintix.asia\n💬 Or continue chatting - I'm learning more every day!\n\nThey'll have your conversation context and can pick up right where we left off.`
    
    addMessage(handoffMessage, 'ai')
  }

  if (!isOpen) {
    return (
      <div className="fixed bottom-4 right-4 z-50 hidden md:block">
        <button
          onClick={() => setIsOpen(true)}
          className="bg-transparent p-0 rounded-full hover:scale-105 transition-all duration-200 group relative"
          style={{ width: '120px', height: '120px' }}
        >
          <div className="ai-small">
            <div className="container">
              <div className="c c4"></div>
              <div className="c c1"></div>
              <div className="c c2"></div>
              <div className="c c3"></div>
              <div className="rings"></div>
            </div>
            <div className="glass"></div>
          </div>
        </button>
      </div>
    )
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 hidden md:block">
      <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 w-80 sm:w-96 h-96 flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-orange-400 text-white p-4 rounded-t-2xl flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8">
              <div className="ai-small" style={{transform: 'scale(0.3)'}}>
                <div className="container">
                  <div className="c c4"></div>
                  <div className="c c1"></div>
                  <div className="c c2"></div>
                  <div className="c c3"></div>
                  <div className="rings"></div>
                </div>
                <div className="glass"></div>
              </div>
            </div>
            <div>
              <div className="font-semibold">Alex - AI Assistant</div>
              <div className="text-xs text-purple-100 flex items-center">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-1 animate-pulse"></div>
                Powered by Sprintix AI
              </div>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="text-white/80 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className="flex items-start space-x-2 max-w-xs">
                {msg.sender === 'ai' && (
                  <div className="w-6 h-6 flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="ai-small" style={{transform: 'scale(0.15)'}}>
                      <div className="container">
                        <div className="c c4"></div>
                        <div className="c c1"></div>
                        <div className="c c2"></div>
                        <div className="c c3"></div>
                        <div className="rings"></div>
                      </div>
                      <div className="glass"></div>
                    </div>
                  </div>
                )}
                <div
                  className={`px-4 py-2 rounded-2xl ${
                    msg.sender === 'user'
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  <div className="text-sm whitespace-pre-line">{msg.text}</div>
                  <div className={`text-xs mt-1 ${
                    msg.sender === 'user' ? 'text-purple-200' : 'text-gray-500'
                  }`}>
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
                {msg.sender === 'user' && (
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <User className="w-3 h-3 text-blue-600" />
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex justify-start">
              <div className="flex items-start space-x-2">
                <div className="w-6 h-6 flex items-center justify-center flex-shrink-0">
                  <div className="ai-small" style={{transform: 'scale(0.15)'}}>
                    <div className="container">
                      <div className="c c4"></div>
                      <div className="c c1"></div>
                      <div className="c c2"></div>
                      <div className="c c3"></div>
                      <div className="rings"></div>
                    </div>
                    <div className="glass"></div>
                  </div>
                </div>
                <div className="bg-gray-100 px-4 py-2 rounded-2xl">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Quick Actions */}
          {showQuickActions && messages.length > 0 && messages[messages.length - 1].quickActions && (
            <div className="space-y-2">
              <div className="text-xs text-gray-500 text-center">💡 Quick actions:</div>
              <div className="flex flex-wrap gap-2">
                {messages[messages.length - 1].quickActions.map((action, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickAction(action.query)}
                    className="text-xs bg-purple-50 hover:bg-purple-100 text-purple-700 px-3 py-1 rounded-full transition-colors border border-purple-200 flex items-center space-x-1"
                  >
                    <span>{action.text}</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Lead Qualification Indicator */}
          {leadInfo && leadInfo.leadScore >= 5 && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-3">
              <div className="flex items-center space-x-2 mb-2">
                <Zap className="w-4 h-4 text-green-600" />
                <span className="text-sm font-medium text-green-800">Ready to get started?</span>
              </div>
              <div className="text-xs text-green-700 mb-2">
                Based on our chat, you seem ready for our {leadInfo.preferredPackage || 'Professional'} package!
              </div>
              <button
                onClick={() => {
                  // Scroll to booking section
                  document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })
                  setIsOpen(false)
                }}
                className="w-full bg-green-600 text-white text-sm py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                Start My Project Now
              </button>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t border-gray-100">
          <div className="flex space-x-2 mb-3">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me anything..."
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
            />
            <button
              onClick={() => handleSendMessage()}
              disabled={!message.trim()}
              className={`p-2 rounded-lg transition-colors ${
                message.trim()
                  ? 'bg-purple-600 text-white hover:bg-purple-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
          
          {/* Human Handoff */}
          <div className="flex justify-between items-center text-xs text-gray-500">
            <button
              onClick={handleHandoffToHuman}
              className="hover:text-purple-600 transition-colors flex items-center space-x-1"
            >
              <Phone className="w-3 h-3" />
              <span>Talk to Human</span>
            </button>
            <div className="flex items-center space-x-1">
              <Clock className="w-3 h-3" />
              <span>Instant AI responses</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AIChatWidget