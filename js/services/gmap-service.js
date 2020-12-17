export const gmapService = {
    getGoogleMap,
    initMap,
    panTo,
    addMarker,
    getCoordsFromString,
    getNameFromCoords
}

var gGoogleMap;
var gMarkers = [];

export function getGoogleMap() {
    return gGoogleMap;
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

export function panTo(lat, lng) {
    var laLatLng = new google.maps.LatLng(lat, lng);
    gGoogleMap.panTo(laLatLng);
}

export function addMarker(loc) {
    setMapOnAll(null)  
    var marker = new google.maps.Marker({
        position: loc,
        map: gGoogleMap,
        title: 'Hello World!'
    });
    gMarkers.push(marker)
    return marker;
}

// Sets the map on all markers in the array:
function setMapOnAll(map) {
    for (let i = 0; i < gMarkers.length; i++) {
        gMarkers[i].setMap(map);
      }
  }

export function getCoordsFromString(searchStr) {
    const API_KEY = 'AIzaSyCir6Gq_Aa2_eWWdtiB2xcbAQtTmy1W64U';
    return axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address={${searchStr}}&key=${API_KEY}`)
        .then(res => {
            console.log(res);
            return Promise.resolve(res.data.results[0]);
        })
}


export function getNameFromCoords(coords) { //do not need?
    console.log('coordins', coords)
    const API_KEY = 'AIzaSyCir6Gq_Aa2_eWWdtiB2xcbAQtTmy1W64U';
    return axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${coords.lng},${coords.lat}&key=${API_KEY}`)
        .then(res => {
            console.log(res);
            return Promise.resolve(res.data);
        })
}