
const Mancala = () => {
  // DOM elements
  const $playerScore = document.getElementById('player-score');
  const $playerPits = document.getElementById('player-pits');
  const $computerScore = document.getElementById('computer-score');
  const $computerPits = document.getElementById('computer-pits');
  const $restartButton = document.querySelector('button');

  const glowClass = 'game__board__pits__child--glow';
  let currentPit = 1;
  let $currentHighlightedPit = document.getElementById(`comp-pit-${currentPit}`);
  $currentHighlightedPit.classList.add(glowClass);
  
  const restartGame = () => {
    initializeGame();
  }

  const heighlightPit = (e) => {
    const keyBoardKey = e.key;
    if (keyBoardKey === 'ArrowRight') {
      $currentHighlightedPit.classList.remove(glowClass);
      currentPit += 1;
      $currentHighlightedPit = document.getElementById(`comp-pit-${currentPit}`);
      $currentHighlightedPit.classList.add(glowClass);
    } else if (keyBoardKey === 'ArrowLeft') {
      $currentHighlightedPit.classList.remove(glowClass);
      currentPit -= 1;
      $currentHighlightedPit = document.getElementById(`comp-pit-${currentPit}`);
      $currentHighlightedPit.classList.add(glowClass);
    }
  }

  // initialize boards
  const initializeBoard = () => {
    $playerScore.textContent = '0';
    $computerScore.textContent = '0';
    Array.from($playerPits.children).forEach($ele => $ele.textContent = '6');
    Array.from($computerPits.children).forEach($ele => $ele.textContent = '6');
  }

  // add events
  const initializeEvents = () => {
    $restartButton.addEventListener('click', restartGame, false);
    document.addEventListener('keyup', heighlightPit, false)
  }

  const initializeGame = () => {
    initializeBoard();
    initializeEvents();
  }
  
  return {
    initializeGame
  }
}

const mancala = Mancala();
mancala.initializeGame();
