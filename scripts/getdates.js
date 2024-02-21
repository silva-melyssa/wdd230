document.querySelector('#year').textContent = new Date().getFullYear();
document.querySelector('#lastModified').textContent = document.lastModified;

// Retrieve the existing page visit count from localStorage
let visitCount = localStorage.getItem('pageVisitCount');

// Check if the page visit count exists in localStorage
if (visitCount) {
    // If it exists, parse the value to an integer
    visitCount = parseInt(visitCount);
} else {
    // If it doesn't exist, initialize the visit count to 0
    visitCount = 0;
}

// Update the display of the page visit count
document.getElementById('visitCount').textContent = visitCount;

// Increment the visit count by 1
visitCount++;

// Store the updated visit count back into localStorage
localStorage.setItem('pageVisitCount', visitCount);
