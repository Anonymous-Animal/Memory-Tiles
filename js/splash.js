'use strict';

// GLOBAL VAR INIT =====

// text for splash page
var directionsText = ['How to Play:', 'Click on two tiles to match.', 'Click anywhere to submit.', 'You gain a turn and a point if they match.', 'You lose a turn if they don\'t match.', 'Try to match them all before you run out of turns!'];

splashFunction(directionsText);

// to display splash page
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
