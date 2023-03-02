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

function displayCityTemperature(response) {
  console.log(response.data);
  let iconElement = document.querySelector("#icon");
  document.querySelector("#city-name").innerHTML = response.data.name;
  document.querySelector("#current-temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#humidity").innerHTML = Math.round(
    response.data.main.humidity
  );

  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/10d@2x.png`
  );
}

function searchCity(cityName) {
  let apiKey = "c357fbc1652ba928fb4889b9f943b38c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayCityTemperature);
}

function searchSubmit(event) {
  event.preventDefault();
  let cityName = document.querySelector("#searching-city").value;
  searchCity(cityName);
}
function searchCurrentLocation(position) {
  let apiKey = "c357fbc1652ba928fb4889b9f943b38c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayCityTemperature);
}

function showCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchCurrentLocation);
}

let searchForm = document.querySelector("#search-engine");
searchForm.addEventListener("submit", searchSubmit);

let button = document.querySelector("#current-location-button");
button.addEventListener("click", showCurrentLocation);

searchCity("london");
