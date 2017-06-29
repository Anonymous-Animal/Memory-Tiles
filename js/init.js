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
var players = [];
var idIndex = [];
// determines which object properties are used for finding matches.  0 = name, 1 = path.
var matchFinder = 0;
var playersSaved = [[getPlayerName(), 0, startTurns, 0]];

for (var i = 0; i < gridSize; i++) {
  if (i < 9) {
    idIndex.push('tile0' + (i + 1));
  } else {
    idIndex.push('tile' + (i + 1));
  }
}

// OBJ CONSTRUCTOR =====

// per player
function Player (myArray) {
  this.name = myArray[0];
  this.index = myArray[1];
  this.turns = myArray[2];
  this.points = myArray[3];
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


// determines how matches are found.
if (matchFinder) {
  this.set = this.path;
} else {
  this.set = this.name;
};


// per tile
function Tile(name, path){
  this.name = name;
  this.path = 'temp/' + path;
  if (matchFinder) {
    this.set = this.path;
  } else {
    this.set = this.name;
  }
  this.active = true;
}


//DELETEME
console.log(currentPlayer);

// init array of tiles
var sortedTiles = [
  new Tile('kitten_01', 'kitten_01.jpg', nada, nada, nada),
  new Tile('kitten_02', 'kitten_02.jpg', nada, nada, nada),
  new Tile('kitten_03', 'kitten_03.jpg', nada, nada, nada),
  new Tile('kitten_04', 'kitten_04.jpg', nada, nada, nada),
  new Tile('kitten_05', 'kitten_05.jpg', nada, nada, nada),
  new Tile('kitten_06', 'kitten_06.jpg', nada, nada, nada),
  new Tile('kitten_07', 'kitten_07.jpg', nada, nada, nada),
  new Tile('kitten_08', 'kitten_08.jpg', nada, nada, nada),
  new Tile('kitten_01', 'kitten_01.jpg', nada, nada, nada),
  new Tile('kitten_02', 'kitten_02.jpg', nada, nada, nada),
  new Tile('kitten_03', 'kitten_03.jpg', nada, nada, nada),
  new Tile('kitten_04', 'kitten_04.jpg', nada, nada, nada),
  new Tile('kitten_05', 'kitten_05.jpg', nada, nada, nada),
  new Tile('kitten_06', 'kitten_06.jpg', nada, nada, nada),
  new Tile('kitten_07', 'kitten_07.jpg', nada, nada, nada),
  new Tile('kitten_08', 'kitten_08.jpg', nada, nada, nada)
];

// shuffle the array of tiles
var randomTiles = shuffle(sortedTiles.slice(0));



if (localStorage.getItem('reloadAvailable')) {
  if (!flipped[0]) {
    flipped = [];
  }
  flipped = JSON.parse(localStorage.getItem('flipped'));
  tilesRemain = localStorage.getItem('tilesRemain');
  playersSaved = JSON.parse(localStorage.getItem('playersSaved'));
  randomTiles = JSON.parse(localStorage.getItem('randomTiles'));
  currentPlayer = parseInt(localStorage.getItem('currentPlayerIndex'));
  reloadTiles();
} else {
  localStorage.setItem('flipped', JSON.stringify(flipped));
  console.log(JSON.stringify(flipped));
  localStorage.setItem('tilesRemain', tilesRemain);
  localStorage.setItem('playersSaved', JSON.stringify(playersSaved));
  localStorage.setItem('randomTiles', JSON.stringify(randomTiles));
  localStorage.setItem('currentPlayerIndex', 0);
  localStorage.setItem('reloadAvailable', 'true');
}


// construct Player
new Player(playersSaved[0]);
var currentPlayer = players[0];
currentPlayer.update();
createOrUpdatePlayerInfo();
// DELETEME test local storage
// console.log(retrievePlayerInfo());

// FUNCTIONS =====

// returns tile object
function tile(elementId){
  // error handling
  if(elementId.length < 4){
    return null;
  } else {
    // console.log(randomTiles[parseInt(elementId.slice(4) - 1)]);
    return randomTiles[parseInt(elementId.slice(4) - 1)];
  }
}

// checks to see if tiles are matching
function checkMatch(){
  // checks flipped array to see if tiles are matching
  if(tile(flipped[0]).set == tile(flipped[1]).set){
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
  // deactivates tile
  tile(elementId).active = false;
  // TODO: visual cue of deactivated state ie opacity for now
  clickedTile.setAttribute('style', 'opacity: 0.25');
}

// CRUD Functions =====

// gets player name from local storage
function getPlayerName(){
  return sessionStorage.getItem('name');
}

function createOrUpdatePlayerInfo() {
  var stringifiedPlayerInfo = JSON.stringify(currentPlayer);
  localStorage.setItem('player', stringifiedPlayerInfo);
}

function retrievePlayerInfo() {
  var stringifiedPlayerInfo = localStorage.getItem('player');
  var parsedPlayerInfo = JSON.parse(stringifiedPlayerInfo);
  return parsedPlayerInfo;
}

function retrievePlayerName() {
  var playerInfo = retrievePlayerInfo();
  var playerName = playerInfo.name;
  return playerName;
}

function retrieveTurnCount() {
  var playerInfo = retrievePlayerInfo();
  var turnCount = playerInfo.turns;
  return turnCount;
}

function retrievePoints() {
  var playerInfo = retrievePlayerInfo();
  var points = playerInfo.points;
  return points;
}

function deletePlayerInfo () {
  localStorage.clear();
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
    localStorage.setItem('remain', tilesRemain);
    createOrUpdatePlayerInfo();
    localStorage.removeItem('reloadAvailable');
    window.location.href = 'results.html';
    console.log('Game Over!');
  }
}

function reloadTiles () {
  for (i = 0; i < randomTiles.length; i++) {
    var elementId = idIndex[i];
    var clickedTile = document.getElementById(elementId);
    if (!tile(elementId).active) {
      clickedTile.setAttribute('src', tile(elementId).path);
      clickedTile.setAttribute('style', 'opacity: 0.6');
    } else if (flipped.includes(elementId)) {
      clickedTile.setAttribute('src', tile(elementId).path);
      clickedTile.setAttribute('style', 'opacity: 1.0');
    } else {
      clickedTile.setAttribute('src', 'temp/facedown.gif');
      clickedTile.setAttribute('style', 'opacity: 1.0');
    }
  }
}

function nada (name) {
  // this app is just a placeholder
}
