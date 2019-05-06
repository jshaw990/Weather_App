let humidity;
let weatherIcon;
let pressure;
let uvIndex;
let temperature;
let temperatureIcon;
let windBearing;
let windSpeed;
let weatherSummary;

window.onload = function() {
    humidity = document.getElementById("current-humidity");
    weatherIcon = document.getElementById("current-icon");
    pressure = document.getElementById("current-pressure");
    uvIndex = document.getElementById("current-uvIndex");
    temperature = document.getElementById("current-temperature");
    temperatureIcon = document.getElementById("temperature-icon");
    windBearing = document.getElementById("current-wind-bearing");
    windSpeed = document.getElementById("current-wind-speed");
    weatherSummary = document.getElementById("weather-summary");
}

function farenheitToCelsius(k) {
    return Math.round((k - 32) * 0.5556 );
}

function humidityPercentage(h) {
    return Math.round(h * 100);
}

function degreesToDirection(degrees) {
    let range = 360/16;
    let low = 360 - range/2;
    let high = (low + range) % 360;
    let angels = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"]
    for (i in angels) {
        if(degrees>= low && degrees < high)
            return angels[i];
        low = (low + range) % 360;
        high = (high + range) % 360;
    }
}

function knotsToKilometres(knot) {
    return Math.round( knot * 1.852);
}

let weatherImages = {
    "clear-day": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Sun_icon.svg/252px-Sun_icon.svg.png",
    "clear-night": "http://www.clker.com/cliparts/f/S/2/p/7/u/gold-matte-moon.svg",
    "rain": "https://cdn3.iconfinder.com/data/icons/weather-16/256/Rainy_Day-512.png",
    "snow": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Nuvola_weather_snow.svg/1000px-Nuvola_weather_snow.svg.png",
    "sleet": "http://www.clker.com/cliparts/f/6/7/4/1206565674431593790Anonymous_simple_weather_symbols_10.svg.hi.png",
    "wind": "http://www.haotu.net/up/4233/128/216-wind.png",
    "fog": "http://www.iconninja.com/files/81/344/943/fog-cloud-hiding-the-sun-weather-interface-symbol-icon.svg",
    "cloudy": "http://camera.thietbianninh.com/images/icon-2.png",
    "partly-cloudy-day": "http://meteo.cw/images_www/weather_icons1/weather_icon_03.png",
    "partly-cloudy-night": "http://icon-park.com/imagefiles/simple_weather_icons_cloudy_night.png",
    "hail": "http://icons.iconarchive.com/icons/icons8/ios7/256/Weather-Hail-icon.png",
    "thunderstorm": "http://findicons.com/files/icons/2613/android_weather_extended/480/thunderstorms.png",
    "tornado": "http://hddfhm.com/images/clipart-of-a-tornado-11.png"
}

let getWeather = function() {
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(function(position){
            let lat = position.coords.latitude;
            let long = position.coords.longitude;
            showWeather(lat, long)
        })
    } else { 
        window.alert("Location was not received");
    }
}

function showWeather(lat, long) {
    let url = `https://api.darksky.net/forecast/6cf439d490c94fbe0f78a9fb4fcdbeeb/${lat},${long}` + `?format=jsonp&callback=displayWeather`;
    let script = document.createElement("script");
    script.type = "text/javascript";
    script.src = url;
    document.getElementsByTagName("head")[0].appendChild(script);
    displayWeather(object)
}

let object; 

function displayWeather(object) {
    humidity.innerHTML = "Humidity: " + humidityPercentage(object.currently.humidity) + "%";
    weatherIcon.src = weatherImages[object.currently.icon];
    pressure.innerHTML = "Pressure: " + object.currently.pressure + " mb";
    uvIndex.innerHTML = "uvIndex: " + object.currently.uvIndex;
    temperature.innerHTML = farenheitToCelsius(object.currently.temperature) + " C" + " / " + object.currently.temperature + " F";
    temperatureIcon.src = "https://cdn4.iconfinder.com/data/icons/medicons-2/512/thermometer-512.png";
    windBearing.innerHTML = "Wind Direction: " + degreesToDirection(object.currently.windBearing);
    windSpeed.innerHTML = "Wind Speed: " + knotsToKilometres(object.currently.windSpeed) + " km/h";
    weatherSummary.innerHTML = "Current Location: " + object.timezone + " <br/> <br/> Weather Summary: " + object.currently.summary;
     document.getElementById("current-icon").style.backgroundColor = "hsl(216, 100%, 60%)"; 
    document.getElementById("weather-summary").style.backgroundColor = "hsl(216, 100%, 60%)"; 
    console.log(object);
 }