import React from 'react'
import { AlertCircle, ExternalLink } from 'lucide-react'
import FormCard from './FormCard'

const AssetUploadSection = ({ formData, handleChange, validationErrors }) => {
  return (
    <FormCard>
      <div>
        <label className="block text-sm font-semibold text-gray-900 mb-3">
          Share Your Assets URL *
        </label>
        <input
          type="url"
          name="assetUrl"
          value={formData.assetUrl}
          onChange={handleChange}
          className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all ${
            validationErrors.assetUrl ? 'border-red-300 bg-red-50' : 'border-gray-200 bg-gray-50'
          }`}
          placeholder="https://drive.google.com/drive/folders/... or https://dropbox.com/..."
        />
        {validationErrors.assetUrl && (
          <div className="mt-3 flex items-center text-red-600 text-sm bg-red-50 p-3 rounded-lg border border-red-200">
            <AlertCircle className="w-4 h-4 mr-2" />
            {validationErrors.assetUrl}
          </div>
        )}
        <div className="mt-3 p-3 bg-violet-50 border border-violet-200 rounded-lg">
          <p className="text-sm text-violet-800">
            💡 Paste the sharing link to your Google Drive folder, Dropbox, WeTransfer, or any cloud storage with your assets
          </p>
        </div>
      </div>

      {/* Asset Upload Instructions */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-5 border border-blue-200 mt-6">
        <h5 className="font-medium text-blue-900 mb-3 flex items-center">
          <ExternalLink className="w-4 h-4 mr-2" />
          📁 How to Share Your Assets:
        </h5>
        <div className="grid md:grid-cols-3 gap-4 text-sm">
          <div className="bg-white rounded-lg p-3 border border-blue-100">
            <h6 className="font-semibold text-blue-900 mb-1">Google Drive</h6>
            <div className="text-blue-700 space-y-1 text-xs">
              <p>1. Upload photos to folder</p>
              <p>2. Right-click → Share</p>
              <p>3. "Anyone with link can view"</p>
              <p>4. Copy & paste link above</p>
            </div>
          </div>
          <div className="bg-white rounded-lg p-3 border border-blue-100">
            <h6 className="font-semibold text-blue-900 mb-1">Dropbox</h6>
            <div className="text-blue-700 space-y-1 text-xs">
              <p>1. Upload to folder</p>
              <p>2. Click "Share"</p>
              <p>3. "Create link"</p>
              <p>4. Copy & paste link above</p>
            </div>
          </div>
          <div className="bg-white rounded-lg p-3 border border-blue-100">
            <h6 className="font-semibold text-blue-900 mb-1">WeTransfer</h6>
            <div className="text-blue-700 space-y-1 text-xs">
              <p>1. Go to wetransfer.com</p>
              <p>2. Upload your photos</p>
              <p>3. Get download link</p>
              <p>4. Paste link above</p>
            </div>
          </div>
        </div>
        
        <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-sm text-yellow-800">
            <strong>💡 Pro Tips:</strong> Name files clearly (Product1_Front.jpg, Product2_Side.jpg). 
            Include logos, brand guidelines, and reference images in the same folder.
          </p>
        </div>
        
        <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-sm text-green-800">
            <strong>✅ Asset Quality Tips:</strong> Use 1080x1080px or higher resolution. 
            Let us know if you have hair, jewelry, or glass items (may require +$25 complex removal).
          </p>
        </div>
      </div>
    </FormCard>
  )
}

export default AssetUploadSection