export class Board {
  constructor(numberOfRows, numberOfColumns, numberOfBombs) {
    this._numberOfBombs = numberOfBombs;
    this._numberOfTiles = numberOfRows * numberOfColumns;
    this._playerBoard = Board.generatePlayerBoard(numberOfRows, numberOfColumns);
    this._bombBoard = Board.generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs);
  }

  // Getters
  get playerBoard() {
    return this._playerBoard;
  }

  // Methods
  flipTile(rowIndex, columnIndex) {
    // Has this tile already been flipped?
    if (this._playerBoard[rowIndex][columnIndex] !== ' ') {
      console.log("This tile has already been flipped!");
      return;
    } else if (this._bombBoard[rowIndex][columnIndex] === 'B') { // Does this tile have a bomb in it?
      this._playerBoard[rowIndex][columnIndex] = 'B';
    } else {  // Flip the tile with the number of neighbor bombs.
      this._playerBoard[rowIndex][columnIndex] = this.getNumberOfNeighborBombs(rowIndex, columnIndex);
      this._numberOfTiles--;
    }
  }

  getNumberOfNeighborBombs(rowIndex, columnIndex) {
    const neighborOffsets = [
      [-1,-1],
      [-1,0],
      [-1,1],
      [0,-1],
      [0,1],
      [1,-1],
      [1,0],
      [1,1]
    ];
    const numberOfRows = this._bombBoard.length;
    const numberOfColumns = this._bombBoard[0].length;
    //console.log('numberOfRows = ' + numberOfRows + '. numberOfColumns = ' + numberOfColumns);
    let numberOfNeighborBombs = 0;
    neighborOffsets.forEach(offset => {
      const neighborRowIndex = rowIndex + offset[0];
      const neighborColumnIndex = columnIndex + offset[1];
      if (neighborRowIndex >= 0 && neighborRowIndex < numberOfRows && neighborColumnIndex >= 0 && neighborColumnIndex < numberOfColumns) {
        if (this._bombBoard[neighborRowIndex][neighborColumnIndex] === 'B') {
          numberOfNeighborBombs++;
        }
      }
    });

    return numberOfNeighborBombs;
  }

  hasSafeTiles() {
    return (this._numberOfTiles !== this._numberOfBombs);
  }

  print() {
    console.log(this._playerBoard.map(row => row.join(' | ')).join('\n'));
  }

  printBomb() {
    console.log(this._bombBoard.map(row => row.join(' | ')).join('\n'));
  }


  static generatePlayerBoard(numberOfRows, numberOfColumns) {
    let board = [];
    for (let rowIndex = 0; rowIndex < numberOfRows; rowIndex++) {
      let row = [];
      for (let colIndex = 0; colIndex < numberOfColumns; colIndex++) {
        row.push(' ');
      }
      board.push(row);
    }
    return board;
  }

  static generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs) {
    let board = [];
    for (let rowIndex = 0; rowIndex < numberOfRows; rowIndex++) {
      let row = [];
      for (let colIndex = 0; colIndex < numberOfColumns; colIndex++) {
        row.push(null);
      }
      board.push(row);
    }
    let numberOfBombsPlaced = 0;
    while (numberOfBombsPlaced < numberOfBombs) {
      // Need code to prevent placing bombs on previously placed bombs.
      let randomRowIndex = Math.floor(Math.random() * numberOfRows);
      let randomColumnIndex = Math.floor(Math.random() * numberOfColumns);
      if (board[randomRowIndex][randomColumnIndex] !== 'B') {
        board[randomRowIndex][randomColumnIndex] = 'B';
        numberOfBombsPlaced++;
      }
    }
    return board;
  }

}
