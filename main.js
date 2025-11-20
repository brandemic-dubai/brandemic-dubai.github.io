document.addEventListener("DOMContentLoaded", (event) => {
    document.fonts.ready.then(() => {
        gsap.registerPlugin(ScrollTrigger, ScrollSmoother, DrawSVGPlugin, SplitText, Draggable, Flip, Observer)

        const isMobile = window.matchMedia("(max-width: 768px)").matches;

        let pageWrapper;
        let smoother;
        let isVisible;
        let targets;
        let scaleAnim;
        let xCTo;
        let yCTo;
        let openMenuTimeline;
        let closeMenuTimeline;
        let isOpen;
        let isAnimating;
        let hasLoaderPlayed;
        let loaderTl;
        let overlay;
        let videoElement;
        let videoCursor;

        initBarba();
        initSmoothScroller();

        if (!isMobile) {
            window.addEventListener("load", () => {
                ScrollTrigger.refresh();
            });

            customCursorInit();
            mouseHover();
            buttonFillHover();
        }

        megaMenuToggle();
        initNavHoverAnimation();
        initSubMenuNavHover();
        footerLimitless();
        copyYear();
    });
});
function initSmoothScroller() {
    smoother = ScrollSmoother.create({
        wrapper: '#smooth-wrapper',
        content: '#smooth-content',
        smooth: 1,
        effects: true,
        smoothTouch: 0,
    });
}
// Mouse Follow Initialization [START]
function customCursorInit() {
    gsap.set('.inner-dot', { width: "1rem", height: "1rem" })
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

    scaleAnim
        .to(".inner-dot", {
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

function mouseHover() {
    targets = gsap.utils.toArray(".link-hover-ix, a");
    targets.forEach((target) => {
        target.addEventListener("mouseenter", handleMouseEnter);
        target.addEventListener("mouseleave", handleMouseLeave);
    });
}

function handleMouseEnter() {
    scaleAnim.play();
}

function handleMouseLeave() {
    scaleAnim.reverse();
}
// Mouse Follow Initialization [END]
function buttonFillHover() {
    document.querySelectorAll(".button.is-fill").forEach(button => {
        const flair = button.querySelector(".button__flair");

        button.addEventListener("mouseenter", (e) => {
            const { left, top } = button.getBoundingClientRect();
            gsap.set(flair, {
                x: e.clientX - left,
                y: e.clientY - top,
                scale: 0
            });

            gsap.to(flair, {
                scale: 1,
                duration: 0.3,
                ease: "power2.out"
            });
        });

        button.addEventListener("mousemove", (e) => {
            const { left, top } = button.getBoundingClientRect();
            gsap.to(flair, {
                x: e.clientX - left,
                y: e.clientY - top,
                duration: 0.2,
                ease: "power3.out"
            });
        });

        button.addEventListener("mouseleave", () => {
            gsap.to(flair, {
                scale: 0,
                duration: 0.3,
                ease: "power2.inOut"
            });
        });
    });
}
function megaMenuToggle() {
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
function initNavHoverAnimation() {
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
            gsap.to(image, { opacity: 0, scale: 0.8, y: -10, rotate: 0, duration: 0.3, ease: "power2.out" })
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

function initSubMenuNavHover() {
    const serviceBlock = document.querySelector('.nav_link-block-services');
    const serviceArrow = serviceBlock.querySelector('.nav_arrow-icon');
    const subNavWrapper = serviceBlock.querySelector('.sub_nav-wrapper');
    const subNav = serviceBlock.querySelector('.nav_link')
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
function delay(n) {
    n = n || 2000;

    return new Promise(done => {
        setTimeout(() => {
            done();
        }, n);
    });
}
let homeHeroTl;
let heroCycleCall;

function initHomeHeroAnimation() {
    const homeHeroChars = document.querySelector(".hero_anim-chars");
    const splitHomeHeroChars = new SplitText(homeHeroChars, { type: "chars,words,lines" });

    homeHeroTl = gsap.timeline();

    homeHeroTl
        .fromTo(".main-wrapper", { autoAlpha: 0 }, { autoAlpha: 1, ease: "linear" })
        .from(splitHomeHeroChars.chars, {
            opacity: 0,
            x: 16,
            y: "30%",
            filter: "blur(10px)",
            stagger: 0.03,
        })
        .add(() => {
            gsap.delayedCall(0.8, cycleHeroHeadingWords);
        });
}

function cycleHeroHeadingWords() {
    const words = [
        "Strategy", "Packaging", "Naming", "Branding", "Storytelling",
        "Experiences", "Partnerships", "Growth", "Impact", "Design"
    ];

    const headingWords = document.querySelector("#heading_keywords");
    let currentIndex = 0;

    const loopWords = () => {
        const nextWord = words[currentIndex];

        const charsOut = new SplitText(headingWords, { type: "chars" });
        const loopTl = gsap.timeline({
            onComplete: () => {
                headingWords.textContent = nextWord;
                const charsIn = new SplitText(headingWords, { type: "chars" });

                gsap.fromTo(charsIn.chars, {
                    y: 20,
                    opacity: 0,
                }, {
                    y: 0,
                    opacity: 1,
                    stagger: 0.03,
                    duration: 0.4,
                    ease: "power2.out"
                });

                currentIndex = (currentIndex + 1) % words.length;

                heroCycleCall = gsap.delayedCall(0.8, loopWords);
            }
        });

        loopTl.to(charsOut.chars, {
            y: -20,
            opacity: 0,
            stagger: 0.03,
            duration: 0.4,
            ease: "power1.in"
        });
    };

    loopWords();
}

function destroyHomeHeroAnimation() {
    if (homeHeroTl) homeHeroTl.kill();
    if (heroCycleCall) heroCycleCall.kill();
}
let heroTl;

function initHPIHeroAnimation() {
    heroTl = gsap.timeline();

    const splitHeroHeadline = new SplitText(".hero-timeline-1", { type: "chars,words,lines" });
    const splitHeroPara = new SplitText(".hero-timeline-2", { type: "chars,words,lines" });

    heroTl.fromTo(".main-wrapper", { autoAlpha: 0 }, { autoAlpha: 1, ease: "linear" })
        .from(splitHeroHeadline.chars, {
            opacity: 0,
            x: 16,
            y: "30%",
            filter: "blur(10px)",
            stagger: 0.03,
        })
        .from(splitHeroPara.words, {
            opacity: 0,
            x: 16,
            y: "30%",
            filter: "blur(10px)",
            stagger: 0.03,
        }, "-=0.5")
        .fromTo(".hero-timeline-3", {
            clipPath: "polygon(0 0, 100% 0, 100% 0%, 0 0%)",
        }, {
            clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
            duration: 0.8,
            ease: "power1.inOut",
        }, "-=0.2")
}

function destroyHPIHeroAnimation() {
    if (heroTl) heroTl.kill();
}
let contactHeroTl;
let contactCycleCall;

function initContactHeroAnimation() {
    contactHeroTl = gsap.timeline();

    const splitContactHeroHeadline = new SplitText(".contact_hero-tl-1", { type: "chars,words,lines" });
    const splitContactHeroPara = new SplitText(".contact_hero-tl-2", { type: "chars,words,lines" });
    const leftImages = ['.is-one', '.is-two', '.is-three'];
    const rightImages = ['.is-four', '.is-five', '.is-six'];
    const allImages = [...leftImages, ...rightImages];
    const floatTargets = [...allImages, '.contact_hero-tl-3'];

    contactHeroTl.fromTo(".main-wrapper", { autoAlpha: 0 }, { autoAlpha: 1, ease: "linear" })
        .from(splitContactHeroHeadline.chars, {
            opacity: 0,
            x: 16,
            y: "30%",
            filter: "blur(10px)",
            stagger: 0.03,
        })
        .from(splitContactHeroPara.words, {
            opacity: 0,
            x: 16,
            y: "30%",
            filter: "blur(10px)",
            stagger: 0.03,
        }, "-=0.5")
        .fromTo(".contact_hero-tl-3", {
            opacity: 0,
        }, {
            opacity: 1,
            duration: 0.8,
            ease: "power1.inOut",
        }, "-=0.2")
        .fromTo(leftImages, {
            x: -200,
            y: -100,
            scale: 0.5,
            rotation: -45,
            opacity: 0,
        }, {
            x: 0,
            y: 0,
            scale: 1,
            rotation: 0,
            opacity: 1,
            duration: 1.5,
            ease: "power3.out",
            stagger: 0.2
        }, "<")
        .fromTo(rightImages, {
            x: 200,
            y: -100,
            scale: 0.5,
            rotation: 45,
            opacity: 0,
        }, {
            x: 0,
            y: 0,
            scale: 1,
            rotation: 0,
            opacity: 1,
            duration: 1.5,
            ease: "power3.out",
            stagger: 0.2
        }, "-=1.3")
        .add(() => cycleHeadingWords())
        .add(() => initContactHeroFloatingEffect())
}

function initContactHeroFloatingEffect() {
    const floatTargets = [
        { selector: '.is-one', xFactor: 20, yFactor: 10, rotFactor: 5 },
        { selector: '.is-two', xFactor: 15, yFactor: 20, rotFactor: -6 },
        { selector: '.is-three', xFactor: 25, yFactor: 15, rotFactor: 4 },
        { selector: '.is-four', xFactor: -20, yFactor: 18, rotFactor: -5 },
        { selector: '.is-five', xFactor: -15, yFactor: 10, rotFactor: 6 },
        { selector: '.is-six', xFactor: -25, yFactor: 15, rotFactor: -4 },
        { selector: '.contact_hero-tl-3', xFactor: 60, yFactor: 40, rotFactor: 0 },
    ];

    const wrapper = document.querySelector(".section_contact-hero");

    wrapper.addEventListener("mousemove", (e) => {
        const { clientX, clientY } = e;
        const { width, height, left, top } = wrapper.getBoundingClientRect();
        const x = (clientX - left - width / 2) / width;
        const y = (clientY - top - height / 2) / height;

        floatTargets.forEach(({ selector, xFactor, yFactor, rotFactor }) => {
            gsap.to(selector, {
                x: x * xFactor,
                y: y * yFactor,
                rotation: x * rotFactor,
                duration: 0.6,
                ease: "power2.out"
            });
        });
    });

    wrapper.addEventListener("mouseleave", () => {
        floatTargets.forEach(({ selector }) => {
            gsap.to(selector, {
                x: 0,
                y: 0,
                rotation: 0,
                duration: 0.8,
                ease: "power3.out"
            });
        });
    });
}

function cycleHeadingWords() {
    const words = [
        "Bonjour,",
        "Hej,",
        "Ciao,",
        "Hallo,",
        "안녕하세요,",
        "Hola,",
        "Hello,",
        "こんにちは,",
        "Marhaba,",
    ];

    const greetingText = document.querySelector("#greeting-text");
    let currentIndex = 0;

    const loop = () => {
        const nextWord = words[currentIndex];

        const charsOut = new SplitText(greetingText, { type: "chars" });
        const tl = gsap.timeline({
            onComplete: () => {
                greetingText.textContent = nextWord;
                const charsIn = new SplitText(greetingText, { type: "chars" });

                gsap.fromTo(charsIn.chars, {
                    y: 20,
                    opacity: 0,
                }, {
                    y: 0,
                    opacity: 1,
                    stagger: 0.03,
                    duration: 0.5,
                    ease: "power2.out"
                });

                currentIndex = (currentIndex + 1) % words.length;

                contactCycleCall = gsap.delayedCall(2.5, loop);
            }
        });

        tl.to(charsOut.chars, {
            y: -20,
            opacity: 0,
            stagger: 0.03,
            duration: 0.4,
            ease: "power1.in"
        });
    };

    loop();
}

function destroyContactHeroAnimation() {
    if (contactHeroTl) contactHeroTl.kill();
    if (contactCycleCall) contactCycleCall.kill();
}
let serviceHeroTl;

function initServiceHeroAnimation() {
    serviceHeroTl = gsap.timeline();

    const splitServiceTag = new SplitText(".service_hero-tl-0", { type: "chars,words,lines" });
    const splitServiceHeroHeadline = new SplitText(".service_hero-tl-1", { type: "chars,words,lines" });
    const splitServiceHeroPara = new SplitText(".service_hero-tl-2", { type: "chars,words,lines" });
    const serviceLeftImages = ['.is-one', '.is-two', '.is-three'];
    const serviceRightImages = ['.is-four', '.is-five', '.is-six'];
    const serviceAllImages = [...serviceLeftImages, ...serviceRightImages];
    const serviceFloatTargets = [...serviceAllImages];

    serviceHeroTl.fromTo(".main-wrapper", { autoAlpha: 0 }, { autoAlpha: 1, ease: "linear" })
        .from(splitServiceTag.chars, {
            opacity: 0,
            x: 16,
            y: "30%",
            filter: "blur(10px)",
            stagger: 0.02,
        })
        .from(splitServiceHeroHeadline.chars, {
            opacity: 0,
            x: 16,
            y: "30%",
            filter: "blur(10px)",
            stagger: 0.03,
        }, "-=0.5")
        .from(splitServiceHeroPara.words, {
            opacity: 0,
            x: 16,
            y: "30%",
            filter: "blur(10px)",
            stagger: 0.03,
        }, "-=0.5")
        .fromTo(serviceLeftImages, {
            x: -200,
            y: -100,
            scale: 0.5,
            rotation: -45,
            opacity: 0,
        }, {
            x: 0,
            y: 0,
            scale: 1,
            rotation: 0,
            opacity: 1,
            duration: 1.5,
            ease: "power3.out",
            stagger: 0.2
        }, "<")
        .fromTo(serviceRightImages, {
            x: 200,
            y: -100,
            scale: 0.5,
            rotation: 45,
            opacity: 0,
        }, {
            x: 0,
            y: 0,
            scale: 1,
            rotation: 0,
            opacity: 1,
            duration: 1.5,
            ease: "power3.out",
            stagger: 0.2
        }, "-=1.3")
        .from(".scroll-down", {
            opacity: 0,
            duration: 1,
            ease: "power3.out",
        }, "-=1.3")
        .add(() => initServiceHeroFloatingEffect())
}

function initServiceHeroFloatingEffect() {
    const floatTargets = [
        { selector: '.is-one', xFactor: 20, yFactor: 10, rotFactor: 5 },
        { selector: '.is-two', xFactor: 15, yFactor: 20, rotFactor: -6 },
        { selector: '.is-three', xFactor: 25, yFactor: 15, rotFactor: 4 },
        { selector: '.is-four', xFactor: -20, yFactor: 18, rotFactor: -5 },
        { selector: '.is-five', xFactor: -15, yFactor: 10, rotFactor: 6 },
        { selector: '.is-six', xFactor: -25, yFactor: 15, rotFactor: -4 },
    ];

    const wrapper = document.querySelector(".section_service-hero");

    wrapper.addEventListener("mousemove", (e) => {
        const { clientX, clientY } = e;
        const { width, height, left, top } = wrapper.getBoundingClientRect();
        const x = (clientX - left - width / 2) / width;
        const y = (clientY - top - height / 2) / height;

        floatTargets.forEach(({ selector, xFactor, yFactor, rotFactor }) => {
            gsap.to(selector, {
                x: x * xFactor,
                y: y * yFactor,
                rotation: x * rotFactor,
                duration: 0.6,
                ease: "power2.out"
            });
        });
    });

    wrapper.addEventListener("mouseleave", () => {
        floatTargets.forEach(({ selector }) => {
            gsap.to(selector, {
                x: 0,
                y: 0,
                rotation: 0,
                duration: 0.8,
                ease: "power3.out"
            });
        });
    });
}

function destroyServiceHeroAnimation() {
    if (serviceHeroTl) serviceHeroTl.kill();
}
let thankHeroTl;

function initThankHeroAnimation() {
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
        }, "-=1.3")
}

function destroyThankHeroAnimation() {
    if (thankHeroTl) thankHeroTl.kill();
}
// Draw Brandemic SVG [START]
function animateSvgPaths() {
    const paths = document.querySelectorAll(".brandemic-logo-draw .brandemic_svg-path");

    paths.forEach((path) => {
        gsap.from(path, {
            duration: 2,
            drawSVG: 0,
            ease: "power1.inOut",
            scrollTrigger: {
                trigger: path,
                start: "top 50%",
            },
        });
    });
}
// Draw Brandemic SVG [END]
// Reset Webflow Data [START]
function resetWebflow(data) {
    let parser = new DOMParser();
    let dom = parser.parseFromString(data.next.html, "text/html");
    let webflowPageId = $(dom).find("html").attr("data-wf-page");
    $("html").attr("data-wf-page", webflowPageId);
    window.Webflow && window.Webflow.destroy();
    window.Webflow && window.Webflow.ready();
    window.Webflow && window.Webflow.require("ix2").init();
}
// Reset Webflow Data [END]
// Text Animation By Chars [START]
function initCharAnimations() {
    const animatedChars = document.querySelectorAll(".animated-chars");

    animatedChars.forEach((element) => {
        const splitChars = new SplitText(element, { type: "chars,words,lines" });

        gsap.from(splitChars.chars, {
            opacity: 0,
            x: 16,
            y: "30%",
            filter: "blur(10px)",
            stagger: 0.03,
            scrollTrigger: {
                trigger: element,
                start: "top 90%",
                toggleActions: "play none none none",
            }
        });
    });
}
// Text Animation By Chars [END]

// Text Animation By Words [START]
function initWordAnimations() {
    const animatedWords = document.querySelectorAll(".animated-words");

    animatedWords.forEach((element) => {
        const splitWords = new SplitText(element, { type: "chars,words,lines" });

        gsap.from(splitWords.words, {
            opacity: 0,
            x: 16,
            y: "30%",
            filter: "blur(10px)",
            stagger: 0.03,
            scrollTrigger: {
                trigger: element,
                start: "top 90%",
                toggleActions: "play none none none",
            }
        });
    });
}
// Text Animation By Words [END]

// Text Animation By Lines [START]
function initLineAnimations() {
    const animatedLines = document.querySelectorAll(".animated-lines");

    animatedLines.forEach((element) => {
        const splitLines = new SplitText(element, { type: "chars,words,lines" });

        gsap.from(splitLines.lines, {
            opacity: 0,
            y: "80%",
            filter: "blur(10px)",
            stagger: 0.1,
            scrollTrigger: {
                trigger: element,
                start: "top 90%",
                toggleActions: "play none none none",
            }
        });
    });
}
// Text Animation By Words [END]
function applyParallaxEffect() {
    smoother.effects(".parallax-image", { speed: "auto" });
}
function playVideo() {
    videoElement = document.querySelector('.showreel');
    if (videoElement) {
        videoElement.currentTime = 0;
        videoElement.play().catch(error => {
            console.error('Error playing video:', error);
        });
    }
}

function startVideo() {
    const isMobile = window.matchMedia("(max-width: 768px)").matches;

    const videoCursor = document.getElementById('videoCursor');
    const playPauseIcon = document.querySelector(".custom-video-cursor");
    const videoElement = document.querySelector('.showreel');

    const pageWrapper = !isMobile ? document.querySelector(".page-wrapper") : null;
    const originalContainer = !isMobile ? videoElement.parentElement : null;
    const originalCursorContainer = !isMobile ? videoCursor.parentElement : null;

    function enterFullscreen() {
        if (!isMobile && videoElement.classList.contains("fullscreen-video")) return;

        if (!isMobile) {
            const state = Flip.getState(videoElement);
            const cursorState = Flip.getState(playPauseIcon);

            pageWrapper.appendChild(videoElement);
            pageWrapper.appendChild(videoCursor);
            videoElement.classList.add("fullscreen-video");

            playPauseIcon.querySelector(".icon-play").style.display = "none";
            playPauseIcon.querySelector(".icon-close").style.display = "flex";
            videoCursor.classList.add("close");

            Flip.from(state, {
                duration: 0.5,
                ease: "power2.inOut",
                absolute: true
            });

            Flip.from(cursorState, {
                duration: 0.5,
                ease: "power2.inOut",
                absolute: true
            });

            document.body.classList.add("no-scroll");
            document.addEventListener("keydown", exitFullscreen);
        }

        if (isMobile) {
            videoCursor.classList.add("close");
        }

        videoElement.currentTime = 0;
        videoElement.muted = false;
        videoElement.play();

        videoCursor.addEventListener("click", exitFullscreen);
    }

    function exitFullscreen(event) {
        if (!isMobile && event.type === "keydown" && event.key !== "Escape") return;

        if (!isMobile) {
            const state = Flip.getState(videoElement);
            const cursorState = Flip.getState(playPauseIcon);

            videoElement.classList.remove("fullscreen-video");
            playPauseIcon.querySelector(".icon-play").style.display = "flex";
            playPauseIcon.querySelector(".icon-close").style.display = "none";
            videoCursor.classList.remove("close");

            originalContainer.appendChild(videoElement);
            originalCursorContainer.appendChild(videoCursor);

            Flip.from(state, {
                duration: 0.5,
                ease: "power2.inOut",
                absolute: true
            });

            Flip.from(cursorState, {
                duration: 0.5,
                ease: "power2.inOut",
                absolute: true
            });

            document.body.classList.remove("no-scroll");
            document.removeEventListener("keydown", exitFullscreen);
        }

        if (isMobile) {
            videoCursor.classList.remove("close");
        }

        videoElement.muted = true;
        videoCursor.removeEventListener("click", exitFullscreen);
    }

    // Attach the click listener **only once** to prevent duplicates
    videoCursor.removeEventListener("click", enterFullscreen);
    videoCursor.addEventListener("click", enterFullscreen);
}

function destroyStartVideo() {
    videoCursor.removeEventListener("click", exitFullscreen);
}
// Featured Work Seamless Loop Animation [START]
const featuredWorkLoopHandlers = new Map();

function featuredWorkLoop() {
    const wrapper = document.querySelector(".work_images-wrapper");
    let activeElement;
    const images = gsap.utils.toArray(".work_image");
    let dragLeaveTimeout;

    const loop = horizontalLoop(images, {
        draggable: true,
        inertia: false,
        repeat: -1,
        center: false,
        onChange: (element, index) => {
            activeElement && activeElement.classList.remove("active");
            element.classList.add("active");
            activeElement = element;
        },
    });

    images.forEach(image => {
        const mouseenter = () => gsap.to(loop, { timeScale: 0, ease: "power2.out", duration: 1, overwrite: true });
        const mouseleave = () => gsap.to(loop, { timeScale: 1, overwrite: true });

        image.addEventListener("mouseenter", mouseenter);
        image.addEventListener("mouseleave", mouseleave);

        featuredWorkLoopHandlers.set(image, { mouseenter, mouseleave });
    });
}

function destroyFeaturedWorkLoop() {
    featuredWorkLoopHandlers.forEach((handlers, image) => {
        image.removeEventListener("mouseenter", handlers.mouseenter);
        image.removeEventListener("mouseleave", handlers.mouseleave);
    });
    featuredWorkLoopHandlers.clear();
}
// Featured Work Seamless Loop Animation [END]

// Featured Work FLIP Animation [START]
function animateWorkImages() {
    const wrapper = document.querySelector(".work_images-wrapper");
    const images = document.querySelectorAll(".work_image");
    const firstImage = images[0];
    const secondImage = images[1];
    const title = document.querySelector(".our-work_title");
    const titleWrapper = document.querySelector(".our-work_title-wrapper")

    images.forEach((img, index) => {
        img.style.zIndex = images.length - index;
    });

    gsap.set(firstImage, { rotation: 6 });
    gsap.set(secondImage, { rotation: 3 });

    ScrollTrigger.create({
        trigger: ".our-work_block",
        start: "center 75%",
        once: true,
        onEnter: () => {
            const worksTl = gsap.timeline();

            worksTl.to(title, {
                y: "-100%",
                duration: 1,
                ease: "power1.out"
            })
                .to([firstImage, secondImage], {
                    rotation: 0,
                    duration: 1,
                    ease: "power1.out"
                }, "<")
                .set(title, { autoAlpha: 0 })
                .set(titleWrapper, { autoAlpha: 0 })
                .add(() => {
                    const state = Flip.getState(images);
                    wrapper.classList.add("flex-layout");

                    Flip.from(state, {
                        duration: 1,
                        ease: "power1.out",
                        stagger: 0.05,
                        onComplete: featuredWorkLoop
                    });
                });
        }
    });
}
// Featured Work FLIP Animation [END]
let serviceHoverCleanupFns = [];
function serviceHoverAnimation() {
    const elements = document.querySelectorAll(".services-element");

    elements.forEach((element) => {
        const serviceLine = element.querySelector(".service_line");
        const serviceDescription = element.querySelector(".service_description");
        const serviceImage = element.querySelector(".service_image");
        const serviceHeading = element.querySelector(".service_heading");
        const serviceNumber = element.querySelector(".service_number");

        const isMobile = window.matchMedia("(max-width: 768px)").matches;

        element.style.height = "auto";
        let expandedHeight = element.offsetHeight;
        element.style.height = isMobile ? "4.8rem" : "8.5rem";

        const floatImage = (event) => {
            const { clientX, clientY } = event;
            const { left, top, width, height } = element.getBoundingClientRect();

            let xMove = (clientX - (left + width / 2)) * 0.1;
            let yMove = (clientY - (top + height / 2)) * 0.1;

            gsap.to(serviceImage, { x: xMove, y: yMove, rotate: 12 + xMove * 0.1, duration: 0.3, ease: "power2.out" });
        };

        const onMouseEnter = () => {
            element.addEventListener("mousemove", floatImage);
            gsap.timeline({ defaults: { overwrite: true } })
                .to(element, { height: expandedHeight, backgroundColor: "#2C1387", duration: 0.5, ease: "power2.out" })
                .to(serviceHeading, { color: "#38C67F", duration: 0.5, ease: "power2.out" }, "<")
                .to(serviceNumber, { color: "#38C67F", duration: 0.5, ease: "power2.out" }, "<")
                .to(serviceImage, { opacity: 1, scale: 1, y: 0, rotate: 12, duration: 0.5, ease: "power2.out" }, "<")
                .to(serviceLine, { width: isMobile ? "70%" : "100%", duration: 0.5, ease: "power2.out" }, "<")
                .to(serviceDescription, { opacity: 1, duration: 0.5, ease: "power2.out" }, "-=0.1")
            if (!isMobile && window.location.pathname === "/") {
                gsap.timeline.call(() => ScrollTrigger && ScrollTrigger.refresh());
            }
        };

        const onMouseLeave = () => {
            gsap.timeline({ defaults: { overwrite: true } })
                .to(element, { height: isMobile ? '4.8rem' : '8.5rem', backgroundColor: "#5431D0", duration: 0.3, ease: "power2.out" })
                .to(serviceHeading, { color: "#FEFEFE", duration: 0.3, ease: "power2.out" }, "<")
                .to(serviceNumber, { color: "#FEFEFE", duration: 0.3, ease: "power2.out" }, "<")
                .to(serviceImage, { opacity: 0, scale: 0.8, y: -10, rotate: 0, duration: 0.3, ease: "power2.out" }, "<")
                .to(serviceLine, { width: "0%", duration: 0.3, ease: "power2.out" }, "<")
                .to(serviceDescription, { opacity: 0, duration: 0 }, "<")
                .call(() => {
                    element.removeEventListener("mousemove", floatImage);
                    gsap.to(serviceImage, { x: 0, y: -10, rotate: 0, duration: 0 });
                    if (!isMobile && window.location.pathname === "/") {
                        ScrollTrigger && ScrollTrigger.refresh();
                    }
                });
        };

        element.addEventListener("mouseenter", onMouseEnter);
        element.addEventListener("mouseleave", onMouseLeave);

        // Push cleanup function for this element
        serviceHoverCleanupFns.push(() => {
            element.removeEventListener("mouseenter", onMouseEnter);
            element.removeEventListener("mouseleave", onMouseLeave);
            element.removeEventListener("mousemove", floatImage);
        });
    });
}

function destroyServiceHoverAnimation() {
    serviceHoverCleanupFns.forEach((fn) => fn());
    serviceHoverCleanupFns = [];
}
let onVisionMouseMove;
let onVisionMouseLeave;
let visionTl; // Store the timeline globally to kill it later if needed

function visionSectionAnimation() {
    const visionSection = document.querySelector(".section_our-vision");
    const visionPara = visionSection.querySelector(".our-vision_content-wrapper p");
    const visionButton = visionSection.querySelector(".our-vision_content-wrapper .button");
    const visionImages = document.querySelectorAll(".our-vision_image");
    const visionLines = new SplitText(visionPara, { type: "lines" });

    visionTl = gsap.timeline({
        scrollTrigger: {
            trigger: visionSection,
            start: "top 70%",
            toggleActions: "play none none none",
        },
    });

    visionTl
        .from(visionLines.lines, {
            opacity: 0,
            y: "80%",
            filter: "blur(10px)",
            stagger: 0.1,
        })
        .from(visionImages, {
            opacity: 0,
            filter: "blur(10px)",
            stagger: 0.2,
        }, "-=0.2")
        .from(visionButton, {
            opacity: 0,
            y: "40%",
            filter: "blur(10px)",
        }, "-=0.2")
        .call(enableFloatingEffect);

    function enableFloatingEffect() {
        onVisionMouseMove = function (e) {
            const { clientX: x, clientY: y } = e;
            visionImages.forEach((image, index) => {
                const movementX = (x / window.innerWidth - 0.5) * (20 + index * 5);
                const movementY = (y / window.innerHeight - 0.5) * (20 + index * 5);
                gsap.to(image, {
                    x: movementX,
                    y: movementY,
                    duration: 0.5,
                    ease: "power2.out",
                });
            });
        };

        onVisionMouseLeave = function () {
            gsap.to(visionImages, {
                x: 0,
                y: 0,
                duration: 0.5,
                ease: "power2.out",
            });
        };

        visionSection.addEventListener("mousemove", onVisionMouseMove);
        visionSection.addEventListener("mouseleave", onVisionMouseLeave);
    }
}

function destroyVisionSectionAnimation() {
    const visionSection = document.querySelector(".section_our-vision");

    if (!visionSection) return;

    if (onVisionMouseMove) {
        visionSection.removeEventListener("mousemove", onVisionMouseMove);
    }
    if (onVisionMouseLeave) {
        visionSection.removeEventListener("mouseleave", onVisionMouseLeave);
    }

    if (visionTl) {
        visionTl.kill();
        visionTl = null;
    }
}
let toolsSwiperInstance;
let testimonialsSwiperInstance;

function initToolsSwiperScripts() {
    toolsSwiperInstance = new Swiper('.is-tools', {
        effect: "coverflow",
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: "auto",
        loop: true,
        autoplay: {
            delay: 2500,
            disableOnInteraction: false,
        },
        coverflowEffect: {
            rotate: 50,
            stretch: 50,
            depth: 100,
            modifier: 1,
            slideShadows: true,
        },
    });
}

function initTestimonialsSwiperScripts() {
    testimonialsSwiperInstance = new Swiper('.is-testimonials', {
        slidesPerView: 1,
        direction: 'horizontal',
        centeredSlides: true,
        spaceBetween: 30,
        loop: true,
        autoplay: {
            delay: 2500,
            disableOnInteraction: false,
        },
        effect: "creative",
        creativeEffect: {
            prev: {
                shadow: true,
                translate: [0, 0, -400],
            },
            next: {
                translate: ["100%", 0, 0],
            },
        },
        navigation: {
            nextEl: '.testimonials-next',
            prevEl: '.testimonials-prev',
        },
    });
}

function destroyToolsSwiperScripts() {
    if (toolsSwiperInstance && toolsSwiperInstance.destroy) {
        toolsSwiperInstance.destroy(true, true);
        toolsSwiperInstance = null;
    }
}

function destroyTestimonialsSwiperScripts() {
    if (testimonialsSwiperInstance && testimonialsSwiperInstance.destroy) {
        testimonialsSwiperInstance.destroy(true, true);
        testimonialsSwiperInstance = null;
    }
}
function animateScrollingText() {
    const scrollTextWrapper = document.querySelector(".scroll_text-wrapper");
    const textWidth = scrollTextWrapper.scrollWidth;

    gsap.to(scrollTextWrapper, {
        x: -textWidth + window.innerWidth,
        ease: "none",
        scrollTrigger: {
            trigger: scrollTextWrapper,
            start: "top bottom",
            end: "bottom top",
            scrub: true
        }
    });
}
function animateCTA() {
    const ctaWrapper = document.querySelector(".cta_text-wrapper");
    if (!ctaWrapper) return;

    const isMobile = window.innerWidth <= 768;

    const allParagraphs = Array.from(ctaWrapper.querySelectorAll(".cta_paragraph"));
    const visibleParagraphs = allParagraphs.filter(p => {
        if (isMobile && p.classList.contains("desktop-hidden")) return true;
        if (!isMobile && p.classList.contains("mobile-hidden")) return true;
        if (p.classList.contains("desktop-hidden") || p.classList.contains("mobile-hidden")) return false;
        return true;
    });

    // Apply SplitText once
    const splitCtaChars = new SplitText(visibleParagraphs, { type: "chars" });
    const ctaChars = splitCtaChars.chars; // All characters
    const paragraphs = splitCtaChars.elements; // Paragraph elements

    // Select images
    const images = [
        ctaWrapper.querySelector(".cta_span-image.is-one"),
        ctaWrapper.querySelector(".cta_span-image.is-two")
    ];

    // Timeline with ScrollTrigger
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: ctaWrapper,
            start: "top 70%",
            toggleActions: "play none none none",
        }
    });

    // Define animation sequence
    const sequence = [
        { textIndex: 0, imageIndex: 0 }, // First text → First image
        { textIndex: 1 }, // Second text
        { textIndex: 2 }, // Third text
        { imageIndex: 1 }, // Second image
        { textIndex: 3 }, // Fourth text
        { textIndex: 4 },  // Fifth text
        { textIndex: 5 }, // Sixth text
    ];

    sequence.forEach(({ textIndex, imageIndex }, i) => {
        if (textIndex !== undefined && paragraphs[textIndex]) {
            tl.from(ctaChars.filter(char => char.parentElement === paragraphs[textIndex]), {
                opacity: 0,
                x: 16,
                y: "30%",
                filter: "blur(10px)",
                stagger: 0.02,
            }, i === 0 ? "+=0" : "-=0.4");
        }

        if (imageIndex !== undefined && images[imageIndex]) {
            tl.fromTo(images[imageIndex],
                { clipPath: "inset(0 100% 0 0)" },
                { clipPath: "inset(0 0% 0 0)", duration: 0.6, ease: "power2.out" },
                "-=0.4"
            );
        }
    });
}
function loadFeedSpring() {
    let script = document.createElement("script");
    script.src = "https://scripts.feedspring.com/instagram-attrs.js";
    script.async = true;
    script.defer = true;

    // Remove existing script if present
    let oldScript = document.querySelector('script[src="https://scripts.feedspring.com/instagram-attrs.js"]');
    if (oldScript) oldScript.remove();

    document.head.appendChild(script);
}
function animateMilestones() {
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
function scrollPinObserver() {
    const isMobile = window.matchMedia("(max-width: 768px)").matches;

    if (!isMobile) {
        let headings = gsap.utils.toArray(".process_heading"),
            descriptions = gsap.utils.toArray(".process_description"),
            images = gsap.utils.toArray(".process_image"),
            splitHeadings = headings.map(heading =>
                new SplitText(heading, { type: "chars,words,lines", linesClass: "clip-text" })
            ),
            splitDescriptions = descriptions.map(desc =>
                new SplitText(desc, { type: "lines, words", linesClass: "clip-line" })
            ),
            currentIndex = 0,
            animating;

        splitHeadings.forEach((split, i) => {
            gsap.set(split.chars, {
                autoAlpha: i === 0 ? 1 : 0,
                yPercent: i === 0 ? 0 : 150
            });
        });

        splitDescriptions.forEach((split, i) => {
            gsap.set(split.words, {
                autoAlpha: i === 0 ? 1 : 0,
                yPercent: i === 0 ? 0 : 100
            });
        });

        images.forEach((img, i) => {
            gsap.set(img, {
                autoAlpha: i === 0 ? 1 : 0,
            });
        });

        function gotoSection(index, direction) {
            if (index < 0 || index >= headings.length) {
                intentObserver.disable();
                return;
            }

            animating = true;
            let fromTop = direction === -1,
                dFactor = fromTop ? -1 : 1,
                tl = gsap.timeline({
                    defaults: { duration: 1.25, ease: "power1.inOut" },
                    onComplete: () => animating = false
                });

            let currentHeadingSplit = splitHeadings[currentIndex];
            let nextHeadingSplit = splitHeadings[index];

            let currentDescSplit = splitDescriptions[currentIndex];
            let nextDescSplit = splitDescriptions[index];

            let currentImage = images[currentIndex];
            let nextImage = images[index];

            // Heading animation
            tl.to(currentHeadingSplit.chars, {
                autoAlpha: 0,
                yPercent: -150 * dFactor,
                duration: 1,
                ease: "power2",
                stagger: 0.01
            }, 0);

            tl.fromTo(nextHeadingSplit.chars, {
                autoAlpha: 0,
                yPercent: 150 * dFactor
            }, {
                autoAlpha: 1,
                yPercent: 0,
                duration: 1,
                ease: "power2",
                stagger: 0.02
            }, 0.2);

            // Description animation
            tl.to(currentDescSplit.words, {
                autoAlpha: 0,
                yPercent: -100 * dFactor,
                duration: 0.8,
                ease: "power2",
                stagger: 0.01
            }, 0);

            tl.fromTo(nextDescSplit.words, {
                autoAlpha: 0,
                yPercent: 100 * dFactor
            }, {
                autoAlpha: 1,
                yPercent: 0,
                duration: 0.8,
                ease: "power2",
                stagger: 0.01
            }, 0.25);

            // Images animation
            tl.to(currentImage, {
                autoAlpha: 0,
                //yPercent: -100 * dFactor,
                duration: 1,
                ease: "power2.inOut"
            }, 0);

            tl.fromTo(nextImage, {
                autoAlpha: 0,
                //yPercent: 100 * dFactor,
            }, {
                autoAlpha: 1,
                //yPercent: 0,
                duration: 1,
                ease: "power2.out"
            }, 0.3);

            currentIndex = index;
        }

        let intentObserver = Observer.create({
            type: "wheel,touch,pointer",
            wheelSpeed: -1,
            onDown: () => !animating && gotoSection(currentIndex - 1, -1),
            onUp: () => !animating && gotoSection(currentIndex + 1, 1),
            tolerance: 10,
            preventDefault: true,
            onEnable(self) {
                ScrollTrigger.normalizeScroll(false);
            },
            onDisable(self) {
                ScrollTrigger.normalizeScroll(true); // Observer works well on normalizeScroll()
            }
        });
        intentObserver.disable();

        ScrollTrigger.create({
            trigger: ".section_process-desktop",
            pin: true,
            start: "top top",
            end: "+=10",
            onEnter: (self) => {
                if (intentObserver.isEnabled) { return }
                self.scroll(self.start + 1); // Force ScrollTrigger activation by moving 1px into the trigger zone
                intentObserver.enable();
            },
            onEnterBack: (self) => {
                if (intentObserver.isEnabled) { return }
                self.scroll(self.end - 1);
                intentObserver.enable();
            },
        });
    }
}

function destroyScrollPinObserver() {
    Observer.getAll().forEach(observer => {
        observer.kill();
    });
}
let processSwiperInstance;

function initProcessSwiper() {
    const isMobile = window.matchMedia("(max-width: 768px)").matches;

    if (isMobile) {
        processSwiperInstance = new Swiper('.is-process', {
            slidesPerView: 1,
            direction: 'horizontal',
            spaceBetween: 30,
            navigation: {
                nextEl: '.process-next',
                prevEl: '.process-prev',
            },
        });
    }
}

function destroyProcessSwiper() {
    if (processSwiperInstance && processSwiperInstance.destroy) {
        processSwiperInstance.destroy(true, true); // remove DOM listeners, styles
        processSwiperInstance = null;
    }
}
let aboutTickerLoops = [];

function aboutTicker() {
    const elements = [
        { selector: ".brand_logo", reversed: false },
        { selector: ".team_ticker-wrapper.is-one .team_card", reversed: false },
        { selector: ".team_ticker-wrapper.is-two .team_card", reversed: true },
        { selector: ".culture_image", reversed: false }
    ];

    aboutTickerLoops = elements.map(({ selector, reversed }) => {
        const items = gsap.utils.toArray(selector);
        const loop = horizontalLoop(items, {
            draggable: false,
            inertia: false,
            repeat: -1,
            center: false,
            reversed
        });

        return loop;
    });
}

function destroyAboutTicker() {
    aboutTickerLoops.forEach(loop => {
        if (loop && typeof loop.kill === 'function') {
            loop.kill();
        }
    });

    aboutTickerLoops = [];
}
let awardsAccordionListeners = [];

function awardsAccordion() {
    const isMobile = window.matchMedia("(max-width: 768px)").matches;

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
                if (typeof ScrollTrigger !== "undefined" && !isMobile) {
                    ScrollTrigger.refresh();
                }
            }
        };

        acc[i].addEventListener("click", handler);
        awardsAccordionListeners.push({ el: acc[i], handler });
    }
}

