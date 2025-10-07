import React from 'react'
import { Brain, AlertTriangle, Target, Clock, Package, CheckCircle, X, DollarSign, Lightbulb } from 'lucide-react'

const AISuggestions = ({ analysis, onAcceptSuggestion, onDismiss }) => {
  if (!analysis || !analysis.overallRecommendations?.length) {
    return null
  }

  const getIcon = (type) => {
    const icons = {
      template: <Target className="w-4 h-4" />,
      platform: <CheckCircle className="w-4 h-4" />,
      pricing: <DollarSign className="w-4 h-4" />,
      urgency: <Clock className="w-4 h-4" />,
      package: <Package className="w-4 h-4" />
    }
    return icons[type] || <Lightbulb className="w-4 h-4" />
  }

  const getColorClass = (type, priority) => {
    if (type === 'pricing') return 'from-red-50 to-orange-50 border-red-200'
    if (priority === 'high') return 'from-purple-50 to-blue-50 border-purple-200'
    return 'from-blue-50 to-green-50 border-blue-200'
  }

  const getTextColor = (type, priority) => {
    if (type === 'pricing') return 'text-red-700'
    if (priority === 'high') return 'text-purple-700'
    return 'text-blue-700'
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center space-x-2 mb-4">
        <Brain className="w-5 h-5 text-purple-600" />
        <h4 className="font-medium text-gray-900">AI Suggestions</h4>
        <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">
          {analysis.overallRecommendations.length} found
        </span>
      </div>

      {analysis.overallRecommendations.map((recommendation, index) => (
        <div
          key={index}
          className={`bg-gradient-to-r ${getColorClass(recommendation.type, recommendation.priority)} 
                     border rounded-lg p-4 transition-all hover:shadow-md`}
        >
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-3 flex-1">
              <div className={`p-2 rounded-lg bg-white/80 ${getTextColor(recommendation.type, recommendation.priority)}`}>
                {getIcon(recommendation.type)}
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <span className={`font-medium ${getTextColor(recommendation.type, recommendation.priority)}`}>
                    {recommendation.type.charAt(0).toUpperCase() + recommendation.type.slice(1)} Suggestion
                  </span>
                  {recommendation.priority === 'high' && (
                    <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full">
                      High Priority
                    </span>
                  )}
                </div>
                <p className={`text-sm ${getTextColor(recommendation.type, recommendation.priority)} mb-3`}>
                  {recommendation.message}
                </p>

                {/* Detailed Information */}
                {recommendation.type === 'pricing' && recommendation.data?.issues && (
                  <div className="space-y-2 mb-3">
                    {recommendation.data.issues.map((issue, i) => (
                      <div key={i} className="flex items-center space-x-2 text-xs text-red-600">
                        <AlertTriangle className="w-3 h-3" />
                        <span>
                          {issue.type.charAt(0).toUpperCase() + issue.type.slice(1)} detected: {issue.description}
                        </span>
                        <span className="bg-red-100 px-1 py-0.5 rounded">+$25</span>
                      </div>
                    ))}
                  </div>
                )}

                {recommendation.type === 'platform' && recommendation.data && (
                  <div className="text-xs text-blue-600 mb-3">
                    <span>Detected: "{recommendation.data.keyword}" ({recommendation.data.confidence}% confidence)</span>
                  </div>
                )}

                {recommendation.type === 'template' && recommendation.data && (
                  <div className="text-xs text-purple-600 mb-3">
                    <span>{recommendation.data.reason} ({recommendation.data.confidence}% match)</span>
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex space-x-2 ml-4">
              {recommendation.action !== 'show_complexity_warning' && (
                <button
                  onClick={() => onAcceptSuggestion(recommendation)}
                  className="px-3 py-1 text-xs bg-white/80 hover:bg-white text-gray-700 rounded border transition-colors"
                >
                  Apply
                </button>
              )}
              <button
                onClick={() => onDismiss(recommendation)}
                className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* Platform Detection Summary */}
      {analysis.platforms?.detected?.length > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
          <h5 className="font-medium text-blue-900 mb-2 text-sm">Detected Platforms:</h5>
          <div className="flex flex-wrap gap-2">
            {analysis.platforms.detected.map((platform, index) => (
              <span
                key={index}
                className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full"
              >
                {platform.platform} ({platform.confidence}%)
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Template Recommendations */}
      {analysis.templates?.length > 0 && (
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-3">
          <h5 className="font-medium text-purple-900 mb-2 text-sm">Template Recommendations:</h5>
          <div className="space-y-1">
            {analysis.templates.slice(0, 2).map((template, index) => (
              <div key={index} className="flex items-center justify-between text-xs">
                <span className="text-purple-700">
                  {template.templateId.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </span>
                <span className="bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full">
                  {template.confidence}% match
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Asset Count Estimation */}
      {analysis.assetCount && analysis.assetCount.confidence > 60 && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-3">
          <h5 className="font-medium text-green-900 mb-1 text-sm">Asset Count Estimation:</h5>
          <div className="text-xs text-green-700">
            <span>Estimated {analysis.assetCount.estimatedCount} assets</span>
            {analysis.assetCount.context && (
              <span className="text-green-600 ml-2">from: "{analysis.assetCount.context}"</span>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default AISuggestions