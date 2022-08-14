
const Mancala = () => {
  // DOM elements
  const $yourScore = document.getElementById('your-score');
  const $yourPits = document.getElementById('your-pits');
  const $computerScore = document.getElementById('computer-score');
  const $computerPits = document.getElementById('computer-pits');
  const $restartButton = document.querySelector('button');
  const $toss = document.getElementById('toss');

  const glowClass = 'game__pit--glow';
  let currentPit;
  let $currentHighlightedPit ;

  const players = ['Computer', 'You'];
  let selectedPlayer = players[0];
  let selectedId = 'computer';
  
  const restartGame = () => {
    initializeGame();
  }

  const heighlightPit = (e) => {
    const keyBoardKey = e.key;
    if (keyBoardKey === 'ArrowRight') {
      $currentHighlightedPit.classList.remove(glowClass);
      const nextPit = currentPit + 1;
      currentPit = nextPit > 5 ? 0 : nextPit;
      $currentHighlightedPit = document.getElementById(`${selectedId}-pit-${currentPit}`);
      $currentHighlightedPit.classList.add(glowClass);
    } else if (keyBoardKey === 'ArrowLeft') {
      $currentHighlightedPit.classList.remove(glowClass);
      const previousPit = currentPit - 1;
      currentPit = previousPit < 0 ? 5 : previousPit;
      $currentHighlightedPit = document.getElementById(`${selectedId}-pit-${currentPit}`);
      $currentHighlightedPit.classList.add(glowClass);
    }
  }
  
  const chooseToss = () => {
    const rand = Math.random()
    selectedPlayer = rand > 0.5 ? players[0] : players[1];
    $toss.textContent = selectedPlayer;
  }

  // initialize boards
  const initializeBoard = () => {
    chooseToss();
    selectedId = selectedPlayer === 'Computer' ? 'computer' : 'your';
    currentPit = 0;
    $currentHighlightedPit?.classList.remove(glowClass);
    $currentHighlightedPit = document.getElementById(`${selectedId}-pit-${currentPit}`);
    $currentHighlightedPit.classList.add(glowClass);
    $yourScore.textContent = '0';
    $computerScore.textContent = '0';
    Array.from($yourPits.children).forEach($ele => $ele.textContent = '6');
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
