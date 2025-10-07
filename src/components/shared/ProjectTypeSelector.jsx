import React from 'react'
import { AlertCircle } from 'lucide-react'
import FormCard from './FormCard'

const ProjectTypeSelector = ({ formData, handleChange, validationErrors }) => {
  const projectTypes = [
    { id: 'product-photography', name: 'Product Photography Enhancement' },
    { id: 'social-media', name: 'Social Media Content Creation' },
    { id: 'website-banner', name: 'Website Banner Design' },
    { id: 'print-material', name: 'Print Material Design' },
    { id: 'lifestyle-scenes', name: 'Lifestyle Scene Creation' }
  ]

  const stylePreferences = [
    { value: 'modern-clean', label: 'Modern & Clean' },
    { value: 'bold-colorful', label: 'Bold & Colorful' },
    { value: 'minimal-professional', label: 'Minimal & Professional' },
    { value: 'vintage-artistic', label: 'Vintage & Artistic' },
    { value: 'custom', label: 'Custom Style (we\'ll discuss)' }
  ]

  const requirementOptions = [
    { id: 'background-removal', name: 'Background Removal' },
    { id: 'color-correction', name: 'Color Correction' },
    { id: 'text-logo-addition', name: 'Text/Logo Addition' },
    { id: 'size-optimization', name: 'Size Optimization' },
    { id: 'bulk-processing', name: 'Bulk Processing' }
  ]

  const handleProjectTypeChange = (typeId) => {
    const updatedTypes = formData.projectType.includes(typeId)
      ? formData.projectType.filter(id => id !== typeId)
      : [...formData.projectType, typeId]
    
    handleChange({ target: { name: 'projectType', value: updatedTypes } })
  }

  const handleRequirementChange = (requirementId) => {
    const updatedRequirements = formData.requirements.includes(requirementId)
      ? formData.requirements.filter(id => id !== requirementId)
      : [...formData.requirements, requirementId]
    
    handleChange({ target: { name: 'requirements', value: updatedRequirements } })
  }

  return (
    <FormCard title="Project Details">
      <div className="space-y-6">
        {/* Project Type Selection */}
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-4">
            What type of project is this? * (Select all that apply)
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {projectTypes.map((type) => (
              <label key={type.id} className="cursor-pointer">
                <input
                  type="checkbox"
                  name="projectType"
                  value={type.id}
                  checked={formData.projectType.includes(type.id)}
                  onChange={() => handleProjectTypeChange(type.id)}
                  className="sr-only"
                />
                <div className={`p-4 rounded-xl border-2 text-center transition-all hover:shadow-md ${
                  formData.projectType.includes(type.id)
                    ? 'border-violet-500 bg-violet-50 shadow-md'
                    : 'border-gray-200 bg-gray-50 hover:border-violet-300'
                }`}>
                  <div className="text-sm font-semibold text-gray-900">{type.name}</div>
                  {formData.projectType.includes(type.id) && (
                    <div className="mt-2 text-violet-600">✓</div>
                  )}
                </div>
              </label>
            ))}
          </div>
          {validationErrors.projectType && (
            <div className="mt-4 flex items-center text-red-600 text-sm bg-red-50 p-3 rounded-lg border border-red-200">
              <AlertCircle className="w-4 h-4 mr-2" />
              {validationErrors.projectType}
            </div>
          )}
        </div>

        {/* Style Preference */}
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-3">
            Style Preference (optional)
          </label>
          <select
            name="stylePreference"
            value={formData.stylePreference}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-200 bg-gray-50 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
          >
            <option value="">Select a style...</option>
            {stylePreferences.map((style) => (
              <option key={style.value} value={style.value}>
                {style.label}
              </option>
            ))}
          </select>
        </div>

        {/* Requirements */}
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-4">
            Requirements (optional - select all that apply)
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {requirementOptions.map((requirement) => (
              <label key={requirement.id} className="cursor-pointer">
                <input
                  type="checkbox"
                  name="requirements"
                  value={requirement.id}
                  checked={formData.requirements.includes(requirement.id)}
                  onChange={() => handleRequirementChange(requirement.id)}
                  className="sr-only"
                />
                <div className={`p-3 rounded-xl border-2 text-center transition-all hover:shadow-md ${
                  formData.requirements.includes(requirement.id)
                    ? 'border-violet-500 bg-violet-50 shadow-md'
                    : 'border-gray-200 bg-gray-50 hover:border-violet-300'
                }`}>
                  <div className="text-xs font-semibold text-gray-900">{requirement.name}</div>
                  {formData.requirements.includes(requirement.id) && (
                    <div className="mt-1 text-violet-600">✓</div>
                  )}
                </div>
              </label>
            ))}
          </div>
          <div className="mt-4 p-4 bg-violet-50 border border-violet-200 rounded-xl">
            <p className="text-sm text-violet-800">
              💡 <strong>Additional services:</strong> Our packages include multiple services. Select all that apply, and we'll handle everything comprehensively.
            </p>
          </div>
        </div>
      </div>
    </FormCard>
  )
}

export default ProjectTypeSelector