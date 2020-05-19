const weather = document.querySelector(".js-weather");
const weatherIco = document.querySelector(".js-weather-ico")
const API_KEY = "4f9734957d8d8eba76824776801647ff";
const COORDS = 'coords';

function getWeather(lat, lng) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
    ).then(function(response) {
        return response.json();
    }).then(function(json) {
        const temperture = json.main.temp;
        const place = json.name;
        const description = json.weather[0].description;
        const icon = json.weather[0].icon;
        weather.innerText = `@ ${place}`;
        var icoUrl = `images/weather/${icon}.svg`

        weatherIco.innerHTML = `${temperture}°C <img src=${icoUrl}><span class="h6">${description}</span>`
        weatherIco.firstChild.nextSibling.style = `width: 6vh`
     
    });

}


function saveCoords(coordsObj) {
    localStorage.setItem(COORDS,JSON.stringify(coordsObj));
}

function handleGeoSuccess(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude,
        longitude
    };
    saveCoords(coordsObj);
    getWeather(latitude, longitude);
}

function handleGeoError() {
    console.log("Cant access get location")

}
function askForCoords() {
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

function loadCoords() {
    const loadedCoords = localStorage.getItem(COORDS);
    if(loadedCoords === null) {
        askForCoords();
    } else {
        const parseCoords = JSON.parse(loadedCoords);
        getWeather(parseCoords.latitude, parseCoords.longitude);
    }
}

function init() {
    loadCoords();

}

init();