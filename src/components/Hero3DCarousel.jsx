import React, { useState } from 'react'

const Hero3DCarousel = () => {
  const [isPaused, setIsPaused] = useState(false)

  // Using the current hero images from the homepage
  const images = [
    {
      src: "/images/hero/edit-01.jpg",
      alt: "Professional product banner design example"
    },
    {
      src: "/images/hero/edit-02.jpg", 
      alt: "E-commerce product optimization example"
    },
    {
      src: "/images/hero/edit-sale-ad.jpg",
      alt: "Sales advertisement design example"
    },
    {
      src: "/images/hero/infographic-v2.jpg",
      alt: "Product infographic design example"
    },
    {
      src: "/images/hero/transformation-01v2.jpg",
      alt: "Product transformation showcase"
    },
    {
      src: "/images/hero/transformation-2.webp",
      alt: "Before and after product editing"
    },
    {
      src: "/images/hero/transformation-3.webp",
      alt: "Advanced product retouching"
    },
    {
      src: "/images/hero/transformation-4.webp",
      alt: "Creative product presentation"
    }
  ]

  return (
    <div className="carousel-3d-wrapper">
      <div 
        className="carousel-3d-container"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className={`carousel-3d-track ${isPaused ? 'paused' : ''}`}>
          {images.map((image, index) => (
            <div key={index} className={`carousel-3d-image i${index + 1}`}>
              <img src={image.src} alt={image.alt} />
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .carousel-3d-wrapper {
          width: 100%;
          max-width: 800px;
          margin: 0 auto;
          perspective: 2500px;
          perspective-origin: 50% 150px;
          transition: perspective 1s;
        }

        .carousel-3d-container {
          margin: 0 auto;
          height: 400px;
          width: 300px;
          transform-style: preserve-3d;
        }

        .carousel-3d-track {
          width: 100%;
          height: 100%;
          transform-style: preserve-3d;
          animation: spin3d 24s infinite linear;
        }

        .carousel-3d-track.paused {
          animation-play-state: paused;
        }

        .carousel-3d-image {
          position: absolute;
          height: 400px;
          width: 300px;
          border-radius: 16px;
          overflow: hidden;
        }

        .carousel-3d-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 14px;
        }

        /* Individual image positioning */
        .carousel-3d-track .i1 {
          transform: translateZ(380px);
        }
        .carousel-3d-track .i2 {
          transform: rotateY(45deg) translateZ(380px);
        }
        .carousel-3d-track .i3 {
          transform: rotateY(90deg) translateZ(380px);
        }
        .carousel-3d-track .i4 {
          transform: rotateY(135deg) translateZ(380px);
        }
        .carousel-3d-track .i5 {
          transform: rotateY(180deg) translateZ(380px);
        }
        .carousel-3d-track .i6 {
          transform: rotateY(225deg) translateZ(380px);
        }
        .carousel-3d-track .i7 {
          transform: rotateY(270deg) translateZ(380px);
        }
        .carousel-3d-track .i8 {
          transform: rotateY(315deg) translateZ(380px);
        }

        @keyframes spin3d {
          from {
            transform: rotateY(0deg);
          }
          to {
            transform: rotateY(-360deg);
          }
        }

        /* Responsive adjustments */
        @media (max-width: 768px) {
          .carousel-3d-wrapper {
            max-width: 100%;
            perspective: 1500px;
          }

          .carousel-3d-container {
            height: 320px;
            width: 240px;
          }

          .carousel-3d-image {
            height: 320px;
            width: 240px;
          }

          .carousel-3d-track .i1,
          .carousel-3d-track .i2,
          .carousel-3d-track .i3,
          .carousel-3d-track .i4,
          .carousel-3d-track .i5,
          .carousel-3d-track .i6,
          .carousel-3d-track .i7,
          .carousel-3d-track .i8 {
            transform-origin: center;
          }

          .carousel-3d-track .i1 {
            transform: translateZ(280px);
          }
          .carousel-3d-track .i2 {
            transform: rotateY(45deg) translateZ(280px);
          }
          .carousel-3d-track .i3 {
            transform: rotateY(90deg) translateZ(280px);
          }
          .carousel-3d-track .i4 {
            transform: rotateY(135deg) translateZ(280px);
          }
          .carousel-3d-track .i5 {
            transform: rotateY(180deg) translateZ(280px);
          }
          .carousel-3d-track .i6 {
            transform: rotateY(225deg) translateZ(280px);
          }
          .carousel-3d-track .i7 {
            transform: rotateY(270deg) translateZ(280px);
          }
          .carousel-3d-track .i8 {
            transform: rotateY(315deg) translateZ(280px);
          }
        }

        @media (max-width: 480px) {
          .carousel-3d-container {
            height: 280px;
            width: 210px;
          }

          .carousel-3d-image {
            height: 280px;
            width: 210px;
          }

          .carousel-3d-track .i1 {
            transform: translateZ(240px);
          }
          .carousel-3d-track .i2 {
            transform: rotateY(45deg) translateZ(240px);
          }
          .carousel-3d-track .i3 {
            transform: rotateY(90deg) translateZ(240px);
          }
          .carousel-3d-track .i4 {
            transform: rotateY(135deg) translateZ(240px);
          }
          .carousel-3d-track .i5 {
            transform: rotateY(180deg) translateZ(240px);
          }
          .carousel-3d-track .i6 {
            transform: rotateY(225deg) translateZ(240px);
          }
          .carousel-3d-track .i7 {
            transform: rotateY(270deg) translateZ(240px);
          }
          .carousel-3d-track .i8 {
            transform: rotateY(315deg) translateZ(240px);
          }
        }
      `}</style>
    </div>
  )
}

export default Hero3DCarousel