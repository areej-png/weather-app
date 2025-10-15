// ====== WEATHER APP SCRIPT ======

// Select elements
const weatherForm = document.getElementById('weatherForm');
const cityInput = document.getElementById('cityInput');
const weatherResult = document.getElementById('weatherResult');
const loadingSpinner = document.getElementById('loading');

// Handle form submission
weatherForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const city = cityInput.value.trim();
    if (!city) return;

    // Show spinner and clear old results
    loadingSpinner.classList.remove('hidden');
    weatherResult.innerHTML = '';

    const apiKey = 'cf13bc137277fcd22c4c98a55c95e7a4'; // 🔑 Replace with your actual OpenWeatherMap API key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    console.log("🔍 Checking API URL:", url);
    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error('City not found. Please check the name and try again.');
        }

        const data = await response.json();

        // Hide spinner after data loads
        loadingSpinner.classList.add('hidden');

        // Display weather info
        weatherResult.innerHTML = `
            <div class="weather-info">
                <h2>${data.name}, ${data.sys.country}</h2>
                <p><strong>Temperature:</strong> ${data.main.temp}°C</p>
                <p><strong>Condition:</strong> ${data.weather[0].main}</p>
                <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
                <p><strong>Wind Speed:</strong> ${data.wind.speed} m/s</p>
                <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="${data.weather[0].description}">
            </div>
        `;
    } catch (error) {
        // Hide spinner and show error message
        loadingSpinner.classList.add('hidden');
        weatherResult.innerHTML = `<p class="error">${error.message}</p>`;
    }
});


// ====== BURGER MENU TOGGLE ======
const burger = document.querySelector('.burger');
const navLinks = document.querySelector('.nav-links');

burger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

