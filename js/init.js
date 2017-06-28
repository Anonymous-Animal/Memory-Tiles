'use strict';

// GLOBAL VAR INIT =====

// size of the grid
var gridSize = 16;
// tiles remaining after clicked
var tilesRemain = gridSize;
// the total number of turns for the entire game
var startTurns = gridSize * 2;
// array of flipped Tiles
var flipped = [];
var exposition = [];


// OBJ CONSTRUCTOR =====

// per player
function Player (name, index){
  this.name = name;
  this.index = index;
  this.hp = 100;
  this.pairs = 0;
}

// per tile
function Tile(path, match, mismatch, mismatch2){
  this.path = 'temp/' + path;
  this.active = true;
  // allows methods to be used for matches and mismatches
  this.match = match;
  this.mismatch = function() {
    mismatch();
    // after the first mismatch happens, the method for mismatch might change
    this.action = mismatch2;
  };
}

// construct Player
var players = [new Player('Player 1', 0), new Player('Player 2', 1)];
players[0].opponent = players[1];
players[1].opponent = players[0];
var currentPlayer = players[(Math.round(Math.random()))];

// init array of tiles
var sortedTiles = [
  new Tile('kitten_01.jpg', nada, nada, nada),
  new Tile('kitten_02.jpg', nada, nada, nada),
  new Tile('kitten_03.jpg', nada, nada, nada),
  new Tile('kitten_04.jpg', nada, nada, nada),
  new Tile('kitten_05.jpg', nada, nada, nada),
  new Tile('kitten_06.jpg', nada, nada, nada),
  new Tile('kitten_07.jpg', nada, nada, nada),
  new Tile('kitten_08.jpg', nada, nada, nada),
  new Tile('kitten_01.jpg', nada, nada, nada),
  new Tile('kitten_02.jpg', nada, nada, nada),
  new Tile('kitten_03.jpg', nada, nada, nada),
  new Tile('kitten_04.jpg', nada, nada, nada),
  new Tile('kitten_05.jpg', nada, nada, nada),
  new Tile('kitten_06.jpg', nada, nada, nada),
  new Tile('kitten_07.jpg', nada, nada, nada),
  new Tile('kitten_08.jpg', nada, nada, nada)
];

// shuffle the array of tiles
var randomTiles = shuffle(sortedTiles.slice(0));

// FUNCTIONS =====

// returns tile object
function tile(elementId){
  // error handling
  if(!elementId || elementId.length < 4 || elementId.substring(0, 4) != 'tile'){
    return null;
  } else {
    // console.log(randomTiles[parseInt(elementId.slice(4) - 1)]);
    return randomTiles[parseInt(elementId.slice(4) - 1)];
  }
}

// checks to see if tiles are matching
function checkMatch(){
  // checks flipped array to see if tiles are matching
  if(tile(flipped[0]).path == tile(flipped[1]).path){
    // iterate points to current player
    // addPoints();
    // if match is found
    matchFound(flipped[0]);
    matchFound(flipped[1]);
    currentPlayer.hp += 10;
  } else {
    // finally call flipTile on both elements
    flipTile(flipped[1]);
    flipTile(flipped[0]);
    currentPlayer.hp -= 10;
    currentPlayer = currentPlayer.opponent;
  }

  // clear array of flipped elements
  flipped = [];
  // clearFlippedArray();
  // remove turn from current Player
  // removeTurn();
  display();
  // check if game is over
  checkGameOver();
}


// if match is found
function matchFound(elementId){
  var clickedTile = document.getElementById(elementId);
  // subtract from remaining tiles
  tilesRemain --;
  // deactivates tile
  tile(elementId).active = false;
  // TODO: visual cue of deactivated state ie opacity for now
  clickedTile.setAttribute('style', 'opacity: 0.25');
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
    array[i] = t;}
  return array;}

// function clearFlippedArray(){
//   flipped = [];}
//
// function removeTurn(){
//   currentPlayer.turns--;}
//
// function addPoints(){
//   currentPlayer.points++;
// }

function checkGameOver(){
  if(players[0].hp == 0 || players[1].hp == 0 || tilesRemain == 0){
    // TODO: trigger game over page
    console.log('Game Over!');
  }
}

function display () {
  console.log('\n');
  for (var i = 0; i < exposition.length; i++) {
    console.log(exposition[i]);
  }
  exposition = [];
  console.log(players[0].hp + ' HP and ' + players[0].pairs + ' pairs for ' + players[0].name + ', vs. ' + players[1].hp + ' HP and ' + players[1].pairs + ' pairs for ' + players[1].name + '\n\n');
  console.log('It is now ' + currentPlayer.name + '\'s turn');
}
