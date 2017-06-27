'use strict';

// GLOBAL VAR INIT =====

// size of the grid
var gridSize = 4;
// tiles remaining after clicked
var tilesRemain = gridSize;
// the total number of turns for the entire game
var startTurns = gridSize * 2;
// array of flipped Tiles
var flipped = [];


// OBJ CONSTRUCTOR =====

// per player
function Player (name){
  this.name = name;
  this.turns = startTurns;
  this.points = 0;
}

// per tile
function Tile(path){
  this.path = 'temp/' + path;
  this.active = true;
}

// construct Player
var currentPlayer = new Player('Test Player');

// init array of tiles
var sortedTiles = [
  new Tile('kitten_01.jpg'),
  new Tile('kitten_02.jpg'),
  // new Tile('kitten_03.jpg'),
  // new Tile('kitten_04.jpg'),
  // new Tile('kitten_05.jpg'),
  // new Tile('kitten_06.jpg'),
  // new Tile('kitten_07.jpg'),
  // new Tile('kitten_08.jpg'),
  new Tile('kitten_01.jpg'),
  new Tile('kitten_02.jpg')
  // new Tile('kitten_03.jpg'),
  // new Tile('kitten_04.jpg'),
  // new Tile('kitten_05.jpg'),
  // new Tile('kitten_06.jpg'),
  // new Tile('kitten_07.jpg'),
  // new Tile('kitten_08.jpg')
];

// shuffle the array of tiles
var randomTiles = shuffle(sortedTiles.slice(0));

// FUNCTIONS =====

// returns tile object
function tile(elementID){
  // error handling
  if(elementID.length < 4 || elementID.substring[0,4] != 'tile'){
    return null;
  } else {
    return (randomTiles[parseInt(elementID.slice(4) - 1)]);
  }
}

// checks to see if tiles are matching
function checkMatch(){
  // checks flipped array to see if tiles are matching
  if(tile(flipped[0]).path == tile(flipped[1]).path){
    // iterate points to current player
    addPoints();
    // if match is found
    matchFound(flipped[0]);
    matchFound(flipped[1]);
  } else {
    // finally call flipTile on both elements
    flipTile(flipped[0]);
    flipTile(flipped[1]);
  }

  // clear array of flipped elements
  clearFlippedArray();
  // remove turn from current Player
  removeTurn();
  // check if game is over
  checkGameOver();
}

// flips tile
function flipTile(elementID){
  if(!flipped.includes(elementID)){
    // TODO: reveal card
    // TODO: add to array
  } else {
    // TODO: return img to unflipped
  }
}

// if match is found
function matchFound(elementID){
  // subtract from remaining tiles
  tilesRemain --;
  // deactivates tile
  tile(elementID).active = false;
  // TODO: visual cue of deactivated state ie opacity
}

// HELPER FUNCTIONS =====

// modeled after Fisher-Yates Shuffle in https://bost.ocks.org/mike/shuffle/
// shuffles the sortedTiles array to prep for display
function shuffle(array) {
  var m = array.length, t, i;

  while (m) {
    i = Math.floor(Math.random() * m--);

    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }

  return array;
}

function clearFlippedArray(){
  flipped = [];
}

function removeTurn(){
  currentPlayer.turns--;
}

function addPoints(){
  currentPlayer.points++;
}

function checkGameOver(){
  if(currentPlayer.turns == 0 || tilesRemain == 0){
    // TODO: trigger game over page
    console.log('Game Over!');
  }
}