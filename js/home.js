'use strict';

// INDEX.HTML EVENT LISTENER
var inputButton = document.getElementById('inputButton');
var continueButton = document.createElement('button');
var area = document.getElementById('area');
var buttonDiv = document.createElement('div');


eventListener();

if (!localStorage.getItem('reloadAvailable')) {
  document.getElementById('continue').style.display = 'none';
}

// event listener function
function eventListener() {
  inputButton.addEventListener('click', readInput);
}

// reads input data and persists inputName
function readInput() {
  var inputArea = document.getElementById('inputArea');
  inputArea.style.display = 'none';
  var outputArea = document.getElementById('outputArea');
  outputArea.style.display = 'block';
  localStorage.removeItem('reloadAvailable');
  var inputName = document.getElementById('inputName').value;
  if (!inputName) {
    inputName = 'User 1';
  }
  document.getElementById('userName').innerHTML = inputName;
  setPlayerName(inputName);
}

// adds player name to local storage
function setPlayerName(inputName){
  sessionStorage.setItem('name', inputName);
  // DELETEME
  // console.log(inputName);
}

// function getReloadState(){
//   return localStorage.getItem('reloadAvailable');
// }
