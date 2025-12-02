/**
 * Brandemic Dubai - Custom Animations
 * Version: 1.0.0
 * Built: 2025-12-01T12:37:27.154Z
 * 
 * This file is auto-generated from modular source code.
 * Do not edit directly - edit the source files in /src instead.
 */
(function () {
    'use strict';

    /**
     * GSAP Configuration - Register all GSAP plugins
     */

    // Note: gsap and plugins are loaded via CDN in Webflow
    // This function registers all the plugins we use
    function registerGSAPPlugins() {
        gsap.registerPlugin(
            ScrollTrigger,
            ScrollSmoother,
            DrawSVGPlugin,
            SplitText,
            Draggable,
            Flip,
            Observer
        );
    }

    /**
     * Smooth Scroll - ScrollSmoother initialization
     */

    // Global smoother instance
    let smoother = null;

    /**
     * Initialize ScrollSmoother
     */
    function initSmoothScroller() {
        smoother = ScrollSmoother.create({
            wrapper: '#smooth-wrapper',
            content: '#smooth-content',
            smooth: 1,
            effects: true,
            smoothTouch: 0,
        });
    }

    /**
     * Get the current smoother instance
     * @returns {ScrollSmoother}
     */
    function getSmoother() {
        return smoother;
    }

    /**
     * Recreate smoother instance (used in Barba transitions)
     */
    function recreateSmoother() {
        smoother = ScrollSmoother.get();
        smoother.scrollTo(0);
        smoother.kill();
        smoother = ScrollSmoother.create({
            smooth: 1,
            effects: true,
            smoothTouch: 0,
        });
        return smoother;
    }

    /**
     * Delay utility - returns a promise that resolves after n milliseconds
     * @param {number} n - Delay in milliseconds (default: 2000)
     * @returns {Promise}
     */
    function delay(n) {
        n = n || 2000;

        return new Promise(done => {
            setTimeout(() => {
                done();
            }, n);
        });
    }

    /**
     * Check if the current device is mobile based on viewport width
     * @returns {boolean}
     */
    function isMobile() {
        return window.matchMedia("(max-width: 768px)").matches;
    }

    /**
     * Webflow Reset - Reinitialize Webflow after Barba page transitions
     */

    /**
     * Reset Webflow interactions after page transition
     * @param {Object} data - Barba transition data
     */
    function resetWebflow(data) {
        let parser = new DOMParser();
        let dom = parser.parseFromString(data.next.html, "text/html");
        let webflowPageId = $(dom).find("html").attr("data-wf-page");
        $("html").attr("data-wf-page", webflowPageId);
        window.Webflow && window.Webflow.destroy();
        window.Webflow && window.Webflow.ready();
        window.Webflow && window.Webflow.require("ix2").init();
    }

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
    function customCursorInit() {
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
    function mouseHover() {
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
    function getScaleAnim() {
        return scaleAnim;
    }

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

    /**
     * Get menu state
     * @returns {boolean}
     */
    function getIsOpen() {
        return isOpen;
    }

    /**
     * Set menu state
     * @param {boolean} state 
     */
    function setIsOpen(state) {
        isOpen = state;
    }

    /**
     * Get close menu timeline
     * @returns {gsap.core.Timeline}
     */
    function getCloseMenuTimeline() {
        return closeMenuTimeline;
    }

    /**
     * Footer Animations - Footer text animation and copyright year
     */

    /**
     * Animate "Think Limitless" text in footer
     */
    function footerLimitless() {
        const thinkLimitless = document.querySelector(".think-limitless");
        if (!thinkLimitless) return;

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

    /**
     * Set current year in copyright
     */
    function copyYear() {
        const yearSpan = document.querySelector('.copy_year');
        if (yearSpan) {
            const currentYear = new Date().getFullYear();
            yearSpan.textContent = currentYear;
        }
    }

    /**
     * Home Hero Animation - Main homepage hero with cycling words
     */

    let homeHeroTl = null;
    let heroCycleCall = null;

    /**
     * Initialize home hero animation
     */
    function initHomeHeroAnimation() {
        const homeHeroChars = document.querySelector(".hero_anim-chars");
        if (!homeHeroChars) return;

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

    /**
     * Cycle through hero heading words
     */
    function cycleHeroHeadingWords() {
        const words = [
            "Strategy", "Packaging", "Naming", "Branding", "Storytelling",
            "Experiences", "Partnerships", "Growth", "Impact", "Design"
        ];

        const headingWords = document.querySelector("#heading_keywords");
        if (!headingWords) return;

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

    /**
     * Destroy home hero animation
     */
    function destroyHomeHeroAnimation() {
        if (homeHeroTl) homeHeroTl.kill();
        if (heroCycleCall) heroCycleCall.kill();
    }

    /**
     * Character Animations - Text reveal by characters
     */

    /**
     * Initialize character-based text animations
     */
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

    /**
     * Word Animations - Text reveal by words
     */

    /**
     * Initialize word-based text animations
     */
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

    /**
     * Line Animations - Text reveal by lines
     */

    /**
     * Initialize line-based text animations
     */
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

    /**
     * Video Player - Showreel video playback and fullscreen
     */


    /**
     * Play showreel video
     */
    function playVideo() {
        const videoElement = document.querySelector('.showreel');
        if (videoElement) {
            videoElement.currentTime = 0;
            videoElement.play().catch(error => {
                console.error('Error playing video:', error);
            });
        }
    }

    /**
     * Initialize video with fullscreen capability
     */
    function startVideo() {
        const mobile = isMobile();

        const videoCursor = document.getElementById('videoCursor');
        const playPauseIcon = document.querySelector(".custom-video-cursor");
        const videoElement = document.querySelector('.showreel');

        if (!videoCursor || !videoElement) return;

        const pageWrapper = !mobile ? document.querySelector(".page-wrapper") : null;
        const originalContainer = !mobile ? videoElement.parentElement : null;
        const originalCursorContainer = !mobile ? videoCursor.parentElement : null;

        function enterFullscreen() {
            if (!mobile && videoElement.classList.contains("fullscreen-video")) return;

            if (!mobile) {
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

            if (mobile) {
                videoCursor.classList.add("close");
            }

            videoElement.currentTime = 0;
            videoElement.muted = false;
            videoElement.play();

            videoCursor.addEventListener("click", exitFullscreen);
        }

        function exitFullscreen(event) {
            if (!mobile && event.type === "keydown" && event.key !== "Escape") return;

            if (!mobile) {
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

            if (mobile) {
                videoCursor.classList.remove("close");
            }

            videoElement.muted = true;
            videoCursor.removeEventListener("click", exitFullscreen);
        }

        // Attach the click listener **only once** to prevent duplicates
        videoCursor.removeEventListener("click", enterFullscreen);
        videoCursor.addEventListener("click", enterFullscreen);
    }

    /**
     * Cleanup video listeners
     */
    function destroyStartVideo() {
        document.getElementById('videoCursor');
    }

    /**
     * Horizontal Loop - GSAP Helper Function
     * 
     * Creates an infinitely looping horizontal animation
     * Source: GSAP ScrollTrigger demos
     * https://gsap.com/docs/v3/HelperFunctions/helpers/seamlessLoop
     */

    /**
     * Creates a horizontal loop animation
     * @param {Array} items - Array of elements to animate
     * @param {Object} config - Configuration options
     * @returns {gsap.core.Timeline}
     */
    function horizontalLoop(items, config) {
        items = gsap.utils.toArray(items);
        config = config || {};
        
        let tl = gsap.timeline({
            repeat: config.repeat,
            paused: config.paused,
            defaults: { ease: "none" },
            onReverseComplete: () => tl.totalTime(tl.rawTime() + tl.duration() * 100)
        }),
            length = items.length,
            startX = items[0].offsetLeft,
            times = [],
            widths = [],
            xPercents = [],
            curIndex = 0,
            pixelsPerSecond = (config.speed || 1) * 100,
            snap = config.snap === false ? v => v : gsap.utils.snap(config.snap || 1),
            totalWidth, curX, distanceToStart, distanceToLoop, item, i;

        gsap.set(items, {
            xPercent: (i, el) => {
                let w = widths[i] = parseFloat(gsap.getProperty(el, "width", "px"));
                xPercents[i] = snap(parseFloat(gsap.getProperty(el, "x", "px")) / w * 100 + gsap.getProperty(el, "xPercent"));
                return xPercents[i];
            }
        });

        gsap.set(items, { x: 0 });

        totalWidth = items[length - 1].offsetLeft + xPercents[length - 1] / 100 * widths[length - 1] - startX + items[length - 1].offsetWidth * gsap.getProperty(items[length - 1], "scaleX") + (parseFloat(config.paddingRight) || 0);

        for (i = 0; i < length; i++) {
            item = items[i];
            curX = xPercents[i] / 100 * widths[i];
            distanceToStart = item.offsetLeft + curX - startX;
            distanceToLoop = distanceToStart + widths[i] * gsap.getProperty(item, "scaleX");

            tl.to(item, {
                xPercent: snap((curX - distanceToLoop) / widths[i] * 100),
                duration: distanceToLoop / pixelsPerSecond
            }, 0)
                .fromTo(item, {
                    xPercent: snap((curX - distanceToLoop + totalWidth) / widths[i] * 100)
                }, {
                    xPercent: xPercents[i],
                    duration: (curX - distanceToLoop + totalWidth - curX) / pixelsPerSecond,
                    immediateRender: false
                }, distanceToLoop / pixelsPerSecond)
                .add("label" + i, distanceToStart / pixelsPerSecond);

            times[i] = distanceToStart / pixelsPerSecond;
        }

        function toIndex(index, vars) {
            vars = vars || {};
            (Math.abs(index - curIndex) > length / 2) && (index += index > curIndex ? -length : length);
            let newIndex = gsap.utils.wrap(0, length, index),
                time = times[newIndex];
            if (time > tl.time() !== index > curIndex) {
                vars.modifiers = { time: gsap.utils.wrap(0, tl.duration()) };
                time += tl.duration() * (index > curIndex ? 1 : -1);
            }
            curIndex = newIndex;
            vars.overwrite = true;
            return tl.tweenTo(time, vars);
        }

        tl.next = vars => toIndex(curIndex + 1, vars);
        tl.previous = vars => toIndex(curIndex - 1, vars);
        tl.current = () => curIndex;
        tl.toIndex = (index, vars) => toIndex(index, vars);
        tl.times = times;

        tl.progress(1, true).progress(0, true);

        if (config.reversed) {
            tl.vars.onReverseComplete();
            tl.reverse();
        }

        if (config.draggable && typeof (Draggable) === "function") {
            let proxy = document.createElement("div"),
                wrap = gsap.utils.wrap(0, 1),
                ratio, startProgress, draggable,
                align = () => tl.progress(wrap(startProgress + (draggable.startX - draggable.x) * ratio)),
                syncIndex = () => tl.closestIndex(true);

            typeof (InertiaPlugin) === "undefined" && console.warn("InertiaPlugin required for momentum-based dragging.");

            draggable = Draggable.create(proxy, {
                trigger: items[0].parentNode,
                type: "x",
                onPress() {
                    startProgress = tl.progress();
                    tl.progress(0);
                    ratio = 1 / totalWidth;
                    tl.progress(startProgress);
                },
                onDrag: align,
                onThrowUpdate: align,
                inertia: config.inertia,
                snap: (value) => {
                    let time = -(value * ratio) * tl.duration(),
                        wrappedTime = gsap.utils.wrap(0, tl.duration(), time),
                        snapTime = times[gsap.utils.closestIndex(times, wrappedTime)],
                        dif = snapTime - wrappedTime;
                    Math.abs(dif) > tl.duration() / 2 && (dif += dif < 0 ? tl.duration() : -tl.duration());
                    return (time + dif) / tl.duration() / -ratio;
                },
                onRelease: syncIndex,
                onThrowComplete: syncIndex
            })[0];

            tl.draggable = draggable;
        }

        tl.closestIndex = function (setCurrent) {
            let index = gsap.utils.closestIndex(times, tl.time());
            setCurrent && (curIndex = index);
            return index;
        };

        tl.elements = items;

        if (config.onChange) {
            tl.eventCallback("onUpdate", () => {
                let newIndex = tl.closestIndex();
                if (newIndex !== curIndex) {
                    curIndex = newIndex;
                    config.onChange(items[curIndex], curIndex);
                }
            });
        }

        return tl;
    }

    // Make it available globally for non-module usage
    if (typeof window !== 'undefined') {
        window.horizontalLoop = horizontalLoop;
    }

    /**
     * Featured Work - Horizontal loop and FLIP animations
     */


    const featuredWorkLoopHandlers = new Map();

    /**
     * Initialize featured work horizontal loop
     */
    function featuredWorkLoop() {
        const wrapper = document.querySelector(".work_images-wrapper");
        if (!wrapper) return;

        let activeElement;
        const images = gsap.utils.toArray(".work_image");

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

    /**
     * Destroy featured work loop
     */
    function destroyFeaturedWorkLoop() {
        featuredWorkLoopHandlers.forEach((handlers, image) => {
            image.removeEventListener("mouseenter", handlers.mouseenter);
            image.removeEventListener("mouseleave", handlers.mouseleave);
        });
        featuredWorkLoopHandlers.clear();
    }

    /**
     * Animate work images with FLIP
     */
    function animateWorkImages() {
        const wrapper = document.querySelector(".work_images-wrapper");
        if (!wrapper) return;

        const images = document.querySelectorAll(".work_image");
        const firstImage = images[0];
        const secondImage = images[1];
        const title = document.querySelector(".our-work_title");
        const titleWrapper = document.querySelector(".our-work_title-wrapper");

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

    /**
     * Service Hover Animation - Expandable service elements
     */


    let serviceHoverCleanupFns = [];

    /**
     * Initialize service hover animation
     */
    function serviceHoverAnimation() {
        const elements = document.querySelectorAll(".services-element");
        const mobile = isMobile();

        elements.forEach((element) => {
            const serviceLine = element.querySelector(".service_line");
            const serviceDescription = element.querySelector(".service_description");
            const serviceImage = element.querySelector(".service_image");
            const serviceHeading = element.querySelector(".service_heading");
            const serviceNumber = element.querySelector(".service_number");

            element.style.height = "auto";
            let expandedHeight = element.offsetHeight;
            element.style.height = mobile ? "4.8rem" : "8.5rem";

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
                    .to(serviceLine, { width: mobile ? "70%" : "100%", duration: 0.5, ease: "power2.out" }, "<")
                    .to(serviceDescription, { opacity: 1, duration: 0.5, ease: "power2.out" }, "-=0.1");
                if (!mobile && window.location.pathname === "/") {
                    gsap.timeline.call(() => ScrollTrigger && ScrollTrigger.refresh());
                }
            };

            const onMouseLeave = () => {
                gsap.timeline({ defaults: { overwrite: true } })
                    .to(element, { height: mobile ? '4.8rem' : '8.5rem', backgroundColor: "#5431D0", duration: 0.3, ease: "power2.out" })
                    .to(serviceHeading, { color: "#FEFEFE", duration: 0.3, ease: "power2.out" }, "<")
                    .to(serviceNumber, { color: "#FEFEFE", duration: 0.3, ease: "power2.out" }, "<")
                    .to(serviceImage, { opacity: 0, scale: 0.8, y: -10, rotate: 0, duration: 0.3, ease: "power2.out" }, "<")
                    .to(serviceLine, { width: "0%", duration: 0.3, ease: "power2.out" }, "<")
                    .to(serviceDescription, { opacity: 0, duration: 0 }, "<")
                    .call(() => {
                        element.removeEventListener("mousemove", floatImage);
                        gsap.to(serviceImage, { x: 0, y: -10, rotate: 0, duration: 0 });
                        if (!mobile && window.location.pathname === "/") {
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

    /**
     * Destroy service hover animation
     */
    function destroyServiceHoverAnimation() {
        serviceHoverCleanupFns.forEach((fn) => fn());
        serviceHoverCleanupFns = [];
    }

    /**
     * Vision Section Animation - Our vision section with floating images
     */

    let onVisionMouseMove = null;
    let onVisionMouseLeave = null;
    let visionTl = null;

    /**
     * Initialize vision section animation
     */
    function visionSectionAnimation() {
        const visionSection = document.querySelector(".section_our-vision");
        if (!visionSection) return;

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

    /**
     * Destroy vision section animation
     */
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

    /**
     * CTA Animation - Call-to-action section with text reveals
     */


    /**
     * Animate CTA section
     */
    function animateCTA() {
        const ctaWrapper = document.querySelector(".cta_text-wrapper");
        if (!ctaWrapper) return;

        const mobile = isMobile();

        const allParagraphs = Array.from(ctaWrapper.querySelectorAll(".cta_paragraph"));
        const visibleParagraphs = allParagraphs.filter(p => {
            if (mobile && p.classList.contains("desktop-hidden")) return true;
            if (!mobile && p.classList.contains("mobile-hidden")) return true;
            if (p.classList.contains("desktop-hidden") || p.classList.contains("mobile-hidden")) return false;
            return true;
        });

        // Apply SplitText once
        const splitCtaChars = new SplitText(visibleParagraphs, { type: "chars" });
        const ctaChars = splitCtaChars.chars;
        const paragraphs = splitCtaChars.elements;

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
            { textIndex: 0, imageIndex: 0 },
            { textIndex: 1 },
            { textIndex: 2 },
            { imageIndex: 1 },
            { textIndex: 3 },
            { textIndex: 4 },
            { textIndex: 5 },
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

    /**
     * Parallax Effect - Smooth parallax on images
     */


    /**
     * Apply parallax effect to images
     */
    function applyParallaxEffect() {
        const smoother = getSmoother();
        if (smoother) {
            smoother.effects(".parallax-image", { speed: "auto" });
        }
    }

    /**
     * Scrolling Text Animation - Horizontal scroll on scroll
     */

    /**
     * Animate horizontal scrolling text
     */
    function animateScrollingText() {
        const scrollTextWrapper = document.querySelector(".scroll_text-wrapper");
        if (!scrollTextWrapper) return;

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

    /**
     * SVG Path Drawing - Brandemic logo draw animation
     */

    /**
     * Animate SVG paths with draw effect
     */
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

    /**
     * Tools Swiper - Coverflow effect swiper for tools section
     */

    let toolsSwiperInstance = null;

    /**
     * Initialize tools swiper
     */
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

    /**
     * Destroy tools swiper instance
     */
    function destroyToolsSwiperScripts() {
        if (toolsSwiperInstance && toolsSwiperInstance.destroy) {
            toolsSwiperInstance.destroy(true, true);
            toolsSwiperInstance = null;
        }
    }

    /**
     * Testimonials Swiper - Creative effect swiper for testimonials
     */

    let testimonialsSwiperInstance = null;

    /**
     * Initialize testimonials swiper
     */
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

    /**
     * Destroy testimonials swiper instance
     */
    function destroyTestimonialsSwiperScripts() {
        if (testimonialsSwiperInstance && testimonialsSwiperInstance.destroy) {
            testimonialsSwiperInstance.destroy(true, true);
            testimonialsSwiperInstance = null;
        }
    }

    /**
     * Load FeedSpring Instagram script
     */
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

    /**
     * Home Page - Initialize and destroy animations
     */


    /**
     * Initialize all home page animations
     */
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

    /**
     * Destroy all home page animations
     */
    function destroyHomeAnimations() {
        destroyHomeHeroAnimation();
        destroyStartVideo();
        destroyFeaturedWorkLoop();
        destroyServiceHoverAnimation();
        destroyVisionSectionAnimation();
        destroyToolsSwiperScripts();
        destroyTestimonialsSwiperScripts();
    }

    /**
     * HPI Hero Animation - Generic hero page intro animation
     * Used on About, Portfolio, and Case Study pages
     */

    let heroTl = null;

    /**
     * Initialize HPI hero animation
     */
    function initHPIHeroAnimation() {
        heroTl = gsap.timeline();

        const heroHeadline = document.querySelector(".hero-timeline-1");
        const heroPara = document.querySelector(".hero-timeline-2");

        if (!heroHeadline) return;

        const splitHeroHeadline = new SplitText(heroHeadline, { type: "chars,words,lines" });
        const splitHeroPara = heroPara ? new SplitText(heroPara, { type: "chars,words,lines" }) : null;

        heroTl.fromTo(".main-wrapper", { autoAlpha: 0 }, { autoAlpha: 1, ease: "linear" })
            .from(splitHeroHeadline.chars, {
                opacity: 0,
                x: 16,
                y: "30%",
                filter: "blur(10px)",
                stagger: 0.03,
            });

        if (splitHeroPara) {
            heroTl.from(splitHeroPara.words, {
                opacity: 0,
                x: 16,
                y: "30%",
                filter: "blur(10px)",
                stagger: 0.03,
            }, "-=0.5");
        }

        heroTl.fromTo(".hero-timeline-3", {
            clipPath: "polygon(0 0, 100% 0, 100% 0%, 0 0%)",
        }, {
            clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
            duration: 0.8,
            ease: "power1.inOut",
        }, "-=0.2");
    }

    /**
     * Destroy HPI hero animation
     */
    function destroyHPIHeroAnimation() {
        if (heroTl) heroTl.kill();
    }

    /**
     * Milestones Animation - Animated milestone blocks
     */

    /**
     * Animate milestone blocks
     */
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

    /**
     * Process Section Animation - Scroll-pinned process with Observer
     */


    let processTl = null;

    /**
     * Initialize scroll pin observer for process section
     */
    function scrollPinObserver() {
        if (isMobile()) return;

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
                duration: 1,
                ease: "power2.inOut"
            }, 0);

            tl.fromTo(nextImage, {
                autoAlpha: 0,
            }, {
                autoAlpha: 1,
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
                ScrollTrigger.normalizeScroll(true);
            }
        });
        intentObserver.disable();

        ScrollTrigger.create({
            trigger: ".section_process-desktop",
            pin: true,
            start: "top top",
            end: "+=10",
            onEnter: (self) => {
                if (intentObserver.isEnabled) { return; }
                self.scroll(self.start + 1);
                intentObserver.enable();
            },
            onEnterBack: (self) => {
                if (intentObserver.isEnabled) { return; }
                self.scroll(self.end - 1);
                intentObserver.enable();
            },
        });
    }

    /**
     * Destroy scroll pin observer
     */
    function destroyScrollPinObserver() {
        Observer.getAll().forEach(observer => {
            observer.kill();
        });
    }

    /**
     * Initialize service process horizontal scroll
     */
    function serviceProcessScroll() {
        if (isMobile()) return;

        let processWrapper = document.querySelector(".service_process-contents");
        if (!processWrapper) return;

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

    /**
     * Destroy service process scroll
     */
    function destroyServiceProcessScroll() {
        if (processTl) {
            processTl.kill();
            processTl = null;
        }
    }

    /**
     * Ticker Animations - Horizontal loop tickers for various sections
     */


    let aboutTickerLoops = [];
    let caseStudyTickerLoop = null;
    let livXTickerLoop = null;

    /**
     * Initialize about page tickers (brands, team, culture)
     */
    function aboutTicker() {
        const elements = [
            { selector: ".brand_logo", reversed: false },
            { selector: ".team_ticker-wrapper.is-one .team_card", reversed: false },
            { selector: ".team_ticker-wrapper.is-two .team_card", reversed: true },
            { selector: ".culture_image", reversed: false }
        ];

        aboutTickerLoops = elements.map(({ selector, reversed }) => {
            const items = gsap.utils.toArray(selector);
            if (items.length === 0) return null;

            const loop = horizontalLoop(items, {
                draggable: false,
                inertia: false,
                repeat: -1,
                center: false,
                reversed
            });

            return loop;
        }).filter(Boolean);
    }

    /**
     * Destroy about page tickers
     */
    function destroyAboutTicker() {
        aboutTickerLoops.forEach(loop => {
            if (loop && typeof loop.kill === 'function') {
                loop.kill();
            }
        });
        aboutTickerLoops = [];
    }

    /**
     * Initialize case study ticker
     */
    function caseStudyTicker() {
        const wrapper = document.querySelector(".case_studies-ticker-element");
        if (!wrapper) return;

        const wrapperContent = gsap.utils.toArray(".case_study-ticker-image");

        caseStudyTickerLoop = horizontalLoop(wrapperContent, {
            draggable: false,
            inertia: false,
            repeat: -1,
            center: false,
        });
    }

    /**
     * Initialize LivX ticker
     */
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

    /**
     * Destroy case study and livX tickers
     */
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

    /**
     * Awards Accordion - Expandable accordion for awards section
     */


    let awardsAccordionListeners = [];

    /**
     * Initialize awards accordion
     */
    function awardsAccordion() {
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
    function destroyAwardsAccordion() {
        awardsAccordionListeners.forEach(({ el, handler }) => {
            el.removeEventListener("click", handler);
        });
        awardsAccordionListeners = [];
    }

    /**
     * Animate accordion lines on scroll
     */
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

    /**
     * Process Swiper - Mobile swiper for process section
     */


    let processSwiperInstance = null;

    /**
     * Initialize process swiper (mobile only)
     */
    function initProcessSwiper() {
        if (isMobile()) {
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

    /**
     * Destroy process swiper instance
     */
    function destroyProcessSwiper() {
        if (processSwiperInstance && processSwiperInstance.destroy) {
            processSwiperInstance.destroy(true, true);
            processSwiperInstance = null;
        }
    }

    /**
     * About Page - Initialize and destroy animations
     */


    /**
     * Initialize all about page animations
     */
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

    /**
     * Destroy all about page animations
     */
    function destroyAboutAnimations() {
        destroyHPIHeroAnimation();
        destroyScrollPinObserver();
        destroyProcessSwiper();
        destroyAboutTicker();
        destroyAwardsAccordion();
    }

    /**
     * Portfolio Filter - FLIP-based filtering for portfolio items
     */


    let filterPortfolioCleanupFns = [];

    /**
     * Initialize portfolio filter
     */
    function initFilterPortfolio() {
        const filters = gsap.utils.toArray('.filter');
        const items = gsap.utils.toArray('.portfolio-item');

        const getActiveCategories = () => {
            return filters
                .filter(filter => filter.classList.contains('active'))
                .map(filter => filter.id);
        };

        const filterItems = () => {
            const mobile = isMobile();
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

            if (!mobile) {
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

    /**
     * Destroy portfolio filter listeners
     */
    function destroyFilterPortfolio() {
        filterPortfolioCleanupFns.forEach(fn => fn());
        filterPortfolioCleanupFns = [];
    }

    /**
     * Portfolio Page - Initialize and destroy animations
     */


    /**
     * Initialize all portfolio page animations
     */
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

    /**
     * Destroy all portfolio page animations
     */
    function destroyPortfolioAnimations() {
        destroyHPIHeroAnimation();
        destroyVisionSectionAnimation();
        destroyFilterPortfolio();
    }

    /**
     * Contact Hero Animation - Contact page hero with floating images and greeting cycle
     */

    let contactHeroTl = null;
    let contactCycleCall = null;

    /**
     * Initialize contact hero animation
     */
    function initContactHeroAnimation() {
        contactHeroTl = gsap.timeline();

        const splitContactHeroHeadline = new SplitText(".contact_hero-tl-1", { type: "chars,words,lines" });
        const splitContactHeroPara = new SplitText(".contact_hero-tl-2", { type: "chars,words,lines" });
        const leftImages = ['.is-one', '.is-two', '.is-three'];
        const rightImages = ['.is-four', '.is-five', '.is-six'];

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
            .add(() => initContactHeroFloatingEffect());
    }

    /**
     * Initialize floating effect for contact hero images
     */
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
        if (!wrapper) return;

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

    /**
     * Cycle through greeting words in different languages
     */
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
        if (!greetingText) return;

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

    /**
     * Destroy contact hero animation
     */
    function destroyContactHeroAnimation() {
        if (contactHeroTl) contactHeroTl.kill();
        if (contactCycleCall) contactCycleCall.kill();
    }

    /**
     * Contact Page - Initialize and destroy animations
     */


    /**
     * Initialize all contact page animations
     */
    function initContactAnimations() {
        initCharAnimations();
        initContactHeroAnimation();
    }

    /**
     * Destroy all contact page animations
     */
    function destroyContactAnimations() {
        destroyContactHeroAnimation();
    }

    /**
     * Gallery Images Animation
     * Note: This function is referenced but not defined in the original code
     * Add your implementation here
     */

    /**
     * Animate gallery images
     */
    function animateGalleryImages() {
        // TODO: Implement gallery image animation
        // This function is called in case study but wasn't defined in the original code
        const galleryImages = document.querySelectorAll(".gallery_image");
        
        if (galleryImages.length === 0) return;

        galleryImages.forEach((image) => {
            gsap.from(image, {
                opacity: 0,
                scale: 0.9,
                duration: 0.8,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: image,
                    start: "top 85%",
                    toggleActions: "play none none none",
                }
            });
        });
    }

    /**
     * Case Study Page - Initialize and destroy animations
     */


    /**
     * Initialize all case study page animations
     */
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

    /**
     * Destroy all case study page animations
     */
    function destroyCaseStudyAnimations() {
        destroyHPIHeroAnimation();
        destroyTickers();
    }

    /**
     * Service Hero Animation - Service page hero with floating images
     */

    let serviceHeroTl = null;

    /**
     * Initialize service hero animation
     */
    function initServiceHeroAnimation() {
        serviceHeroTl = gsap.timeline();

        const splitServiceTag = new SplitText(".service_hero-tl-0", { type: "chars,words,lines" });
        const splitServiceHeroHeadline = new SplitText(".service_hero-tl-1", { type: "chars,words,lines" });
        const splitServiceHeroPara = new SplitText(".service_hero-tl-2", { type: "chars,words,lines" });
        const serviceLeftImages = ['.is-one', '.is-two', '.is-three'];
        const serviceRightImages = ['.is-four', '.is-five', '.is-six'];

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
            .add(() => initServiceHeroFloatingEffect());
    }

    /**
     * Initialize floating effect for service hero images
     */
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
        if (!wrapper) return;

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

    /**
     * Destroy service hero animation
     */
    function destroyServiceHeroAnimation() {
        if (serviceHeroTl) serviceHeroTl.kill();
    }

    /**
     * Scroll Down Animation - Repeating scroll indicator
     */

    /**
     * Start scroll down indicator animation
     */
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

    /**
     * Featured Swiper - Swiper for featured projects
     */

    let featuredSwiperInstance = null;

    /**
     * Initialize featured swiper
     */
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

    /**
     * Destroy featured swiper instance
     */
    function destroyFeaturedSwiper() {
        if (featuredSwiperInstance && featuredSwiperInstance.destroy) {
            featuredSwiperInstance.destroy(true, true);
            featuredSwiperInstance = null;
            console.log("Featured swiper destroyed");
        }
    }

    /**
     * Service Page - Initialize and destroy animations
     */


    /**
     * Initialize all service page animations
     */
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

    /**
     * Destroy all service page animations
     */
    function destroyServiceAnimations() {
        destroyServiceHeroAnimation();
        destroyFeaturedSwiper();
        destroyServiceProcessScroll();
        destroyServiceHoverAnimation();
        destroyTestimonialsSwiperScripts();
    }

    /**
     * Thank You Hero Animation - Thank you page hero
     */

    let thankHeroTl = null;

    /**
     * Initialize thank you hero animation
     */
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
            }, "-=1.3");
    }

    /**
     * Destroy thank you hero animation
     */
    function destroyThankHeroAnimation() {
        if (thankHeroTl) thankHeroTl.kill();
    }

    /**
     * Thank You Page - Initialize and destroy animations
     */


    /**
     * Initialize all thank you page animations
     */
    function initThankAnimations() {
        initThankHeroAnimation();
    }

    /**
     * Destroy all thank you page animations
     */
    function destroyThankAnimations() {
        destroyThankHeroAnimation();
    }

    /**
     * Barba.js Configuration - Page transitions and view management
     */


    /**
     * Initialize Barba.js with all transitions and views
     */
    function initBarba() {
        barba.init({
            sync: true,
            transitions: [{
                async leave(data) {
                    const done = this.async();
                    const isOpen = getIsOpen();

                    if (isOpen) {
                        const closeMenuTimeline = getCloseMenuTimeline();
                        closeMenuTimeline.restart();
                        document.body.classList.remove("no-scroll");
                        setIsOpen(false);
                    }

                    gsap.to(data.current.container, {
                        opacity: 0,
                        filter: "blur(10px)",
                        duration: 0.5,
                    });

                    await delay(500);
                    data.current.container.remove();
                    done();
                },
                async beforeEnter(data) {
                    resetWebflow(data);
                    const mobile = isMobile();

                    if (!mobile) {
                        const scaleAnim = getScaleAnim();
                        let isHovering = [...document.querySelectorAll(".link-hover-ix, a")].some(
                            (el) => el.matches(":hover")
                        );

                        if (!isHovering && scaleAnim) {
                            scaleAnim.reverse();
                        }

                        mouseHover();
                    }

                    recreateSmoother();

                    ScrollTrigger.normalizeScroll(false);

                    let triggers = ScrollTrigger.getAll();
                    triggers.forEach(trigger => {
                        trigger.kill();
                    });

                    footerLimitless();
                    copyYear();

                    if (!mobile) {
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

    /**
     * Button Fill Hover - Radial fill effect on buttons
     */

    /**
     * Initialize button fill hover effect
     */
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

    /**
     * Navigation Hover Animations - Link hover effects
     */

    /**
     * Initialize sub navigation hover animation
     */
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
    function initSubMenuNavHover() {
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

    /**
     * Brandemic Dubai - Main Entry Point
     * 
     * This is the main entry point for all animations and interactions.
     * The code is organized into modular components for better maintainability.
     * 
     * Structure:
     * - /core       - Core functionality (GSAP, Barba, ScrollSmoother, Webflow)
     * - /components - Reusable UI components (cursor, navigation, buttons, video, swipers)
     * - /animations - Animation modules (text, scroll, SVG, sections, hero)
     * - /pages      - Page-specific animation orchestration
     * - /footer     - Footer animations
     * - /utils      - Utility functions
     */


    /**
     * Main initialization function
     * Called when DOM is ready and fonts are loaded
     */
    function init() {
        const mobile = isMobile();

        // Initialize Barba.js for page transitions
        initBarba();

        // Initialize smooth scrolling
        initSmoothScroller();

        // Desktop-only features
        if (!mobile) {
            window.addEventListener("load", () => {
                ScrollTrigger.refresh();
            });

            customCursorInit();
            mouseHover();
            buttonFillHover();
        }

        // Navigation
        megaMenuToggle();
        initNavHoverAnimation();
        initSubMenuNavHover();

        // Footer
        footerLimitless();
        copyYear();
    }

    /**
     * Bootstrap the application
     */
    document.addEventListener("DOMContentLoaded", (event) => {
        document.fonts.ready.then(() => {
            // Register GSAP plugins
            registerGSAPPlugins();

            // Initialize the app
            init();
        });
    });

})();
