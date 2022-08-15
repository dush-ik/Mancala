
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

  const playersId = ['computer', 'your'];
  let selectedId = playersId[0];
  
  const restartGame = (e) => {
    // to remove focus from the restart button after click
    e.target.blur();
    initializeGame();
  }

  const moveGlowTileAndReducePitNumber = () => {
    setInterval(() => {
      if (selectedId === 'computer' && currentPit === 0) {
        selectedId = 'your';
      } else if (selectedId === 'computer') {
        currentPit -= 1
      } else if (selectedId === 'your' && currentPit === 5) {
        selectedId = 'computer';
      } else if (selectedId === 'your') {
        currentPit += 1;
      }
      glowTile();  
    }, 1000);
  }

  const glowTile = () => {
    $currentHighlightedPit?.classList.remove(glowClass);
    $currentHighlightedPit = document.getElementById(`${selectedId}-pit-${currentPit}`);
    $currentHighlightedPit.classList.add(glowClass);
  }

  const handleKeyboard = (e) => {
    const keyBoardKey = e.key;
    if (keyBoardKey === 'Enter'){
      document.removeEventListener('keyup', handleKeyboard)
      moveGlowTileAndReducePitNumber();
      // document.addEventListener('keyup', handleKeyboard, false)
    } else if (keyBoardKey === 'ArrowRight') {
      const nextPit = currentPit + 1;
      currentPit = nextPit > 5 ? 0 : nextPit;
      glowTile();
    } else if (keyBoardKey === 'ArrowLeft') {
      const previousPit = currentPit - 1;
      currentPit = previousPit < 0 ? 5 : previousPit;
      glowTile();
    }
  }

  const chooseToss = () => {
    const rand = Math.random()
    selectedId = rand > 0.5 ? playersId[0] : playersId[1];
    $toss.textContent = selectedId === 'your' ? 'You' : 'Computer';
  }

  // initialize boards
  const initializeBoard = () => {
    currentPit = 0;
    chooseToss();
    glowTile();
    $yourScore.textContent = '0';
    $computerScore.textContent = '0';
    Array.from($yourPits.children).forEach($ele => $ele.textContent = '6');
    Array.from($computerPits.children).forEach($ele => $ele.textContent = '6');
  }

  // add events
  const initializeEvents = () => {
    $restartButton.addEventListener('click', restartGame, false);
    document.addEventListener('keyup', handleKeyboard, false)
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
