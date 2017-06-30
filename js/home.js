'use strict';

// INITIALIZE GLOBAL VARIABLES =====
var area = document.getElementById('area');
var continueButton = document.createElement('button');
var resetButton = document.createElement('button');

// checks if there is persisted data
if(getReloadState()){
  changeAreaDisplay('inputArea', 'none');
  renderContinueButton();
  renderResetButton();
}

// loads event listeners
eventListener();

// FUNCTIONS =====

// to continue saved game
function renderContinueButton(){
  continueButton.innerHTML = 'Continue Saved Game';
  continueButton.setAttribute('id', 'continue');
  continueButton.setAttribute('onclick', 'location.href=\'main.html\';');

  area.appendChild(continueButton);
}

// to reset all data
function renderResetButton(){
  resetButton.innerHTML = 'Reset Game';
  resetButton.setAttribute('id', 'reset');

  area.appendChild(resetButton);
}

function eventListener() {
  var inputButton = document.getElementById('inputButton');
  inputButton.addEventListener('click', readInput);
  resetButton.addEventListener('click', reset);
}

// reads user input for name
function readInput() {
  changeAreaDisplay('inputArea', 'none');
  changeAreaDisplay('outputArea', 'block');
  var inputName = document.getElementById('inputName').value;
  if(!inputName){
    inputName = 'User';
  }
  document.getElementById('userName').innerHTML = inputName;
  setPlayerName(inputName);
}

// resets for new player
function reset(){
  localStorage.removeItem('reloadAvailable');
  area.removeChildren;
  location.reload();
}

// toggle change HTML elements
function changeAreaDisplay(affectedArea, state){
  var displayArea = document.getElementById(affectedArea);
  displayArea.style.display = state;
}

// sets the player name as the user input
function setPlayerName(inputName){
  sessionStorage.setItem('name', inputName);
}

// checks to see if there is saved data
function getReloadState(){
  return localStorage.getItem('reloadAvailable');
}
