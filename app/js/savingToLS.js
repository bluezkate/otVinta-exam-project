"use strict";

const personName = document.getElementById('personName'), 
    personFloor = document.getElementById('personFloor'),
    roomsSelected = document.getElementById("menuRoomsAdd"),
    personLivingWithSelected = document.getElementById("menuPeopleAdd"),
    formSubmit = document.getElementById('add'),
    regArray= ['0','6', '7', '8', '9'];


// Event Listeners
formSubmit.addEventListener('submit', submitLodgerToLS);
personFloor.addEventListener('keyup', checkFloorInput);

function checkFloorInput () {
    var regExp = new RegExp("[" + regArray + "]");
    if(regExp.test(this.value)) {
        alert('Введите номер этажа от 1 до 5');
    } else return
}

// Adding person info to LS
function submitLodgerToLS(e) {

    // Getting values from checkbox
    function getCheckedCheckBoxes() {
        var selectedCheckBoxes = document.querySelectorAll('input[name=extra__add]:checked');
        var checkedValues = Array.from(selectedCheckBoxes).map(cb => cb.value);

        return checkedValues; 
    }

    // Creating person info object
    let person = {
        name : personName.value,
        sex: document.querySelector('input[name=sexSliderAdd]:checked').value,
        floor: personFloor.value,
        rooms: roomsSelected.options[roomsSelected.selectedIndex].value,
        extras: getCheckedCheckBoxes(),
        roommates: personLivingWithSelected.options[personLivingWithSelected.selectedIndex].value
    }

    console.log(person);

    // Checking if all the data has been entered
    checkIfEmpty(person);

    // Storing person info in LS
    storeLodgerInLS(person);

    e.preventDefault();
}

// Checking if all the data has been entered
function checkIfEmpty(person) {
    if (person.name === '' ||
    person.sex.value === null ||
    person.floor === '' ||
    person.rooms === '' ||
    person.extras === null ||
    person.roommates === '') {
        alert ('Введите все данные жильца');
    } else return
}

// Store person object in LS
var counter = 0;

function storeLodgerInLS(person) {

    let lodgersAll;

    if (localStorage.getItem('lodgersAll') === null) {
    lodgersAll = [];
    
    } else {
        lodgersAll = JSON.parse(localStorage.getItem('lodgersAll'));  
    } 

    lodgersAll.push(person);
    localStorage.setItem('lodgersAll', JSON.stringify(lodgersAll));

    counter++;

    function removeEventSubmit () {
        if (counter > 14) {
            formSubmit.removeEventListener('submit', submitLodgerToLS);
            alert('Дом заполнен!');
        } else return
    }

    addLodgerToDOM();

    removeEventSubmit();

}

// Add person object to DOM
function addLodgerToDOM() {

    let lodgersAll = JSON.parse(localStorage.getItem('lodgersAll')),
        firstFloorArray = [],
        secondFloorArray = [],
        thirdFloorArray = [],
        fourthFloorArray = [],
        fifthFloorArray = [];

    const personFloorValue = personFloor.value,
            personFloorValueUp = +personFloorValue + 1;

    firstFloorArray = lodgersAll.filter(function(item) {
        return item.floor === "1";

    });

    secondFloorArray = lodgersAll.filter(function(item) {
        return item.floor === "2";
    });

    thirdFloorArray = lodgersAll.filter(function(item) {
        return item.floor === "3";
    });

    fourthFloorArray = lodgersAll.filter(function(item) {
        return item.floor === "4";
    });

    fifthFloorArray = lodgersAll.filter(function(item) {
        return item.floor === "5";
    });

    // checkFloorArrays(firstFloorArray);
    // checkFloorArrays(secondFloorArray);
    // checkFloorArrays(thirdFloorArray);
    // checkFloorArrays(fourthFloorArray);
    // checkFloorArrays(fifthFloorArray);

    // checkFloorArrays();

    if (firstFloorArray.length > 2) {

    }

    // function checkFloorArrays() {

    //     if (firstFloorArray.length > 2 || 
    //         secondFloorArray.length > 2 ||
    //         thirdFloorArray.length > 2 ||
    //         fourthFloorArray.length > 2) {
    //         personFloor.setAttribute('pattern', `[${personFloorValueUp}-5]{1}`);
    //         personFloor.setAttribute('title', `Весь ${personFloorValue}-й этаж занят!`);
    //     } else if (fifthFloorArray.length > 2) {
    //         personFloor.setAttribute('pattern', `[1 - ${+personFloorValue}]{1}`);
    //         personFloor.setAttribute('title', `Весь ${personFloorValue}-й этаж занят!`);
    //     } else return


    // }
}



// function checkFloorArrays(firstFloorArray) {

//     // const personFloorValue = personFloor.value

//     if (firstFloorArray.length > 2) {
//         personFloor.setAttribute('pattern', '[2-5]{1}');
//         personFloor.setAttribute('title', 'Весь 1-й этаж занят!');

//     } else if (firstFloorArray.length > 2 || secondFloorArray.length > 2)
// }

// function checkFloorArrays(secondFloorArray) {

//     // const personFloorValue = personFloor.value

//     if (secondFloorArray.length > 2) {
//         personFloor.setAttribute('pattern', '[1,3-5]{1}');
//         personFloor.setAttribute('title', 'Весь 2-й этаж занят!');
//     }
// }

// function checkFloorArrays(thirdFloorArray) {

//     // const personFloorValue = personFloor.value

//     if (thirdFloorArray.length > 2) {
//         personFloor.setAttribute('pattern', '[1-2,4-5]{1}');
//         personFloor.setAttribute('title', 'Весь 3-й этаж занят!');
//     }
// }

// function checkFloorArrays(fourthFloorArray) {

//     // const personFloorValue = personFloor.value

//     if (fourthFloorArray.length > 2) {
//         personFloor.setAttribute('pattern', '[1-3,5]{1}');
//         personFloor.setAttribute('title', 'Весь 4-й этаж занят!');
//     }
// }

// function checkFloorArrays(fifthFloorArray) {

//     // const personFloorValue = personFloor.value

//     if (fifthFloorArray.length > 2) {
//         personFloor.setAttribute('pattern', '[1-4]{1}');
//         personFloor.setAttribute('title', 'Весь 5-й этаж занят!');
//     }
// }





