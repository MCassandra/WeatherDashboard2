const apikey = "11dc52a95fa797bda83ead455ac98597";

var getCityWeather = function(city){
    var url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`

    fetch(url)
    .then(function(response){
        response.json().then(function(data){
            displayWeather(data, city);
        });
    });
};