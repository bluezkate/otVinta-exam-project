"use strict";

const personName = document.querySelector('#personName'),
    personSex = document.querySelector('input[name=sexSliderAdd]:checked'),
    personFloor = document.querySelector('#personFloor'),
    roomsSelected = document.getElementById("menuRoomsAdd"),
    personRooms = roomsSelected.options[roomsSelected.selectedIndex],
    personExtra = document.querySelector('input[name=extra__add]:checked'),
    personLivingWithSelectedIndex = document.getElementById("menuPeopleAdd").options.selectedIndex,
    personLivingWith = document.getElementById("menuPeopleAdd").options[personLivingWithSelectedIndex],
    formSubmit = document.getElementById('add');


// Event Listeners
formSubmit.addEventListener('submit', submitLodgerToLS);

// Adding person info to LS
function submitLodgerToLS(e) {

    // Creating person info object
    let person = {
        name : personName.value,
        sex: personSex.value,
        floor: personFloor.value,
        rooms: personRooms.value,
        extras: personExtra.value,
        roommates: personLivingWith.value
    }

    storeLodgerInLS(person);
    


    e.preventDefault();
}

// Store person object in LS
function storeLodgerInLS(person) {


    let lodgersAll;
        // lodgersFloor;
    
    if (localStorage.getItem('lodgersAll') === null) {
        lodgersAll = [];
    } else {
        lodgersAll = JSON.parse(localStorage.getItem('lodgersAll'));
    }

        
        lodgersAll.push(person);
        localStorage.setItem('lodgersAll', JSON.stringify(lodgersAll));
        
}

    

    



    




