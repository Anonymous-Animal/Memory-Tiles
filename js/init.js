'use strict';

// GLOBAL VAR INIT =====

// size of the grid
var gridSize = 24;
// tiles remaining after clicked
var tilesRemain = gridSize;
// the total number of turns for the entire game
var startTurns = Math.floor(gridSize * .5);
// array of flipped Tiles
var flipped = [];
var players = [];
var idIndex = [];
var playersSaved = [[getPlayerName(), 0, startTurns, 0]];
var defaultTileBack = 'images/defaultTile.png';

// accounts for naming convention of tiles
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
  this.path = 'temp/' + path;
  this.active = true;
}

// init array of tiles
var sortedTiles = [
  new Tile('kitten_01.jpg'),
  new Tile('kitten_02.jpg'),
  new Tile('kitten_03.jpg'),
  new Tile('kitten_04.jpg'),
  new Tile('kitten_05.jpg'),
  new Tile('kitten_06.jpg'),
  new Tile('kitten_07.jpg'),
  new Tile('kitten_08.jpg'),
  new Tile('kitten_01.jpg'),
  new Tile('kitten_02.jpg'),
  new Tile('kitten_03.jpg'),
  new Tile('kitten_04.jpg'),
  new Tile('kitten_05.jpg'),
  new Tile('kitten_06.jpg'),
  new Tile('kitten_07.jpg'),
  new Tile('kitten_08.jpg'),
  new Tile('kitten_09.jpg'),
  new Tile('kitten_10.jpg'),
  new Tile('kitten_11.jpg'),
  new Tile('kitten_12.jpg'),
  new Tile('kitten_09.jpg'),
  new Tile('kitten_10.jpg'),
  new Tile('kitten_11.jpg'),
  new Tile('kitten_12.jpg')
];

// shuffle the array of tiles
var randomTiles = shuffle(sortedTiles.slice(0));

// check if there is a saved state
if (localStorage.getItem('reloadAvailable')) {
  // resets flipped array
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
  // console.log(JSON.stringify(flipped));
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
    // console.log(randomTiles[parseInt(elementId.slice(4) - 1)]);
    return randomTiles[parseInt(elementId.slice(4) - 1)];
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
  // TODO: visual cue of deactivated state ie opacity for now
  clickedTile.setAttribute('style', 'opacity: 0.8');
  // clickedTile.setAttribute('transform', 'scale(1.5)');
}

// CRUD Functions =====

// gets player name from local storage
function getPlayerName(){
  return sessionStorage.getItem('name');
}


// function retrievePlayerInfo() {
//   var stringifiedPlayerInfo = localStorage.getItem('player');
//   var parsedPlayerInfo = JSON.parse(stringifiedPlayerInfo);
//   return parsedPlayerInfo;
// }

function setState(){
  localStorage.setItem('flipped', JSON.stringify(flipped));
  localStorage.setItem('tilesRemain', tilesRemain);
  localStorage.setItem('playersSaved', JSON.stringify(playersSaved));
  localStorage.setItem('randomTiles', JSON.stringify(randomTiles));
  localStorage.setItem('currentPlayerIndex', 1.0);
  localStorage.setItem('reloadAvailable', 'true');
}

// function retrievePlayerName() {
//   var playerInfo = retrievePlayerInfo();
//   var playerName = playerInfo.name;
//   return playerName;
// }
//
// function retrieveTurnCount() {
//   var playerInfo = retrievePlayerInfo();
//   var turnCount = playerInfo.turns;
//   return turnCount;
// }
//
// function retrievePoints() {
//   var playerInfo = retrievePlayerInfo();
//   var points = playerInfo.points;
//   return points;
// }
//
// function deletePlayerInfo () {
//   localStorage.clear();
// }

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

function checkGameOver(){
  if(currentPlayer.turns <= 0 || tilesRemain <= 0){
    localStorage.setItem('remain', tilesRemain);
    createOrUpdatePlayerInfo();
    localStorage.removeItem('reloadAvailable');
    window.location.href = 'results.html';
  }
}

function reloadTiles () {
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
