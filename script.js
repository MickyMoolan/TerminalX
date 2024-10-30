const canvas = document.getElementById('matrix-canvas');
const ctx = canvas.getContext('2d');

// Set up canvas dimensions
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Matrix effect characters and settings
const matrixChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()';
const fontSize = 14;
const columns = Math.floor(canvas.width / fontSize);
const drops = Array(columns).fill(1);

// Draw the Matrix rain effect
function drawMatrix() {
    // Clear the canvas with a translucent fill for the trailing effect
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Set text properties
    ctx.fillStyle = '#ffffff';
    ctx.font = `${fontSize}px monospace`;

    drops.forEach((y, i) => {
        const text = matrixChars.charAt(Math.floor(Math.random() * matrixChars.length));
        const x = i * fontSize;

        // Draw the character at (x, y)
        ctx.fillText(text, x, y * fontSize);

        // Reset the drop to the top with a probability or let it fall
        if (y * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }

        drops[i]++;
    });
}

// Refresh matrix effect at intervals
setInterval(drawMatrix, 50);

// Resize canvas on window resize
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// Tweet animation setup
document.addEventListener("DOMContentLoaded", () => {
    const leftContainer = document.querySelector(".tweet-animation-container.left");
    const rightContainer = document.querySelector(".tweet-animation-container.right");
    const maxTweets = 4; // Max tweets visible per side
    const interval = 2000; // Interval between new tweets in milliseconds
    let toggleSide = true; // Alternates between left and right

    // Function to create and animate tweet image
    function createTweetImage(isLeft) {
        const container = isLeft ? leftContainer : rightContainer;

        // Limit tweets per container to avoid overflow
        if (container.childElementCount >= maxTweets) return;

        const img = document.createElement("img");
        const tweetNumber = Math.floor(Math.random() * 33) + 1; // Adjusted to 33 for total tweets
        img.src = `images/tweet${tweetNumber}.png`;
        img.classList.add("tweet-image");

        // Set tilt angle based on side
        img.style.setProperty("--tilt-angle", isLeft ? "-8deg" : "8deg");
        img.style.top = "0vh";

        container.appendChild(img);

        // Remove the tweet image after animation ends
        img.addEventListener("animationend", () => {
            container.removeChild(img);
        });
    }

    // Generate tweets alternately between left and right containers
    setInterval(() => {
        createTweetImage(toggleSide);
        toggleSide = !toggleSide; // Alternate side
    }, interval);
});
