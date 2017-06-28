'use strict';

var player = JSON.parse(localStorage.getItem('player'));
var intro;
if (!parseInt(localStorage.getItem('remain'))) {
  intro = 'Congratulations for winning ';
} else {
  intro = 'Tough luck for losing, ';
}
document.getElementById('namespan').innerHTML = player.name;
document.getElementById('turnspan').innerHTML = player.turns;
document.getElementById('remainspan').innerHTML = localStorage.getItem('remain');
document.getElementById('introspan').innerHTML = intro;
