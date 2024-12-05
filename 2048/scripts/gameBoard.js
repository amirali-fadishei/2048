import LinkedList from "./linkedList.js";
import Stack from "./stack.js";

class GameBoard {
  constructor() {
    this.board = new LinkedList();
    this.undoStack = new Stack();
    this.redoStack = new Stack();
    this.score = 0;
  }

  initialize() {
    this.addRandomCell();
    this.addRandomCell();
  }
  addRandomCell() {
    const emptyCells = this.getEmptyCells();
    if (!emptyCells.head) return;
    const randomIndex = Math.floor(Math.random() * emptyCells.length);
    let nextPointer = emptyCells.head;
    for (let i = 0; i < randomIndex && nextPointer; i++) {
      nextPointer = nextPointer.next;
    }
    if (nextPointer) {
      const { row, column } = nextPointer;
      this.board.add(row, column, Math.random() < 0.7 ? 2 : 4);
    }
  }

  moveUp() {
    this.pushToUndo();
    this.board.traverse((node) => {
      while (node.row > 0) {
        const target = this.board.find(node.row - 1, node.column);
        if (target) {
          if (target.value === node.value) {
            target.value *= 2;
            this.score += target.value;
            this.board.remove(node.row, node.column);
            break;
          } else {
            break;
          }
        } else {
          node.row -= 1;
        }
      }
    });
    this.redoStack = new Stack();
  }
  moveDown() {
    this.pushToUndo();
    this.board.traverse((node) => {
      while (node.row < 3) {
        const target = this.board.find(node.row + 1, node.column);
        if (target) {
          if (target.value === node.value) {
            target.value *= 2;
            this.score += target.value;
            this.board.remove(node.row, node.column);
            break;
          } else {
            break;
          }
        } else {
          node.row += 1;
        }
      }
    });
    this.redoStack = new Stack();
  }
  moveLeft() {
    this.pushToUndo();
    this.board.traverse((node) => {
      while (node.column > 0) {
        const target = this.board.find(node.row, node.column - 1);
        if (target) {
          if (target.value === node.value) {
            target.value *= 2;
            this.score += target.value;
            this.board.remove(node.row, node.column);
            break;
          } else {
            break;
          }
        } else {
          node.column -= 1;
        }
      }
    });
    this.redoStack = new Stack();
  }
  moveRight() {
    this.pushToUndo();
    this.board.traverse((node) => {
      while (node.column < 3) {
        const target = this.board.find(node.row, node.column + 1);
        if (target) {
          if (target.value === node.value) {
            target.value *= 2;
            this.score += target.value;
            this.board.remove(node.row, node.column);
            break;
          } else {
            break;
          }
        } else {
          node.column += 1;
        }
      }
    });
    this.redoStack = new Stack();
  }

  getEmptyCells() {
    const emptyCells = new LinkedList();
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        const node = this.board.find(i, j);
        if (!node) {
          emptyCells.add(i, j, null);
        }
      }
    }
    return emptyCells;
  }
  saveCurrentBoard() {
    const savedBoard = new LinkedList();
    this.board.traverse((node) =>
      savedBoard.add(node.row, node.column, node.value)
    );
    return savedBoard;
  }
  restoreBoard(savedBoard) {
    this.board = new LinkedList();
    savedBoard.traverse((node) =>
      this.board.add(node.row, node.column, node.value)
    );
  }

  pushToUndo() {
    this.undoStack.push(this.saveCurrentBoard());
  }
  pushToRedo() {
    this.redoStack.push(this.saveCurrentBoard());
  }
  undo() {
    if (this.undoStack.isEmpty()) {
      alert("No more undos available!");
      return;
    }
    const previousBoard = this.undoStack.pop();
    this.redoStack.push(this.saveCurrentBoard());
    this.restoreBoard(previousBoard);
  }
  redo() {
    if (this.redoStack.isEmpty()) {
      alert("No more redos available!");
      return;
    }
    const nextBoard = this.redoStack.pop();
    this.undoStack.push(this.saveCurrentBoard());
    this.restoreBoard(nextBoard);
  }

  boardsAreEqual(savedBoard) {
    if (this.board.length !== savedBoard.length) return false;
    let current1 = this.board.head;
    let current2 = savedBoard.head;
    while (current1 && current2) {
      if (
        current1.row !== current2.row ||
        current1.column !== current2.column ||
        current1.value !== current2.value
      ) {
        return false;
      }
      current1 = current1.next;
      current2 = current2.next;
    }
    return true;
  }
  hasWon() {
    let found = false;
    this.board.traverse((node) => {
      if (node.value === 2048) {
        found = true;
      }
    });
    return found;
  }
  isGameOver() {
    if (this.getEmptyCells().length > 0) {
      return false;
    }

    let gameOver = true;

    this.board.traverse((node) => {
      const topNeighbor = this.board.find(node.row - 1, node.column);
      if (topNeighbor && topNeighbor.value === node.value) {
        gameOver = false;
      }

      const bottomNeighbor = this.board.find(node.row + 1, node.column);
      if (bottomNeighbor && bottomNeighbor.value === node.value) {
        gameOver = false;
      }

      const leftNeighbor = this.board.find(node.row, node.column - 1);
      if (leftNeighbor && leftNeighbor.value === node.value) {
        gameOver = false;
      }

      const rightNeighbor = this.board.find(node.row, node.column + 1);
      if (rightNeighbor && rightNeighbor.value === node.value) {
        gameOver = false;
      }
    });

    return gameOver;
  }
}
export default GameBoard;
