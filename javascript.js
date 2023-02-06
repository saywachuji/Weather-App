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
  let temperature = Math.round(response.data.temperature.current);
  let mainTemp = document.querySelector("#main-temp");
  let h1 = document.querySelector("h1");
  let city = response.data.city;
  let description = document.querySelector(".weather-description");
  let weatherDescription = response.data.condition.description;
  let firstLetter = weatherDescription.charAt(0);
  firstLetter.toUpperCase()
  let icon = document.querySelector("#main-image");

  celsiusTemperature = response.data.temperature.current;
  document.querySelector("#humidity").innerHTML = response.data.temperature.humidity;
  document.querySelector("#wind").innerHTML = response.data.wind.speed;
  icon.setAttribute("src", `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`);
  icon.setAttribute("alt", response.data.condition.description);
  h1.innerHTML = city;
  mainTemp.innerHTML = `${temperature}°C`;
  description.innerHTML = weatherDescription;

  getForecast(response.data.coordinates)
};

//FUNCTION to convert the time is seconds to days
function formatDay(timestamp){
let date = new Date(timestamp * 1000)
let day = date.getDay();
let days = ["Sun", "Mon","Tues", "Wed", "Thur", "Fri", "Sat"]
return days[day]
};

function displayForecast(response){

  let forecastData = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
 
 forecastData.forEach(function(forecastDay, index){
  if (index < 5){ 
  forecastHTML = forecastHTML + 
  `<div class="col">
  <div class="days">${formatDay(forecastDay.time)}</div>
 <img alt="-"src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${forecastDay.condition.icon}.png">
  <div class="degrees">
  <span>${Math.round(forecastDay.temperature.maximum)}° </span><span id="min-temp">${Math.round(forecastDay.temperature.minimum)}°</span>
  </div>
</div>`;}
 });
   
forecastElement.innerHTML = forecastHTML

};

//FORECAST function gets lat and lon and the connects to the displayWeather function. 
function getForecast(coordinates){
let apiKey = "c635taf5ao3b501623e4fa7bf7fc0f02";
let apiUrl= `https://api.shecodes.io/weather/v1/forecast?lat=${coordinates.latitude}&lon=${coordinates.longitude}&key=${apiKey}`;
axios.get(apiUrl).then(displayForecast)
}

//FUNCTION That searches for the city and is connected to the display function.  
function search(city) {
  let apiKey = "c635taf5ao3b501623e4fa7bf7fc0f02";
  let units = "metric";
  let url = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=${units}`;
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
  let apiKey = "c635taf5ao3b501623e4fa7bf7fc0f02";
  let url = `https://api.shecodes.io/weather/v1/current?lon=${lon}&lat=${lat}&key=${apiKey}`;
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
farenheit.classList.remove("active")
celsius.classList.add("active")
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

