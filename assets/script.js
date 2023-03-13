const key = "535df8ab4a3a231eb4490b2d8179ccf5";
const searchBTN = document.querySelector('.button-primary');
const cityName = document.querySelector('#cityName');
const iconEl = document.querySelector(".weather-icon");
const tempEL = document.querySelector(".temperature-value p");
const windEl = document.querySelector(".temperature-description p");
const humidtyEl = document.querySelector(".location p");
let date = dayjs().format('dddd, MMMM D, YYYY');

$("#currentDay").text(date);

//Get city input from user and save it to local storage for later
$(".searchBtn").on("click", function () {
    var cityName = $(this).siblings(".cityName").val();
    localStorage.setItem(cityName);

    getLatLon(cityName);
});


// Turn city name into lat and lon cords
function getLatLon(cityName){
    let api = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=5&appid=${key}`;
    
    fetch(api)
        .then(function(response){
            let data = response.json();
            return data;
        })
        .then(function(data){
            lat = data.lat;
            lon = data.lon;
        })
        .then(function(){
            getWeather();
        });
};

//Take lat and lon cords and get weather details
//I am presented with a 5-day forecast that displays the date, 
// an icon representation of weather conditions, the temperature, the wind speed, and the humidity
function getWeather(lat,lon){
    let api = `https://api.openweathermap.org/data/2.5/weather?${lat}&${lon}&appid=${key}&units=imperial`;
    
    fetch(api)
        .then(function(response){
            let data = response.json();
            return data;
        })
        .then(function(data){
            weather.city = data.name;
            weather.iconId = data.weather[0].icon;
            weather.temperature.value = data.main.temp;
            weather.humidity = data.main.humidity;
            weather.wind = data.wind.speed;
        })
        .then(function(){
            displayWeather();
        });
};

//Take weather details and display to screen
function displayWeather(){
    cityName = "";
    iconEl.innerHTML = `<img src="icons/${weather.iconId}.png"/>`;
    tempEl.innerHTML = `${weather.temperature.value}°<span>F</span>`;
    windEl.innerHTML = "";
    humidtyEl.innerHTML = "";
};


//Display saved search list to screen
function savedData() {

};


//Display saved search result to screen

