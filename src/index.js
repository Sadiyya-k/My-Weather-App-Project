function formatDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let dates = date.getDate();
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let month = months[date.getMonth()];
  let year = date.getFullYear();
  let formattedTime = `${hours}:${minutes}`;
  let formattedDate = `${dates} ${month} ${year}`;

  return { date: formattedDate, time: formattedTime };
}
let dateDisplayed = document.querySelector("#date-displayed");
let timeDisplayed = document.querySelector("#time-displayed");
let currentTime = new Date();

let formattedDateTime = formatDate(currentTime);

dateDisplayed.innerHTML = formattedDateTime.date;
timeDisplayed.innerHTML = formattedDateTime.time;

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");

  let forecastHtml = `<div class = "row">`;
  let days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
  days.forEach(function (day) {
    forecastHtml =
      forecastHtml +
      ` 
                <div class="col-2">
                  <div class="weather-forecast-date">${day}</div>
                  <img
                    src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/rain-day.png"
                    alt=""
                    width="50"
                  />
                  <div class="weather-forecast-temperatures">
                    <span class="weather-forecast-temperature-max"> 5°</span>
                    <span class="weather-forecast-temperature-min"> 3°</span>
                  </div>
                </div>
          `;
  });

  forecastHtml = forecastHtml + `</div>`;
  forecastElement.innerHTML = forecastHtml;
}

function displayCityTemperature(response) {
  let iconElement = document.querySelector("#icon");

  celsiusTemperature = response.data.temperature.current;

  document.querySelector("#city-name").innerHTML = response.data.city;
  document.querySelector("#current-temperature").innerHTML =
    Math.round(celsiusTemperature);
  document.querySelector("#description").innerHTML =
    response.data.condition.description;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#humidity").innerHTML = Math.round(
    response.data.temperature.humidity
  );

  iconElement.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/rain-day.png`
  );
}

function searchCity(cityName) {
  let apiKey = "fbdaa6o7f8db80d139ftfd763b2b9e74";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${cityName}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayCityTemperature);
}

function searchSubmit(event) {
  event.preventDefault();
  let cityName = document.querySelector("#searching-city").value;
  searchCity(cityName);
}
function searchCurrentLocation(position) {
  let apiKey = "fbdaa6o7f8db80d139ftfd763b2b9e74";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${position.coords.longitude}&lat=${position.coords.latitude}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayCityTemperature);
}

function showCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchCurrentLocation);
}

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let currentTemperature = document.querySelector("#current-temperature");

  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  currentTemperature.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let currentTemperature = document.querySelector("#current-temperature");
  currentTemperature.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let button = document.querySelector("#current-location-button");
button.addEventListener("click", showCurrentLocation);

let searchForm = document.querySelector("#search-engine");
searchForm.addEventListener("submit", searchSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

searchCity("london");
displayForecast();
