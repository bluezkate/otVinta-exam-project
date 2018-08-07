"use strict";

const personName = document.getElementById('personName'), 
    personFloor = document.getElementById('personFloor'),
    roomsSelected = document.getElementById("menuRoomsAdd"),
    personLivingWithSelected = document.getElementById("menuPeopleAdd"),
    formSubmit = document.getElementById('add'),
    firstFloor = document.getElementById('1stFloor'),
    secondFloor = document.getElementById('2ndFloor'),
    thirdFloor = document.getElementById('3rdFloor'),
    fourthFloor = document.getElementById('4thFloor'),
    fifthFloor = document.getElementById('5thFloor'),
    regArray= ['0','6', '7', '8', '9'];

let firstFloorArray = [],
    secondFloorArray = [],
    thirdFloorArray = [],
    fourthFloorArray = [],
    fifthFloorArray = [];


// Event Listeners
formSubmit.addEventListener('submit', submitLodgerToLS);
personFloor.addEventListener('keyup', checkFloorInput);

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

    // Checking if all the data has been entered
    checkIfEmpty(person);

    // Storing person info in LS
    storeLodgerInLS(person);

    e.preventDefault();
}

// Checking if all the data had been entered
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

    addLodgerToDOM(person);

    removeEventSubmit();

}



// Add person to DOM
// function addPersonToDOM(person) {

//     let firstFloorArray = [],
//         secondFloorArray = [],
//         thirdFloorArray = [],
//         fourthFloorArray = [],
//         fifthFloorArray = [];

//     if (person.floor === 1) {
//         firstFloorArray.push(person);
//     } else if (person.floor === 2) {
//         secondFloorArray.push(person);
//     } else if (person.floor === 3) {
//         thirdFloorArray.push(person);
//     } else if (person.floor === 4) {
//         fourthFloorArray.push(person);
//     } else if (person.floor === 5) {
//         fifthFloorArray.push(person);
//     }

// }


// Add person object to DOM
function addLodgerToDOM(person) {

    if (person.floor === "1") {
        firstFloorArray.push(person);
    } else if (person.floor === "2") {
        secondFloorArray.push(person);
    } else if (person.floor === "3") {
        thirdFloorArray.push(person);
    } else if (person.floor === "4") {
        fourthFloorArray.push(person);
    } else if (person.floor === "5") {
        fifthFloorArray.push(person);
    }

    console.log(firstFloorArray);
    console.log(secondFloorArray);
    console.log(thirdFloorArray);
    console.log(fourthFloorArray);
    console.log(fifthFloorArray);


    // let lodgersAll = JSON.parse(localStorage.getItem('lodgersAll')),
    //     firstFloorArray = [],
    //     secondFloorArray = [],
    //     thirdFloorArray = [],
    //     fourthFloorArray = [],
    //     fifthFloorArray = [];


    // firstFloorArray = lodgersAll.filter(function(item) {
    //     return item.floor === "1";
    // });

    // firstFloorArray.forEach(function(item, i) {

    //     i = i + 1;

    //     // creat li element
    //     const li = document.createElement('li');
    //     // add class
    //     li.className = 'house__person';

    //     if (item.sex === "Мужской") {
    //        li.style.backgroundImage = "url('../img/boy.svg')";
    //     } else if (item.sex === "Женский"){
    //         li.style.backgroundImage = "url('../img/girl.svg')";
    //     }

    //     firstFloor.appendChild(li);

    // });

    // secondFloorArray = lodgersAll.filter(function(item) {
    //     return item.floor === "2";
    // });

    // thirdFloorArray = lodgersAll.filter(function(item) {
    //     return item.floor === "3";
    // });

    // fourthFloorArray = lodgersAll.filter(function(item) {
    //     return item.floor === "4";
    // });

    // fifthFloorArray = lodgersAll.filter(function(item) {
    //     return item.floor === "5";
    // });

    checkFirstFloor(firstFloorArray);
    checkSecondFloor(secondFloorArray);
    checkThirdFloor(thirdFloorArray);
    checkFourthFloor(fourthFloorArray);
    checkFifthFloor(fifthFloorArray);



}

// Check if theres 3 lodger on the floor
function checkFirstFloor(firstFloorArray) {
    if(firstFloorArray.length > 2) {
        regArray.push("1");
    }
}

function checkSecondFloor(secondFloorArray) {
    if(secondFloorArray.length > 2) {
        regArray.push("2");
    }
}

function checkThirdFloor(thirdFloorArray) {
    if(thirdFloorArray.length > 2) {
        regArray.push("3");
    }
}

function checkFourthFloor(fourthFloorArray) {
    if(fourthFloorArray.length > 2) {
        regArray.push("4");
    }
}

function checkFifthFloor(fifthFloorArray) {
    if(fifthFloorArray.length > 2) {
        regArray.push("5");
    }
}


// Remove unwanted numbers & occupied floors from input
function checkFloorInput () {
    console.log(regArray);
    var regExp = new RegExp("[" + regArray + "]");
    if(regExp.test(this.value)) {
        alert('Введите правильный номер этажа');
    } else return
}
