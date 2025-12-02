/**
 * Awards Accordion - Expandable accordion for awards section
 */

import { isMobile } from '../../utils/isMobile.js';

let awardsAccordionListeners = [];

/**
 * Initialize awards accordion
 */
export function awardsAccordion() {
    const mobile = isMobile();

    const acc = document.getElementsByClassName("awards_toggle");
    const panels = document.getElementsByClassName("awards_panel");

    for (let i = 0; i < acc.length; i++) {
        const handler = function () {
            for (let j = 0; j < panels.length; j++) {
                if (j !== i) {
                    panels[j].style.maxHeight = null;
                    acc[j].classList.remove("active");
                }
            }

            this.classList.toggle("active");
            const panel = this.nextElementSibling;
            if (panel.style.maxHeight) {
                panel.style.maxHeight = null;
            } else {
                panel.style.maxHeight = panel.scrollHeight + "px";
                if (typeof ScrollTrigger !== "undefined" && !mobile) {
                    ScrollTrigger.refresh();
                }
            }
        };

        acc[i].addEventListener("click", handler);
        awardsAccordionListeners.push({ el: acc[i], handler });
    }
}

/**
 * Destroy awards accordion listeners
 */
export function destroyAwardsAccordion() {
    awardsAccordionListeners.forEach(({ el, handler }) => {
        el.removeEventListener("click", handler);
    });
    awardsAccordionListeners = [];
}

/**
 * Animate accordion lines on scroll
 */
export function accordionLineAnimation() {
    gsap.fromTo(
        ".awards_accordion",
        { clipPath: "polygon(0 0, 0% 0, 0% 100%, 0 100%)" },
        {
            clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
            duration: 1,
            stagger: 0.2,
            ease: "power1.out",
            scrollTrigger: {
                trigger: ".awards_accordions",
                start: "top 70%",
            },
        }
    );
}

