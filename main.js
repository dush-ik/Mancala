
const Mancala = () => {
  // DOM elements
  const $player1Score = document.getElementById('player-1-score');
  const $player1Pits = Array.from(document.getElementById('player-1-pits').children);
  const $player2Score = document.getElementById('player-2-score');
  const $player2Pits = Array.from(document.getElementById('player-2-pits').children);
  const $restartButton = document.querySelector('button');
  const $turn = document.getElementById('turn');
  const $count = document.getElementById('count');

  const glowClass = 'game__pit--glow';
  let currentPit;
  let $currentHighlightedPit;
  let interval = null;

  const PLAYER_1 = 'player-1';
  const PLAYER_2 = 'player-2'
  const playersId = [PLAYER_1, PLAYER_2];
  let currentHighlightedId = playersId[0];
  let currentTurn = PLAYER_1;

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
   * Else other player will get the chance to choose and play.
   */
  const stopTileMove = () => {
    stopInterval();
    const currentHighlightedPitNumber = parseInt($currentHighlightedPit.textContent);
    const currentHighlightedPitId = $currentHighlightedPit.id;
    if (currentHighlightedPitId === 'player-1-score' || currentHighlightedPitId === 'player-2-score') {
      currentHighlightedId = currentHighlightedPitId === 'player-1-score' ? PLAYER_1 : PLAYER_2;
      currentPit = 0;
      document.addEventListener('keyup', handleKeyboard, false);
      glowTile();
    } else if (currentHighlightedPitNumber > 1) {
      moveGlowTileAndReducePitNumber();
    } else {
      currentTurn = currentTurn === PLAYER_1 ? PLAYER_2 : PLAYER_1;
      currentPit = 0;
      document.addEventListener('keyup', handleKeyboard, false);
      chooseTurn(true);
      glowTile();
    }
  }

  const checkForWin = () => {
    const isPlayer1Empty = $player1Pits.every($ele => parseInt($ele.textContent) === 0);
    const isPlayer2Empty = $player2Pits.every($ele => parseInt($ele.textContent) === 0);
    if (isPlayer1Empty || isPlayer2Empty) {
      stopInterval();
      const player1Score = parseInt($player1Score.textContent);
      const player2Score = parseInt($player2Score.textContent);
      if(player1Score > player2Score) {
        alert('Player 1 won');
      } else if (player1Score < player2Score) {
        alert('Player 2 won');
      } else {
        alert('It`s a tie')
      }
      document.removeEventListener('keyup', handleKeyboard);
      initializeGame();
    }
  }

  /**
   * Once pit is selected, check its digit and store it in the count.
   * Start the the interval function and move anti clock wise while reducing from the count and 
   * increasing the count of the other highlighted pits.
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

      // if current highlighted pit is player-1`s and pit`s index is 0
      if (currentHighlightedId === PLAYER_1 && currentPit === 0) {
        if (!isHighlightScore && currentTurn === PLAYER_1) {
          glowTile(true, $player1Score);
          isHighlightScore = true;
        } else {
          isHighlightScore = false;
          currentHighlightedId = PLAYER_2;
          glowTile(true); 
        }
      } else if (currentHighlightedId === PLAYER_1) {
        currentPit -= 1
        glowTile(true);
      } else if (currentHighlightedId === PLAYER_2 && currentPit === 5) {
        if (!isHighlightScore && currentTurn === PLAYER_2) {
          glowTile(true, $player2Score);
          isHighlightScore = true;
        } else {
          isHighlightScore = false;
          currentHighlightedId = PLAYER_1;
          glowTile(true); 
        }
      } else if (currentHighlightedId === PLAYER_2) {
        currentPit += 1;
        glowTile(true); 
      }

      // check for end condition
      checkForWin();
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

  /**
   * Choose turn on random selection.
   * If the passed boolean value is false (or not passed), the random selection will be done.
   * Else whichever is currenty highlighted will be given the turn.
   */
  const chooseTurn = (isChangeTurn) => {
    if (!isChangeTurn) {
      const rand = Math.random()
      currentTurn = rand > 0.5 ? playersId[0] : playersId[1];  
    }
    currentHighlightedId = currentTurn;
    $turn.textContent = currentTurn === PLAYER_1 ? 'Player 1' : 'Player 2';
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
    $player1Score.textContent = '0';
    $player2Score.textContent = '0';
    $count.textContent = '0';
    // DOM children needs to be iterative.
    $player1Pits.forEach($ele => $ele.textContent = '6');
    $player2Pits.forEach($ele => $ele.textContent = '6');
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
