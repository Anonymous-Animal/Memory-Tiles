'use strict';

var inputButton = document.getElementById('inputButton');
// var startButton = document.getElementById('startButton');


// call event listener
eventListener();

// event listener function
function eventListener() {
  inputButton.addEventListener('click', readInput);
  // startButton.addEventListener('click', loadGame);
}

//Reads user's input , hides input area and displays out with user's name
function readInput() {
  var inputArea = document.getElementById('inputArea');
  inputArea.style.display = 'none';

  var outputArea = document.getElementById('outputArea');
  outputArea.style.display = 'block';

  var inputName = document.getElementById('inputName').value;
  document.getElementById('userName').innerHTML = inputName;
}

// function loadGame() {}
