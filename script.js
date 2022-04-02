'use strict';

const scoreGenP1 = document.querySelector('#score--0');
const scoreGenP2 = document.querySelector('#score--1');
const actPl1Class = document.querySelector(`.player--0`);
const actPl2Class = document.querySelector(`.player--1`);
const scoreP1 = document.querySelector('#current--0');
const scoreP2 = document.querySelector('#current--1');
const dice = document.querySelector('.dice');
const roll = document.querySelector('.btn--roll');
const newGame = document.querySelector('.btn--new');
const holdBtn = document.querySelector('.btn--hold');
let minScors;
let randNumber;
let activePlayer;
let playing;



const switchPlayer = function(){
  document.querySelector(`#current--${activePlayer}`).innerHTML = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  actPl1Class.classList.toggle('player--active');
  actPl2Class.classList.toggle('player--active');
}


const initCond = function(){
  minScors = [0, 0];
  scoreGenP1.innerText = '0';
  scoreGenP2.innerText = '0';
  dice.classList.add('hidden');
  randNumber = 0;
  activePlayer = 0;
  playing = true;
  scoreP1.innerText = 0;
  scoreP2.innerText = 0;
  actPl1Class.classList.remove('name');
  actPl1Class.classList.remove('player--winner');
  actPl1Class.classList.add('player--active');
  actPl2Class.classList.remove('name');
  actPl2Class.classList.remove('player--winner');
}

initCond();

roll.addEventListener('click', function(){
  if(playing){
    dice.classList.remove('hidden');
    var randNum = Math.ceil(Math.random()*6);
    dice.src = `dice-${randNum}.png`;
    if (randNum !== 1){
      randNumber += randNum;
      document.querySelector(`#current--${activePlayer}`).innerHTML = randNumber;
    }else{
      document.querySelector(`#current--${activePlayer}`).innerHTML = 0;
      randNumber = 0;
      activePlayer = activePlayer === 0 ? 1 : 0;
      actPl1Class.classList.toggle('player--active');
      actPl2Class.classList.toggle('player--active');
    }
  }
})

holdBtn.addEventListener('click', function(){
  if(playing){
    minScors[activePlayer] += randNumber;
    if(minScors[activePlayer] >= 50){
      document.querySelector(`#score--${activePlayer}`).innerText = minScors[activePlayer];
      document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
      document.querySelector(`.player--${activePlayer}`).classList.add('name');
      document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
      document.querySelector(`#current--${activePlayer}`).innerHTML = 0;
      dice.classList.add('hidden');
      playing = false;
    } else {
      document.querySelector(`#score--${activePlayer}`).innerText = minScors[activePlayer];
      document.querySelector(`#current--${activePlayer}`).innerHTML = 0;
      randNumber = 0;
      switchPlayer();
    }
  }
})

newGame.addEventListener('click', initCond);
