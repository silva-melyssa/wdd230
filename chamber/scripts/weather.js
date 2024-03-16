const currentTemp = document.querySelector('#current-temp');
const weatherDesc = document.querySelector('#weather-desc'); // Added selector for weather description
const weatherIcon = document.querySelector('#weather-icon');
const captionDesc = document.querySelector('figcaption');
const weatherContainer = document.getElementById('weather-container');
const banner = document.getElementById('banner');

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
    currentTemp.innerHTML = `${currentData.main.temp}&deg;F`;
    weatherDesc.textContent = currentData.weather[0].description;
    const iconsrc = `https://openweathermap.org/img/w/${currentData.weather[0].icon}.png`;
    weatherIcon.setAttribute('src', iconsrc);
    weatherIcon.setAttribute('alt', currentData.weather[0].description);
}

function displayThreeDayForecast(forecastList) {
    // Clear previous forecast
    weatherContainer.innerHTML = '';

    // Display weather for the next 3 days, starting from the second item
    const threeDays = forecastList.slice(1, 4);
    threeDays.forEach(day => {
        const weatherBox = document.createElement('div');
        weatherBox.classList.add('weather-box');

        const date = new Date(day.dt * 1000);
        const options = { weekday: 'short', month: 'short', day: 'numeric' };
        const formattedDate = date.toLocaleDateString('en-US', options);

        weatherBox.innerHTML = `
            <div class="date">${formattedDate}</div>
            <img class="weather-icon" src="https://openweathermap.org/img/w/${day.weather[0].icon}.png" alt="${day.weather[0].description}">
            <div class="temperature">${Math.round(day.main.temp)}°F</div>
            <div class="description">${day.weather[0].description}</div>
        `;

        weatherContainer.appendChild(weatherBox);
    });
}



// Check if today is Monday, Tuesday, or Wednesday to display the banner
const today = new Date().getDay();
if (today >= 1 && today <= 3) { // 0 is Sunday, 1 is Monday, 2 is Tuesday, 3 is Wednesday
    banner.style.display = 'block';
}

apiFetch();
