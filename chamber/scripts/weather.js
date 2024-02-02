document.addEventListener("DOMContentLoaded", function () {
    const apiKey = "8c4238c81c3f59d89e645273ddc49d08";
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=-23.5489&lon=-46.6388&cnt=7&appid=${apiKey}`;

    // Fetch weather data
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const forecast = data.list.filter(item => item.dt_txt.includes("12:00:00"));

            // Display weather for the next 7 days
            const container = document.getElementById('weather-container');

            forecast.slice(0, 7).forEach(day => {
                const weatherBox = document.createElement('div');
                weatherBox.classList.add('weather-box');

                const date = new Date(day.dt * 1000);
                const options = { weekday: 'short', month: 'short', day: 'numeric' };
                const formattedDate = date.toLocaleDateString('en-US', options);

                weatherBox.innerHTML = `
                    <div class="date">${formattedDate}</div>
                    <img class="weather-icon" src="http://openweathermap.org/img/w/${day.weather[0].icon}.png" alt="${day.weather[0].description}">
                    <div class="temperature">${Math.round(day.main.temp)}°C</div>
                    <div class="description">${day.weather[0].description}</div>
                `;

                container.appendChild(weatherBox);
            });
        })
        .catch(error => console.error("Error fetching weather data:", error));
});
