/**
 * Milestones Animation - Animated milestone blocks
 */

/**
 * Animate milestone blocks
 */
export function animateMilestones() {
    gsap.utils.toArray(".milestone_block").forEach((block, index) => {
        const line = block.querySelector(".milestone_line");
        const number = block.querySelector(".milestone_number");
        const text = block.querySelector("p");

        gsap.timeline({
            scrollTrigger: {
                trigger: block,
                start: "top 70%",
                toggleActions: "play none none none",
            }
        })
            .from(line, { scaleY: 0, transformOrigin: "bottom", duration: 0.5, ease: "power2.out" })
            .from([number, text], { opacity: 0, y: 20, duration: 0.5, stagger: 0.3 }, "-=0.2");
    });
}

