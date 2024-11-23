class GameBoard {
  constructor() {
    this.board = Array(4)
      .fill(null)
      .map(() => Array(4).fill(null));
    this.score = 0;
  }

  addScore(value) {
    this.score += value;
  }

  getEmptyCells() {
    const emptyCells = [];
    for (let row = 0; row < 4; row++) {
      for (let col = 0; col < 4; col++) {
        if (this.board[row][col] === null) {
          emptyCells.push({
            row,
            col,
          });
        }
      }
    }
    return emptyCells;
  }

  addRandomTile() {
    const emptyCells = this.getEmptyCells();
    if (emptyCells.length === 0) return;

    const randomIndex = Math.floor(Math.random() * emptyCells.length);
    const randomCell = emptyCells[randomIndex];
    const value = Math.random() <= 0.7 ? 2 : 4;

    this.board[randomCell.row][randomCell.col] = value;
  }

  initializeBoard() {
    this.addRandomTile();
    this.addRandomTile();
  }

  printBoard() {
    console.table(this.board);
  }

  move(direction) {
    const boardBeforeMove = this.board.map((row) => [...row]);

    switch (direction) {
      case "up":
        this.moveUp();
        break;
      case "down":
        this.moveDown();
        break;
      case "left":
        this.moveLeft();
        break;
      case "right":
        this.moveRight();
        break;
    }

    if (!this.areBoardsEqual(boardBeforeMove, this.board)) {
      this.addRandomTile();
    } else {
      console.log("Invalid move!");
    }
  }

  // متد کمکی برای مقایسه دو برد
  areBoardsEqual(board1, board2) {
    for (let row = 0; row < 4; row++) {
      for (let col = 0; col < 4; col++) {
        if (board1[row][col] !== board2[row][col]) {
          return false;
        }
      }
    }
    return true;
  }

  moveLeft() {
    for (let row = 0; row < 4; row++) {
      let newRow = [];

      for (let col = 0; col < 4; col++) {
        if (this.board[row][col] !== null) {
          newRow.push(this.board[row][col]);
        }
      }

      for (let i = 0; i < newRow.length - 1; i++) {
        if (newRow[i] === newRow[i + 1]) {
          newRow[i] *= 2;
          this.addScore(newRow[i]);
          newRow[i + 1] = null;
          i++;
        }
      }

      newRow = newRow.filter((val) => val !== null);
      while (newRow.length < 4) {
        newRow.push(null);
      }

      this.board[row] = newRow;
    }
  }
  moveRight() {
    for (let row = 0; row < 4; row++) {
      let newRow = this.board[row]
        .slice()
        .reverse()
        .filter((val) => val !== null);

      for (let i = 0; i < newRow.length - 1; i++) {
        if (newRow[i] === newRow[i + 1]) {
          newRow[i] *= 2;
          this.addScore(newRow[i]);
          newRow[i + 1] = null;
          i++;
        }
      }

      newRow = newRow.filter((val) => val !== null);
      while (newRow.length < 4) {
        newRow.push(null);
      }

      this.board[row] = newRow.reverse(); // نتیجه را معکوس کنید
    }
  }

  moveUp() {
    for (let col = 0; col < 4; col++) {
      let newCol = [];
      for (let row = 0; row < 4; row++) {
        if (this.board[row][col] !== null) {
          newCol.push(this.board[row][col]);
        }
      }

      for (let i = 0; i < newCol.length - 1; i++) {
        if (newCol[i] === newCol[i + 1]) {
          newCol[i] *= 2;
          this.addScore(newCol[i]);
          newCol[i + 1] = null;
          i++;
        }
      }

      newCol = newCol.filter((val) => val !== null);
      while (newCol.length < 4) {
        newCol.push(null);
      }

      for (let row = 0; row < 4; row++) {
        this.board[row][col] = newCol[row] || null;
      }
    }
  }
  moveDown() {
    for (let col = 0; col < 4; col++) {
      let newCol = [];
      
      // جمع‌آوری مقادیر غیر null از پایین به بالا
      for (let row = 3; row >= 0; row--) {
        if (this.board[row][col] !== null) {
          newCol.push(this.board[row][col]);
        }
      }
  
      // ترکیب مقادیر مشابه از پایین به بالا
      for (let i = 0; i < newCol.length - 1; i++) {
        if (newCol[i] === newCol[i + 1]) {
          newCol[i] *= 2;
          this.addScore(newCol[i]);
          newCol.splice(i + 1, 1); // مقدار دوم را حذف کن
        }
      }
  
      // پر کردن خانه‌های خالی از بالا
      while (newCol.length < 4) {
        newCol.unshift(null); // nullها از بالا اضافه شوند
      }
  
      // بازگرداندن مقادیر به برد اصلی
      for (let row = 0; row < 4; row++) {
        this.board[row][col] = newCol[row];
      }
    }
  }
  

  hasWon() {
    for (let row = 0; row < 4; row++) {
      for (let col = 0; col < 4; col++) {
        if (this.board[row][col] === 2048) {
          return true;
        }
      }
    }
    return false;
  }
}

export default GameBoard;
