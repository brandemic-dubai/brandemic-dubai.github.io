/**
 * Gallery Images Animation
 * Note: This function is referenced but not defined in the original code
 * Add your implementation here
 */

/**
 * Animate gallery images
 */
export function animateGalleryImages() {
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

