let currentDate = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let day = days[currentDate.getDay()];
let todayDay = currentDate.getDate();
let hour = currentDate.getHours();
let minutes = currentDate.getMinutes();

if (minutes < 10) {
  minutes = `0${minutes}`;
}

if (hour < 10) {
  hour = `0${hour}`;
}

let dateText = document.querySelector(".today-date");
dateText.innerHTML = `${day} ${todayDay}, ${hour}:${minutes}`;

//SEARCH

function displayWeather(response) {
  let temperature = Math.floor(response.data.main.temp);
  let mainTemp = document.querySelector("#main-temp");
  let h1 = document.querySelector("h1");
  let city = response.data.name;
  let description = document.querySelector(".weather-description");
  let weatherDescription = response.data.weather[0].main;
  h1.innerHTML = city;
  mainTemp.innerHTML = `${temperature}°C`;
  description.innerHTML = weatherDescription;
}

function handleSearch(event) {
  event.preventDefault();
  let city = document.querySelector("#city").value;
  search(city);
}

function search(city) {
  let apiKey = "5fbbad2bef547e3baeb40fbbf78a01ea";
  let units = "metric";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(url).then(displayWeather);
}
let form = document.querySelector("form");
form.addEventListener("submit", handleSearch);

search("New York");

function currentWeather(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let lat = latitude.toFixed(2);
  let lon = longitude.toFixed(2);
  let apiKey = "5fbbad2bef547e3baeb40fbbf78a01ea";
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(url).then(displayWeather);
}

function getLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(currentWeather);
}
let button = document.querySelector("button");
button.addEventListener("click", getLocation);
