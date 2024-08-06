const container = document.querySelector(".container");
const searchButton = document.querySelector(".search-box button");
const searchInput = document.querySelector(".search-box input");
const weatherBox = document.querySelector(".weather-box");
const weatherDetails = document.querySelector(".weather-details");

const APIKey = "017eed3a78556ae3654908ec232e23f9";

// Function to fetch and display weather data
function fetchWeather() {
  const city = searchInput.value.trim();

  if (city === "") {
    return;
  }

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`
  )
    .then((response) => response.json())
    .then((json) => {
      if (json.cod === "404") {
        alert("City not found.");
        return;
      }

      const image = document.querySelector(".weather-box img");
      const temperature = document.querySelector(".weather-box .temperature");
      const description = document.querySelector(".weather-box .description");
      const humidity = document.querySelector(".weather-details .humidity");
      const wind = document.querySelector(".weather-details .wind");

      // Update temperature and description
      temperature.innerHTML = `${json.main.temp}°C`;
      description.innerHTML = json.weather[0].description;

      // Update humidity and wind details
      humidity.innerHTML = `Humidity: ${json.main.humidity}%`;
      wind.innerHTML = `Wind Speed: ${json.wind.speed} m/s`;

      // Log the weather data for debugging
      console.log(json);

      // Determine which image to show based on the weather
      switch (json.weather[0].main) {
        case "Clear":
          image.src = "../img/sun.png";
          break;

        case "Rain":
          image.src = "../img/rain.png";
          break;

        case "Snow":
          image.src = "../img/snow.png";
          break;

        case "Clouds":
          image.src = "../img/cloud.png";
          break;

        case "Wind":
        case "Haze":
          image.src = "../img/wind.png";
          break;

        default:
          image.src = "../img/cloud.png";
      }
    })
    .catch((error) => {
      console.error("Error fetching weather data:", error);
    });
}

// Add click event listener to the search button
searchButton.addEventListener("click", fetchWeather);

// Add keypress event listener to the input field
searchInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    fetchWeather();
  }
});
