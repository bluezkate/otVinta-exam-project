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
    filterLodgers = document.getElementById('filter'),
    // filterRooms = ,
    house = document.getElementById('house__whole'),
    mainWindow = document.querySelector('.main'),
    popupWindow = document.querySelector('.popup'),
    popupHeading = document.getElementById('popupHeading'),
    popupSex = document.getElementById('popupSex'),
    popupRooms = document.getElementById('popupRooms'),
    popupNeibours = document.getElementById('popupNeibours'),
    popupFloor = document.getElementById('popupFloor'),
    popupExtra = document.getElementById('popupExtra'),
    lodgersAllFloored = [],
    regArray= ['0','6', '7', '8', '9'];

let firstFloorArray = [],
    secondFloorArray = [],
    thirdFloorArray = [],
    fourthFloorArray = [],
    fifthFloorArray = [],
    lodgersAll;


// Event Listeners
document.addEventListener('DOMContentLoaded', getLodgersFromLS);
formSubmit.addEventListener('submit', submitLodgerToLS);
personFloor.addEventListener('keyup', checkFloorInput);
filterLodgers.addEventListener('submit', filter);
// house.addEventListener('click', popup);

// // Popup window on lodger click
// function popup(event, item) {
//     let target = event.target;

//     while(target != house) {
//         if(target.tagName == 'LI') {
//             mainWindow.classList.add('hidden');
//             popupWindow.classList.remove('hidden');
//             popupHeading.innerHTML = item.name;
//             popupSex.innerText = item.sex;
//             popupRooms.innerText = item.rooms;
//             // popupNeibours.innerText = 
            
//             return
//         }
//     }   target = target.parentNode;
// }



function getLodgersFromLS() {

    if (localStorage.getItem('lodgersAll') === null) {
    lodgersAll = [];
    
    } else {
        lodgersAll = JSON.parse(localStorage.getItem('lodgersAll'));  
    } 



    lodgersAll.forEach(function(item) {

        if (item.floor === "1") {
            firstFloorArray.push(item);
            //  creat li element
            const liFirst = document.createElement('li');
            // add class
            liFirst.className = 'house__person';
    
            if (item.sex === "Мужской") {
               liFirst.style.backgroundImage = "url('../img/boy.svg')";
            } else if (item.sex === "Женский"){
                liFirst.style.backgroundImage = "url('../img/girl.svg')";
            }
            firstFloor.appendChild(liFirst);
    
            // lodgersAllFloored.push(firstFloorArray);
    
        } else if (item.floor === "2") {
            secondFloorArray.push(item);
            //  creat li element
            const liSec = document.createElement('li');
            // add class
            liSec.className = 'house__person';
    
            if (item.sex === "Мужской") {
               liSec.style.backgroundImage = "url('../img/boy.svg')";
            } else if (item.sex === "Женский"){
                liSec.style.backgroundImage = "url('../img/girl.svg')";
            }
            secondFloor.appendChild(liSec);
            // house.addEventListener('click', popup);
    
            // lodgersAllFloored.push(secondFloorArray);
        } else if (item.floor === "3") {
            thirdFloorArray.push(item);
            //  creat li element
            const liThird = document.createElement('li');
            // add class
            liThird.className = 'house__person';
    
            if (item.sex === "Мужской") {
               liThird.style.backgroundImage = "url('../img/boy.svg')";
            } else if (item.sex === "Женский"){
                liThird.style.backgroundImage = "url('../img/girl.svg')";
            }
            thirdFloor.appendChild(liThird);
    
            // lodgersAllFloored.push(thirdFloorArray);
        } else if (item.floor === "4") {
            fourthFloorArray.push(item);
             //  creat li element
             const liFour = document.createElement('li');
             // add class
             liFour.className = 'house__person';
     
             if (item.sex === "Мужской") {
                liFour.style.backgroundImage = "url('../img/boy.svg')";
             } else if (item.sex === "Женский"){
                 liFour.style.backgroundImage = "url('../img/girl.svg')";
             }
             fourthFloor.appendChild(liFour);
    
            //  lodgersAllFloored.push(fourthFloorArray);
        } else if (item.floor === "5") {
            fifthFloorArray.push(item);
             //  creat li element
             const liFifth = document.createElement('li');
             // add class
             liFifth.className = 'house__person';
     
             if (item.sex === "Мужской") {
                liFifth.style.backgroundImage = "url('../img/boy.svg')";
             } else if (item.sex === "Женский"){
                 liFifth.style.backgroundImage = "url('../img/girl.svg')";
             }
             fifthFloor.appendChild(liFifth);
    
            //  lodgersAllFloored.push(fifthFloorArray);
        }
    });

    console.log(firstFloorArray);
    console.log(secondFloorArray);
    console.log(thirdFloorArray);
    console.log(fourthFloorArray);
    console.log(fifthFloorArray);

    checkFirstFloor(firstFloorArray);
    checkSecondFloor(secondFloorArray);
    checkThirdFloor(thirdFloorArray);
    checkFourthFloor(fourthFloorArray);
    checkFifthFloor(fifthFloorArray);

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
    // person.extras === null ||
    person.roommates === '') {
        alert ('Введите все данные жильца');
    } else return
}

