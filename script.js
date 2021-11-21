const apiKey = "11dc52a95fa797bda83ead455ac98597";
const cities = [];
const cityFormEl=document.querySelector("#city-search-form");
const citySearchInputEl = document.querySelector("#searched-city");
const  cityInputEl=document.querySelector("#city");

// make initial api call
const getCityWeather = function(city){
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`

    fetch(url)
    .then(function(response){
        response.json().then(function(data){
            displayWeather(data, city);
        });
    });
};

// display the weather data from city search
function displayWeatherData(weather){
	console.log(json);
  	const lat = json.coord.lat;
  	const lon = json.coord.lon;
  	const description = json.weather[0].description;
  	const icon = json.weather[0].icon;
  	const imageSRC = `http://openweathermap.org/img/wn/${icon}@2x.png`;
  	const img = document.createElement("img");
  	img.src = imageSRC;
  	document.body.append(img);
}