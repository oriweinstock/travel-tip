const WEATHER_API_KEY = '385e6db04cc746088ea965578c6ef323';


var gTestCoords = { lat: 32.0853, lon: 34.7818 };
var gWeather;

function getWeatherByCoords(coords) {
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&units=metric&appid=${WEATHER_API_KEY}`;
    console.log('fetching weather for co-ordinates:', coords.lat, coords.lon);
    console.log('fetching weather from url', url);
    return axios.get(url).then(res => res.data);
}

function testWeatherService() {
    getWeatherByCoords(gTestCoords)
        .then(res => {
            console.log(res);
            return res.main;
        });
}

// TODO : seperate to controller / main.js
function renderWeather() {

}
