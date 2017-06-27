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

// OBJ CONSTRUCTOR =====

// per player
function Player (name){
  this.name = name;
  this.turns = startTurns;
}

// per tile
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
  new Tile('kitten_08.jpg')
];

// shuffle the array of tiles
var randomTiles = shuffle(sortedTiles.slice(0));

// FUNCTIONS =====

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
