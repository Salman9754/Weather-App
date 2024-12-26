let cityName;

function search() {
  cityName = document.getElementById("searchId").value.trim();
  if (cityName) {
    getWeather();
  } else {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Enter Location!",
    });
  }
}

async function getWeather() {
  const citySearchUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=244006e372fb520e56e50b3032f7bcf1&units=metric`;
  const weatherWindow = document.getElementById("weather-window");
  const errorWindow = document.getElementById("error-window");
  const temperature = document.getElementById("temp");
  const humidity = document.getElementById("hum");
  const wind = document.getElementById("Wind");
  const weatherCity = document.getElementById("weatherCity");
  const weatherImg = document.getElementById("weather-img");

  errorWindow.style.display = "none";

  try {
    const response = await fetch(citySearchUrl);
    const data = await response.json();

    weatherWindow.style.display = "block";
    temperature.innerHTML = `${Math.round(data.main.temp)}<sup>&#176;c</sup>`;
    humidity.innerHTML = Math.round(data.main.humidity);
    wind.innerHTML = data.wind.speed;
    weatherCity.innerHTML = data.weather[0].main;

    switch (data.weather[0].main) {
      case "Clouds":
        weatherImg.src = "Assets/snow.png";
        break;
      case "Clear":
        weatherImg.src = "Assets/clear.png";
        break;
      case "Rain":
        weatherImg.src = "Assets/rain.png";
        break;
      case "Smoke":
        weatherImg.src = "Assets/mist.png";
        break;
      case "Haze":
        weatherImg.src = "Assets/snow.png";
        break;
      default:
        weatherImg.src = "Assets/cloud.png";
        break;
    }
  } catch (error) {
    console.log(error);
    weatherWindow.style.display = "none";
    errorWindow.setAttribute("style", "display: block !important;");
  }
}
