/**
 * Thank You Page - Initialize and destroy animations
 */

// Hero
import { initThankHeroAnimation, destroyThankHeroAnimation } from '../animations/hero/thankHero.js';

/**
 * Initialize all thank you page animations
 */
export function initThankAnimations() {
    initThankHeroAnimation();
}

/**
 * Destroy all thank you page animations
 */
export function destroyThankAnimations() {
    destroyThankHeroAnimation();
}

