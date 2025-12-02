/**
 * About Page - Initialize and destroy animations
 */

// Hero
import { initHPIHeroAnimation, destroyHPIHeroAnimation } from '../animations/hero/hpiHero.js';

// Text Animations
import { initCharAnimations } from '../animations/text/charAnimations.js';
import { initLineAnimations } from '../animations/text/lineAnimations.js';

// Sections
import { animateMilestones } from '../animations/sections/milestones.js';
import { scrollPinObserver, destroyScrollPinObserver } from '../animations/sections/process.js';
import { aboutTicker, destroyAboutTicker } from '../animations/sections/ticker.js';

// Accordion
import { awardsAccordion, destroyAwardsAccordion, accordionLineAnimation } from '../components/accordion/awardsAccordion.js';

// Scroll
import { applyParallaxEffect } from '../animations/scroll/parallax.js';

// SVG
import { animateSvgPaths } from '../animations/svg/drawPaths.js';

// Swipers
import { initProcessSwiper, destroyProcessSwiper } from '../components/swiper/processSwiper.js';

/**
 * Initialize all about page animations
 */
export function initAboutAnimations() {
    initHPIHeroAnimation();
    animateMilestones();
    scrollPinObserver();
    aboutTicker();
    awardsAccordion();
    accordionLineAnimation();
    initCharAnimations();
    initLineAnimations();
    applyParallaxEffect();
    animateSvgPaths();
    initProcessSwiper();
}

/**
 * Destroy all about page animations
 */
export function destroyAboutAnimations() {
    destroyHPIHeroAnimation();
    destroyScrollPinObserver();
    destroyProcessSwiper();
    destroyAboutTicker();
    destroyAwardsAccordion();
}

