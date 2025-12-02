/**
 * GSAP Configuration - Register all GSAP plugins
 */

// Note: gsap and plugins are loaded via CDN in Webflow
// This function registers all the plugins we use
export function registerGSAPPlugins() {
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

