import { locationService } from "../services/location-service.js";


console.log(locationService)
// TODO: change to main.js and module structure
onInit();

function onInit() {
    const elSearchInput = document.querySelector('input[name="search-text"]');
    const elGoSearch = document.querySelector('.btn-search');
    const elMyLocationBtn = document.querySelector('.btn-my-location');
    const elCopyLocationBtn = document.querySelector('.btn-copy-location');
    console.log('GO', elGoSearch)
    elGoSearch.addEventListener('click', () => {
        console.log('search clicked', elSearchInput.value);
        searchLocationByName(elSearchInput.value);
    });
    elMyLocationBtn.addEventListener('click', () => {
        console.log('fetching user location');
        // TODO -re-arrange
        getUserLocation();
    });
    elCopyLocationBtn.addEventListener('click', () => {
        console.log('copying location customURL');
        copyUrlToClipboard();
    })
}

function copyUrlToClipboard() {
    // TODO LATER
}

function getUserLocation() {
    // DONE - re-arrange later
}

function searchLocationByName(location) { ///do not need
    _connectCodeApi(location)
        .then(res => {
                const location =
                {
                    name: res.address_components[0].long_name,
                    lat: res.geometry.location.lat,
                    lng: res.geometry.location.lng,
                    createdAt: Date.now(),
                    updatedAt: (Date.now() + 2000)
                }
            locationService.addLocation(location)
        })
}

//service:
