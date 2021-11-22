const apiKey = "11dc52a95fa797bda83ead455ac98597";
const cities = [];
const cityFormEl = document.getElementById("city-search-form");
const citySearchInputEl = document.getElementById("searched-city");
const cityInputEl = document.getElementById("city");
const weatherContainerEl = document.getElementById("current-weather-container");
const forecastTitle = document.getElementById("forecast");
const forecastContainerEl = document.getElementById("fiveday-container");

// make initial api call
const getCityWeather = function (city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`
    fetch(url)
        .then(function (response) {
            response.json().then(function (data) {
                displayWeatherData(data, city);
            });
        });
};

// submit search for city
const submitSearch = function (e) {
    e.preventDefault();
    const city = cityInputEl.value.trim();
    getCityWeather(city);
    fiveDays(city);
    saveSearch();
};

const saveSearch = function () {
    localStorage.setItem("cities", JSON.stringify(cities));
};

// display the weather data from city search
function displayWeatherData(weather, searchCity) {
    // console.log(weather);
    // clear old inputs when search is submitted
    weatherContainerEl.textContent = "";
    citySearchInputEl.textContent = searchCity;

    //create element to hold temperature data
    const temperatureEl = document.createElement("span");
    temperatureEl.textContent = "Temperature: " + weather.main.temp + " °F";
    temperatureEl.classList = "list-group-item"
    weatherContainerEl.appendChild(temperatureEl);

    //create element to hold Humidity data
    const humidityEl = document.createElement("span");
    humidityEl.textContent = "Humidity: " + weather.main.humidity + " %";
    humidityEl.classList = "list-group-item"
    weatherContainerEl.appendChild(humidityEl);

    //create element to hold Wind data
    const windSpeedEl = document.createElement("span");
    windSpeedEl.textContent = "Wind Speed: " + weather.wind.speed + " MPH";
    windSpeedEl.classList = "list-group-item"
    weatherContainerEl.appendChild(windSpeedEl);

    //create  image element
    const weatherIcon = document.createElement("img")
    weatherIcon.setAttribute("src", `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`);
    citySearchInputEl.appendChild(weatherIcon);

    // grab lat and lon for uv index
    const lat = weather.coord.lat;
    const lon = weather.coord.lon;
    uvIndex(lat, lon);
};

const uvIndex = function (lat, lon) {
    const url = `https://api.openweathermap.org/data/2.5/uvi?appid=${apiKey}&lat=${lat}&lon=${lon}`
    fetch(url)
        .then(function (response) {
            response.json().then(function (data) {
                displayUvIndex(data)
                // console.log(data)
            });
        });

}
const displayUvIndex = function (index) {
    const uvIndexEl = document.createElement("div");
    uvIndexEl.textContent = "UV Index: "
    uvIndexEl.classList = "list-group-item"
    uvIndexValue = document.createElement("span")
    uvIndexValue.textContent = index.value;
    uvIndexEl.appendChild(uvIndexValue);

    //append index to current weather
    weatherContainerEl.appendChild(uvIndexEl);
};


const fiveDays = function (city) {
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${apiKey}`
    fetch(url)
        .then(function (response) {
            response.json().then(function (data) {
                displayfiveDays(data);
            });
        });
};

const displayfiveDays = function (weather) {
    forecastContainerEl.textContent = ""
    forecastTitle.textContent = "Next 5 Day Forecast:";

    const forecast = weather.list;
    for (var i = 5; i < forecast.length; i = i + 8) {
        const dailyForecast = forecast[i];


        const forecastEl = document.createElement("div");
        forecastEl.classList = "card text-white bg-info mb-3";

        //console.log(dailyForecast)

        //create date element
        const forecastDate = document.createElement("h5")
        forecastDate.textContent = moment.unix(dailyForecast.dt).format("MMM D, YYYY");
        forecastDate.classList = "card-header text-center"
        forecastEl.appendChild(forecastDate);

        //create an image element
        const forecastWeatherIcon = document.createElement("img")
        forecastWeatherIcon.classList = "card-body text-center";
        forecastWeatherIcon.setAttribute("src", `https://openweathermap.org/img/wn/${dailyForecast.weather[0].icon}@2x.png`);
        forecastEl.appendChild(forecastWeatherIcon);


        //create temperature 
        const forecastTempEl = document.createElement("span");
        forecastTempEl.classList = "card-body text-center";
        forecastTempEl.textContent = dailyForecast.main.temp + " °F";
        forecastEl.appendChild(forecastTempEl);

        // create humidity 
        const forecastHumEl = document.createElement("span");
        forecastHumEl.classList = "card-body text-center";
        forecastHumEl.textContent = dailyForecast.main.humidity + "  % humid";
        forecastEl.appendChild(forecastHumEl);

        // console.log(forecastEl);
        //append to five day container
        forecastContainerEl.appendChild(forecastEl);
    };

};


cityFormEl.addEventListener("submit", submitSearch);