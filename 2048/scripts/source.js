import GameBoard from "./gameBoard.js";
const game = new GameBoard();
let gameWon = false;
game.initializeBoard();
renderBoard(game.board);
updateScore(game.score);
function renderBoard(board) {
  const gameBoardElement = document.querySelector("#game-board");
  gameBoardElement.innerHTML = "";
  for (let i = 0; i < 4; i++) {
    const rowElement = document.createElement("div");
    rowElement.classList.add("row");
    for (let j = 0; j < 4; j++) {
      const node = board.find(i, j);
      const value = node ? node.value : null;
      const tile = createTile(value);
      rowElement.appendChild(tile);
    }
    gameBoardElement.appendChild(rowElement);
  }
}
function createTile(value) {
  const tile = document.createElement("div");
  tile.classList.add("tile");
  if (value !== null) {
    tile.textContent = value;
    if (value > 16) {
      tile.classList.add("tile-default");
    } else {
      tile.classList.add(`tile-${value}`);
    }
  }
  return tile;
}
document.addEventListener("keydown", handleKeyPress);
function handleKeyPress(event) {
  if (game.isGameOver()) {
    alert("Game Over! No more moves left.");
    return;
  }
  const directionMap = {
    ArrowUp: "Up",
    ArrowDown: "Down",
    ArrowLeft: "Left",
    ArrowRight: "Right",
  };
  const direction = directionMap[event.key];
  if (!direction) return;
  const boardBeforeMove = game.saveCurrentBoard();
  game[`move${direction}`]();
  if (game.boardsAreEqual(boardBeforeMove)) {
    alert("Invalid move: No changes made to the board.");
    return;
  } else {
    game.addRandomTile();
    renderBoard(game.board);
    updateScore(game.score);
    checkGameState();
  }
}
function checkGameState() {
  if (game.hasWon() && !gameWon) {
    gameWon = true;
    alert("Congratulations! You reached 2048!");
  }
  if (game.isGameOver()) {
    alert("Game Over! No more moves left.");
  }
}
function updateScore(score) {
  const scoreElement = document.getElementById("score");
  scoreElement.textContent = score;
}
