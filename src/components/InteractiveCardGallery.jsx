import React from 'react'
import './InteractiveCardGallery.css'

const InteractiveCardGallery = () => {
  const services = [
    {
      id: 'bg-removal',
      title: 'bg removal',
      image: '/images/portfolio/bg-remove-v2-after.webp'
    },
    {
      id: 'product-touchup',
      title: 'product touch-up',
      image: '/images/portfolio/touch-up-v2-after.jpg'
    },
    {
      id: 'bulk-processing',
      title: 'bulk processing',
      image: '/images/portfolio/bulk-resizing-after.jpg'
    },
    {
      id: 'creative-ads',
      title: 'creative ads',
      image: '/images/portfolio/creative-ad.jpg'
    },
    {
      id: 'infographics',
      title: 'infographics',
      image: '/images/portfolio/infographic-02-after.jpg'
    }
  ]

  return (
    <div className="interactive-card-gallery-wrapper">
      <div className="gallery-heading">Our Services</div>
      
      <div className="gallery-container">
        <div className="container-general">
          <div className="gallery-wrap">
            {services.map((service, index) => (
              <div 
                key={service.id}
                className="item"
                style={{
                  backgroundImage: `url(${service.image})`
                }}
                title={service.title}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default InteractiveCardGallery