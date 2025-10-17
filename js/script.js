// ====== WEATHER APP SCRIPT (Async/Await + Full Error Handling) ======

// Select elements
const weatherForm = document.getElementById('weatherForm');
const cityInput = document.getElementById('cityInput');
const weatherResult = document.getElementById('weatherResult');
const loadingSpinner = document.getElementById('loading');

// ---- Helper: Fetch with timeout using AbortController ----
async function fetchWithTimeout(url, options = {}, timeout = 8000) {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);

    try {
        const response = await fetch(url, { ...options, signal: controller.signal });
        clearTimeout(id);

        if (!response.ok) {
            throw new Error(`Network error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();

        // API-level error (OpenWeather may return 404 inside JSON)
        if (data.cod && data.cod !== 200) {
            throw new Error(data.message || "Unable to fetch weather data.");
        }

        return data;
    } catch (error) {
        clearTimeout(id);
        if (error.name === "AbortError") {
            throw new Error("Request timed out. Please try again.");
        }
        throw error; // Re-throw for caller to handle
    }
}

// ---- Handle Form Submission ----
weatherForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const city = cityInput.value.trim();
    if (!city) return;

    // Show spinner and clear old results
    loadingSpinner.classList.remove("hidden");
    weatherResult.innerHTML = "";

    const apiKey = "cf13bc137277fcd22c4c98a55c95e7a4"; // 🔑 Replace with your actual key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
        city
    )}&appid=${apiKey}&units=metric`;

    console.log("🔍 Checking API URL:", url);

    try {
        const data = await fetchWithTimeout(url);

        // Hide spinner after successful data load
        loadingSpinner.classList.add("hidden");

        // Display weather info
        weatherResult.innerHTML = `
            <div class="weather-info">
                <h2>${data.name}, ${data.sys.country}</h2>
                <p><strong>Temperature:</strong> ${data.main.temp}°C</p>
                <p><strong>Condition:</strong> ${data.weather[0].main}</p>
                <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
                <p><strong>Wind Speed:</strong> ${data.wind.speed} m/s</p>
                <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png"
                     alt="${data.weather[0].description}">
            </div>
        `;
    } catch (error) {
        // Hide spinner and show user-friendly error
        loadingSpinner.classList.add("hidden");
        weatherResult.innerHTML = `<p class="error">⚠️ ${error.message}</p>`;
        console.error("❌ Weather fetch error:", error);
    }
});

// ====== BURGER MENU TOGGLE ======
const burger = document.querySelector(".burger");
const navLinks = document.querySelector(".nav-links");

burger.addEventListener("click", () => {
    navLinks.classList.toggle("active");
}); 