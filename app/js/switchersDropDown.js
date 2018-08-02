'use strict';

var addSwitch = document.getElementById('addSwitch'),
    filterSwitch = document.getElementById('filterSwitch'),
    addWindow = document.querySelector('.dialog__add'),
    filterWindow = document.querySelector('.dialog__filter'),
    mSwitchAdd = document.getElementById('mSwitchAdd'),
    wSwitchAdd = document.getElementById('wSwitchAdd'),
    mSwitchFilter = document.getElementById('mSwitchFilter'),
    wSwitchFilter = document.getElementById('wSwitchFilter'),
    menuRoomsAdd = document.getElementById('menuRoomsAdd'),
    menuPeopleAdd = document.getElementById('menuPeopleAdd'),
    menuRoomsFilter = document.getElementById('menuRoomsFilter'),
    dayNightSwitch = document.getElementById('dayNightSwitch'),
    houseImg = document.getElementById('houseImg');


// Sliders event listeners
addSwitch.addEventListener('click', switchWindowsAdd);
filterSwitch.addEventListener('click', switchWindowsFilter);

mSwitchAdd.addEventListener('click', switchSexMAdd);
wSwitchAdd.addEventListener('click', switchSexWAdd);
mSwitchFilter.addEventListener('click', switchSexM2Filter);
wSwitchFilter.addEventListener('click', switchSexW2Filter);
dayNightSwitch.addEventListener('click', dayNightChanger);

// DAY/NIGHT HOUSE CHANGER 
function dayNightChanger() {
    if(dayNightSwitch.checked) {
        houseImg.src="img/house_night.png";
    } else {
        houseImg.src="img/house_day.png";
    }
}


// CALLBACKS
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



// SEX SLIDER
// add window
function switchSexMAdd () {
    if (mSwitchAdd.classList.contains("button__plain")) {

        mSwitchAdd.classList.remove("button__plain");
        mSwitchAdd.classList.add("button__active");

        wSwitchAdd.classList.remove("button__active");
        wSwitchAdd.classList.add("button__plain");

    } else return
}

function switchSexWAdd () {
    if (wSwitchAdd.classList.contains("button__plain")) {

        mSwitchAdd.classList.remove("button__active");
        mSwitchAdd.classList.add("button__plain");

        wSwitchAdd.classList.remove("button__plain");
        wSwitchAdd.classList.add("button__active");

    } else return
}


// filter window
function switchSexM2Filter () {
    if (mSwitchFilter.classList.contains("button__plain")) {

        mSwitchFilter.classList.remove("button__plain");
        mSwitchFilter.classList.add("button__active");

        wSwitchFilter.classList.remove("button__active");
        wSwitchFilter.classList.add("button__plain");

    } else return
}

function switchSexW2Filter () {
    if (wSwitchFilter.classList.contains("button__plain")) {

        mSwitchFilter.classList.remove("button__active");
        mSwitchFilter.classList.add("button__plain");

        wSwitchFilter.classList.remove("button__plain");
        wSwitchFilter.classList.add("button__active");

    } else return
}


// DROPDOWN
menuRoomsAdd.addEventListener('click', function () {
    menuRoomsAdd.nextElementSibling.classList.toggle("hidden"); 
})

menuPeopleAdd.addEventListener('click', function () {
    menuPeopleAdd.nextElementSibling.classList.toggle("hidden");
});
menuRoomsFilter.addEventListener('click', function () {
    menuRoomsFilter.nextElementSibling.classList.toggle("hidden");    
})