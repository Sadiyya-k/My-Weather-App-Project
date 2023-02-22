function showWeather(response) {
  console.log(response.data);
  let currentTemperature = response.data.main.temp;
  let temperatureElement = document.querySelector("#current-temp");
  temperatureElement.innerHTML = `${Math.round(currentTemperature)}°C`;

  let cityName = response.data.name;
  let citySearched = document.querySelector("#enter-city-name");
  citySearched.innerHTML = `${cityName}`;
}

function showCitySearched(position) {
  let theLatitude = position.coords.latitude;
  let theLongitude = position.coords.longitude;
  let apiKey = "c357fbc1652ba928fb4889b9f943b38c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?qlat=${theLatitude}&lon=${theLongitude}&city name=${cityName}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showWeather);
}
function showCurrentLocation() {
  navigator.geolocation.getCurrentPosition(showCitySearched);
}

let button = document.querySelector("#current-location-button");
button.addEventListener("click", showCurrentLocation);
