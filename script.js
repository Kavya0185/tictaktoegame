const cells = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const message = document.getElementById('message');
const restartBtn = document.getElementById('restartBtn');

let isXTurn = true;

const winCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8], 
  [0, 3, 6],
  [1, 4, 7], 
  [2, 5, 8], 
  [0, 4, 8],
  [2, 4, 6]
];

function startGame() {
  cells.forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('x', 'o');
    cell.addEventListener('click', handleClick, { once: true });
  });
  message.textContent = "Player X's Turn";
  isXTurn = true;
}

function handleClick(e) {
  const cell = e.target;
  const currentClass = isXTurn ? 'x' : 'o';
  cell.textContent = isXTurn ? 'X' : 'O';
  cell.classList.add(currentClass);

  if (checkWin(currentClass)) {
    message.textContent = `Player ${isXTurn ? 'X' : 'O'} Wins!`;
    endGame();
  } else if (isDraw()) {
    message.textContent = "It's a Draw!";
    endGame();
  } else {
    isXTurn = !isXTurn;
    message.textContent = `Player ${isXTurn ? 'X' : 'O'}'s Turn`;
  }
}

function endGame() {
  cells.forEach(cell => {
    cell.removeEventListener('click', handleClick);
  });
}

function isDraw() {
  return [...cells].every(cell => cell.classList.contains('x') || cell.classList.contains('o'));
}

function checkWin(currentClass) {
  return winCombos.some(combo => {
    return combo.every(index => {
      return cells[index].classList.contains(currentClass);
    });
  });
}

restartBtn.addEventListener('click', startGame);

startGame();
