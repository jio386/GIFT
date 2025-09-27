document.addEventListener('DOMContentLoaded', (event) => {
    // 1. Anniversary Date/Time Setup
    // September is month 8 (0-indexed: Jan=0, Feb=1, ... Sep=8)
    const anniversaryDate = new Date("September 28, 2023 22:46:00").getTime();
    
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
    const year = day * 365.25; // Use 365.25 for average days in a year

    // 2. Counter Logic
    function updateCounter() {
        const now = new Date().getTime();
        const distance = now - anniversaryDate;

        if (distance < 0) {
            // Should only happen if the date is in the future
            document.getElementById("years").innerText = "0";
            document.getElementById("days").innerText = "0";
            document.getElementById("hours").innerText = "0";
            document.getElementById("minutes").innerText = "0";
            return;
        }

        // Calculate time parts
        const years = Math.floor(distance / year);
        const days = Math.floor((distance % year) / day);
        const hours = Math.floor((distance % day) / hour);
        const minutes = Math.floor((distance % hour) / minute);

        // Display results
        document.getElementById("years").innerText = years;
        document.getElementById("days").innerText = days;
        document.getElementById("hours").innerText = hours;
        document.getElementById("minutes").innerText = minutes;
    }

    // Update the counter every minute
    setInterval(updateCounter, minute); 
    // Run once immediately to avoid a delay
    updateCounter(); 

    // 3. Modal (Pop-up Message) Logic
    const modal = document.getElementById("message-modal");
    const btn = document.getElementById("gift-button");
    const span = document.getElementsByClassName("close-button")[0];

    // When the user clicks the button, open the modal 
    btn.onclick = function() {
        modal.style.display = "block";
    }

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
});