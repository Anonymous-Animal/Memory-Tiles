'use strict';

// this is a page for function calls within the tiles

function nada () {
  ;
  // this program does what it says
}

// flips all cards upside-down
function upsideDown () {
  exposition.push('This cat turned your world upside-down!\n\n');
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
}
