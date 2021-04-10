const playerDet = (name, mark) => {
  const playTurn = (board, cell) => {
    const idx = board.cells.findIndex(position => position === cell);
    if (board.boardArr[idx] === '') {
      board.render();
      return idx;
    }
    return null;
  };

  return { name, mark, playTurn };
};

const boardDet = (() => {
  let boardArr = ['', '', '', '', '', '', '', '', ''];
  const gameBoard = document.querySelector('.game-grid');
  const cells = Array.from(document.querySelectorAll('.cell'));
  let winner = null;

  const render = () => {
    boardArr.forEach((mark, idx) => {
      cells[idx].textContent = boardArr[idx];
    });
  };

  const checkWin = () => {
    const winArr = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    winArr.forEach((comb) => {
      if (boardArr[comb[0]]
        && boardArr[comb[0]] === boardArr[comb[1]]
        && boardArr[comb[0]] === boardArr[comb[2]]) {
        winner = 'current';
      }
    });
    return winner || (boardArr.includes('') ? null : 'Tie');
  };

  return {
    render, gameBoard, cells, boardArr, checkWin,
  };
})();

const playGame = (() => {
  const namePlayerOne = document.querySelector('#player1');
  const namePlayerTwo = document.querySelector('#player2');
  const form = document.querySelector('.player-info');
  let currPlayer;
  let playerOne;
  let playerTwo;

  const nextTurn = () => {
    currPlayer = currPlayer === playerOne ? playerTwo : playerOne;
  };

  const gameRound = () => {
    const board = boardDet;
    const gameStatus = document.querySelector('.game-status');
    if (currPlayer.name !== '') {
      gameStatus.textContent = `${currPlayer.name}'s Turn`;
    } else {
      gameStatus.textContent = 'Board: ';
    }

    board.gameBoard.addEventListener('click', (event) => {
      event.preventDefault();
      const play = currPlayer.playTurn(board, event.target);
      if (play !== null) {
        board.boardArr[play] = `${currPlayer.mark}`;
        board.render();
        const winStatus = board.checkWin();
        if (winStatus === 'Tie') {
          gameStatus.textContent = 'Tie!';
        } else if (winStatus === null) {
          nextTurn();
          gameStatus.textContent = `${currPlayer.name}'s Turn`;
        } else {
          gameStatus.textContent = `Winner is ${currPlayer.name}`;
          board.render();
        }
      }
    });
  };

  const startGame = () => {
    if (namePlayerOne.value !== '' && namePlayerTwo.value !== '') {
      let random = Math.floor(Math.random() * (+1 + 1 - +0)) + +0;
      if(random === 0){
        playerOne = playerDet(namePlayerOne.value, 'X');
        playerTwo = playerDet(namePlayerTwo.value, 'O');
        currPlayer = playerOne;
      }
      else{
        playerOne = playerDet(namePlayerTwo.value, 'X');
        playerTwo = playerDet(namePlayerOne.value, 'O');
        currPlayer = playerOne;
      }
      gameRound();
    }
  };

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (namePlayerOne.value !== '' && namePlayerTwo.value !== '') {
      startGame();
      form.classList.add('hidden');
      document.querySelector('.place').classList.remove('hidden');
    } else {
      window.location.reload();
    }
  });
  return {
    startGame,
  };
})();

playGame.startGame();
