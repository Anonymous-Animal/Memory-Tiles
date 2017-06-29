'use strict';

// GLOBAL VAR INIT =====

// size of the grid
var gridSize = 24;
// tiles remaining after clicked
var tilesRemain = gridSize;
// the total number of turns for the entire game
var startTurns = 12;
// array of flipped Tiles
var correctBonus = 3;
var wrongPenalty = 1;
var flipped = [];
var players = [];
var idIndex = [];
var playersSaved = [[getPlayerName(), 0, startTurns, 0]];
var defaultTileBack = 'temp/facedown.gif';
var pictureFolder = 'temp/';
var sortedTiles; var randomTiles;
var matchSystem = 'path';
var opacitySetting = 0.4;

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
  this.namefield = 'name_0';
  this.turnsfield = 'turns_0';
  this.scorefield = 'score_0';
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
function Tile (name, path, match, nomatch) {
  this.name = name;
  this.path = pictureFolder + path;
  this.set = this[matchSystem];
  this.active = true;
  this.match = match;
  this.nomatch = nomatch;
}

// init array of tiles

// shuffle the array of tiles

// check if there is a saved state
if (localStorage.getItem('reloadAvailable')) {
  // resets flipped array
  chooseTheme();
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
  chooseTheme();
  randomTiles = shuffle(sortedTiles.slice(0));
  localStorage.setItem('flipped', JSON.stringify(flipped));
  localStorage.setItem('tilesRemain', tilesRemain);
  localStorage.setItem('playersSaved', JSON.stringify(playersSaved));
  localStorage.setItem('randomTiles', JSON.stringify(randomTiles));
  localStorage.setItem('currentPlayerIndex', 0);
  localStorage.setItem('reloadAvailable', 'true');
  reloadTiles ();
}


// construct Player
new Player(playersSaved[0]);
var currentPlayer = players[0];
currentPlayer.update();
// [getPlayerName(), 0, startTurns, 0]
// if (playersSaved.length == 2) {
//   new Player(playersSaved[1]);
//   currentPlayer = players[Math.round()];
//   players[0].opponent = players[1];
//   players[1].opponent = players[0];
//   players[0].namefield = 'name_1';
//   players[0].turnsfield = 'turns_1';
//   players[0].scorefield = 'score_1';
//   players[1].namefield = 'name_2';
//   players[1].turnsfield = 'turns_2';
//   players[1].scorefield = 'score_2';
// }

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
    currentPlayer.turns += correctBonus;
  } else {
    // finally call flipTile on both elements
    flipTile(flipped[1]);
    flipTile(flipped[0]);
  }

  // clear array of flipped elements
  clearFlippedArray();
  // remove turn from current Player
  removeTurn();
  if (players.length == 2) {
    currentPlayer = players[Math.abs(currentPlayer.index - 1)];
  }
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
  clickedTile.setAttribute('style', 'opacity: ' + opacitySetting);
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
    var currentTile = document.getElementById(elementId);
    if (!tile(elementId).active) {
      currentTile.setAttribute('src', tile(elementId).path);
      currentTile.setAttribute('style', 'opacity: ' + opacitySetting);
    } else if (flipped.includes(elementId)) {
      currentTile.setAttribute('src', tile(elementId).path);
      currentTile.setAttribute('style', 'opacity: 1.0');
    } else {
      currentTile.setAttribute('src', defaultTileBack);
      currentTile.setAttribute('style', 'opacity: 1.0');
    }
  }
}



function nada () {
  // does what it says.  Placeholder for functions
}

function chooseTheme(theme) {
  if (false) {
    pass;
    // matchSystem = 'name';  Your options are either 'name' or 'path'
    // defaultTileBack = 'temp/facedown.gif'; back of tile
    // pictureFolder = 'temp/'; folder for your images
    // opacitySetting = 0.4; opacity setting after match
    // sortedTiles = generateKittenTiles(); constructor
  } else if (true) {
    defaultTileBack = 'chris/chris_facedown.jpg';
    pictureFolder = 'chris/';
    sortedTiles = generateChrisTiles();
  } else if (false) {
    sortedTiles = generateKittenSameTiles();
  } else {
    sortedTiles = generateKittenTiles();
  }
}