function destroyAwardsAccordion() {
    awardsAccordionListeners.forEach(({ el, handler }) => {
        el.removeEventListener("click", handler);
    });
    awardsAccordionListeners = [];
}


function accordionLineAnimation() {
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
let filterPortfolioCleanupFns = [];

function initFilterPortfolio() {
    const filters = gsap.utils.toArray('.filter');
    const items = gsap.utils.toArray('.portfolio-item');

    const getActiveCategories = () => {
        return filters
            .filter(filter => filter.classList.contains('active'))
            .map(filter => filter.id);
    };

    const filterItems = () => {
        const isMobile = window.matchMedia("(max-width: 768px)").matches;
        const activeCategories = getActiveCategories();
        const state = Flip.getState(items);

        items.forEach(item => {
            const categoryElements = item.querySelectorAll('.category');
            const itemCategories = Array.from(categoryElements).map(el => el.textContent.trim().toLowerCase());

            const matches = activeCategories.some(cat => itemCategories.includes(cat));
            const shouldShow = activeCategories.length === 0 || activeCategories.length === filters.length || matches;

            item.style.display = shouldShow ? 'block' : 'none';
        });

        Flip.from(state, {
            duration: 0.7,
            scale: true,
            ease: "power1.inOut",
            stagger: 0.08,
            absoluteOnLeave: true,
            onEnter: elements => gsap.fromTo(elements, { opacity: 0, scale: 0 }, { opacity: 1, scale: 1, duration: 1 }),
            onLeave: elements => gsap.to(elements, { opacity: 0, scale: 0, duration: 1 })
        });

        if (!isMobile) {
            ScrollTrigger.refresh();
        }
    };

    filters.forEach(filter => {
        const handleFilterClick = () => {
            filter.classList.toggle('active');
            filterItems();
        };

        filter.addEventListener('click', handleFilterClick);
        filterPortfolioCleanupFns.push(() => filter.removeEventListener('click', handleFilterClick));
    });

    // Initial display: all items shown, filters inactive
    filters.forEach(filter => filter.classList.remove('active'));
    filterItems();
}

function destroyFilterPortfolio() {
    filterPortfolioCleanupFns.forEach(fn => fn());
    filterPortfolioCleanupFns = [];
}
let caseStudyTickerLoop;

function caseStudyTicker() {
    const wrapper = document.querySelector(".case_studies-ticker-element");
    const wrapperContent = gsap.utils.toArray(".case_study-ticker-image");

    caseStudyTickerLoop = horizontalLoop(wrapperContent, {
        draggable: false,
        inertia: false,
        repeat: -1,
        center: false,
    });
}

let livXTickerLoop;

function livXTicker() {
    const livxTexts = document.querySelector(".is-livx-texts");
    if (!livxTexts) return;

    const livxText = gsap.utils.toArray(".livx_ticker-text");

    livXTickerLoop = horizontalLoop(livxText, {
        draggable: false,
        inertia: false,
        repeat: -1,
        center: false,
    });
}

function destroyTickers() {
    if (caseStudyTickerLoop && caseStudyTickerLoop.kill) {
        caseStudyTickerLoop.kill();
        caseStudyTickerLoop = null;
    }

    if (livXTickerLoop && livXTickerLoop.kill) {
        livXTickerLoop.kill();
        livXTickerLoop = null;
    }
}
function startScrollDownAnimation() {
    gsap.set(".scroll-down-wrapper", { y: 0 });

    gsap.to(".scroll-down-wrapper", {
        y: 120,
        duration: 1.5,
        ease: "none",
        repeat: -1,
        onRepeat: () => gsap.set(".scroll-down-wrapper", { y: 0 })
    });
}
let featuredSwiperInstance;

function initFeaturedSwiper() {
    featuredSwiperInstance = new Swiper('.is-featured-swiper', {
        slidesPerView: 1,
        direction: 'horizontal',
        spaceBetween: 20,
        loop: true,
        navigation: {
            nextEl: '.featured-next',
            prevEl: '.featured-prev',
        },
        breakpoints: {
            640: {
                slidesPerView: 2,
                spaceBetween: 38,
            }
        }
    });
}

function destroyFeaturedSwiper() {
    if (featuredSwiperInstance && featuredSwiperInstance.destroy) {
        featuredSwiperInstance.destroy(true, true); // remove DOM listeners, styles
        featuredSwiperInstance = null;
        console.log("ran");
    }
}
let processTl;

function serviceProcessScroll() {
    const isMobile = window.matchMedia("(max-width: 768px)").matches;

    if (!isMobile) {
        let processWrapper = document.querySelector(".service_process-contents");
        processTl = gsap.timeline({
            scrollTrigger: {
                trigger: ".section-service-process",
                start: "center center",
                end: "+=1500",
                scrub: true,
                pin: true,
                anticipatePin: 1
            },
            defaults: { ease: "none" }
        });

        processTl.fromTo(processWrapper, { x: 0 }, { x: -(processWrapper.offsetWidth - 1248) });
    }
}

function destroyServiceProcessScroll() {
    if (processTl) {
        processTl.kill();
        processTl = null;
    }
}

function footerLimitless() {
    const thinkLimitless = document.querySelector(".think-limitless");

    const splitLimitless = new SplitText(thinkLimitless, { type: "chars" });

    gsap.from(splitLimitless.chars, {
        y: "100%",
        stagger: 0.1,
        scrollTrigger: {
            trigger: thinkLimitless,
            start: "top 90%",
            toggleActions: "play none none none",
        }
    });
}
function copyYear() {
    var yearSpan = document.querySelector('.copy_year');
    var currentYear = new Date().getFullYear();
    yearSpan.textContent = currentYear;
}
// Home Scripts [START]
function initHomeAnimations() {
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

function destroyHomeAnimations() {
    destroyHomeHeroAnimation();
    destroyStartVideo();
    destroyFeaturedWorkLoop();
    destroyServiceHoverAnimation();
    destroyVisionSectionAnimation();
    destroyToolsSwiperScripts();
    destroyTestimonialsSwiperScripts();
}
// Home Scripts [END]

// About Scripts [START]
function initAboutAnimations() {
    initHPIHeroAnimation();
    animateMilestones();
    scrollPinObserver();
    aboutTicker();
    awardsAccordion();
    accordionLineAnimation();
    initCharAnimations();
    initLineAnimations();
    applyParallaxEffect();
    animateSvgPaths();
    initProcessSwiper();
}

function destroyAboutAnimations() {
    destroyHPIHeroAnimation();
    destroyScrollPinObserver();
    destroyProcessSwiper();
    destroyAboutTicker();
    destroyAwardsAccordion();
}
// About Scripts [END]

// Portfolio Scripts [START]
function initPortfolioAnimations() {
    initHPIHeroAnimation();
    initCharAnimations();
    animateScrollingText();
    visionSectionAnimation();
    applyParallaxEffect();
    animateSvgPaths();
    initFilterPortfolio();
    animateCTA();
}

function destroyPortfolioAnimations() {
    destroyHPIHeroAnimation();
    destroyVisionSectionAnimation();
    destroyFilterPortfolio();
}
// Portfolio Scripts [END]

// Contact Scripts [START] 
function initContactAnimations() {
    initCharAnimations();
    initContactHeroAnimation();
}

function destroyContactAnimations() {
    destroyContactHeroAnimation();
}
// Contact Scripts [END]

// Case Study Scripts [START]
function initCaseStudyAnimations() {
    initHPIHeroAnimation();
    applyParallaxEffect();
    initCharAnimations();
    initLineAnimations();
    caseStudyTicker();
    featuredWorkLoop();
    animateCTA();
    animateGalleryImages();

    // LivX
    livXTicker();
}

function destroyCaseStudyAnimations() {
    destroyHPIHeroAnimation();
    destroyTickers();
}
// Case Study Scripts [END]

// Service Scripts [START]
function initServiceAnimations() {
    initServiceHeroAnimation();
    startScrollDownAnimation();
    initCharAnimations();
    animateSvgPaths();
    initFeaturedSwiper();
    serviceProcessScroll();
    serviceHoverAnimation();
    initTestimonialsSwiperScripts();
}

function destroyServiceAnimations() {
    destroyServiceHeroAnimation();
    destroyFeaturedSwiper();
    destroyServiceProcessScroll();
    destroyServiceHoverAnimation();
    destroyTestimonialsSwiperScripts();
}
// Service Scripts [END]

// Thank You Scripts [START]
function initThankAnimations() {
    initThankHeroAnimation();
}

function destroyThankAnimations() {
    destroyThankHeroAnimation();
}
// Thank You Scripts [END]

function getHeroAnimationFunction(namespace) {
    switch (namespace) {
        case 'home':
            return initHomeAnimations;
        case 'about':
            return initAboutAnimations;
        case 'portfolio':
            return initPortfolioAnimations;
        case 'contact':
            return initContactAnimations;
        case 'case-study':
            return initCaseStudyAnimations;
        case 'service':
            return initServiceAnimations;
        case 'thanks':
            return initThankAnimations;
        default:
            return () => { }; // Fallback to no-op if no specific animation
    }
}
function initBarba() {
    barba.init({
        sync: true,
        transitions: [{
            async leave(data) {
                const done = this.async();
                if (isOpen) {
                    closeMenuTimeline.restart();
                    document.body.classList.remove("no-scroll");
                    isOpen = false;
                }
                gsap.to(data.current.container, {
                    opacity: 0,
                    filter: "blur(10px)",
                    duration: 0.5,
                });
                // const loaderTl = triggerPageLoaderAnimation(lastMousePosition.x, lastMousePosition.y);
                // gsap.set(data.next.container, { position: "fixed", inset: "0", zIndex: "-1" });
                await delay(500);
                data.current.container.remove();
                done();
            },
            async beforeEnter(data) {
                resetWebflow(data);
                const isMobile = window.matchMedia("(max-width: 768px)").matches;

                if (!isMobile) {
                    let isHovering = [...document.querySelectorAll(".link-hover-ix, a")].some(
                        (el) => el.matches(":hover")
                    );

                    if (!isHovering) {
                        scaleAnim.reverse();
                    }

                    mouseHover();
                }

                smoother = ScrollSmoother.get();
                smoother.scrollTo(0);
                smoother.kill();
                smoother = ScrollSmoother.create({
                    smooth: 1,
                    effects: true,
                    smoothTouch: 0,
                });

                ScrollTrigger.normalizeScroll(false);

                let triggers = ScrollTrigger.getAll();
                triggers.forEach(trigger => {
                    trigger.kill();
                });

                footerLimitless();
                copyYear();

                if (!isMobile) {
                    document.querySelectorAll("img").forEach(img => {
                        if (img.complete) {
                            ScrollTrigger.refresh();
                        } else {
                            img.addEventListener('load', imgLoaded => ScrollTrigger.refresh());
                        }
                    });

                    document.addEventListener('lazyloaded', function (e) {
                        ScrollTrigger.refresh();
                    });
                }
            },
            async enter(data) {
                // gsap.set(data.next.container, {clearProps: 'all'});
                // endPageLoaderAnimation();			
                gsap.from(data.next.container, {
                    opacity: 0,
                    filter: "blur(10px)",
                    duration: 0.5,
                });

            },
        }],
        views: [{
            namespace: 'home',
            afterEnter(data) {
                initHomeAnimations();
            },
            beforeLeave(data) {
                destroyHomeAnimations();
            },
        }, {
            namespace: 'about',
            afterEnter(data) {
                initAboutAnimations();
            },
            beforeLeave(data) {
                destroyAboutAnimations();
            },
        }, {
            namespace: 'portfolio',
            afterEnter(data) {
                initPortfolioAnimations();
            },
            beforeLeave(data) {
                destroyPortfolioAnimations();
            },
        }, {
            namespace: 'contact',
            afterEnter(data) {
                initContactAnimations();
            },
            beforeLeave(data) {
                destroyContactAnimations();
            },
        }, {
            namespace: 'case-study',
            afterEnter(data) {
                initCaseStudyAnimations();
            },
            beforeLeave(data) {
                destroyCaseStudyAnimations();
            },
        }, {
            namespace: 'service',
            afterEnter(data) {
                initServiceAnimations();
            },
            beforeLeave(data) {
                destroyServiceAnimations();
            },
        }, {
            namespace: 'thanks',
            afterEnter(data) {
                initThankAnimations();
            },
            beforeLeave(data) {
                destroyThankAnimations();
            },
        }]
    });
}