document.addEventListener('DOMContentLoaded', (event) => {
    // 1. Target Date/Time Setup (The EXACT two-year anniversary moment: Sep 28, 2025 at 10:46 PM)
    const targetDate = new Date("September 28, 2025 22:46:00").getTime();
    
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    
    // Get the element where fireworks will appear
    const fireworksContainer = document.getElementById("fireworks-container");

    // Function to create a single firework burst
    function createFirework(x, y, colorVar) {
        const firework = document.createElement('div');
        firework.className = 'firework';
        firework.style.left = `${x}%`;
        firework.style.top = `${y}%`;
        firework.style.setProperty('--firework-color-1', `var(${colorVar})`);
        fireworksContainer.appendChild(firework);
        
        // Remove the element after the animation finishes
        setTimeout(() => firework.remove(), 1000);
    }

    // Function to trigger the main celebration fireworks
    function triggerCelebration() {
        // Change the look of the site for a quick celebration mode
        document.body.style.backgroundColor = "black";
        document.querySelector('.container').style.backgroundColor = "rgba(255, 255, 255, 0.9)";
        document.querySelector('.title').style.color = "gold";
        document.querySelector('.count-box').style.backgroundColor = "gold";
        
        // Make the firework container visible
        fireworksContainer.style.opacity = 1;

        // Create a continuous burst for a few seconds
        let burstCount = 0;
        const burstInterval = setInterval(() => {
            // Random colors and positions for the burst
            const randomX = Math.random() * 80 + 10;
            const randomY = Math.random() * 80 + 10;
            const colors = ['--firework-color-1', '--firework-color-2', '--firework-color-3'];
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            
            createFirework(randomX, randomY, randomColor);
            
            burstCount++;
            if (burstCount >= 30) { // Stop the continuous burst after 30 fireworks
                clearInterval(burstInterval);
                // Optional: Fade out the firework container after a few seconds
                setTimeout(() => {
                    fireworksContainer.style.opacity = 0;
                    document.body.style.backgroundColor = "var(--background-cream)";
                    document.querySelector('.container').style.backgroundColor = "white";
                }, 5000);
            }
        }, 150); // new firework every 150 milliseconds
    }

    // 2. Countdown Logic
    function updateCounter() {
        const now = new Date().getTime();
        const distance = targetDate - now;

        // Stop the countdown once the time has passed
        if (distance < 0) {
            document.getElementById("years").innerText = "2"; 
            document.getElementById("days").innerText = "0";
            document.getElementById("hours").innerText = "0";
            document.getElementById("minutes").innerText = "0";
            document.querySelector('.title').innerText = "Happy 2 Year Anniversary!";
            
            // --- FIREWORKS TRIGGER ---
            if (!fireworksContainer.classList.contains('celebrating')) {
                fireworksContainer.classList.add('celebrating'); // Prevent multiple triggers
                triggerCelebration();
            }
            // --- END FIREWORKS TRIGGER ---
            
            return;
        }

        // Calculate time parts (Total hours remaining)
        const totalHours = Math.floor(distance / hour);
        const minutes = Math.floor((distance % hour) / minute);
        
        // Display the results
        document.getElementById("years").innerText = "2"; 
        document.getElementById("days").innerText = "0"; 
        document.getElementById("hours").innerText = totalHours;
        document.getElementById("minutes").innerText = minutes;
    }

    // Update the counter every second for a smoother feel as the time approaches
    setInterval(updateCounter, 1000); 
    updateCounter(); 

    // 3. Modal (Pop-up Message) Logic - (Same as before)
    const modal = document.getElementById("message-modal");
    const btn = document.getElementById("gift-button");
    const span = document.getElementsByClassName("close-button")[0];

    btn.onclick = function() {
        modal.style.display = "block";
    }

    span.onclick = function() {
        modal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
});
