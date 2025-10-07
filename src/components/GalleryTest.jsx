import React from 'react'

const GalleryTest = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Spacer to allow scrolling */}
      <div className="h-screen bg-gray-100 flex items-center justify-center">
        <h1 className="text-4xl font-bold">Scroll down to see gallery</h1>
      </div>

      {/* Test Gallery with new scroller implementation */}
      <div className="py-16" id="test-gallery">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Test Gallery</h2>
          
          {/* First row - left to right */}
          <div className="scroller-container">
            <div className="scroller-wrapper">
              <div className="scroller-slide">
                <img src="/images/hero/transformation-1.webp" alt="Product 1" />
              </div>
              <div className="scroller-slide">
                <img src="/images/hero/transformation-2.webp" alt="Product 2" />
              </div>
              <div className="scroller-slide">
                <img src="/images/hero/transformation-3.webp" alt="Product 3" />
              </div>
              <div className="scroller-slide">
                <img src="/images/hero/transformation-4.webp" alt="Product 4" />
              </div>
              <div className="scroller-slide">
                <img src="/images/hero/edit-01.jpg" alt="Product 5" />
              </div>
              <div className="scroller-slide">
                <img src="/images/hero/edit-02.jpg" alt="Product 6" />
              </div>

              {/* Repeat slides for seamless loop */}
              <div className="scroller-slide">
                <img src="/images/hero/transformation-1.webp" alt="Product 1" />
              </div>
              <div className="scroller-slide">
                <img src="/images/hero/transformation-2.webp" alt="Product 2" />
              </div>
              <div className="scroller-slide">
                <img src="/images/hero/transformation-3.webp" alt="Product 3" />
              </div>
              <div className="scroller-slide">
                <img src="/images/hero/transformation-4.webp" alt="Product 4" />
              </div>
              <div className="scroller-slide">
                <img src="/images/hero/edit-01.jpg" alt="Product 5" />
              </div>
              <div className="scroller-slide">
                <img src="/images/hero/edit-02.jpg" alt="Product 6" />
              </div>
            </div>
          </div>

          {/* Second row - right to left */}
          <div className="scroller-container scroller-reverse" style={{ marginTop: '2rem' }}>
            <div className="scroller-wrapper scroller-wrapper-reverse">
              <div className="scroller-slide">
                <img src="/images/hero/touchup.jpg" alt="Product 7" />
              </div>
              <div className="scroller-slide">
                <img src="/images/hero/transformation-01v2.jpg" alt="Product 8" />
              </div>
              <div className="scroller-slide">
                <img src="/images/hero/edit-sale-ad.jpg" alt="Product 9" />
              </div>
              <div className="scroller-slide">
                <img src="/images/hero/removebg-01-after.jpg" alt="Product 10" />
              </div>
              <div className="scroller-slide">
                <img src="/images/hero/infographic-v2.jpg" alt="Product 11" />
              </div>
              <div className="scroller-slide">
                <img src="/images/hero/edit-v2-03.jpg" alt="Product 12" />
              </div>

              {/* Repeat slides for seamless loop */}
              <div className="scroller-slide">
                <img src="/images/hero/touchup.jpg" alt="Product 7" />
              </div>
              <div className="scroller-slide">
                <img src="/images/hero/transformation-01v2.jpg" alt="Product 8" />
              </div>
              <div className="scroller-slide">
                <img src="/images/hero/edit-sale-ad.jpg" alt="Product 9" />
              </div>
              <div className="scroller-slide">
                <img src="/images/hero/removebg-01-after.jpg" alt="Product 10" />
              </div>
              <div className="scroller-slide">
                <img src="/images/hero/infographic-v2.jpg" alt="Product 11" />
              </div>
              <div className="scroller-slide">
                <img src="/images/hero/edit-v2-03.jpg" alt="Product 12" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* More content for scrolling */}
      <div className="h-screen bg-gray-100 flex items-center justify-center">
        <h2 className="text-2xl">More content below</h2>
      </div>

      <style jsx>{`
        .scroller-container {
          --slide-width: clamp(150px, 20vw, 300px);
          --slide-gap: calc(var(--slide-width) * 0.06);
          --slide-border-radius: calc(var(--slide-width) * 0.06);

          overflow: hidden;
          width: 90vw;
          position: relative;
        }

        .scroller-container::before {
          position: absolute;
          content: "";
          width: var(--slide-width);
          left: 0;
          top: 0;
          bottom: 0;
          z-index: 1;
          background: linear-gradient(90deg, white, transparent);
        }

        .scroller-container::after {
          position: absolute;
          content: "";
          width: var(--slide-width);
          right: 0;
          top: 0;
          bottom: 0;
          z-index: 1;
          background: linear-gradient(90deg, transparent, white);
        }

        .scroller-wrapper {
          display: flex;
          justify-content: flex-start;
          gap: var(--slide-gap);
          width: calc((var(--slide-width) + var(--slide-gap)) * 6);
          animation: moveLeft 28s linear infinite;
        }

        .scroller-wrapper-reverse {
          animation: moveRight 28s linear infinite;
        }

        .scroller-slide {
          flex: none;
          width: var(--slide-width);
          aspect-ratio: 1/1;
          background: #eee;
          border-radius: var(--slide-border-radius);
          overflow: hidden;
          cursor: pointer;
        }

        .scroller-slide img {
          height: 100%;
          width: 100%;
          object-fit: cover;
          object-position: center;
        }

        @keyframes moveLeft {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-100%);
          }
        }

        @keyframes moveRight {
          from {
            transform: translateX(-100%);
          }
          to {
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  )
}

export default GalleryTest