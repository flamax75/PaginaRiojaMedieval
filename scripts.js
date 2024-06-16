document.addEventListener("DOMContentLoaded", function () {
    const galleryItems = document.querySelectorAll(".gallery-item");

    galleryItems.forEach(item => {
        const frontImage = item.getAttribute("data-image-front");
        const backImage = item.getAttribute("data-image-back");

        item.innerHTML = `
            <div class="gallery-item-inner">
                <div class="gallery-item-front" style="background-image: url('${frontImage}');"></div>
                <div class="gallery-item-back" style="background-image: url('${backImage}');"></div>
            </div>
        `;
    });
});
