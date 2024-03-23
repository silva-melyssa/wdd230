function calculateWindChill(temperature, windSpeed) {
    if (temperature <= 50 && windSpeed > 3.0) {
        var windChill = 35.74 + (0.6215 * temperature) - (35.75 * Math.pow(windSpeed, 0.16)) + (0.4275 * temperature * Math.pow(windSpeed, 0.16));
        return Math.round(windChill * 10) / 10; // Round to one decimal place
    } else {
        return "N/A";
    }
}


// Get temperature and wind speed values from the HTML
var temperature = parseFloat(document.getElementById('current-temp').innerText);
var windSpeed = parseFloat(document.getElementById('wind-speed').innerText);

// Calculate and display wind chill
var windChillValue = calculateWindChill(temperature, windSpeed);
document.getElementById('wind-chill').innerText = windChillValue;

// Function to fetch current weather data and display it
async function currentWeatherFetch() {
    try {
        const response = await fetch(currentWeatherUrl); // Assuming you have defined currentWeatherUrl
        if (response.ok) {
            const data = await response.json();
            displayCurrentWeather(data);
            displayWindInfo(data); // Call the function to display wind info
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log(error);
    }
}

// Function to display wind information
function displayWindInfo(data) {
    const windSpeed = data.wind.speed; // Get the wind speed from the weather data
    document.getElementById('wind-speed').textContent = windSpeed.toFixed(0); // Update the HTML element with wind speed
}

// Call the function to fetch current weather data and display it
currentWeatherFetch();
