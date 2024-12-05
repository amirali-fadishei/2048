import GameBoard from "./gameBoard.js";

const game = new GameBoard();
let gameWon = false;

game.initialize();
renderBoard(game.board);
updateScore(game.score);

document.addEventListener("keydown", handleKeyPress);
const undoButton = document.getElementById("undo-button");
const redoButton = document.getElementById("redo-button");
undoButton.addEventListener("click", () => {
  game.undo();
  game.undoStack.limit--;
  renderBoard(game.board);
  updateScore(game.score);
  updateUndoRedoBtns();
});
redoButton.addEventListener("click", () => {
  game.redo();
  game.redoStack.limit--;
  renderBoard(game.board);
  updateScore(game.score);
  updateUndoRedoBtns();
});

function renderBoard(board) {
  const gameBoardElement = document.querySelector("#game-board");
  gameBoardElement.innerHTML = "";
  for (let i = 0; i < 4; i++) {
    const rowElement = document.createElement("div");
    rowElement.classList.add("row");
    for (let j = 0; j < 4; j++) {
      const node = board.find(i, j);
      const value = node ? node.value : null;
      const cell = createCell(value);
      rowElement.appendChild(cell);
    }
    gameBoardElement.appendChild(rowElement);
  }
}
function createCell(value) {
  const cell = document.createElement("div");
  cell.classList.add("cell");
  if (value !== null) {
    cell.textContent = value;
    if (value > 128) {
      cell.classList.add("cell-default");
    } else {
      cell.classList.add(`cell-${value}`);
    }
  }
  return cell;
}
function handleKeyPress(event) {
  if (game.isGameOver()) {
    alert("Game Over! No more moves left.");
    return;
  }
  const boardBeforeMove = game.saveCurrentBoard();

  const key = event.key;

  switch (key) {
    case "ArrowUp":
      game.moveUp();
      break;
    case "ArrowDown":
      game.moveDown();
      break;
    case "ArrowLeft":
      game.moveLeft();
      break;
    case "ArrowRight":
      game.moveRight();
      break;
    default:
      return;
  }

  if (game.boardsAreEqual(boardBeforeMove)) {
    alert("Invalid Move: No Changing");
    return;
  } else {
    game.addRandomCell();
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
function updateUndoRedoBtns() {
  if (game.undoStack.limit == 0) {
    undoButton.disabled = true;
  }
  if (game.redoStack.limit == 0) {
    redoButton.disabled = true;
  }
}
