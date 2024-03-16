document.addEventListener('DOMContentLoaded', function () {
    var today = new Date().getDay(); // Get the current day (0-6, where 0 is Sunday, 1 is Monday, etc.)

    // Check if today is Monday, Tuesday, or Wednesday
    if (today >= 1 && today <= 3) {
        document.getElementById('chamber-banner').style.display = 'block';
    }
});