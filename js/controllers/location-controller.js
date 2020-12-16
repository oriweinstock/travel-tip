

// TODO: change to main.js and module structure
onInit();

function onInit() {
    const elSearchInput = document.querySelector('input[name="search-text"]');
    const elGoSearch = document.querySelector('.btn-search');
    const elMyLocationBtn = document.querySelector('.btn-my-location');
    const elCopyLocationBtn = document.querySelector('.btn-copy-location');

    elGoSearch.addEventListener('click', () => {
        console.log('search clicked', elSearchInput.value);
        searchLocation(elSearchInput.value);
    });
    elMyLocationBtn.addEventListener('click', () => {
        console.log('fetching user location');
        getUserLocation();
    });
    elCopyLocationBtn.addEventListener('click', () => {
        console.log('copying location customURL');
        copyUrlToClipboard();
    })
}

function copyUrlToClipboard() {

}

function getUserLocation() {

}

function searchLocation(location) {
    
}