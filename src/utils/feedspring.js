/**
 * Load FeedSpring Instagram script
 */
export function loadFeedSpring() {
    let script = document.createElement("script");
    script.src = "https://scripts.feedspring.com/instagram-attrs.js";
    script.async = true;
    script.defer = true;

    // Remove existing script if present
    let oldScript = document.querySelector('script[src="https://scripts.feedspring.com/instagram-attrs.js"]');
    if (oldScript) oldScript.remove();

    document.head.appendChild(script);
}

