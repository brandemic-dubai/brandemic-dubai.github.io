/**
 * Custom Cursor - Mouse follow animations
 */

let isVisible = false;
let xCTo = null;
let yCTo = null;
let scaleAnim = null;
let targets = [];

/**
 * Initialize custom cursor
 */
export function customCursorInit() {
    gsap.set('.inner-dot', { width: "1rem", height: "1rem" });
    isVisible = false;
    document.addEventListener("mousemove", mouseMove);

    xCTo = gsap.quickTo(".inner-dot", "left", {
        duration: 0.6,
        ease: "power3"
    });
    yCTo = gsap.quickTo(".inner-dot", "top", {
        duration: 0.6,
        ease: "power3"
    });

    scaleAnim = gsap.timeline({ paused: true });

    scaleAnim.to(".inner-dot", {
        width: "3rem",
        height: "3rem",
        duration: 0.3,
    });

    document.querySelector(".page-wrapper").addEventListener("mouseenter", () => {
        gsap.to(".inner-dot", { opacity: 1, duration: 0.3 });
    });

    document.querySelector(".page-wrapper").addEventListener("mouseleave", () => {
        gsap.to(".inner-dot", { opacity: 0, duration: 0.3 });
    });
}

/**
 * Handle mouse movement
 * @param {MouseEvent} e 
 */
function mouseMove(e) {
    if (!isVisible) {
        gsap.set(".inner-dot", { opacity: 1 });
        isVisible = true;
    }

    const cursorPosition = {
        left: e.clientX,
        top: e.clientY
    };

    xCTo(cursorPosition.left);
    yCTo(cursorPosition.top);
}

/**
 * Initialize mouse hover effect on links
 */
export function mouseHover() {
    targets = gsap.utils.toArray(".link-hover-ix, a");
    targets.forEach((target) => {
        target.addEventListener("mouseenter", handleMouseEnter);
        target.addEventListener("mouseleave", handleMouseLeave);
    });
}

function handleMouseEnter() {
    if (scaleAnim) scaleAnim.play();
}

function handleMouseLeave() {
    if (scaleAnim) scaleAnim.reverse();
}

/**
 * Get the scale animation timeline (used for Barba transitions)
 * @returns {gsap.core.Timeline}
 */
export function getScaleAnim() {
    return scaleAnim;
}

