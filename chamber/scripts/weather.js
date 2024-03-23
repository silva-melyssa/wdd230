const currentTemp = document.querySelector('#current-temp');
const weatherDesc = document.querySelector('#weather-desc');
const weatherIcon = document.querySelector('#weather-icon');
const captionDesc = document.querySelector('figcaption');
const weatherContainer = document.getElementById('weather-container');

const currentWeatherUrl = "https://api.openweathermap.org/data/2.5/weather?lat=-23.6546&lon=-46.6101&units=imperial&appid=137eb57a40fdc70ca2462601b7246a2d";
const forecastUrl = "https://api.openweathermap.org/data/2.5/forecast?lat=-23.6546&lon=-46.6101&units=imperial&appid=137eb57a40fdc70ca2462601b7246a2d";

async function fetchData(url) {
    try {
        const response = await fetch(url);
        if (response.ok) {
            return await response.json();
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log(error);
    }
}

async function apiFetch() {
    const [currentData, forecastData] = await Promise.all([fetchData(currentWeatherUrl), fetchData(forecastUrl)]);
    displayCurrentWeather(currentData);
    displayThreeDayForecast(forecastData.list);
}

function displayCurrentWeather(currentData) {
    const temperatureFahrenheit = currentData.main.temp;
    const windSpeed = currentData.wind.speed;

    // Display current temperature
    currentTemp.innerHTML = `${temperatureFahrenheit}&deg;F`;

    // Calculate and display wind chill
    const windChillValue = calculateWindChill(temperatureFahrenheit, windSpeed);
    document.getElementById('wind-chill').innerText = windChillValue;

    // Display weather description and icon
    weatherDesc.textContent = currentData.weather[0].description;
    const iconsrc = `https://openweathermap.org/img/w/${currentData.weather[0].icon}.png`;
    weatherIcon.setAttribute('src', iconsrc);
    weatherIcon.setAttribute('alt', currentData.weather[0].description);

}

function displayThreeDayForecast(forecastList) {
    // Clear previous forecast
    weatherContainer.innerHTML = '';

    // Get today's date
    const today = new Date();
    // Get tomorrow's date
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    // Get the day after tomorrow's date
    const dayAfterTomorrow = new Date(today);
    dayAfterTomorrow.setDate(today.getDate() + 2);

    // Filter forecast data for the next three days
    const filteredForecast = forecastList.filter(day => {
        const forecastDate = new Date(day.dt * 1000);
        // Check if the forecast date is today, tomorrow, or the day after tomorrow
        return (
            forecastDate.getDate() === today.getDate() ||
            forecastDate.getDate() === tomorrow.getDate() ||
            forecastDate.getDate() === dayAfterTomorrow.getDate()
        );
    });

    // Object to store forecast data for each day
    const forecastDataByDate = {};

    // Group forecast data by date
    filteredForecast.forEach(day => {
        const forecastDate = new Date(day.dt * 1000).toLocaleDateString();
        if (!forecastDataByDate[forecastDate]) {
            forecastDataByDate[forecastDate] = day;
        }
    });

    // Display forecast for each day
    Object.values(forecastDataByDate).forEach(dayForecast => {
        const weatherBox = document.createElement('div');
        weatherBox.classList.add('weather-box');

        const date = new Date(dayForecast.dt * 1000);
        const options = { weekday: 'short', month: 'short', day: 'numeric' };
        const formattedDate = date.toLocaleDateString('en-US', options);

        weatherBox.innerHTML = `
            <div class="date">${formattedDate}</div>
            <img class="weather-icon" src="https://openweathermap.org/img/w/${dayForecast.weather[0].icon}.png" alt="${dayForecast.weather[0].description}">
            <div class="temperature">${Math.round(dayForecast.main.temp)}°F</div>
            <div class="description">${dayForecast.weather[0].description}</div>
        `;

        weatherContainer.appendChild(weatherBox);
    });
}

apiFetch();
