/**
 * Scroll Down Animation - Repeating scroll indicator
 */

/**
 * Start scroll down indicator animation
 */
export function startScrollDownAnimation() {
    gsap.set(".scroll-down-wrapper", { y: 0 });

    gsap.to(".scroll-down-wrapper", {
        y: 120,
        duration: 1.5,
        ease: "none",
        repeat: -1,
        onRepeat: () => gsap.set(".scroll-down-wrapper", { y: 0 })
    });
}

