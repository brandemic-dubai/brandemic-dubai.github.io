/**
 * Ticker Animations - Horizontal loop tickers for various sections
 */

import { horizontalLoop } from '../../utils/horizontalLoop.js';

let aboutTickerLoops = [];
let caseStudyTickerLoop = null;
let livXTickerLoop = null;

/**
 * Initialize about page tickers (brands, team, culture)
 */
export function aboutTicker() {
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
export function destroyAboutTicker() {
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
export function caseStudyTicker() {
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
export function livXTicker() {
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
export function destroyTickers() {
    if (caseStudyTickerLoop && caseStudyTickerLoop.kill) {
        caseStudyTickerLoop.kill();
        caseStudyTickerLoop = null;
    }

    if (livXTickerLoop && livXTickerLoop.kill) {
        livXTickerLoop.kill();
        livXTickerLoop = null;
    }
}

