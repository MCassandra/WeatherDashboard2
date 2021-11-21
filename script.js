const apiKey = "11dc52a95fa797bda83ead455ac98597";
const cities = [];
const cityFormEl=document.querySelector("#city-search-form");
const citySearchInputEl = document.querySelector("#searched-city");
const  cityInputEl=document.querySelector("#city");
const weatherContainerEl=document.querySelector("#current-weather-container");


// make initial api call
const getCityWeather = function(city){
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`

    fetch(url)
    .then(function(response){
        response.json().then(function(data){
            displayWeatherData(data, city);
        });
    });
};

// submit search for city
const submitSearch = function(e){
    e.preventDefault();
    const city = cityInputEl.value.trim();
    getCityWeather(city)
}

// display the weather data from city search
function displayWeatherData(weather,searchCity){
	// console.log(weather);
    // clear old inputs when search is submitted
    weatherContainerEl.textContent= "";  
   citySearchInputEl.textContent=searchCity;

    //create a span element to hold temperature data
    const temperatureEl = document.createElement("span");
    temperatureEl.textContent = "Temperature: " + weather.main.temp + " °F";
    temperatureEl.classList = "list-group-item"
    weatherContainerEl.appendChild(temperatureEl);
      //create a span element to hold Humidity data
   const humidityEl = document.createElement("span");
   humidityEl.textContent = "Humidity: " + weather.main.humidity + " %";
   humidityEl.classList = "list-group-item"
   weatherContainerEl.appendChild(humidityEl);
     //create a span element to hold Wind data
     const windSpeedEl = document.createElement("span");
     windSpeedEl.textContent = "Wind Speed: " + weather.wind.speed + " MPH";
     windSpeedEl.classList = "list-group-item"
     weatherContainerEl.appendChild(windSpeedEl);
    // const lat = weather.coord.lat;
  	// const lon = weather.coord.lon;
  	// const description = description.weather[0].description;
  	// const icon = json.weather[0].icon;
  	// const imageSRC = `http://openweathermap.org/img/wn/${icon}@2x.png`;
  	// const img = document.createElement("img");
        //create an image element
   const weatherIcon = document.createElement("img")
   weatherIcon.setAttribute("src", `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`);
   citySearchInputEl.appendChild(weatherIcon);
  	// img.src = imageSRC;
  	// document.body.append(img);
}

cityFormEl.addEventListener("submit", submitSearch);