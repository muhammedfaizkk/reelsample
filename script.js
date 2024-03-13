const videoSources = ["video1.mp4", "video2.mp4", "video3.mp4"]; // Replace with your video sources
let currentIndex = 0;
let isSmallDevice = window.innerWidth <= 768;

const mainVideo = document.getElementById("mainVideo");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

function showVideo(index) {
    mainVideo.src = videoSources[index];
    // Don't attempt autoplay here
    // Update button visibility based on current video index
    if (index === 0) {
        prevBtn.style.display = "none";
        nextBtn.style.display = "block";
    } else if (index === videoSources.length - 1) {
        prevBtn.style.display = "block";
        nextBtn.style.display = "none";
    } else {
        prevBtn.style.display = "block";
        nextBtn.style.display = "block";
    }
}

function playVideo() {
    // Attempt autoplay only when the user interacts with the document
    mainVideo.play().catch(function (error) {
        console.error('Autoplay failed:', error.message);
    });
}

prevBtn.addEventListener("click", function () {
    currentIndex = (currentIndex - 1 + videoSources.length) % videoSources.length;
    showVideo(currentIndex);
    playVideo(); // Play the video after changing
});

nextBtn.addEventListener("click", function () {
    currentIndex = (currentIndex + 1) % videoSources.length;
    showVideo(currentIndex);
    playVideo(); // Play the video after changing
});

document.addEventListener("touchstart", function (e) {
    if (isSmallDevice) {
        startY = e.touches[0].clientY;
    }
});

document.addEventListener("touchend", function (e) {
    if (isSmallDevice) {
        let endY = e.changedTouches[0].clientY;
        let deltaY = endY - startY;

        // Check if it's the first video and dragged upwards, or the last video and dragged downwards
        if ((currentIndex === 0 && deltaY > 0) || (currentIndex === videoSources.length - 1 && deltaY < 0)) {
            return; // Do nothing if dragging beyond the boundaries
        }

        if (deltaY > 50) { // Dragged downwards
            currentIndex = (currentIndex - 1 + videoSources.length) % videoSources.length;
            showVideo(currentIndex);
            playVideo(); // Play the video after changing
        } else if (deltaY < -50) { // Dragged upwards
            currentIndex = (currentIndex + 1) % videoSources.length;
            showVideo(currentIndex);
            playVideo(); // Play the video after changing
        }
    }
});

window.addEventListener("resize", function () {
    isSmallDevice = window.innerWidth <= 768;
});

// Initially show the first video
showVideo(currentIndex);