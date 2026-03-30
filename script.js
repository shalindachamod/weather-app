const apiKey = "bee4a482370a2d7d11ec22ab4f542927";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon"); // Icon element එක ගත්තා

async function checkWeather(city) {
    try {
        const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
        var data = await response.json();

        if (response.status == 404) {
            alert("The city name could not be found!");
            return;
        }

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

   
        if (data.weather[0].main == "Clouds") {
            weatherIcon.className = "fa-solid fa-cloud main-icon";
        } else if (data.weather[0].main == "Clear") {
            weatherIcon.className = "fa-solid fa-sun main-icon";
        } else if (data.weather[0].main == "Rain") {
            weatherIcon.className = "fa-solid fa-cloud-showers-heavy main-icon";
        } else if (data.weather[0].main == "Drizzle") {
            weatherIcon.className = "fa-solid fa-cloud-rain main-icon";
        } else if (data.weather[0].main == "Mist") {
            weatherIcon.className = "fa-solid fa-smog main-icon";
        }

    } catch (error) {
        console.error("Error fetching weather data:", error);
    }
}

searchBtn.addEventListener("click", () => {
    if (searchBox.value.trim() !== "") {
        checkWeather(searchBox.value);
    }
});


searchBox.addEventListener("keypress", (e) => {
    if (e.key === 'Enter' && searchBox.value.trim() !== "") {
        checkWeather(searchBox.value);
    }
});