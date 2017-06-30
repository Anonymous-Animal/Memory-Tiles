'use strict';
// create parents
var tileGridParent = document.getElementById('tileGrid');
var newGameButton = document.getElementById('back');

// call event listener
eventListener();

// event listener function
function eventListener(){
  tileGridParent.addEventListener('click', clickTileHandler);
  newGameButton.addEventListener('click', triggerNewGame);
}

function triggerNewGame(){
  window.location.href = 'index.html';
}

// event handler
function clickTileHandler(event){
  var elementId = event.target.getAttribute('id');
  if(flipped.length == 2){
    checkMatch();
    localStorage.setItem('tilesRemain', tilesRemain);
    localStorage.setItem('randomTiles', JSON.stringify(randomTiles));
  } else if (flipped.includes(elementId) || !(tile(elementId).active) || !(tile(elementId))){
  } else {
    flipTile(elementId);
  }
  localStorage.setItem('flipped', JSON.stringify(flipped));
  currentPlayer.update();
  playersSaved[currentPlayer.index] = currentPlayer.saved();
  localStorage.setItem('playersSaved', JSON.stringify(playersSaved));
}



// flips tile
function flipTile(elementId){
  var clickedTile = document.getElementById(elementId);
  if(!flipped.includes(elementId)){
    clickedTile.setAttribute('src', tile(elementId).path);
    flipped.push(elementId);
  } else {
    clickedTile.setAttribute('src', defaultTileBack);
    // remove element
    flipped.splice(flipped.indexOf(elementId), 1);
  }
}
