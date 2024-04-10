const board = document.getElementById('board');
const message = document.getElementById('message');
const resetBtn = document.getElementById('resetBtn');

let currentPlayer = 'O';
let boardState = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

function handleCellClick(index) {
  if (!gameActive || boardState[index] !== '') return;

  boardState[index] = currentPlayer;
  renderBoard();
  if (checkWin()) {
    message.innerText = `${currentPlayer} wins!`;
    gameActive = false;
    return;
  }
  if (checkDraw()) {
    message.innerText = `It's a draw!`;
    gameActive = false;
    return;
  }
  currentPlayer = currentPlayer === 'O' ? 'X' : 'O';
  message.innerText = `Player ${currentPlayer}'s turn`;
}

function checkWin() {
  return winningConditions.some(condition => {
    return condition.every(index => {
      return boardState[index] === currentPlayer;
    });
  });
}

function checkDraw() {
  return boardState.every(cell => cell !== '');
}

function renderBoard() {
  board.innerHTML = '';
  boardState.forEach((cell, index) => {
    const cellElement = document.createElement('div');
    cellElement.innerText = cell;
    cellElement.classList.add('cell');
    cellElement.addEventListener('click', () => handleCellClick(index));
    board.appendChild(cellElement);
  });
}

function resetGame() {
  currentPlayer = 'O';
  boardState = ['', '', '', '', '', '', '', '', ''];
  gameActive = true;
  message.innerText = `Player ${currentPlayer}'s turn`;
  renderBoard();
}

resetBtn.addEventListener('click', resetGame);

resetGame();
