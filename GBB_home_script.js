const images = document.querySelectorAll('.image');
let currentIndex = 0;

images[currentIndex].style.opacity = 1; // Display the first image

function changeImage(direction) {
  images[currentIndex].style.opacity = 0;
  currentIndex = (currentIndex + direction + images.length) % images.length;
  images[currentIndex].style.opacity = 1;
}

function startSlideshow() {
  setInterval(() => changeImage(1), 5000); // Rotate every 5 seconds
}

startSlideshow(); // Start automatic slideshow