function generateKittenTiles () {
  return(
  [new Tile('name', 'kitten_01.jpg', nada, nada),
    new Tile('name', 'kitten_02.jpg', nada, nada),
    new Tile('name', 'kitten_03.jpg', nada, nada),
    new Tile('name', 'kitten_04.jpg', nada, nada),
    new Tile('name', 'kitten_05.jpg', nada, nada),
    new Tile('name', 'kitten_06.jpg', nada, nada),
    new Tile('name', 'kitten_07.jpg', nada, nada),
    new Tile('name', 'kitten_08.jpg', nada, nada),
    new Tile('name', 'kitten_01.jpg', nada, nada),
    new Tile('name', 'kitten_02.jpg', nada, nada),
    new Tile('name', 'kitten_03.jpg', nada, nada),
    new Tile('name', 'kitten_04.jpg', nada, nada),
    new Tile('name', 'kitten_05.jpg', nada, nada),
    new Tile('name', 'kitten_06.jpg', nada, nada),
    new Tile('name', 'kitten_07.jpg', nada, nada),
    new Tile('name', 'kitten_08.jpg', nada, nada),
    new Tile('name', 'kitten_09.jpg', nada, nada),
    new Tile('name', 'kitten_10.jpg', nada, nada),
    new Tile('name', 'kitten_11.jpg', nada, nada),
    new Tile('name', 'kitten_12.jpg', nada, nada),
    new Tile('name', 'kitten_09.jpg', nada, nada),
    new Tile('name', 'kitten_10.jpg', nada, nada),
    new Tile('name', 'kitten_11.jpg', nada, nada),
    new Tile('name', 'kitten_12.jpg', nada, nada)]);
}

//
// function generateChrisTiles () {
//   return(
//   [new Tile('Christian Bale', 'bale_1.jpg', nada, nada),
//     new Tile('Christian Bale', 'bale_1.jpg', nada, nada),
//     new Tile('Christopher Eccleston', 'eccleston_1.jpg', nada, nada),
//     new Tile('Christopher Eccleston', 'eccleston_1.jpg', nada, nada),
//     new Tile('Chris Evans', 'evans_1.jpg', nada, nada),
//     new Tile('Chris Evans', 'evans_1.jpg', nada, nada),
//     new Tile('Chris Evans', 'evans_2.jpg', nada, nada),
//     new Tile('Chris Evans', 'evans_2.jpg', nada, nada),
//     new Tile('Chris Hemsworth', 'hemsworth_1.jpg', nada, nada),
//     new Tile('Chris Hemsworth', 'hemsworth_1.jpg', nada, nada),
//     new Tile('Chris Hemsworth', 'hemsworth_2.jpg', nada, nada),
//     new Tile('Chris Hemsworth', 'hemsworth_2.jpg', nada, nada),
// }


function generateChrisTiles () {
  return(
  [new Tile('Christian Bale', 'bale_1.jpg', nada, nada),
    new Tile('Christian Bale', 'bale_1.jpg', nada, nada),
    new Tile('Christopher Eccleston', 'eccleston_1.jpg', nada, nada),
    new Tile('Christopher Eccleston', 'eccleston_1.jpg', nada, nada),
    new Tile('Chris Evans', 'evans_1.jpg', nada, nada),
    new Tile('Chris Evans', 'evans_1.jpg', nada, nada),
    new Tile('Chris Evans', 'evans_2.jpg', nada, nada),
    new Tile('Chris Evans', 'evans_2.jpg', nada, nada),
    new Tile('Chris Hemsworth', 'hemsworth_1.jpg', nada, nada),
    new Tile('Chris Hemsworth', 'hemsworth_1.jpg', nada, nada),
    new Tile('Chris Hemsworth', 'hemsworth_2.jpg', nada, nada),
    new Tile('Chris Hemsworth', 'hemsworth_2.jpg', nada, nada),
    new Tile('Christopher Lee', 'lee_1.jpg', nada, nada),
    new Tile('Christopher Lee', 'lee_1.jpg', nada, nada),
    new Tile('Chris Pine', 'pine_1.jpg', nada, nada),
    new Tile('Chris Pine', 'pine_1.jpg', nada, nada),
    new Tile('Chris Pine', 'pine_2.jpg', nada, nada),
    new Tile('Chris Pine', 'pine_2.jpg', nada, nada),
    new Tile('Chris Pratt', 'pratt_1.jpg', nada, nada),
    new Tile('Chris Pratt', 'pratt_1.jpg', nada, nada),
    new Tile('Chris Pratt', 'pratt_2.jpg', nada, nada),
    new Tile('Chris Pratt', 'pratt_2.jpg', nada, nada),
    new Tile('Christopher Reeve', 'reeve_1.jpg', nada, nada),
    new Tile('Christopher Reeve', 'reeve_1.jpg', nada, nada)
  ]);
}
