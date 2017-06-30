'use strict';

// INITIALIZE GLOBAL VARIABLES =====
// size of the grid
var gridSize = 24;
// tiles remaining after clicked
var tilesRemain = gridSize;
// the total number of turns for the entire game
var startTurns = 15;
// array of flipped Tiles
var flipped = [];
// array of players
var players = [];
// array of id indeces
var idIndex = [];
// array of constructors to persist
var playersSaved = [[getPlayerName(), 0, startTurns, 0]];
// sets default tile
var defaultTileBack = 'images/defaultTile.jpg';

// accounts for naming convention of tiles as set in main.html
for (var i = 0; i < gridSize; i++) {
  if (i < 9) {
    idIndex.push('tile0' + (i + 1));
  } else {
    idIndex.push('tile' + (i + 1));
  }
}

// OBJ CONSTRUCTOR =====

// each player is constructed as an array value within playersSaved master array
function Player (playerArray) {
  this.name = playerArray[0];
  this.index = playerArray[1];
  this.turns = playerArray[2];
  this.points = playerArray[3];

  // add pull name local storage
  this.namefield = 'name_' + this.index;
  this.turnsfield = 'turns_' + this.index;
  this.scorefield = 'score_' + this.index;
  this.saved = function (){
    return([this.name, this.index, this.turns, this.points]);
  };
  players.push(this);
}

// updates screen data
Player.prototype.update = function (){
  document.getElementById(this.namefield).innerHTML = this.name;
  document.getElementById(this.turnsfield).innerHTML = this.turns;
  document.getElementById(this.scorefield).innerHTML = this.points;
};

// per tile as object
function Tile(path){
  this.path = 'chris/' + path;
  this.active = true;
}

// init array of tiles
var sortedTiles = [
  new Tile('bale_1.jpg'),
  new Tile('bale_1.jpg'),
  new Tile('eccleston_1.jpg'),
  new Tile('eccleston_1.jpg'),
  new Tile('evans_1.jpg'),
  new Tile('evans_1.jpg'),
  new Tile('evans_2.jpg'),
  new Tile('evans_2.jpg'),
  new Tile('hemsworth_1.jpg'),
  new Tile('hemsworth_1.jpg'),
  new Tile('hemsworth_2.jpg'),
  new Tile('hemsworth_2.jpg'),
  new Tile('lee_1.jpg'),
  new Tile('lee_1.jpg'),
  new Tile('pine_1.jpg'),
  new Tile('pine_1.jpg'),
  new Tile('pine_2.jpg'),
  new Tile('pine_2.jpg'),
  new Tile('pratt_1.jpg'),
  new Tile('pratt_1.jpg'),
  new Tile('pratt_2.jpg'),
  new Tile('pratt_2.jpg'),
  new Tile('walken_1.jpg'),
  new Tile('walken_1.jpg')
];

// shuffle the array of tiles
var randomTiles = shuffle(sortedTiles.slice(0));

// check if there is a saved state
if (localStorage.getItem('reloadAvailable')) {
  // resets flipped array
  if (!flipped[0]) {
    clearFlippedArray();
  }
  // gets persisted data
  flipped = JSON.parse(localStorage.getItem('flipped'));
  tilesRemain = localStorage.getItem('tilesRemain');
  playersSaved = JSON.parse(localStorage.getItem('playersSaved'));
  randomTiles = JSON.parse(localStorage.getItem('randomTiles'));
  currentPlayer = parseInt(localStorage.getItem('currentPlayerIndex'));
  reloadTiles();
} else {
  setState();
}

// construct Player
new Player(playersSaved[0]);
var currentPlayer = players[0];
currentPlayer.update();
createOrUpdatePlayerInfo();

// FUNCTIONS =====

// returns tile object
function tile(elementId){
  // error handling
  if(elementId.length < 4){
    return null;
  } else {
    return randomTiles[parseInt(elementId.slice(4) - 1)];
  }
}

// checks to see if tiles are matching
// linter error, function is declared in init.js but used in event.js
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
    flipTile(flipped[1]);
    flipTile(flipped[0]);
  }
  // clear array of flipped elements
  clearFlippedArray();
  // remove turn from current Player
  removeTurn();
  // check if game is over
  checkGameOver();
}

// if match is found
function matchFound(elementId){
  var clickedTile = document.getElementById(elementId);
  // subtract from remaining tiles
  tilesRemain --;
  currentPlayer.turns ++;
  // deactivates tile
  tile(elementId).active = false;
  // visual cue once match found
  clickedTile.setAttribute('style', 'opacity: 0.8');
}

// checks if game is over
function checkGameOver(){
  if(currentPlayer.turns <= 0 || tilesRemain <= 0){
    localStorage.setItem('remain', tilesRemain);
    createOrUpdatePlayerInfo();
    localStorage.removeItem('reloadAvailable');
    window.location.href = 'results.html';
  }
}

// reloads the tiles
function reloadTiles() {
  for (i = 0; i < randomTiles.length; i++) {
    var elementId = idIndex[i];
    var clickedTile = document.getElementById(elementId);
    if (!tile(elementId).active) {
      clickedTile.setAttribute('src', tile(elementId).path);
      clickedTile.setAttribute('style', 'opacity: 0.8');
    } else if (flipped.includes(elementId)) {
      clickedTile.setAttribute('src', tile(elementId).path);
      clickedTile.setAttribute('style', 'opacity: 1.0');
    } else {
      clickedTile.setAttribute('src', defaultTileBack);
      clickedTile.setAttribute('style', 'opacity: 1.0');
    }
  }
}

// CRUD FUNCTIONS =====

// gets player name from local storage
function getPlayerName(){
  return sessionStorage.getItem('name');
}

// sets the state based on persisted data
function setState(){
  localStorage.setItem('flipped', JSON.stringify(flipped));
  localStorage.setItem('tilesRemain', tilesRemain);
  localStorage.setItem('playersSaved', JSON.stringify(playersSaved));
  localStorage.setItem('randomTiles', JSON.stringify(randomTiles));
  localStorage.setItem('currentPlayerIndex', 0);
  localStorage.setItem('reloadAvailable', 'true');
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

function createOrUpdatePlayerInfo() {
  var stringifiedPlayerInfo = JSON.stringify(currentPlayer);
  localStorage.setItem('player', stringifiedPlayerInfo);
}
