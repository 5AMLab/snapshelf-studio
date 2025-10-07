import React, { useEffect, useRef, useState } from 'react'

const Hero3DSphere = () => {
  const sphereRef = useRef(null)
  const mainRef = useRef(null)
  const [rotation, setRotation] = useState({ x: 0, y: 0 })
  const [startRotation, setStartRotation] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })

  // Generate comprehensive image grid using Unsplash demo images
  const heroImages = [
    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1560472355-536de3962603?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1503602642458-232111445657?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1542744095-fcf48d80b0fd?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=400&h=400&fit=crop"
  ]

  // Generate sphere grid like reference (from -37 to 37 range)
  const generateSphereItems = () => {
    const items = []
    let imageIndex = 0
    
    // Generate items following reference pattern
    for (let x = -37; x <= 37; x += 2) {
      for (let y = -6; y <= 6; y += 2) {
        const image = heroImages[imageIndex % heroImages.length]
        items.push({
          src: image,
          alt: `Design showcase ${imageIndex + 1}`,
          position: `${x},${y}`,
          dataSrc: image
        })
        imageIndex++
      }
    }
    
    return items
  }

  const sphereItems = generateSphereItems()

  const clamp = (val, min, max) => Math.min(Math.max(val, min), max)

  const applyTransform = (rotX, rotY) => {
    if (sphereRef.current) {
      sphereRef.current.style.transform = `translateZ(calc(var(--radius) * -1)) rotateX(${rotX}deg) rotateY(${rotY}deg)`
    }
  }

  const handleMouseDown = (e) => {
    setIsDragging(true)
    setDragStart({ x: e.clientX, y: e.clientY })
    setStartRotation({ ...rotation })
    e.preventDefault()
  }

  const handleMouseMove = (e) => {
    if (!isDragging) return
    
    const deltaX = e.clientX - dragStart.x
    const deltaY = e.clientY - dragStart.y
    
    const sensitivity = 18
    const maxPolarRot = 3
    
    const newRotY = startRotation.y + deltaX / sensitivity
    const proposedRotX = startRotation.x - deltaY / sensitivity
    const newRotX = clamp(proposedRotX, -maxPolarRot, maxPolarRot)
    
    setRotation({ x: newRotX, y: newRotY })
    applyTransform(newRotX, newRotY)
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleTouchStart = (e) => {
    const touch = e.touches[0]
    setIsDragging(true)
    setDragStart({ x: touch.clientX, y: touch.clientY })
    setStartRotation({ ...rotation })
    e.preventDefault()
  }

  const handleTouchMove = (e) => {
    if (!isDragging) return
    
    const touch = e.touches[0]
    const deltaX = touch.clientX - dragStart.x
    const deltaY = touch.clientY - dragStart.y
    
    const sensitivity = 18
    const maxPolarRot = 3
    
    const newRotY = startRotation.y + deltaX / sensitivity
    const proposedRotX = startRotation.x - deltaY / sensitivity
    const newRotX = clamp(proposedRotX, -maxPolarRot, maxPolarRot)
    
    setRotation({ x: newRotX, y: newRotY })
    applyTransform(newRotX, newRotY)
    e.preventDefault()
  }

  const handleTouchEnd = () => {
    setIsDragging(false)
  }

  useEffect(() => {
    const main = mainRef.current
    if (!main) return

    // Mouse events
    main.addEventListener('mousemove', handleMouseMove)
    main.addEventListener('mouseup', handleMouseUp)
    main.addEventListener('mouseleave', handleMouseUp)

    // Touch events
    main.addEventListener('touchmove', handleTouchMove, { passive: false })
    main.addEventListener('touchend', handleTouchEnd)

    return () => {
      main.removeEventListener('mousemove', handleMouseMove)
      main.removeEventListener('mouseup', handleMouseUp)
      main.removeEventListener('mouseleave', handleMouseUp)
      main.removeEventListener('touchmove', handleTouchMove)
      main.removeEventListener('touchend', handleTouchEnd)
    }
  }, [isDragging, dragStart, startRotation])

  return (
    <div className="hero-3d-sphere-wrapper">
      <div 
        ref={mainRef}
        className="hero-3d-main"
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        <div className="hero-3d-stage">
          <div ref={sphereRef} className="hero-3d-sphere">
            {sphereItems.map((item, index) => (
              <div 
                key={index}
                className="item"
                data-src={item.dataSrc}
                data-item={item.position}
                data-item-size="2,2"
              >
                <div className="item__image">
                  <img src={item.src} alt={item.alt} draggable={false} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Header text inside sphere - Animated sequence */}
        <div className="hero-3d-header">
          <div className="animated-text-sequence">
            <div className="text-step text-step-1">
              <span className="text-with-bg">One Click.</span>
            </div>
            <div className="text-step text-step-2">
              <span className="text-with-bg">Every Platform.</span>
            </div>
            <div className="text-step text-step-3">
              <span className="text-with-bg">Ready to Launch.</span>
            </div>
          </div>
        </div>
        
        {/* Overlay gradients for depth - matching reference */}
        <div className="overlay"></div>
        <div className="overlay overlay--blur"></div>
      </div>

      <style jsx>{`
        :root {
          --radius: max(1300px, 100vw);
          --circ: calc(var(--radius) * 3.14);
          --segments-x: 37;
          --segments-y: 37;
          --sphere-rotation-y: 0;
          --sphere-rotation-x: 0;
          --offset-x: 0;
          --offset-y: 0;
          --rot-y: calc((360deg / var(--segments-x)) / 2);
          --rot-x: calc((360deg / var(--segments-y)) / 2);
          --rot-y-delta: 0deg;
          --item-width: calc((var(--circ) / var(--segments-x)));
          --item-height: calc((var(--circ) / var(--segments-y)));
          --item-size-x: 1;
          --item-size-y: 1;
          --gradient-center: rgba(248, 250, 252, 0);
          --gradient-edge: rgba(248, 250, 252, 0.5);
          --gradient: radial-gradient(var(--gradient-center) 65%, var(--gradient-edge) 100%);
          --gradient-blur: radial-gradient(var(--gradient-center) 70%, var(--gradient-edge) 90%);
          --bg-scrim: rgba(0, 0, 0, 0.4);
          --bg: rgb(248, 250, 252);
          --item-bg: rgb(225, 225, 225);
        }

        .hero-3d-sphere-wrapper {
          width: 100vw;
          margin-left: calc(-50vw + 50%);
        }

        .hero-3d-main {
          display: flex;
          width: 100%;
          height: 100vh;
          justify-content: center;
          align-items: center;
          overflow: hidden;
          touch-action: none;
          cursor: grab;
          position: relative;
        }

        .hero-3d-main:active {
          cursor: grabbing;
        }

        .hero-3d-stage {
          perspective: calc(var(--radius) * 2);
        }

        .hero-3d-sphere {
          transform: translateZ(calc(var(--radius) * -1)) rotateY(var(--sphere-rotation-y)) rotateX(var(--sphere-rotation-x));
          transform-style: preserve-3d;
        }

        .overlay {
          background-image: var(--gradient);
          position: absolute;
          inset: 0;
          margin: auto;
          z-index: 3;
          pointer-events: none;
          opacity: 1;
        }

        .overlay--blur {
          mask-image: var(--gradient-blur);
          backdrop-filter: blur(3px);
          position: absolute;
          inset: 0;
          margin: auto;
          z-index: 3;
          opacity: 1;
          pointer-events: none;
        }

        .item {
          width: calc(var(--item-width) * var(--item-size-x));
          height: calc(var(--item-height) * var(--item-size-y));
          position: absolute;
          transform-origin: 50% 50%;
          top: -999px;
          bottom: -999px;
          left: -999px;
          right: -999px;
          margin: auto;
          backface-visibility: hidden;
          color: transparent;
          transform-style: preserve-3d;
          transition: transform 300ms;
          transform: rotateY(
              calc(
                var(--rot-y) * (var(--offset-x) + ((var(--item-size-x) - 1) / 2)) +
                  var(--rot-y-delta, 0deg)
              )
            )
            rotateX(
              calc(
                calc(var(--rot-x) * (var(--offset-y) - ((var(--item-size-y) - 1) / 2))) +
                  var(--rot-x-delta, 0deg)
              )
            )
            translateZ(var(--radius));
        }

        .item__image {
          position: absolute;
          display: block;
          inset: 10px;
          border-radius: 12px;
          background-color: var(--item-bg);
          overflow: hidden;
          backface-visibility: hidden;
          transition: transform 300ms;
        }

        .item__image img {
          object-fit: cover;
          width: 100%;
          height: 100%;
          pointer-events: none;
          backface-visibility: hidden;
          user-select: none;
          -webkit-user-drag: none;
        }

        .hero-3d-header {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 10;
          text-align: center;
          pointer-events: none;
        }

        .animated-text-sequence {
          position: relative;
        }

        .text-step {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          opacity: 0;
          animation-fill-mode: both;
        }

        .text-step-1 {
          animation: fadeInOut 9s ease-in-out 0s infinite;
        }

        .text-step-2 {
          animation: fadeInOut 9s ease-in-out 3s infinite;
        }

        .text-step-3 {
          animation: fadeInOut 9s ease-in-out 6s infinite;
        }

        .text-with-bg {
          background-color: rgb(124, 58, 237);
          color: rgb(248, 250, 252);
          padding: 12px 24px;
          border-radius: 8px;
          font-size: 3.5rem;
          font-weight: 700;
          letter-spacing: -0.015em;
          line-height: 1.1;
          display: inline-block;
          white-space: nowrap;
        }


        @keyframes fadeInOut {
          0% { opacity: 0; transform: translate(-50%, calc(-50% + 10px)); }
          8% { opacity: 1; transform: translate(-50%, -50%); }
          25% { opacity: 1; transform: translate(-50%, -50%); }
          33% { opacity: 0; transform: translate(-50%, calc(-50% - 10px)); }
          100% { opacity: 0; transform: translate(-50%, calc(-50% + 10px)); }
        }


       


        /* Generate position mappings for all sphere items */
        ${Array.from({ length: 75 }, (_, x) => {
          const actualX = (x - 37)
          return Array.from({ length: 13 }, (_, y) => {
            const actualY = (y - 6)
            return `.item[data-item="${actualX},${actualY}"] {
              --offset-x: ${actualX};
              --offset-y: ${actualY};
            }`
          }).join('')
        }).join('')}

        .item[data-item-size="2,2"] {
          --item-size-x: 2;
          --item-size-y: 2;
        }

        /* Responsive adjustments */
        @media (max-width: 768px) {
          :root {
            --radius: max(1000px, 80vw);
          }
          
          .hero-3d-main {
            height: 100vh;
          }

          .text-with-bg {
            font-size: 2.5rem;
            padding: 8px 16px;
          }


        }

        @media (max-width: 480px) {
          :root {
            --radius: max(800px, 70vw);
          }
          
          .hero-3d-main {
            height: 100vh;
          }

          .text-with-bg {
            font-size: 2rem;
            padding: 6px 12px;
          }


        }
      `}</style>
    </div>
  )
}

export default Hero3DSphere