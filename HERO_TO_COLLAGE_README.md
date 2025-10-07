# Hero-to-Collage Scroll Animation

A high-performance, JavaScript-free scroll animation that transforms a single hero image into a multi-layer photo collage (5×3 grid) with a playful footer animation.

## 🎯 Features

- **Scroll-driven animations** using native CSS `animation-timeline`
- **5×3 photo collage** with CSS Grid and Subgrid
- **Zero JavaScript dependencies** - all animations run on the compositor
- **Accessibility compliant** with `prefers-reduced-motion` support
- **Responsive design** with mobile-first approach
- **Dark/Light mode support**
- **Performance optimized** - 120 FPS capable

## 🌐 Browser Support

| Browser | Version | Status | Notes |
|---------|---------|--------|-------|
| Chrome/Edge | 116+ | ✅ Native | Stable scroll-driven animations |
| Firefox | 128+ | ⚠️ Flag Required | Enable `layout.css.scroll-driven-animations.enabled` |
| Safari | 26 beta | ✅ Native | Available in Safari Technology Preview |
| Opera | 102+ | ✅ Native | Based on Chromium 116+ |

### Enabling Firefox Support
1. Navigate to `about:config`
2. Search for `layout.css.scroll-driven-animations.enabled`
3. Set to `true`

## 📦 Installation & Integration

### 1. Copy Files
```bash
# Copy the component files to your project
cp src/components/HeroToCollageAnimation.jsx your-project/src/components/
cp src/components/HeroToCollageAnimation.css your-project/src/components/
```

### 2. Integration Options

#### Option A: Replace Existing Hero Section
```jsx
// In your main component (e.g., SnapShelfStudio.jsx)
import HeroToCollageAnimation from './HeroToCollageAnimation'

// Replace the existing hero section with:
<HeroToCollageAnimation />
```

#### Option B: Add as Separate Section
```jsx
// Add as a new section in your app
import HeroToCollageAnimation from './components/HeroToCollageAnimation'

function App() {
  return (
    <div>
      {/* Your existing content */}
      <HeroToCollageAnimation />
      {/* Rest of your content */}
    </div>
  )
}
```

#### Option C: WordPress/Webflow Integration
```html
<!-- Include the CSS in your theme's head -->
<link rel="stylesheet" href="path/to/HeroToCollageAnimation.css">

<!-- Add the HTML structure -->
<div class="hero-to-collage-container">
  <!-- Component HTML structure here -->
</div>
```

### 3. Image Setup
Ensure your images are properly optimized and accessible:

```bash
# Required image paths (update in component as needed):
/images/hero/transformation-1.webp      # Main hero image
/images/portfolio/touch-up-v2-after.jpg
/images/portfolio/removebg-01-after.jpg
# ... (see component for full list)
```

## 🎨 Customization

### Adjusting Animation Timing
```css
/* In HeroToCollageAnimation.css */
:root {
  --scroll-easing: cubic-bezier(0.25, 0.46, 0.45, 0.94);
  --transition-duration: 0.8s;
}

/* Modify animation ranges */
.hero-image {
  animation-range: 0% 50%; /* Adjust these percentages */
}
```

### Changing Grid Layout
```css
/* For different grid sizes, modify: */
.gallery-grid {
  grid-template-columns: repeat(4, 1fr); /* Change from 5 to 4 columns */
  grid-template-rows: repeat(4, 1fr);    /* Adjust rows accordingly */
}
```

### Color Scheme Customization
```css
/* Update color variables */
:root {
  --primary-gradient: linear-gradient(135deg, #8b5cf6, #a855f7);
  --secondary-bg: #f8fafc;
  --dark-bg: #0f172a;
}
```

## 🔧 Performance Optimization

### Image Optimization
```html
<!-- Use WebP format with fallbacks -->
<picture>
  <source srcset="image.webp" type="image/webp">
  <source srcset="image.jpg" type="image/jpeg">
  <img src="image.jpg" alt="Description" loading="lazy">
</picture>
```

### Lazy Loading
All gallery images use `loading="lazy"` by default. The hero image uses `loading="eager"` for immediate display.

### CSS Optimization
- All animations use `transform` and `opacity` only
- GPU acceleration with `will-change` where appropriate
- Minimal repaints and reflows

## 🧪 Testing Checklist

### Browser Testing
- [ ] Chrome 116+ (native support)
- [ ] Firefox 128+ (with flag enabled)
- [ ] Safari Technology Preview
- [ ] Edge 116+
- [ ] Mobile Safari (iOS 16+)
- [ ] Mobile Chrome

### Performance Testing
- [ ] Lighthouse Performance Score ≥ 90
- [ ] 120 FPS in Chrome DevTools
- [ ] Network throttling (3G simulation)
- [ ] Memory usage monitoring

### Accessibility Testing
- [ ] Screen reader compatibility
- [ ] Keyboard navigation
- [ ] `prefers-reduced-motion` respect
- [ ] Color contrast ratios
- [ ] Alt text for all images

### Responsive Testing
- [ ] Desktop (1920px+)
- [ ] Laptop (1024px-1919px)
- [ ] Tablet (768px-1023px)
- [ ] Mobile (320px-767px)

## 🔄 Fallback Support

### For Unsupported Browsers
The component includes automatic fallbacks:
- Static layout when scroll-driven animations aren't supported
- Progressive enhancement approach
- Graceful degradation for older browsers

### JavaScript Polyfill (Optional)
For broader browser support, you can include the scroll-timeline polyfill:

```html
<script src="https://flackr.github.io/scroll-timeline/dist/scroll-timeline.js"></script>
```

## 🐛 Troubleshooting

### Common Issues

**Animation not working:**
- Check browser support and flags
- Verify CSS custom properties are supported
- Ensure images are loading correctly

**Performance issues:**
- Optimize image sizes and formats
- Check for conflicting CSS animations
- Monitor compositor layer usage

**Layout breaking:**
- Verify Grid and Subgrid support
- Check viewport units compatibility
- Test responsive breakpoints

### Debug Mode
Add this CSS for debugging:
```css
.gallery-item {
  outline: 2px solid red; /* Visualize grid items */
}

.hero-image {
  outline: 2px solid blue; /* Check hero scaling */
}
```

## 📝 License

This component is part of the SnapShelf Studio project and follows the same licensing terms.

## 🔗 References

- [MDN: Scroll-driven animations](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_scroll-driven_animations)
- [WebKit: Scroll-driven animations guide](https://webkit.org/blog/13645/scroll-driven-animations/)
- [CSS Subgrid Support](https://caniuse.com/css-subgrid)
- [Scroll Timeline Polyfill](https://github.com/flackr/scroll-timeline)

---

**Built with performance and accessibility in mind. 🚀**