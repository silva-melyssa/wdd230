// Function to fetch weather data from the OpenWeatherMap API
async function fetchWeatherData() {
    const apiKey = '8c4238c81c3f59d89e645273ddc49d08'; // Replace 'YOUR_API_KEY' with your actual API key
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Cozumel,MX&appid=${apiKey}&units=imperial`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        // Convert Celsius to Fahrenheit for current temperature
        const currentTempFahrenheit = data.main.temp;

        // Update current temperature
        document.getElementById('current-temp').textContent = currentTempFahrenheit.toFixed(2);

        // Update current humidity
        document.getElementById('current-humidity').textContent = data.main.humidity;

        // Fetch forecast for tomorrow at 15:00 (3:00 PM)
        const forecastResponse = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=Cozumel,MX&appid=${apiKey}&units=imperial`);
        const forecastData = await forecastResponse.json();

        // Find tomorrow's forecast at 15:00 (3:00 PM)
        const tomorrowForecast = forecastData.list.find(entry => {
            const dateTime = new Date(entry.dt_txt);
            return dateTime.getDay() === (new Date().getDay() + 1) && dateTime.getHours() === 15;
        });

        // Convert Celsius to Fahrenheit for tomorrow's forecast
        const forecastTempFahrenheit = tomorrowForecast.main.temp;

        // Update tomorrow's forecast
        document.getElementById('forecast').textContent = forecastTempFahrenheit.toFixed(2);

        // Display high temperature for the current day in the closeable message
        const tempMaxFahrenheit = data.main.temp_max;
        document.querySelector('.closeable-message').textContent = `Today's high temperature: ${tempMaxFahrenheit.toFixed(2)}°F`;
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

// Function to initialize the weather data fetching
function initializeWeather() {
    fetchWeatherData();

    // Call this function when the DOM is fully loaded
    document.addEventListener('DOMContentLoaded', () => {
        // Closeable message functionality
        const closeButton = document.querySelector('.closeable-message .close-button');
        closeButton.addEventListener('click', () => {
            document.querySelector('.closeable-message').style.display = 'none';
        });
    });
}

// Call initializeWeather when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', initializeWeather);