# Portfolio Performance Pass

## Task

Optimized the performance of all five portfolio pages using Chrome DevTools Lighthouse.

Pages tested:

- Home
- About
- Services
- Team
- Contact

## Before Optimization

- Home: 92, LCP 2.3s
- About: 100, LCP 1.3s
- Services: 98, LCP ~2.2s
- Team: 96, LCP 2.6s
- Contact: ~97, LCP ~2.4s

## Optimizations

- Added `loading="lazy"` to below-the-fold images.
- Deferred non-critical JavaScript using dynamic imports.
- Added `font-display: swap` for fonts.
- Preloaded the primary font.
- Optimized the hero image using WebP.
- Extracted critical CSS into `critical.css`.

## After Optimization

- Home: 98, LCP ~2.2–2.4s
- About: 100, LCP ~1.3s
- Services: ~98, LCP ~2.2s
- Team: ~97, LCP ~2.4–2.6s
- Contact: ~97–98, LCP ~2.2–2.4s

## Result

Improved image loading, JavaScript loading, font rendering, and critical rendering performance.

Final performance scores were approximately 97–100 across the five pages.
