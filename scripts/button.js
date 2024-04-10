document.addEventListener("DOMContentLoaded", function () {
    // Find all reservation buttons
    const reservationButtons = document.querySelectorAll(".reservationButton");

    // Add a click event listener to each reservation button
    reservationButtons.forEach(button => {
        button.addEventListener("click", function () {
            // Redirect the user to the reservations.html page
            window.location.href = "reservations.html";
        });
    });
});
