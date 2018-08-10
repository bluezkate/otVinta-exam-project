"use strict";

// Variables
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
    filterRoomsSelected = document.getElementById('menuRoomsFilter'),
    filterFloor = document.getElementById('filterFloor'),
    house = document.getElementById('house__whole'),
    dayNight = document.querySelector('.dayNight'),
    mainWindow = document.querySelector('.main'),
    popupWindow = document.querySelector('.popup'),
    popupName = document.getElementById('popupName'),
    popupImg = document.getElementById('popupImg'),
    popupCross = document.getElementById('popupCross'),
    popupSex = document.getElementById('popupSex'),
    popupRooms = document.getElementById('popupRooms'),
    popupRoommates = document.getElementById('popupRoommates'),
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
house.addEventListener('click', popup);
popupCross.addEventListener('click', popupExit);

// Popup window on lodger click
function popup(event) {
    let target = event.target,
    lodgersAll = JSON.parse(localStorage.getItem('lodgersAll'));  

    while(target != house) {
        if(target.tagName == 'LI') {

        // show popup window
        mainWindow.classList.add('hidden');
        popupWindow.classList.remove('hidden');

        // get data 
        popupName.innerText = lodgersAll[target.id].name;
        popupSex.innerText = lodgersAll[target.id].sex;
        popupRooms.innerText = lodgersAll[target.id].rooms;
        popupRoommates.innerText = lodgersAll[target.id].roommates;
        popupFloor.innerText = lodgersAll[target.id].floor;
        popupExtra.innerText = lodgersAll[target.id].extras;
        dayNight.style.visibility = 'hidden';


        // add pic     
        if (popupSex.innerText === "Мужской") {
            popupImg.style.backgroundImage = "url('../img/boy.svg')";
        } else if (popupSex.innerText === "Женский"){
            popupImg.style.backgroundImage = "url('../img/girl.svg')";
        }
        // scale pic
        // popupImg.style.transform = 'scale(1.1,1.1)';
            
        } 

        return
    
    }   target = target.parentNode;
    
    event.preventDefault();
}

// Close popup
function popupExit() {
    mainWindow.classList.remove('hidden');
    popupWindow.classList.add('hidden');
    dayNight.style.visibility = 'visible';
    
}


// Load data from LS
function getLodgersFromLS() {

    if (localStorage.getItem('lodgersAll') === null) {
    lodgersAll = [];
    
    } else {
        lodgersAll = JSON.parse(localStorage.getItem('lodgersAll'));  
    } 

    lodgersAll.forEach(function(item, i) {

        if(item.floor === "1") {

            lodgerFloored(item, i, firstFloorArray, firstFloor);

        } else if (item.floor === "2") {

            lodgerFloored(item, i, secondFloorArray, secondFloor);

        } else if (item.floor === "3") {

            lodgerFloored(item, i, thirdFloorArray, thirdFloor);

        } else if (item.floor === "4") {

            lodgerFloored(item, i, fourthFloorArray, fourthFloor);

        } else if (item.floor === "5") {

            lodgerFloored(item, i, fifthFloorArray, fifthFloor);

        }

        function lodgerFloored(item, i, floorArrayLs, floorArrayDom) {

            floorArrayLs.push(item);
            //  creat li element
            const li = document.createElement('li');
            // add class
            li.className = 'house__person';
            // add id
            li.id = i;
    
            if (item.sex === "Мужской") {
                li.style.backgroundImage = "url('../img/boy.svg')";
            } else if (item.sex === "Женский"){
                li.style.backgroundImage = "url('../img/girl.svg')";
            }
            floorArrayDom.appendChild(li);
        
        }
    });

    checkFloor (firstFloorArray, "1");
    checkFloor (secondFloorArray, "2");
    checkFloor (thirdFloorArray, "3");
    checkFloor (fourthFloorArray, "4");
    checkFloor (fifthFloorArray, "5");

}

// Add person to LS
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

    addLodgerToDOM(person);

    removeEventSubmit();

    function removeEventSubmit () {
        if (counter > 14) {
            formSubmit.removeEventListener('submit', submitLodgerToLS);
            alert('Дом заполнен!');
        } else return
    }

}


