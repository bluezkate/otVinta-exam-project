'use strict';

var houseImg = document.getElementById('houseImg'),
    dayNightSwitch = document.getElementById('dayNightSwitch'),
    addSwitch = document.getElementById('addSwitch'),
    filterSwitch = document.getElementById('filterSwitch'),
    addWindow = document.querySelector('.main__add'),
    filterWindow = document.querySelector('.main__filter');

// Event listeners
dayNightSwitch.addEventListener('click', dayNightChanger);
addSwitch.addEventListener('click', switchWindowsAdd);
filterSwitch.addEventListener('click', switchWindowsFilter);

// CALLBACKS
// DAY/NIGHT HOUSE CHANGER 
function dayNightChanger() {
    if(dayNightSwitch.checked) {
        houseImg.src="img/house_night.png";
    } else {
        houseImg.src="img/house_day.png";
    }
}


// WINDOW SLIDER
function switchWindowsAdd () {

    if (addSwitch.classList.contains("button__plain")) {
        addSwitch.classList.add("button__active");
        addSwitch.classList.remove("button__plain");
        filterSwitch.classList.remove("button__active");
        filterSwitch.classList.add("button__plain");

        addWindow.classList.remove("hidden");
        filterWindow.classList.add("hidden");

    } else return
}

function switchWindowsFilter () {

    if (filterSwitch.classList.contains("button__plain")) {
        filterSwitch.classList.remove("button__plain");
        filterSwitch.classList.add("button__active");

        addSwitch.classList.remove("button__active");
        addSwitch.classList.add("button__plain");

        addWindow.classList.add("hidden");
        filterWindow.classList.remove("hidden");
    } else return
}
