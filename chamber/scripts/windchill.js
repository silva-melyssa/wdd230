
function calculateWindChill(temperature, windSpeed) {
    if (temperature <= 50 && windSpeed > 3.0) {
        var windChill = 35.74 + (0.6215 * temperature) - (35.75 * Math.pow(windSpeed, 0.16)) + (0.4275 * temperature * Math.pow(windSpeed, 0.16));
        return Math.round(windChill * 10) / 10; // Round to one decimal place
    } else {
        return "N/A";
    }
}


// Get temperature and wind speed values from the HTML
var temperature = parseFloat(document.getElementById('temperature').innerText);
var windSpeed = parseFloat(document.getElementById('wind-speed').innerText);

// Calculate and display wind chill
var windChillValue = calculateWindChill(temperature, windSpeed);
document.getElementById('wind-chill').innerText = windChillValue;
