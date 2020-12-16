import { locationService } from './services/location-service.js'
import { storageService } from './services/storage-service.js'
import { weatherService } from './services/weather-service.js'
import { gmapService } from './services/gmap-service.js'

window.onload = initMain;

function initMain() {
    initEventListeners();
    locationService.getLocations()
        .then(renderLocationsTable)
        .catch(err => console.log(err));
    gmapService.initMap()
        .then(() => {
            onGetUserPosition()
            gmapService.getGoogleMap().addListener('click', (ev) => {
                console.log('COORDS', ev.latLng.lat(), ev.latLng.lng())
                const clickPos = {
                    lat: ev.latLng.lat(),
                    lng: ev.latLng.lng()
                }
                // TODO - not panTo, but new Marker
                // and save button, anywhere.
                // function to save coord-s
            })
        })
        .catch(er => console.log('INIT MAP ERROR', er));
}

function initEventListeners() {

    document.querySelector('.btn-my-location').addEventListener('click', (ev) => {
        onGetUserPosition()
    });
    document.querySelector('.btn-copy-location').addEventListener('click', () => {
        console.log('copying location customURL');
        copyUrlToClipboard();
    });
    const elSearchInput = document.querySelector('input[name="search-text"]');
    document.querySelector('.btn-search').addEventListener('click', () => {
        console.log('search clicked', elSearchInput.value);
        // TODO - do something with returned co-ords. panto, show save button
        gmapService.getCoordsFromString(elSearchInput.value);
    });

    // weather
    document.querySelector('.btn-weather').addEventListener('click', () => {
        console.log('refreshing weather')
        weatherService.getWeatherByCoords({ lat: 32.0853, lon: 34.7818 }) // !!!
            .then(renderWeather)
            .catch(err => console.log(err));
    })

    // table
    document.querySelector('.btn-table').addEventListener('click', () => {
        console.log('refreshing table')
        locationService.getLocations()
            .then(renderLocationsTable)
            .catch(err => console.log(err));
    })
    
}

// LIST
function renderLocationsTable(locations) {
    const strHtmls = locations.map(location=> {
        console.log(location);
        return `<tr>
                    <td class="loc-name">${location.name}</td>
                    <td><button class="btn-go" data-idx="${location.id}">GO</button></td>
                    <td><button class="btn-delete" data-idx="${location.id}">DEL</button></td>
                </tr>`
    });

    document.querySelector('.locations-tbody').innerHTML = strHtmls.join('');
}

function renderWeather(weather) {
    console.log('weather', weather);
    document.querySelector('.forecast').innerHTML = `${Math.round(weather.main.temp)}&#8451, with winds up to ${weather.wind.speed}KM/h`
}

// UPDATE
function onGetUserPosition() { ///add to button in html;
    const map = gmapService.getGoogleMap();
     getUserPosition()
        .then(pos => {
            console.log(pos.coords.latitude, pos.coords.longitude)

            map.setCenter({ lat: pos.coords.latitude, lng: pos.coords.longitude });
            addMarker({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        })
        .catch(err => {
            console.log('USER POSITION ERROR', err);
        })
}

function getUserPosition() {
    console.log('Getting Pos');
    return new Promise((resolve, reject) => {
        console.log('thing', navigator.geolocation.getCurrentPosition((pos)=>console.log(pos)))
        navigator.geolocation.getCurrentPosition(resolve, reject)
    })
}
