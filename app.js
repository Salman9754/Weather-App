function myAlert(icon, title, text) {
  swal.fire({
    icon: icon,
    title: title,
    text: text,
  });
}
window.onload = function () {
  if (navigator) {
    navigator.geolocation.getCurrentPosition(getUserLocation, showError);
  }
};
async function getUserLocation(data) {
  const lat = data.coords.latitude;
  const lon = data.coords.longitude;
  checkLocationWeather(lat, lon);
}
function showError() {
  myAlert("error", "Oops", "can't get live location search manually");
}
async function checkLocationWeather(lat, lon) {
  const LocationUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=244006e372fb520e56e50b3032f7bcf1&units=metric`;
  try {
    const response = await fetch(LocationUrl);
    const resultJson = await response.json();
    showWeather(resultJson);
  } catch (error) {
    console.log(error);
    myAlert("error", "Oops", "something went wrong");
  }
}
let cityName;
function search() {
  cityName = document.getElementById("searchId").value.trim();
  if (cityName) {
  getCityWeather()
  } else {
    myAlert("error", "Oops", "Enter Location");
  }
}
async function getCityWeather() {
  const citySearchUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=244006e372fb520e56e50b3032f7bcf1&units=metric`;
  try {
    const response = await fetch(citySearchUrl);
    const data = await response.json();
    showWeather(data);
  } catch (error) {
    myAlert("error", "Oops...", "Can't retrieve city data");
  }
}

function showWeather(data) {
  const weatherWindow = document.getElementById("weather-window");
  const temperature = document.getElementById("temp");
  const humidity = document.getElementById("hum");
  const wind = document.getElementById("Wind");
  const weatherCity = document.getElementById("weatherCity");
  const weatherImg = document.getElementById("weather-img");
  const nameOfCity = document.getElementById("nameOfCity");
  weatherWindow.style.display = "block";
  temperature.innerHTML = `${Math.round(data.main.temp)}<sup>&#176;c</sup>`;
  nameOfCity.innerHTML = data.name;
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
    case "Snow":
      weatherImg.src = "Assets/snow.png";
      break;
    default:
      weatherImg.src = "Assets/cloud.png";
      break;
  }
}
