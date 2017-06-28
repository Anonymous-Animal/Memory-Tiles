'use strict';
// create parents
var tileGridParent = document.getElementById('tileGrid');

// call event listener
eventListener();

// event listener function
function eventListener(){
  // display new text
  display();
  tileGridParent.addEventListener('click', eventHandler);
}
// event handler
function eventHandler(event){
  var elementId = event.target.getAttribute('id');
  // DELETEME
  // console.log(elementId);
  if(flipped.length == 2){
    checkMatch();
  } else if (flipped.includes(elementId) || !(tile(elementId).active) || !(tile(elementId))){
    // DELETEME
    // console.log('click on a real tile!');
  } else {
    flipTile(elementId);
  }
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
    tile(elementId).mismatch(tile(elementId).name);
    clickedTile.setAttribute('src', 'temp/facedown.gif');
    // remove element
    // console.log('before: ' + flipped);
    flipped.pop();
    // console.log('after: ' + flipped);
  }
}
