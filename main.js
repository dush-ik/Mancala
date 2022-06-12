const $playerScore = document.getElementById('player-score');
const $playerPits = document.getElementById('player-pits');
const $computerScore = document.getElementById('computer-score');
const $computerPits = document.getElementById('computer-pits');

const start = () => {
  $playerScore.textContent = '0';
  $computerScore.textContent = '0';
  Array.from($playerPits.children).forEach($ele => $ele.textContent = '6');
  Array.from($computerPits.children).forEach($ele => $ele.textContent = '6');
}

const chooseTurn = () => {

}

start();