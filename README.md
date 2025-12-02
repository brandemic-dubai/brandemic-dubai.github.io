# Brandemic Dubai - Custom Animations

This repository contains all custom GSAP and Barba.js animations for the Brandemic Dubai website.

## 📁 Project Structure

```
src/
├── index.js                    # Main entry point
├── core/                       # Core functionality
│   ├── gsapConfig.js          # GSAP plugin registration
│   ├── barba.js               # Barba.js page transitions
│   ├── smoothScroll.js        # ScrollSmoother setup
│   └── webflow.js             # Webflow reset utilities
├── components/                 # Reusable UI components
│   ├── cursor/
│   │   └── customCursor.js    # Custom cursor animations
│   ├── navigation/
│   │   ├── megaMenu.js        # Mega menu toggle
│   │   └── navHover.js        # Navigation hover effects
│   ├── buttons/
│   │   └── buttonFill.js      # Button fill hover effect
│   ├── video/
│   │   └── videoPlayer.js     # Video playback & fullscreen
│   ├── swiper/
│   │   ├── toolsSwiper.js     # Tools swiper
│   │   ├── testimonialsSwiper.js
│   │   ├── featuredSwiper.js
│   │   └── processSwiper.js
│   ├── accordion/
│   │   └── awardsAccordion.js # Awards accordion
│   └── filter/
│       └── portfolioFilter.js # Portfolio filtering
├── animations/                 # Animation modules
│   ├── text/
│   │   ├── charAnimations.js  # Character-based animations
│   │   ├── wordAnimations.js  # Word-based animations
│   │   └── lineAnimations.js  # Line-based animations
│   ├── scroll/
│   │   ├── parallax.js        # Parallax effects
│   │   ├── scrollingText.js   # Horizontal scroll text
│   │   └── scrollDown.js      # Scroll indicator
│   ├── svg/
│   │   └── drawPaths.js       # SVG path drawing
│   ├── sections/
│   │   ├── featuredWork.js    # Featured work animations
│   │   ├── serviceHover.js    # Service hover effects
│   │   ├── vision.js          # Vision section
│   │   ├── cta.js             # CTA animation
│   │   ├── milestones.js      # Milestone blocks
│   │   ├── process.js         # Process section
│   │   ├── ticker.js          # Various tickers
│   │   └── gallery.js         # Gallery images
│   └── hero/
│       ├── homeHero.js        # Home page hero
│       ├── hpiHero.js         # Generic HPI hero
│       ├── contactHero.js     # Contact page hero
│       ├── serviceHero.js     # Service page hero
│       └── thankHero.js       # Thank you page hero
├── pages/                      # Page-specific orchestration
│   ├── home.js
│   ├── about.js
│   ├── portfolio.js
│   ├── contact.js
│   ├── caseStudy.js
│   ├── service.js
│   └── thanks.js
├── footer/
│   └── footer.js              # Footer animations
└── utils/
    ├── delay.js               # Delay utility
    ├── isMobile.js            # Mobile detection
    └── feedspring.js          # Instagram feed loader
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

```bash
npm install
```

### Development

Watch for changes and rebuild automatically:

```bash
npm run dev
```

### Build for Production

Build the bundled file:

```bash
npm run build
```

This creates:
- `dist/main.js` - Full bundle with comments
- `dist/main.min.js` - Minified bundle for production

## 📝 Usage in Webflow

1. Build the project: `npm run build`
2. Host `dist/main.js` or `dist/main.min.js` on a CDN (GitHub Pages, Netlify, Vercel, etc.)
3. In Webflow, add the script tag in your site's custom code:

```html
<!-- Before </body> tag -->
<script src="https://your-cdn.com/main.min.js"></script>
```

**Important:** Make sure these CDN scripts are loaded BEFORE your custom script:
- GSAP core
- ScrollTrigger
- ScrollSmoother
- DrawSVGPlugin
- SplitText
- Draggable
- Flip
- Observer
- Barba.js
- Swiper

## 🔧 Making Changes

1. Edit the relevant file in `/src`
2. Run `npm run build` to generate the bundle
3. Commit and push to Git
4. Deploy the updated `dist/main.js` to your CDN

## 📌 Version Control Workflow

1. **Before making changes:** Pull latest from Git
2. **Make your edits** in the modular source files
3. **Test locally** if possible
4. **Build:** `npm run build`
5. **Commit:** Include both source changes and built files
6. **Push:** Deploy automatically via your CDN

## 🗂️ Pages & Namespaces

| Page | Barba Namespace | Init Function |
|------|-----------------|---------------|
| Home | `home` | `initHomeAnimations()` |
| About | `about` | `initAboutAnimations()` |
| Portfolio | `portfolio` | `initPortfolioAnimations()` |
| Contact | `contact` | `initContactAnimations()` |
| Case Study | `case-study` | `initCaseStudyAnimations()` |
| Service | `service` | `initServiceAnimations()` |
| Thank You | `thanks` | `initThankAnimations()` |

## 🐛 Debugging

Each page's animations can be traced through its page module in `/src/pages/`. For example, to debug home page animations:

1. Open `src/pages/home.js`
2. See which animations are initialized
3. Navigate to the specific animation file to debug

## 📚 Dependencies (Loaded via CDN)

- GSAP (with Club plugins)
- Barba.js
- Swiper
- Webflow

These are NOT bundled and must be loaded before the main script.

