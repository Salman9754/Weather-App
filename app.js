
let cityName;

function search() {
  cityName = document.getElementById("searchId").value.trim();
  let city = document.getElementById("city");
  console.log(cityName);
  
  if (cityName) {
    city.innerHTML = cityName;
    getWeather();
  } else {
    alert("Please enter a city");
  }
}

async function getWeather() {
  const citySearchUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=244006e372fb520e56e50b3032f7bcf1&units=metric`;
  let weatherWindow = document.getElementById('weather-window');
  let errorWindow = document.getElementById('error-window');
  errorWindow.style.display = 'none';

  try {
    let response = await fetch(citySearchUrl);
    let data = await response.json();

    weatherWindow.style.display = 'block';
    errorWindow.style.display = 'none';

    let temperature = document.getElementById("temp");
    temperature.innerHTML = Math.round(data.main.temp) + "<sup>&#176;c</sup>";
    let humidity = document.getElementById("hum");
    humidity.innerHTML = Math.round(data.main.humidity);
    let wind = document.getElementById("Wind");
    wind.innerHTML = data.wind.speed;
  } catch (error) {
    console.log(error);
    weatherWindow.style.display = 'none';
    errorWindow.setAttribute("style", "display: block !important;");
  }
}