// Add person to DOM
function addLodgerToDOM(person) {

    lodgersAll = JSON.parse(localStorage.getItem('lodgersAll'));  

    if(person.floor === "1") {

        lodgerFloored(person, firstFloorArray, firstFloor);

        lodgersAllFloored[0] = firstFloorArray;

    } else if (person.floor === "2") {

        lodgerFloored(person, secondFloorArray, secondFloor);

        lodgersAllFloored[1] = secondFloorArray;

    } else if (person.floor === "3") {

        lodgerFloored(person, thirdFloorArray, thirdFloor);

        lodgersAllFloored[2] = thirdFloorArray;

    } else if (person.floor === "4") {

        lodgerFloored(person, fourthFloorArray, fourthFloor);

        lodgersAllFloored[3] = fourthFloorArray;

    } else if (person.floor === "5") {

        lodgerFloored(person, fifthFloorArray, fifthFloor);

        lodgersAllFloored[4] = fifthFloorArray;
    }

    function lodgerFloored(person, floorArrayLs, floorArrayDom) {

        floorArrayLs.push(person);
        //  creat li element
        const li = document.createElement('li');
        // add class
        li.className = 'house__person';
        // add id
        li.id = lodgersAll.length - 1;

        if (person.sex === "Мужской") {
            li.style.backgroundImage = "url('../img/boy.svg')";
        } else if (person.sex === "Женский"){
            li.style.backgroundImage = "url('../img/girl.svg')";
        }

        floorArrayDom.appendChild(li);
    
    }

    checkFloor (firstFloorArray, 1);
    checkFloor (secondFloorArray, 2);
    checkFloor (thirdFloorArray, 3);
    checkFloor (fourthFloorArray, 4);
    checkFloor (fifthFloorArray, 5);
}

// Check if theres 3 lodger on the floor
function checkFloor (floorArray, i) {
    if(floorArray.length > 2) {
        regArray.push(`${i}`);
    }
}

// Remove unwanted numbers & occupied floors from input
function checkFloorInput () {
    var regExp = new RegExp("[" + regArray + "]");
    if(regExp.test(this.value)) {
        // alert('Введите правильный номер этажа');
        personFloor.setAttribute('pattern', `${regExp}`);
        console.log(regExp);
    } else return
}


// Filtering through lodgers
function filter(e) {

    if (localStorage.getItem('lodgersAll') === null) {
        alert('Фильтровать некого! Добавьте жильцов!');   
    } else {
        lodgersAll = JSON.parse(localStorage.getItem('lodgersAll'));  
    } 
    const housePersons = document.querySelectorAll('.house__person');

    let itemID = [];

    lodgersAll.forEach(function(item, i){

        if(document.querySelector('input[name=sexSliderFilter]:checked')) {
            if(item.sex !== document.querySelector('input[name=sexSliderFilter]:checked').value) {
            itemID.push(i);
            } 
        } 
        
        if(filterRoomsSelected.options[filterRoomsSelected.selectedIndex].value !== "0") {
            if (item.rooms !== filterRoomsSelected.options[filterRoomsSelected.selectedIndex].value){
                itemID.push(i);
            }
        } else if (filterRoomsSelected.options[filterRoomsSelected.selectedIndex].value === "0") {
            console.log(filterRoomsSelected.options[filterRoomsSelected.selectedIndex].value);
        }

        checkCheckboxes();

        if(filterFloor.value !== '') {
            if (item.floor !== filterFloor.value) {
                itemID.push(i);
            }
        }  else if (filterFloor.value === '') {
            console.log(filterFloor.value);
        }
         
        housePersons.forEach(function(item){

            item.style.visibility = 'visible';
                for( var j = 0; j < itemID.length; j++) {
                    if(item.id == itemID[j]){
                        item.style.visibility = 'hidden';
                    }
                }

        });     

        function checkCheckboxes() {
            
            let arr1 = item.extras,
                arr2 = getCheckedCheckBoxesFilter();

            let arr3 = arr1.filter(function(n) {
                return arr2.indexOf(n) >= 0;
                });

            if (arr3.length === 0) {
                itemID.push(i);
            }

        }

    });

    function getCheckedCheckBoxesFilter() {
        var selectedCheckBoxes = document.querySelectorAll('input[name=extra__filter]:checked');
        var checkedValues = Array.from(selectedCheckBoxes).map(cb => cb.value);

        return checkedValues; 
    }
    
    e.preventDefault();
}