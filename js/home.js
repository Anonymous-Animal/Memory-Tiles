'use strict';

// INDEX.HTML EVENT LISTENER
var inputButton = document.getElementById('inputButton');
// var startButton = document.getElementById('startButton');


eventListener();
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
  var inputName = document.getElementById('inputName').value;
  document.getElementById('userName').innerHTML = inputName;

  setPlayerName(inputName);
}

// adds player name to local storage
function setPlayerName(inputName){
  sessionStorage.setItem('name', inputName);
  console.log(inputName);
}
