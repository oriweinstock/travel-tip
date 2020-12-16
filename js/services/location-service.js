import {storageService} from './storage-service.js'

export const locationService = {
    getLocations,
    addLocation,
    getLocationById,
    renameLocation,
}

const STORAGE_KEY = 'locations';

var gNextId = 101;
// TODO - get locations from user
const gLocations = [
    { id: gNextId++, name: 'Ramat Gan', lat: 31.222, lng: 29.1322, createdAt: Date.now(), updatedAt: (Date.now() + 2000) },
    { id: gNextId++, name: 'Tel Aviv', lat: 31.522, lng: 29.9322, createdAt: Date.now(), updatedAt: (Date.now() + 2500) }
];

// CRAETE
function addLocation(location) {
    console.log('Adding location:', location);
    gLocations.push(location);
    storageService.saveToStorage(STORAGE_KEY, gLocations);
}


function _loadLocationsFromStorage() {
    let locations = storageService.loadFromStorage(LOCATIONS_KEY);
    console.log('locations received from local storage:', locations);
}

// READ
function getLocations() {
    return Promise.resolve(gLocations)
}

function getLocationById(locId) {
    let location = gLocations.find(location => location.id === locId);
    return Promise.resolve(location);
}

function getLocationIdxById(locId) {
    let locationIdx = gLocations.findIndex(location => location.id === locId);
    return Promise.resolve(locationIdx);
}

// UPDATE
function renameLocation(locId, newName) {
    let locationIdx = getLocationIdxById(locId);
    console.log('renaming location:', location, 'to', newName);
    gLocations[locationIdx].name = newName;
}

// DELETE
function deleteLocation(locId) {
    let isConfirm = confirm('Are you sure?');
    if (isConfirm) gLocations.splice(getLocationIdxById(locId), 1);
}
