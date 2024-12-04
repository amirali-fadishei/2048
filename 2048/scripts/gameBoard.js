import LinkedList from "./linkedList.js";
class GameBoard {
  constructor() {
    this.board = new LinkedList();
    this.score = 0;
  }
  initializeBoard() {
    this.addRandomTile();
    this.addRandomTile();
  }
  addRandomTile() {
    const emptyCells = this.getEmptyCells();
    if (emptyCells.length === 0) return;
    const randomIndex = Math.floor(Math.random() * emptyCells.length);
    let current = emptyCells.head;
    let currentIndex = 0;
    while (currentIndex < randomIndex && current) {
      current = current.next;
      currentIndex++;
    }
    if (current) {
      let i = current.row;
      let j = current.column;
      const value = Math.random() < 0.7 ? 2 : 4;
      this.board.add(i, j, value);
    }
  }
  moveUp() {
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
  }
  moveDown() {
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
  }
  moveLeft() {
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
  }
  moveRight() {
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
    this.board.traverse((node) => {
      savedBoard.add(node.row, node.column, node.value);
    });
    return savedBoard;
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
      const neighbors = [
        this.board.find(node.row - 1, node.column),
        this.board.find(node.row + 1, node.column),
        this.board.find(node.row, node.column - 1),
        this.board.find(node.row, node.column + 1),
      ];
      if (
        neighbors.some((neighbor) => neighbor && neighbor.value === node.value)
      ) {
        gameOver = false;
      }
    });
    return gameOver;
  }
}
export default GameBoard;
