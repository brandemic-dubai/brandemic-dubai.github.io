/**
 * Thank You Hero Animation - Thank you page hero
 */

let thankHeroTl = null;

/**
 * Initialize thank you hero animation
 */
export function initThankHeroAnimation() {
    thankHeroTl = gsap.timeline();

    const splitThankHeroHeadline = new SplitText(".thank_hero-tl-1", { type: "chars,words,lines" });
    const splitThankHeroPara = new SplitText(".thank_hero-tl-2", { type: "chars,words,lines" });

    thankHeroTl.fromTo(".main-wrapper", { autoAlpha: 0 }, { autoAlpha: 1, ease: "linear" })
        .from(splitThankHeroHeadline.chars, {
            opacity: 0,
            x: 16,
            y: "30%",
            filter: "blur(10px)",
            stagger: 0.02,
        })
        .from(splitThankHeroPara.words, {
            opacity: 0,
            x: 16,
            y: "30%",
            filter: "blur(10px)",
            stagger: 0.03,
        }, "-=0.5")
        .from(".thank_hero-tl-3", {
            opacity: 0,
            duration: 1,
            ease: "power3.out",
        }, "-=1.3");
}

/**
 * Destroy thank you hero animation
 */
export function destroyThankHeroAnimation() {
    if (thankHeroTl) thankHeroTl.kill();
}

