
import { locationService } from './services/location-service.js'


console.log('locationService', locationService);

var gGoogleMap;

window.onload = () => {
    initMap()
        .then(() => {
            onGetUserPosition()
            console.log('GG', gGoogleMap)
            gGoogleMap.addListener('click', (ev) => {
                console.log('COORDS', ev.latLng.lat(), ev.latLng.lng())
                const clickPos = {
                    lat: ev.latLng.lat(),
                    lng: ev.latLng.lng()
                }
                panTo(clickPos.lat, clickPos.lng)
                saveCoords(clickPos.lat, clickPos.lng)
                //function to save coord-s
            })

        })
        .catch(er => console.log('INIT MAP ERROR', er));


    document.querySelector('.btn-my-location').addEventListener('click', (ev) => {
        console.log('my pos', onGetUserPosition())
        onGetUserPosition()
    }
    )
}


export function initMap(lat = 32.0749831, lng = 34.9120554) {
    console.log('InitMap');
    return _connectGoogleApi()
        .then(() => {
            console.log('google available');
            gGoogleMap = new google.maps.Map(
                document.querySelector('#map'), {
                center: { lat, lng },
                zoom: 15
            })
            console.log('Map!', gGoogleMap);
        })
}

function addMarker(loc) {
    var marker = new google.maps.Marker({
        position: loc,
        map: gGoogleMap,
        title: 'Hello World!'
    });
    return marker;
}


function getUserPosition() {
    console.log('Getting Pos');
    return new Promise((resolve, reject) => {
        console.log('thing', navigator.geolocation.getCurrentPosition((pos)=>console.log(pos)))
        navigator.geolocation.getCurrentPosition(resolve, reject)
    })
}


function _connectGoogleApi() {
    if (window.google) return Promise.resolve()
    const API_KEY = 'AIzaSyCir6Gq_Aa2_eWWdtiB2xcbAQtTmy1W64U'; //TODO: Enter your API Key
    var elGoogleApi = document.createElement('script');
    elGoogleApi.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}`;
    elGoogleApi.async = true;
    document.body.append(elGoogleApi);

    return new Promise((resolve, reject) => {
        elGoogleApi.onload = resolve;
        elGoogleApi.onerror = () => reject('Google script failed to load')
    })
}



function onGetUserPosition() { ///add to button in html; 
    getUserPosition()
        .then(pos => {
            console.log(pos.coords.latitude, pos.coords.longitude)

            gGoogleMap.setCenter({ lat: pos.coords.latitude, lng: pos.coords.longitude });
            addMarker({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        })
        .catch(err => {
            console.log('USER POSITION ERROR', err);
        })
}




function panTo(lat, lng) {
    var laLatLng = new google.maps.LatLng(lat, lng);
    gGoogleMap.panTo(laLatLng);
}
