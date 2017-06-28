'use strict';

// this is a page for function calls within the tiles

function nada () {
  ;
  // this program does what it says
}


function iAmTheDoctor (name) {
  exposition.push(name + ' heals you 5 points!');
  currentPlayer.hp += 5;
}

function everybodyLives (name) {
  exposition.push(name + ' heals both parties!');
  currentPlayer.hp += 50;
  currentPlayer.opponent.hp += 25;
}


// Bale
function heroDeserved (name) {
  exposition.push(name + ' heals you the amount you deserve, but not the amount you need!');
  currentPlayer.hp += 20;
}

// flips all cards upside-down
function upsideDown (name) {
  exposition.push(name + ' has turned your world upside-down!\n\n');
  for (var i = 0; i < flipped.length; i++) {
    m = idIndex.indexOf(flipped[i]);
    flipped[i] = idIndex[gridSize - m - 1];
  }
  var m = Math.floor(gridSize / 2), t;
  while (m) {
    m--;
    i = gridSize - m - 1;
    t = randomTiles[m];
    randomTiles[m] = randomTiles[i];
    randomTiles[i] = t;
  };
  refreshTiles ();
}
