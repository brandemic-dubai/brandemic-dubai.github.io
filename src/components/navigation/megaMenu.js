/**
 * Mega Menu - Toggle animation for hamburger menu
 */

let isOpen = false;
let isAnimating = false;
let openMenuTimeline = null;
let closeMenuTimeline = null;

/**
 * Initialize mega menu toggle
 */
export function megaMenuToggle() {
    const hamburgerLink = document.querySelector(".hamburger_link");
    const megaMenu = document.querySelector(".mega_menu");
    const navLinks = document.querySelectorAll(".nav_link-wrapper .nav_link");
    const megaMenuCTA = document.querySelector(".mega_menu-cta");
    const megaMenuGradient = document.querySelector(".mega_menu-gradient");
    const clipPathCalc = "calc(50% + 39rem) 0%";

    gsap.set(megaMenu, {
        clipPath: `circle(0% at ${clipPathCalc})`,
        display: "none"
    });
    gsap.set(navLinks, { x: -40, opacity: 0 });
    gsap.set(megaMenuCTA, { opacity: 0 });
    gsap.set(megaMenuGradient, { opacity: 0 });

    isOpen = false;
    isAnimating = false;

    openMenuTimeline = gsap.timeline({ paused: true });
    closeMenuTimeline = gsap.timeline({ paused: true });

    closeMenuTimeline
        .to(megaMenu, {
            clipPath: `circle(0% at ${clipPathCalc})`,
            duration: 0.5,
            ease: "power4.inOut",
            onComplete: () => {
                gsap.set(megaMenu, { display: "none" });
                document.querySelector(".hamburger").classList.remove("is-active");
                isAnimating = false;
            }
        });

    openMenuTimeline
        .set(megaMenu, { display: "flex" })
        .to(megaMenu, {
            clipPath: `circle(200% at ${clipPathCalc})`,
            duration: 0.5,
            ease: "power4.inOut",
            onComplete: () => {
                isAnimating = false;
            }
        })
        .to(navLinks, {
            x: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: "power2.out",
        }, "<0.4")
        .to(megaMenuCTA, {
            opacity: 1,
            duration: 0.4,
            ease: "power2.out"
        }, "<0.4")
        .to(megaMenuGradient, {
            opacity: 1,
            duration: 1,
            ease: "power2.out",
        });

    const toggleMenu = () => {
        if (isAnimating) return;
        isAnimating = true;

        if (isOpen) {
            closeMenuTimeline.restart();
            document.body.classList.remove("no-scroll");
        } else {
            openMenuTimeline.restart();
            document.querySelector(".hamburger").classList.add("is-active");
            document.body.classList.add("no-scroll");
        }
        isOpen = !isOpen;
    };

    hamburgerLink.addEventListener("click", toggleMenu);
}

/**
 * Get menu state
 * @returns {boolean}
 */
export function getIsOpen() {
    return isOpen;
}

/**
 * Set menu state
 * @param {boolean} state 
 */
export function setIsOpen(state) {
    isOpen = state;
}

/**
 * Get close menu timeline
 * @returns {gsap.core.Timeline}
 */
export function getCloseMenuTimeline() {
    return closeMenuTimeline;
}

