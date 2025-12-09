// Companies and universities to display
const companies = ['Meta', 'NVIDIA', 'Essential AI', 'Anyscale'];
const universities = ['Princeton University', 'Stanford University', 'Carnegie Mellon University', 'University of Illinois Urbana Champaign'];

// Interleave the two lists
function interleave(arr1, arr2) {
    const result = [];
    const maxLength = Math.max(arr1.length, arr2.length);
    for (let i = 0; i < maxLength; i++) {
        if (i < arr1.length) result.push(arr1[i]);
        if (i < arr2.length) result.push(arr2[i]);
    }
    return result;
}

const allItems = interleave(companies, universities);

// Get carousel container
const carousel = document.getElementById('carousel');
const carouselWrapper = carousel.parentElement;

// Duplicate items many times for truly seamless infinite scroll
const extendedItems = [...allItems, ...allItems, ...allItems, ...allItems];

// Create carousel items
extendedItems.forEach((item) => {
    const span = document.createElement('span');
    span.className = 'carousel-item';
    span.textContent = item;
    carousel.appendChild(span);
});

// Set up the carousel rotation
let currentIndex = allItems.length; // Start from the middle set
const itemCount = allItems.length;

// Initialize position
setTimeout(() => {
    const firstItem = carousel.querySelector('.carousel-item');
    const itemWidth = firstItem.offsetWidth;
    const gap = 32; // 2rem gap
    const itemWithGap = itemWidth + gap;
    const initialOffset = itemWithGap * currentIndex;
    carousel.style.transition = 'none';
    carousel.style.transform = `translateX(-${initialOffset}px)`;
    
    setTimeout(() => {
        carousel.style.transition = 'transform 0.8s ease';
    }, 50);
}, 100);

function rotateCarousel() {
    // Calculate visible items
    const wrapperWidth = carouselWrapper.offsetWidth;
    const firstItem = carousel.querySelector('.carousel-item');
    const itemWidth = firstItem.offsetWidth;
    const gap = 32; // 2rem gap
    const itemWithGap = itemWidth + gap;
    
    // Number of visible items (rounded)
    const visibleItems = Math.floor(wrapperWidth / itemWithGap);
    
    // Shift by half of visible items (at least 1)
    const shiftAmount = Math.max(1, Math.floor(visibleItems / 2));
    
    currentIndex += shiftAmount;
    
    const offset = itemWithGap * currentIndex;
    carousel.style.transform = `translateX(-${offset}px)`;
    
    // Reset position seamlessly when we're past 2 full sets
    if (currentIndex >= itemCount * 2) {
        setTimeout(() => {
            carousel.style.transition = 'none';
            currentIndex = currentIndex - itemCount;
            const resetOffset = itemWithGap * currentIndex;
            carousel.style.transform = `translateX(-${resetOffset}px)`;
            
            // Re-enable transition after a brief moment
            setTimeout(() => {
                carousel.style.transition = 'transform 0.8s ease';
            }, 50);
        }, 800); // Match the transition duration
    }
}

// Start the carousel
setInterval(rotateCarousel, 3000);

// Copy command to clipboard
function copyCommand() {
    const command = 'pip install mini-swe-agent && mini';
    
    // Copy to clipboard
    navigator.clipboard.writeText(command).then(() => {
        // Show tooltip
        const tooltip = document.getElementById('copy-tooltip');
        tooltip.classList.add('show');
        
        // Hide tooltip after 2 seconds
        setTimeout(() => {
            tooltip.classList.remove('show');
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy:', err);
    });
}
