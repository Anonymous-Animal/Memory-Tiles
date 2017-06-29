'use strict';

// GLOBAL VAR INIT =====

// size of the grid

var directionsText = ['How to Play:', 'Click two tiles at a time.', 'You gain a turn if they match, and lose a turn if you don\'t.', 'Try to match them all before you run out of time!'];

splashFunction(directionsText);

function splashFunction(textArray) {
  console.log(textArray);
  var splash = document.getElementById('splash');
  console.log(14, splash);
  if (textArray) {
    splash.innerHTML = '';
    console.log(splash.innerHTML);
    for (var i = 0; i < textArray.length; i++) {
      splash.innerHTML = splash.innerHTML + '<p>' + textArray[i] + '</p>';
    }
  }
  if (splash.style.display === 'none') {
    splash.style.display = 'block';
  } else {
    splash.style.display = 'none';
  }
}
