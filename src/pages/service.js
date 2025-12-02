/**
 * Service Page - Initialize and destroy animations
 */

// Hero
import { initServiceHeroAnimation, destroyServiceHeroAnimation } from '../animations/hero/serviceHero.js';

// Text Animations
import { initCharAnimations } from '../animations/text/charAnimations.js';

// Sections
import { serviceHoverAnimation, destroyServiceHoverAnimation } from '../animations/sections/serviceHover.js';
import { serviceProcessScroll, destroyServiceProcessScroll } from '../animations/sections/process.js';

// Scroll
import { startScrollDownAnimation } from '../animations/scroll/scrollDown.js';

// SVG
import { animateSvgPaths } from '../animations/svg/drawPaths.js';

// Swipers
import { initFeaturedSwiper, destroyFeaturedSwiper } from '../components/swiper/featuredSwiper.js';
import { initTestimonialsSwiperScripts, destroyTestimonialsSwiperScripts } from '../components/swiper/testimonialsSwiper.js';

/**
 * Initialize all service page animations
 */
export function initServiceAnimations() {
    initServiceHeroAnimation();
    startScrollDownAnimation();
    initCharAnimations();
    animateSvgPaths();
    initFeaturedSwiper();
    serviceProcessScroll();
    serviceHoverAnimation();
    initTestimonialsSwiperScripts();
}

/**
 * Destroy all service page animations
 */
export function destroyServiceAnimations() {
    destroyServiceHeroAnimation();
    destroyFeaturedSwiper();
    destroyServiceProcessScroll();
    destroyServiceHoverAnimation();
    destroyTestimonialsSwiperScripts();
}

