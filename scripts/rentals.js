// Define the URL to the JSON data file
const rentalsURL = "data/rentals.json";

// Load the rentals.json file
fetch(rentalsURL)
    .then(response => response.json())
    .then(data => {
        // Extract pricing information from the JSON
        const rentals = data.rentals;
        console.log("Rental types from JSON:", rentals.map(rental => rental.type));

        rentals.forEach(rental => {
            const reservationPrices = rental.pricing.reservation;
            const halfDayPrice = reservationPrices.halfDay;
            const fullDayPrice = reservationPrices.fullDay;
            const priceRange = `${halfDayPrice} - ${fullDayPrice}`;

            // Update HTML elements with price range
            const cardContents = document.querySelectorAll('.card-content');
            cardContents.forEach(cardContent => {
                const rentalType = cardContent.querySelector('h3').textContent;
                console.log("Rental type in HTML:", rentalType);
                const priceElement = cardContent.querySelector('p');
                if (priceElement && rentalType === rental.type) {
                    priceElement.textContent = priceRange;
                }
            });
        });
    })
    .catch(error => console.error('Error fetching data:', error));

