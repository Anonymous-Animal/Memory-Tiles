'use strict';

var player = JSON.parse(localStorage.getItem('player'));
var intro;
var motivational;

if (!parseInt(localStorage.getItem('remain'))) {
  intro = 'Congratulations, <br>' + player.name + ' you won!';
  motivational = 'You deserve a cookie.';
} else {
  intro = 'Congratulations, <br>' + player.name + ' you lost!';
  motivational = 'Don\'t forget, failure is a learning opportunity.';
}
document.getElementById('turnspan').innerHTML = player.turns;
document.getElementById('remainspan').innerHTML = localStorage.getItem('remain');
document.getElementById('introspan').innerHTML = intro;
document.getElementById('motivational').innerHTML = motivational;
document.getElementById('scorespan').innerHTML = player.points;
