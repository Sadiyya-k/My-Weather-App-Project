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

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHtml = `<div class = "row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHtml =
        forecastHtml +
        ` 

                <div class="col-2">
               <div class="card">
                <div class="forecast-container">
                  <div class="weather-forecast-date">${formatDay(
                    forecastDay.time
                  )}</div>               
                  <img
                    src="${forecastDay.condition.icon_url}"
                    alt=""
                    width="70"
                  /> 
                  <div class="weather-forecast-temperatures">
                    <span class="weather-forecast-temperature-max"> ${Math.round(
                      forecastDay.temperature.maximum
                    )}°</span>
                    <span class="weather-forecast-temperature-min"> ${Math.round(
                      forecastDay.temperature.minimum
                    )}°</span>
                    </div>
                    </div>
                  </div>
                </div>                    

          `;
    }
  });
  forecastHtml = forecastHtml + `</div>`;
  forecastElement.innerHTML = forecastHtml;
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "fbdaa6o7f8db80d139ftfd763b2b9e74";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
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
  getForecast(response.data.coordinates);
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
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  currentTemperature.innerHTML = Math.round(fahrenheitTemperature);

  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");

  forecastCelsius.classList.remove("d-block");
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  let currentTemperature = document.querySelector("#current-temperature");
  currentTemperature.innerHTML = Math.round(celsiusTemperature);

  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");

  forecastFahrenheit.classList.add("d-none");
  forecastFahrenheit.classList.remove("d-block");
}

function newQuote(event) {
  event.preventDefault();

  let quotes = [
    `Wherever you go, no matter what the weather, always bring your own sunshine. - Anthony J. D'Angelo`,
    `Success is not final; failure is not fatal: It is the courage to continue that counts. — Winston S. Churchill`,
    `It is better to fail in originality than to succeed in imitation. — Herman Melville`,
    `The road to success and the road to failure are almost exactly the same. — Colin R. Davis`,
    `You are never too old to set another goal or to dream a new dream. — Malala Yousafzai`,
    `Success usually comes to those who are too busy looking for it. — Henry David Thoreau`,
    `Don’t let yesterday take up too much of today. — Will Rogers`,
    `God does not burden any soul with more than it can bear. - Quran 2:286`,
    `If you are working on something that you really care about, you don’t have to be pushed. The vision pulls you. — Steve Jobs`,
    `Concentrate all your thoughts upon the work in hand. The sun's rays do not burn until brought to a focus. — Alexander Graham Bell`,
    `Just one small positive thought in the morning can change your whole day. — Dalai Lama`,
    `Do not lose hope, nor be sad. Quran 3:139`,
    `Opportunities don't happen, you create them. — Chris Grosser`,
    `Keep your face always toward the sunshine, and shadows will fall behind you. — Walt Whitman`,
  ];
  let randomNumber = Math.floor(Math.random() * quotes.length);
  document.getElementById(`display-quote`).innerHTML = quotes[randomNumber];
}

let quoteButton = document.querySelector("#quote-button");
quoteButton.addEventListener("click", newQuote);

let celsiusTemperature = null;

let button = document.querySelector("#current-location-button");
button.addEventListener("click", showCurrentLocation);

let searchForm = document.querySelector("#search-engine");
searchForm.addEventListener("submit", searchSubmit);

let forecastFahrenheit = document.querySelector("#forecast-farenheit");
let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let forecastCelsius = document.querySelector("#forecast");
let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

searchCity("london");
