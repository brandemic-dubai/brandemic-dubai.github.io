/**
 * Home Page - Initialize and destroy animations
 */

// Hero
import { initHomeHeroAnimation, destroyHomeHeroAnimation } from '../animations/hero/homeHero.js';

// Text Animations
import { initCharAnimations } from '../animations/text/charAnimations.js';
import { initWordAnimations } from '../animations/text/wordAnimations.js';
import { initLineAnimations } from '../animations/text/lineAnimations.js';

// Video
import { playVideo, startVideo, destroyStartVideo } from '../components/video/videoPlayer.js';

// Sections
import { animateWorkImages, destroyFeaturedWorkLoop } from '../animations/sections/featuredWork.js';
import { serviceHoverAnimation, destroyServiceHoverAnimation } from '../animations/sections/serviceHover.js';
import { visionSectionAnimation, destroyVisionSectionAnimation } from '../animations/sections/vision.js';
import { animateCTA } from '../animations/sections/cta.js';

// Scroll
import { applyParallaxEffect } from '../animations/scroll/parallax.js';
import { animateScrollingText } from '../animations/scroll/scrollingText.js';

// SVG
import { animateSvgPaths } from '../animations/svg/drawPaths.js';

// Swipers
import { initToolsSwiperScripts, destroyToolsSwiperScripts } from '../components/swiper/toolsSwiper.js';
import { initTestimonialsSwiperScripts, destroyTestimonialsSwiperScripts } from '../components/swiper/testimonialsSwiper.js';

// Utils
import { loadFeedSpring } from '../utils/feedspring.js';

/**
 * Initialize all home page animations
 */
export function initHomeAnimations() {
    initHomeHeroAnimation();
    initCharAnimations();
    initWordAnimations();
    initLineAnimations();
    playVideo();
    startVideo();
    animateWorkImages();
    applyParallaxEffect();
    serviceHoverAnimation();
    visionSectionAnimation();
    animateSvgPaths();
    animateScrollingText();
    animateCTA();
    loadFeedSpring();
    initToolsSwiperScripts();
    initTestimonialsSwiperScripts();
}

/**
 * Destroy all home page animations
 */
export function destroyHomeAnimations() {
    destroyHomeHeroAnimation();
    destroyStartVideo();
    destroyFeaturedWorkLoop();
    destroyServiceHoverAnimation();
    destroyVisionSectionAnimation();
    destroyToolsSwiperScripts();
    destroyTestimonialsSwiperScripts();
}

