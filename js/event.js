'use strict';
// create parents
var tileGridParent = document.getElementById('tileGrid');

// call event listener
eventListener();

// event listener function
function eventListener(){
  tileGridParent.addEventListener('click', eventHandler);
}
// event handler
function eventHandler(event){
  var elementId = event.target.getAttribute('id');
  // DELETEME
  // console.log(elementId);
  if (flipped.length == 2){
    checkMatch();
    localStorage.setItem('tilesRemain', tilesRemain);
    localStorage.setItem('randomTiles', JSON.stringify(randomTiles));
  } else if (flipped.includes(elementId) || !(tile(elementId).active) || !(tile(elementId))){
    // DELETEME
    // console.log('click on a real tile!');
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
  // console.log('clicked: ' + clickedTile);
  // console.log('elementId: ' + elementId);
  if(!flipped.includes(elementId)){
    // TODO: reveal card
    clickedTile.setAttribute('src', tile(elementId).path);
    // TODO: add to array
    flipped.push(elementId);
  } else {
    // TODO: return img to unflipped
    clickedTile.setAttribute('src', 'temp/facedown.gif');
    // remove element
    // console.log('before: ' + flipped);
    flipped.splice(flipped.indexOf(elementId), 1);
    // console.log('after: ' + flipped);
  }
}
