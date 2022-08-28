
const Mancala = () => {
  // DOM elements
  const $yourScore = document.getElementById('your-score');
  const $yourPits = document.getElementById('your-pits');
  const $computerScore = document.getElementById('computer-score');
  const $computerPits = document.getElementById('computer-pits');
  const $restartButton = document.querySelector('button');
  const $turn = document.getElementById('turn');
  const $count = document.getElementById('count');

  const glowClass = 'game__pit--glow';
  let currentPit;
  let $currentHighlightedPit;
  let interval = null;

  const COMPUTER = 'computer';
  const YOUR = 'your'
  const playersId = [COMPUTER, YOUR];
  let currentHighlightedId = playersId[0];
  let currentTurn = 'Computer';

  // Stop interval function
  const stopInterval = () => {
    clearInterval(interval);
    interval = null;
  }
  
  /**
   * Once restart button is clicked, remove the focus from that button.
   * Remove event listener from the keyboard because it`ll be initialized in the initializeGame function.
   * Stop interval and re-initialize the game.
   */
  const restartGame = (e) => {
    e.target.blur();
    document.removeEventListener('keyup', handleKeyboard);
    stopInterval();
    initializeGame();
  }

  /**
   * Stop the tile move and check for current number.
   * If the current pit is any of the score pit, then the same player will get to choose again.
   * Else if the current pit number is greater than 1 then call moveGlowTile function again.
   * Else other player will get the chance to choose and play again.
   */
  const stopTileMove = () => {
    stopInterval();
    const currentHighlightedPitNumber = parseInt($currentHighlightedPit.textContent);
    const currentHighlightedPitId = $currentHighlightedPit.id;
    if (currentHighlightedPitId === 'your-score' || currentHighlightedPitId === 'computer-score') {
      currentHighlightedId = currentHighlightedPitId === 'your-score' ? YOUR : COMPUTER;
      currentPit = 0;
      document.addEventListener('keyup', handleKeyboard, false);
      glowTile();
    } else if (currentHighlightedPitNumber > 1) {
      moveGlowTileAndReducePitNumber();
    } else {
      currentHighlightedId = currentHighlightedId === COMPUTER ? YOUR : COMPUTER;
      currentPit = 0;
      document.addEventListener('keyup', handleKeyboard, false);
      chooseTurn(true);
      glowTile();
    }
  }

  /**
   * 
   */
  const moveGlowTileAndReducePitNumber = () => {
    const $reducingPit = document.getElementById(`${currentHighlightedId}-pit-${currentPit}`);
    $count.textContent = $reducingPit.textContent;
    $reducingPit.textContent = 0;
    let isHighlightScore = false;
    interval = setInterval(() => {
      const currentSelectedPitNumber = parseInt($count.textContent);
      if(currentSelectedPitNumber === 0) {
        stopTileMove();
        return;
      }
      $count.textContent = currentSelectedPitNumber - 1;
      if (currentHighlightedId === COMPUTER && currentPit === 0) {
        if (!isHighlightScore && currentTurn === 'Computer') {
          glowTile(true, $computerScore);
          isHighlightScore = true;
        } else {
          isHighlightScore = false;
          currentHighlightedId = YOUR;
          glowTile(true); 
        }
      } else if (currentHighlightedId === COMPUTER) {
        currentPit -= 1
        glowTile(true); 
      } else if (currentHighlightedId === YOUR && currentPit === 5) {
        if (!isHighlightScore && currentTurn === 'Your') {
          glowTile(true, $yourScore);
          isHighlightScore = true;
        } else {
          isHighlightScore = false;
          currentHighlightedId = COMPUTER;
          glowTile(true); 
        }
      } else if (currentHighlightedId === YOUR) {
        currentPit += 1;
        glowTile(true); 
      }
      // check for end condition
    }, 1000);
  }

  /**
   * If player has chosen a pit then isIncrease will be true and tile hightlighted will be increased by 1.
   * In case of player's pit, hightighted element will be the player score tile. 
   */
  const glowTile = (isIncrease = false, highlightedElement) => {
    $currentHighlightedPit?.classList.remove(glowClass);
    $currentHighlightedPit = highlightedElement ?? document.getElementById(`${currentHighlightedId}-pit-${currentPit}`);
    isIncrease && ($currentHighlightedPit.textContent = parseInt($currentHighlightedPit.textContent) + 1);
    $currentHighlightedPit.classList.add(glowClass);
  }

  /**
   * If the keyboard event is Enter that measn the player has chosen a tile 
   * and we need to disable keyboard event. Also call the moveGlowTile function.
   * If the keyboard is arrow left or right, glow the tile whichever gets hightlighted.
   */
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

  // Choose turn on random selection
  const chooseTurn = (isChangeTurn) => {
    if (!isChangeTurn) {
      const rand = Math.random()
      currentHighlightedId = rand > 0.5 ? playersId[0] : playersId[1];  
    }
    currentTurn = currentHighlightedId.charAt(0).toUpperCase() + currentHighlightedId.slice(1);
    $turn.textContent = currentTurn;
  }

  /**
   * Add events.
   * Restart the game.
   * Keyboard events for right, left and enter key.
   */
  const initializeEvents = () => {
    $restartButton.addEventListener('click', restartGame, false);
    document.addEventListener('keyup', handleKeyboard, false)
  }

  // Initialize boards
  const initializeBoard = () => {
    currentPit = 0;
    chooseTurn();
    glowTile();
    $yourScore.textContent = '0';
    $computerScore.textContent = '0';
    $count.textContent = '0';
    // DOM children needs to be iterative.
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
