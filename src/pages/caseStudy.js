/**
 * Case Study Page - Initialize and destroy animations
 */

// Hero
import { initHPIHeroAnimation, destroyHPIHeroAnimation } from '../animations/hero/hpiHero.js';

// Text Animations
import { initCharAnimations } from '../animations/text/charAnimations.js';
import { initLineAnimations } from '../animations/text/lineAnimations.js';

// Sections
import { featuredWorkLoop } from '../animations/sections/featuredWork.js';
import { caseStudyTicker, livXTicker, destroyTickers } from '../animations/sections/ticker.js';
import { animateCTA } from '../animations/sections/cta.js';
import { animateGalleryImages } from '../animations/sections/gallery.js';

// Scroll
import { applyParallaxEffect } from '../animations/scroll/parallax.js';

/**
 * Initialize all case study page animations
 */
export function initCaseStudyAnimations() {
    initHPIHeroAnimation();
    applyParallaxEffect();
    initCharAnimations();
    initLineAnimations();
    caseStudyTicker();
    featuredWorkLoop();
    animateCTA();
    animateGalleryImages();

    // LivX
    livXTicker();
}

/**
 * Destroy all case study page animations
 */
export function destroyCaseStudyAnimations() {
    destroyHPIHeroAnimation();
    destroyTickers();
}

