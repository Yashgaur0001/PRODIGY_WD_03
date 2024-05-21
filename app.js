const gameBoard = document.getElementById('game-board');
const statusMessage = document.getElementById('status-message');
const restartButton = document.getElementById('restart-button');
const cells = [];

let currentPlayer = 'X';
let gameActive = true;
let moves = 0;

// Initialize game board
for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.dataset.index = i;
    cell.addEventListener('click', handleCellClick);
    gameBoard.appendChild(cell);
    cells.push(cell);
}

// Handle cell click
function handleCellClick() {
    const cell = this;
    const cellIndex = cell.dataset.index;

    if (!gameActive || cell.textContent !== '') return;

    cell.textContent = currentPlayer;
    moves++;

    if (checkWin() || moves === 9) {
        gameActive = false;
        if (checkWin()) {
            statusMessage.textContent = `${currentPlayer} wins!`;
        } else {
            statusMessage.textContent = "It's a draw!";
        }
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        statusMessage.textContent = `${currentPlayer}'s turn`;
    }
}

// Check for win
function checkWin() {
    const winningConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]              // Diagonals
    ];

    return winningConditions.some(condition => {
        const [a, b, c] = condition;
        return cells[a].textContent &&
               cells[a].textContent === cells[b].textContent &&
               cells[a].textContent === cells[c].textContent;
    });
}

// Restart game
restartButton.addEventListener('click', () => {
    currentPlayer = 'X';
    gameActive = true;
    moves = 0;
    statusMessage.textContent = `${currentPlayer}'s turn`;
    cells.forEach(cell => {
        cell.textContent = '';
    });
});
 