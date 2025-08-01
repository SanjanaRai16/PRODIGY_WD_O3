const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const resetBtn = document.getElementById('resetBtn');
const winSound = document.getElementById('winSound'); // keep this if you want win sound

let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = '❌';
let gameActive = true;

const winConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function handleCellClick(e) {
  const index = e.target.getAttribute('data-index');
  if (board[index] !== '' || !gameActive) return;

  board[index] = currentPlayer;
  e.target.textContent = currentPlayer;
  e.target.classList.add('filled');

  checkResult();
}

function checkResult() {
  let roundWon = false;

  for (let condition of winConditions) {
    const [a, b, c] = condition;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      roundWon = true;
      animateWin([a, b, c]);
      break;
    }
  }

  if (roundWon) {
    statusText.textContent = `🎉 Player ${currentPlayer} Wins!`;
    winSound?.play();
    gameActive = false;
    return;
  }

  if (!board.includes('')) {
    statusText.textContent = "🤝 It's a Draw!";
    gameActive = false;

    // Add draw animation
    cells.forEach(cell => {
      if (cell.textContent !== '') {
        cell.classList.add('draw-animate');
      }
    });
    return;
  }

  currentPlayer = currentPlayer === '❌' ? '⭕' : '❌';
  statusText.textContent = `Player ${currentPlayer}'s turn`;
}

function resetGame() {
  board = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = '❌';
  gameActive = true;
  statusText.textContent = `Player ❌'s turn`;
  cells.forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('filled', 'win-animate', 'draw-animate');
  });
}

function animateWin(indices) {
  indices.forEach(i => {
    cells[i].classList.add('win-animate');
  });
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetBtn.addEventListener('click', resetGame)
