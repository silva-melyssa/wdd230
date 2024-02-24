document.addEventListener("DOMContentLoaded", function () {
    const visitMessage = document.getElementById('visit-message');
    const lastVisit = localStorage.getItem('lastVisit');

    if (lastVisit) {
        const millisecondsInDay = 1000 * 60 * 60 * 24;
        const daysSinceLastVisit = Math.floor((Date.now() - lastVisit) / millisecondsInDay);

        if (daysSinceLastVisit === 0) {
            visitMessage.textContent = "Back so soon! Awesome!";
        } else if (daysSinceLastVisit === 1) {
            visitMessage.textContent = "You last visited 1 day ago.";
        } else {
            visitMessage.textContent = `You last visited ${daysSinceLastVisit} days ago.`;
        }
    } else {
        visitMessage.textContent = "Welcome! Let us know if you have any questions.";
    }

    localStorage.setItem('lastVisit', Date.now());
});
