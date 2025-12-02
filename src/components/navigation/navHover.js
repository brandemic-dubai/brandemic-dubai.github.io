/**
 * Navigation Hover Animations - Link hover effects
 */

/**
 * Initialize sub navigation hover animation
 */
export function initNavHoverAnimation() {
    document.querySelectorAll('.nav_link-block').forEach(block => {
        const arrow = block.querySelector('.nav_arrow-icon');
        const link = block.querySelector('.nav_link');
        const image = block.querySelector('.nav_image');

        block.addEventListener('mouseenter', () => {
            block.addEventListener("mousemove", floatNavImage);
            gsap.to(arrow, { opacity: 1, x: 0, duration: 0.3 });
            gsap.to(link, { left: 30, opacity: 1, duration: 0.3 });
            gsap.to(image, { opacity: 1, scale: 1, y: 0, rotate: 12, duration: 0.3, ease: "power2.out" });
        });

        block.addEventListener('mouseleave', () => {
            gsap.to(arrow, { opacity: 0, x: -30, duration: 0.3 });
            gsap.to(link, { left: 0, duration: 0.3 });
            gsap.to(image, { opacity: 0, scale: 0.8, y: -10, rotate: 0, duration: 0.3, ease: "power2.out" });
            block.removeEventListener("mousemove", floatNavImage);
        });

        function floatNavImage(event) {
            const { clientX, clientY } = event;
            const { left, top, width, height } = block.getBoundingClientRect();

            let xMove = (clientX - (left + width / 2)) * 0.1;
            let yMove = (clientY - (top + height / 2)) * 0.1;

            gsap.to(image, { x: xMove, y: yMove, rotate: 12 + xMove * 0.1, duration: 0.3, ease: "power2.out" });
        }
    });
}

/**
 * Initialize sub-menu navigation hover (Services dropdown)
 */
export function initSubMenuNavHover() {
    const serviceBlock = document.querySelector('.nav_link-block-services');
    if (!serviceBlock) return;

    const serviceArrow = serviceBlock.querySelector('.nav_arrow-icon');
    const subNavWrapper = serviceBlock.querySelector('.sub_nav-wrapper');
    const subNav = serviceBlock.querySelector('.nav_link');
    const subNavLinks = subNavWrapper.querySelectorAll('.sub_nav-link');

    serviceBlock.addEventListener('mouseenter', () => {
        gsap.to(serviceArrow, { opacity: 1, x: 0, duration: 0.3 });
        gsap.set(subNavLinks, { x: -20, opacity: 0, display: "block" });
        gsap.to(subNav, { left: 30, opacity: 1, duration: 0.3 });
        gsap.to(subNavLinks, {
            x: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: "power2.out",
            overwrite: true,
        });
    });

    serviceBlock.addEventListener('mouseleave', () => {
        gsap.to(serviceArrow, { opacity: 0, x: -30, duration: 0.3 });
        gsap.to(subNav, { left: 0, duration: 0.3 });
        gsap.to(subNavLinks, {
            x: -20,
            opacity: 0,
            duration: 0.3,
            stagger: { each: 0.05, from: "end" },
            ease: "power2.out",
            overwrite: true,
            onComplete: () => {
                gsap.set(subNavLinks, { display: "none" });
            }
        });
    });
}

