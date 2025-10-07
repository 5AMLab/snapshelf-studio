import React, { useState } from 'react'
import { Brain, Lightbulb, Target, AlertTriangle } from 'lucide-react'
import { aiAssistant } from '../utils/aiAssistant'

const AIDemo = () => {
  const [demoText, setDemoText] = useState('')
  const [analysis, setAnalysis] = useState(null)

  const demoExamples = [
    {
      title: "E-commerce Example",
      text: "I'm selling phone cases on Shopee and Lazada. Need professional product photos with white background. The cases have crystal details and some jewelry chains attached. Need to launch campaign next week urgently."
    },
    {
      title: "Social Media Campaign", 
      text: "Creating Instagram and Facebook ads for my skincare brand. Need 15 images for different products. Want clean, modern style with our brand colors. Hair model photos included."
    },
    {
      title: "Complex Product",
      text: "Jewelry photography for my online store. 8 necklaces with intricate chains and glass pendants. Each product has 3 angles. Need transparent backgrounds for Amazon listings."
    }
  ]

  const handleAnalyze = (text) => {
    setDemoText(text)
    const result = aiAssistant.analyzeInput(text, [], 'standard')
    setAnalysis(result)
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Brain className="w-8 h-8 text-purple-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">AI Assistant Demo</h2>
        <p className="text-gray-600">See how our AI automatically detects platforms, complexity, and recommends templates</p>
      </div>

      {/* Demo Examples */}
      <div className="grid md:grid-cols-3 gap-4 mb-8">
        {demoExamples.map((example, index) => (
          <button
            key={index}
            onClick={() => handleAnalyze(example.text)}
            className="p-4 border border-gray-200 rounded-lg hover:border-purple-300 hover:shadow-md transition-all text-left"
          >
            <h3 className="font-semibold text-gray-900 mb-2">{example.title}</h3>
            <p className="text-sm text-gray-600 line-clamp-3">{example.text.slice(0, 100)}...</p>
          </button>
        ))}
      </div>

      {/* Input Area */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Try your own project description:
        </label>
        <textarea
          value={demoText}
          onChange={(e) => setDemoText(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          rows={4}
          placeholder="Describe your photo editing project..."
        />
        <button
          onClick={() => handleAnalyze(demoText)}
          disabled={demoText.length < 10}
          className="mt-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Analyze with AI
        </button>
      </div>

      {/* Analysis Results */}
      {analysis && (
        <div className="space-y-6">
          {/* Platform Detection */}
          {analysis.platforms?.detected?.length > 0 && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-semibold text-blue-900 mb-3 flex items-center">
                <Target className="w-5 h-5 mr-2" />
                Platform Detection
              </h3>
              <div className="space-y-2">
                {analysis.platforms.detected.map((platform, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-blue-800 capitalize">{platform.platform.replace('-', ' ')}</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-blue-600">"{platform.keyword}"</span>
                      <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs">
                        {platform.confidence}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Complexity Analysis */}
          {analysis.complexity?.hasComplexity && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <h3 className="font-semibold text-red-900 mb-3 flex items-center">
                <AlertTriangle className="w-5 h-5 mr-2" />
                Complexity Detection (+${analysis.complexity.totalAdditionalCost})
              </h3>
              <div className="space-y-2">
                {analysis.complexity.issues.map((issue, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div>
                      <span className="text-red-800 capitalize font-medium">{issue.type}</span>
                      <p className="text-xs text-red-600">{issue.description}</p>
                    </div>
                    <span className="bg-red-100 text-red-700 px-2 py-1 rounded-full text-xs">
                      +${issue.additionalCost}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Template Recommendations */}
          {analysis.templates?.length > 0 && (
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <h3 className="font-semibold text-purple-900 mb-3 flex items-center">
                <Lightbulb className="w-5 h-5 mr-2" />
                Template Recommendations
              </h3>
              <div className="space-y-2">
                {analysis.templates.slice(0, 3).map((template, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div>
                      <span className="text-purple-800 font-medium">
                        {template.templateId.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      </span>
                      <p className="text-xs text-purple-600">{template.reason}</p>
                    </div>
                    <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs">
                      {template.confidence}% match
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Overall Recommendations */}
          {analysis.overallRecommendations?.length > 0 && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h3 className="font-semibold text-green-900 mb-3">AI Recommendations</h3>
              <div className="space-y-2">
                {analysis.overallRecommendations.map((rec, index) => (
                  <div key={index} className="flex items-start space-x-2">
                    <span className={`inline-block w-2 h-2 rounded-full mt-2 ${
                      rec.priority === 'high' ? 'bg-red-500' : 
                      rec.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                    }`}></span>
                    <div>
                      <span className="text-green-800 font-medium capitalize">{rec.type}:</span>
                      <span className="text-green-700 ml-1">{rec.message}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Asset Count */}
          {analysis.assetCount && (
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">Asset Count Estimation</h3>
              <p className="text-gray-700">
                Estimated <strong>{analysis.assetCount.estimatedCount}</strong> assets
                {analysis.assetCount.context && (
                  <span className="text-gray-600 ml-2">from: "{analysis.assetCount.context}"</span>
                )}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default AIDemo