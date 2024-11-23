import GameBoard from "./gameBoard.js";

const game = new GameBoard();
game.initializeBoard();
renderBoard(game.board);
updateScore(game.score);

document.addEventListener("keydown", handleKeyPress);

let gameWon = false;

function renderBoard(board) {
  const gameBoardElement = document.querySelector("#game-board");

  gameBoardElement.innerHTML = "";

  for (let row = 0; row < 4; row++) {
    const rowElement = document.createElement("div");
    rowElement.classList.add("row");

    for (let col = 0; col < 4; col++) {
      const tile = document.createElement("div");
      tile.classList.add("tile");

      if (board[row][col] !== null) {
        tile.textContent = board[row][col];

        if (board[row][col] <= 16) {
          tile.classList.add(`tile-${board[row][col]}`);
        } else {
          tile.classList.add("tile-default");
        }
      }

      rowElement.appendChild(tile);
    }

    gameBoardElement.appendChild(rowElement);
  }
}

function handleKeyPress(event) {
  const validKeys = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];
  if (!validKeys.includes(event.key)) return;

  const direction = event.key.replace("Arrow", "").toLowerCase();
  const boardBeforeMove = JSON.stringify(game.board);

  game.move(direction);

  if (JSON.stringify(game.board) !== boardBeforeMove) {
    renderBoard(game.board);
    updateScore(game.score);
    checkGameState();
  }
}

function checkGameState() {
  if (game.hasWon() && !gameWon) {
    alert("Congratulations! You reached 2048!");
    gameWon = true;
    return;
  }
  if (game.isGameOver()) {
    alert("Game Over! No more moves left.");
    return;
  }
}

function updateScore(score) {
  const scoreElement = document.getElementById("score");
  scoreElement.textContent = score;
}
