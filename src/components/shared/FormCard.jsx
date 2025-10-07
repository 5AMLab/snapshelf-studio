import React from 'react'

const FormCard = ({ title, icon: Icon, children, className = "" }) => {
  return (
    <div className={`bg-white rounded-2xl shadow-lg border border-violet-200/50 p-8 ${className}`}>
      {title && (
        <h4 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
          {Icon && <Icon className="w-6 h-6 mr-3 text-violet-600" />}
          {title}
        </h4>
      )}
      {children}
    </div>
  )
}

export default FormCard