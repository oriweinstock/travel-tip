export const weatherService = {
    getWeatherByCoords
}

const WEATHER_API_KEY = '385e6db04cc746088ea965578c6ef323';


var gTestCoords = { lat: 32.0853, lon: 34.7818 };
var gWeather;

// TODO : caching mechanism (once every 15 min)
export function getWeatherByCoords(coords) {
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&units=metric&appid=${WEATHER_API_KEY}`;
    console.log('fetching weather for co-ordinates:', coords.lat, coords.lon);
    console.log('fetching weather from url', url);
    return axios.get(url).then(res => res.data);
}

// TODO : seperate to controller / main.js


// TODO move it to main.js
function addWeatherListener() {
    document.querySelector('.btn-weather').addEventListener('click', () => {
        getWeatherByCoords(gTestCoords)
            .then(renderWeather)
            .catch(err => console.log(err));
    })
}



// function testWeatherService() {
//     getWeatherByCoords(gTestCoords)
//         .then(res => {
//             console.log(res);
//             renderWeather(res);
//             return res.main;
//         });
// }
var bla = {
    "coord":
        { "lon": 32, "lat": 32 },
    "weather": [
        { "id": 500, "main": "Rain", "description": "light rain", "icon": "10n" }
    ],
    "base": "stations", "main": {
        "temp": 19.88, "feels_like": 17.72, "temp_min": 19.88, "temp_max": 19.88, "pressure": 1018, "humidity": 61, "sea_level": 1018, "grnd_level": 1018
    },
    "visibility": 10000, "wind": {
        "speed": 4.03, "deg": 310
    },
    "rain": {
        "1h": 0.25
    },
    "clouds": {
        "all": 26
    },
    "dt": 1608156394, "sys": {
        "country": "EG", "sunrise": 1608180391, "sunset": 1608216602
    },
    "timezone": 7200, "id": 355392, "name": "Ezbet el-Burg", "cod": 200
}