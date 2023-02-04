//DATE: time changes in real time, day, hour,mins. 

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

//Function displays the current info of the city searched.
function displayWeather(response) {
  let temperature = Math.floor(response.data.main.temp);
  let mainTemp = document.querySelector("#main-temp");
  let h1 = document.querySelector("h1");
  let city = response.data.name;
  let description = document.querySelector(".weather-description");
  let weatherDescription = response.data.weather[0].main;
  let icon = document.querySelector("#main-image");

  celsiusTemperature = response.data.main.temp;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = response.data.wind.speed;
  icon.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  icon.setAttribute("alt", response.data.weather[0].main);
  h1.innerHTML = city;
  mainTemp.innerHTML = `${temperature}°C`;
  description.innerHTML = weatherDescription;
}


//FUNCTION That searches for the city and is connected to the display function.  
function search(city) {
  let apiKey = "5fbbad2bef547e3baeb40fbbf78a01ea";
  let units = "metric";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(url).then(displayWeather);
}

//SEARCH function when the search input is submitted.
function handleSearch(event) {
  event.preventDefault();
  let city = document.querySelector("#city").value;
  search(city);
}
let form = document.querySelector("form");
form.addEventListener("submit", handleSearch);

search("New York");

// GEOLOCATION function to detect your current geolocation.It's connected with the getLocation function.
function currentWeather(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let lat = latitude.toFixed(2);
  let lon = longitude.toFixed(2);
  let apiKey = "5fbbad2bef547e3baeb40fbbf78a01ea";
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(url).then(displayWeather);
}

//EVENT function: triggers the geolocation feature on the browser. This function calls another function. 
function getLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(currentWeather);
}
let button = document.querySelector("button");
button.addEventListener("click", getLocation);

//FARENHEIT CONVERSION

const convertCelsius = (event) =>{
  event.preventDefault();
  let temperatureElement = document.querySelector("#main-temp");
temperatureElement.innerHTML = Math.floor(celsiusTemperature) + "°C";
}
const convertFarenheit = (event) =>{
event.preventDefault();
let farenheitTemp = (celsiusTemperature * 9/5) + 32;
let temperatureElement = document.querySelector("#main-temp");
temperatureElement.innerHTML = Math.floor(farenheitTemp) + "°F";
celsius.classList.remove("active")
farenheit.classList.add("active")
}
let farenheit = document.querySelector("#farenheit");
farenheit.addEventListener("click", convertFarenheit);

let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", convertCelsius)

let celsiusTemperature = null; 