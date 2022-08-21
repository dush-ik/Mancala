
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
  let $currentHighlightedPit;
  let interval = null;

  const playersId = ['computer', 'your'];
  let selectedId = playersId[0];
  
  const restartGame = (e) => {
    // to remove focus from the restart button after click
    e.target.blur();
    document.removeEventListener('keyup', handleKeyboard);
    clearInterval(interval);
    interval = null;
    initializeGame();
  }

  const stop = () => {
    clearInterval(interval);
    interval = null;
    const currNumber = parseInt($currentHighlightedPit.textContent);
    if (currNumber > 1) {
      moveGlowTileAndReducePitNumber();
    } else {
      document.addEventListener('keyup', handleKeyboard, false);
    }
  }

  const moveGlowTileAndReducePitNumber = () => {
    const $reducingPit = document.getElementById(`${selectedId}-pit-${currentPit}`);
    let isHighlightScore = false;
    interval = setInterval(() => {
      const currentNumber = parseInt($reducingPit.textContent);
      if(currentNumber === 0) {
        stop();
        return;
      }
      $reducingPit.textContent = parseInt($reducingPit.textContent) - 1;
      if (selectedId === 'computer' && currentPit === 0) {
        if (!isHighlightScore && $toss.textContent === 'Computer') {
          glowTile(true, $computerScore);
          isHighlightScore = true;
        } else {
          isHighlightScore = false;
          selectedId = 'your';
          glowTile(true); 
        }
      } else if (selectedId === 'computer') {
        currentPit -= 1
        glowTile(true); 
      } else if (selectedId === 'your' && currentPit === 5) {
        if (!isHighlightScore && $toss.textContent === 'You') {
          glowTile(true, $yourScore);
          isHighlightScore = true;
        } else {
          isHighlightScore = false;
          selectedId = 'computer';
          glowTile(true); 
        }
      } else if (selectedId === 'your') {
        currentPit += 1;
        glowTile(true); 
      }
    }, 1000);
  }

  const glowTile = (isIncrease = false, highlightedElement) => {
    $currentHighlightedPit?.classList.remove(glowClass);
    $currentHighlightedPit = highlightedElement ?? document.getElementById(`${selectedId}-pit-${currentPit}`);
    isIncrease && ($currentHighlightedPit.textContent = parseInt($currentHighlightedPit.textContent) + 1);
    $currentHighlightedPit.classList.add(glowClass);
  }

  const handleKeyboard = (e) => {
    const keyBoardKey = e.key;
    if (keyBoardKey === 'Enter'){
      document.removeEventListener('keyup', handleKeyboard)
      moveGlowTileAndReducePitNumber();
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

  // add events
  const initializeEvents = () => {
    $restartButton.addEventListener('click', restartGame, false);
    document.addEventListener('keyup', handleKeyboard, false)
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
