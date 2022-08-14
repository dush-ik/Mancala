
const Mancala = () => {
  // DOM elements
  const $playerScore = document.getElementById('player-score');
  const $playerPits = document.getElementById('player-pits');
  const $computerScore = document.getElementById('computer-score');
  const $computerPits = document.getElementById('computer-pits');
  const $restartButton = document.querySelector('button');

  const glowClass = 'game__pit--glow';
  let currentPit;
  let $currentHighlightedPit ;
  
  const restartGame = () => {
    initializeGame();
  }

  const heighlightPit = (e) => {
    const keyBoardKey = e.key;
    if (keyBoardKey === 'ArrowRight') {
      $currentHighlightedPit.classList.remove(glowClass);
      const nextPit = currentPit + 1;
      currentPit = (nextPit > 5 ? 0 : nextPit);
      $currentHighlightedPit = document.getElementById(`comp-pit-${currentPit}`);
      $currentHighlightedPit.classList.add(glowClass);
    } else if (keyBoardKey === 'ArrowLeft') {
      $currentHighlightedPit.classList.remove(glowClass);
      const previousPit = currentPit - 1;
      currentPit = (previousPit < 0 ? 5 : previousPit);
      $currentHighlightedPit = document.getElementById(`comp-pit-${currentPit}`);
      $currentHighlightedPit.classList.add(glowClass);
    }
  }

  // initialize boards
  const initializeBoard = () => {
    currentPit = 0;
    $currentHighlightedPit?.classList.remove(glowClass);
    $currentHighlightedPit = document.getElementById(`comp-pit-${currentPit}`);
    $currentHighlightedPit.classList.add(glowClass);
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
