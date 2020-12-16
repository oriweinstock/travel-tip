import { locationService } from "../services/location-service";


// TODO: change to main.js and module structure
onInit();

function onInit() {
    const elSearchInput = document.querySelector('input[name="search-text"]');
    const elGoSearch = document.querySelector('.btn-search');
    const elMyLocationBtn = document.querySelector('.btn-my-location');
    const elCopyLocationBtn = document.querySelector('.btn-copy-location');

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

function searchLocationByName(location) {
    // TODO 1. GEOCODE TOKYO => lat/lng
    // TODO 2. save it
    locationService.addLocation(location);
}