// Store person object in LS
var counter = 0;
function storeLodgerInLS(person) {

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
function addLodgerToDOM(person) {

    // lodgersAll = 

    if (person.floor === "1") {
        firstFloorArray.push(person);
        //  creat li element
        const liFirst = document.createElement('li');
        // add class
        liFirst.className = 'house__person';

        if (person.sex === "Мужской") {
           liFirst.style.backgroundImage = "url('../img/boy.svg')";
        } else if (person.sex === "Женский"){
            liFirst.style.backgroundImage = "url('../img/girl.svg')";
        }
        firstFloor.appendChild(liFirst);

        lodgersAllFloored[0] = firstFloorArray;
        console.log(lodgersAllFloored);

    } else if (person.floor === "2") {
        secondFloorArray.push(person);
        //  creat li element
        const liSec = document.createElement('li');
        // add class
        liSec.className = 'house__person';

        if (person.sex === "Мужской") {
           liSec.style.backgroundImage = "url('../img/boy.svg')";
        } else if (person.sex === "Женский"){
            liSec.style.backgroundImage = "url('../img/girl.svg')";
        }
        secondFloor.appendChild(liSec);

        lodgersAllFloored[1] = secondFloorArray;
        console.log(lodgersAllFloored);

        // lodgersAllFloored.push(secondFloorArray);
    } else if (person.floor === "3") {
        thirdFloorArray.push(person);
        //  creat li element
        const liThird = document.createElement('li');
        // add class
        liThird.className = 'house__person';

        if (person.sex === "Мужской") {
           liThird.style.backgroundImage = "url('../img/boy.svg')";
        } else if (person.sex === "Женский"){
            liThird.style.backgroundImage = "url('../img/girl.svg')";
        }
        thirdFloor.appendChild(liThird);

        lodgersAllFloored[2] = thirdFloorArray;
        console.log(lodgersAllFloored);

        // lodgersAllFloored.push(thirdFloorArray);
    } else if (person.floor === "4") {
        fourthFloorArray.push(person);
         //  creat li element
         const liFour = document.createElement('li');
         // add class
         liFour.className = 'house__person';
 
         if (person.sex === "Мужской") {
            liFour.style.backgroundImage = "url('../img/boy.svg')";
         } else if (person.sex === "Женский"){
             liFour.style.backgroundImage = "url('../img/girl.svg')";
         }
         fourthFloor.appendChild(liFour);

         lodgersAllFloored[3] = fourthFloorArray;
         console.log(lodgersAllFloored);

        //  lodgersAllFloored.push(fourthFloorArray);
    } else if (person.floor === "5") {
        fifthFloorArray.push(person);
         //  creat li element
         const liFifth = document.createElement('li');
         // add class
         liFifth.className = 'house__person';
 
         if (person.sex === "Мужской") {
            liFifth.style.backgroundImage = "url('../img/boy.svg')";
         } else if (person.sex === "Женский"){
             liFifth.style.backgroundImage = "url('../img/girl.svg')";
         }
         fifthFloor.appendChild(liFifth);

         lodgersAllFloored[4] = fifthFloorArray;
         console.log(lodgersAllFloored);

        //  lodgersAllFloored.push(fifthFloorArray);
    }

    console.log(firstFloorArray);
    console.log(secondFloorArray);
    console.log(thirdFloorArray);
    console.log(fourthFloorArray);
    console.log(fifthFloorArray);

    // lodgersAllFloored.push(firstFloorArray);
    // console.log(lodgersAllFloored);
    // lodgersAllFloored.push(secondFloorArray);
    // console.log(lodgersAllFloored);
    // lodgersAllFloored.push(thirdFloorArray);
    // console.log(lodgersAllFloored);
    //  lodgersAllFloored.push(fourthFloorArray);
    //  console.log(lodgersAllFloored);
    //  lodgersAllFloored.push(fifthFloorArray);
    //  console.log(lodgersAllFloored);

    checkFirstFloor(firstFloorArray);
    checkSecondFloor(secondFloorArray);
    checkThirdFloor(thirdFloorArray);
    checkFourthFloor(fourthFloorArray);
    checkFifthFloor(fifthFloorArray);

    // createAllFloored();
}

// Check if theres 3 lodger on the floor
function checkFirstFloor(firstFloorArray) {
    if(firstFloorArray.length > 2) {
        regArray.push("1");

    //     lodgersAllFloored.push(firstFloorArray);
    // console.log(lodgersAllFloored);
    }
}

function checkSecondFloor(secondFloorArray) {
    if(secondFloorArray.length > 2) {
        regArray.push("2");

    //     lodgersAllFloored.push(secondFloorArray);
    // console.log(lodgersAllFloored);
    }
}

function checkThirdFloor(thirdFloorArray) {
    if(thirdFloorArray.length > 2) {
        regArray.push("3");

    //     lodgersAllFloored.push(thirdFloorArray);
    // console.log(lodgersAllFloored);
    }
}

function checkFourthFloor(fourthFloorArray) {
    if(fourthFloorArray.length > 2) {
        regArray.push("4");

    //     lodgersAllFloored.push(fourthFloorArray);
    //  console.log(lodgersAllFloored);
    }
}

function checkFifthFloor(fifthFloorArray) {
    if(fifthFloorArray.length > 2) {
        regArray.push("5");

    //     lodgersAllFloored.push(fifthFloorArray);
    //  console.log(lodgersAllFloored);
    }
}

// Create an array of floor arrays 
// function createAllFloored() {
//     if(firstFloorArray.length > 2 && lodgersAllFloored.length < 1) {
//         lodgersAllFloored.push(firstFloorArray);
//         console.log(lodgersAllFloored);
//         if(secondFloorArray.length > 2  && lodgersAllFloored.length < 2) {
//             lodgersAllFloored.push(secondFloorArray);
//             console.log(lodgersAllFloored);
//             if(thirdFloorArray.length > 2  && lodgersAllFloored.length < 3) {
//                 lodgersAllFloored.push(thirdFloorArray);
//                 console.log(lodgersAllFloored);
//                 if(fourthFloorArray.length > 2  && lodgersAllFloored.length < 4) {
//                     lodgersAllFloored.push(fourthFloorArray);
//                     console.log(lodgersAllFloored);
//                     if (fifthFloorArray.length > 2  && lodgersAllFloored.length < 5) {
//                         lodgersAllFloored.push(fifthFloorArray);
//                         console.log(lodgersAllFloored);
//                     } else return

//                 } else return

//             } else return

//         } else return

//     } else return
// }


// Remove unwanted numbers & occupied floors from input
function checkFloorInput () {
    console.log(regArray);
    var regExp = new RegExp("[" + regArray + "]");
    if(regExp.test(this.value)) {
        alert('Введите правильный номер этажа');
    } else return
}

// Filtering through lodgers
function filter(e) {
    if (localStorage.getItem('lodgersAll') === null) {
        alert('Фильтровать некого!');   
    } else {
        lodgersAll = JSON.parse(localStorage.getItem('lodgersAll'));  
    } 

    console.log(lodgersAll);

    lodgersAll.forEach(function(item){
        if (item.sex !== document.querySelector('input[name=sexSliderFilter]:checked').value) {

            console.log(item.sex);
            item.className = 'hidden';
        } else return
    });

    e.preventDefault();
}