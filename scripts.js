document.addEventListener("DOMContentLoaded", function () {
    const galleryItem = document.querySelector(".gallery-item");
    const images = JSON.parse(galleryItem.getAttribute("data-images"));
    let currentIndex = 0;
    let isRotating = false;

    function updateImage(direction) {
        const nextIndex = direction === 'right' ? (currentIndex + 1) % images.length : (currentIndex - 1 + images.length) % images.length;
        const rotationClass = direction === 'right' ? 'rotate-right' : 'rotate-left';

        const galleryItemInner = document.createElement('div');
        galleryItemInner.classList.add('gallery-item-inner');
        galleryItemInner.innerHTML = `
            <div class="gallery-item-front" style="background-image: url('${images[currentIndex]}');"></div>
            <div class="gallery-item-back" style="background-image: url('${images[nextIndex]}');"></div>
        `;

        galleryItem.innerHTML = '';
        galleryItem.appendChild(galleryItemInner);

        // Force a reflow to restart the animation
        void galleryItemInner.offsetWidth;
        galleryItemInner.classList.add(rotationClass);

        currentIndex = nextIndex;
    }

    function handleMouseOver(event) {
        if (isRotating) return;
        isRotating = true;
        const boundingRect = galleryItem.getBoundingClientRect();
        const x = event.clientX - boundingRect.left;

        if (x < boundingRect.width / 2) {
            updateImage('left');
        } else {
            updateImage('right');
        }

        setTimeout(() => {
            isRotating = false;
        }, 2000); // Changed duration to 2000ms to match the CSS transition duration
    }

    galleryItem.addEventListener("mouseover", handleMouseOver);

    // Initialize the first image
    updateImage('right');
});
