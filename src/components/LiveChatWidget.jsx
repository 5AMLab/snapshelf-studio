import React, { useState } from 'react'
import { MessageCircle, X, Send, Phone, Mail, Clock } from 'lucide-react'

const LiveChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi! I'm Sarah from SnapShelf Studio 👋\n\nI'm here to help you get started with your design project. What questions do you have?",
      sender: 'support',
      timestamp: new Date()
    }
  ])

  const handleSendMessage = () => {
    if (!message.trim()) return

    const newMessage = {
      id: messages.length + 1,
      text: message,
      sender: 'user',
      timestamp: new Date()
    }

    setMessages([...messages, newMessage])
    setMessage('')

    // Auto-reply after a short delay
    setTimeout(() => {
      const autoReply = {
        id: messages.length + 2,
        text: "Thanks for your message! I'll get back to you within 2 minutes. For faster service, you can also:\n\n📱 WhatsApp: +65 8123 4567\n📧 Email: hello@snapshelfstudio.com",
        sender: 'support',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, autoReply])
    }, 1500)
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  if (!isOpen) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <button
          onClick={() => setIsOpen(true)}
          className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 animate-pulse group"
        >
          <MessageCircle className="w-6 h-6 group-hover:scale-110 transition-transform" />
          <div className="absolute -top-2 -right-2 w-3 h-3 bg-green-500 rounded-full animate-ping"></div>
          <div className="absolute -top-2 -right-2 w-3 h-3 bg-green-500 rounded-full"></div>
        </button>
        
        {/* Chat bubble notification */}
        <div className="absolute bottom-16 right-0 bg-white rounded-lg shadow-lg p-3 max-w-xs animate-bounce">
          <div className="text-sm font-medium text-gray-900 mb-1">Need help? 💬</div>
          <div className="text-xs text-gray-600">Get instant answers about our packages!</div>
          <div className="absolute bottom-0 right-4 transform translate-y-1/2 rotate-45 w-2 h-2 bg-white border-r border-b border-gray-200"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 w-80 sm:w-96 h-96 flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-4 rounded-t-2xl flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <MessageCircle className="w-4 h-4" />
            </div>
            <div>
              <div className="font-semibold">SnapShelf Support</div>
              <div className="text-xs text-purple-100 flex items-center">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-1"></div>
                Online now
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
              <div
                className={`max-w-xs px-4 py-2 rounded-2xl ${
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
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="px-4 py-2 border-t border-gray-100">
          <div className="flex space-x-2 mb-3">
            <button
              onClick={() => {
                setMessages(prev => [...prev, {
                  id: prev.length + 1,
                  text: "What packages do you offer?",
                  sender: 'user',
                  timestamp: new Date()
                }])
              }}
              className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-full transition-colors"
            >
              Pricing Info
            </button>
            <button
              onClick={() => {
                setMessages(prev => [...prev, {
                  id: prev.length + 1,
                  text: "How fast can you deliver?",
                  sender: 'user',
                  timestamp: new Date()
                }])
              }}
              className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-full transition-colors"
            >
              Delivery Time
            </button>
          </div>
        </div>

        {/* Input */}
        <div className="p-4 border-t border-gray-100">
          <div className="flex space-x-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
            />
            <button
              onClick={handleSendMessage}
              className="bg-purple-600 text-white p-2 rounded-lg hover:bg-purple-700 transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
          
          {/* Contact Options */}
          <div className="flex justify-center space-x-4 mt-3 text-xs text-gray-500">
            <div className="flex items-center space-x-1">
              <Phone className="w-3 h-3" />
              <span>+65 8123 4567</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="w-3 h-3" />
              <span>Response: 2 min</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LiveChatWidget