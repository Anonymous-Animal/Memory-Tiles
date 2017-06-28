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


// OBJ CONSTRUCTOR =====

// per player
function Player (name) {
  this.index = players.length;
  // add pull name local storage
  this.name = name;
  this.namefield = 'name_' + this.index;
  this.turnsfield = 'turns_' + this.index;
  this.scorefield = 'score_' + this.index;
  this.turns = startTurns;
  this.points = 0;
  players.push(this);
}

// updates screen data
Player.prototype.update = function (){
  document.getElementById(this.namefield).innerHTML = this.name;
  document.getElementById(this.turnsfield).innerHTML = this.turns;
  document.getElementById(this.scorefield).innerHTML = this.points;
};

// per tile
function Tile(path){
  this.path = 'temp/' + path;
  this.active = true;
}

// construct Player
new Player(getPlayerName());
var currentPlayer = players[0];
currentPlayer.update();
createOrUpdatePlayerInfo();
// DELETEME test local storage
// console.log(retrievePlayerInfo());

//DELETEME
console.log(currentPlayer);

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
  new Tile('kitten_08.jpg')
];

// shuffle the array of tiles
var randomTiles = shuffle(sortedTiles.slice(0));

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
  // deactivates tile
  tile(elementId).active = false;
  // TODO: visual cue of deactivated state ie opacity for now
  clickedTile.setAttribute('style', 'opacity: 0.25');
}

function displayDirections(){
  alert("Directions content go here");
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
    window.location.href = 'results.html';
    console.log('Game Over!');
  }
}
