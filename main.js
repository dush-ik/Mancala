(() => {
  const player1 = prompt('Enter player 1 name');
  const player2 = prompt('Enter player 2 name');
  const $playerNameList = document.getElementsByClassName('player-name');
  $playerNameList[0].textContent = player1;
  $playerNameList[1].textContent = player2;
})();