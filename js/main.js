import { locationService } from './services/location-service.js'
import { storageService } from './services/storage-service.js'
import { weatherService } from './services/weather-service.js'
import { gmapService } from './services/gmap-service.js'

window.onload = initMain;

function initMain() {
    initEventListeners();
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
}

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
