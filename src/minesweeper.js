const generatePlayerBoard = (numberOfRows, numberOfColumns) => {
  let board = [];
  for (rowIndex = 0; rowIndex < numberOfRows; rowIndex++) {
    let row = [];
    for (colIndex = 0; colIndex < numberOfColumns; colIndex++) {
      row.push(' ');
    }
    board.push(row);
  }
  return board;
}

const generateBombBoard = (numberOfRows, numberOfColumns, numberOfBombs) => {
  let board = [];
  for (rowIndex = 0; rowIndex < numberOfRows; rowIndex++) {
    let row = [];
    for (colIndex = 0; colIndex < numberOfColumns; colIndex++) {
      row.push(null);
    }
    board.push(row);
  }
  let numberOfBombsPlaced = 0;
  while (numberOfBombsPlaced < numberOfBombs) {
    // Need code to prevent placing bombs on previously placed bombs.
    let randomRowIndex = Math.floor(Math.random() * numberOfRows);
    let randomColumnIndex = Math.floor(Math.random() * numberOfColumns);
    board[randomRowIndex][randomColumnIndex] = 'B';
    numberOfBombsPlaced++;
  }
  return board;
}

const printBoard = board => {
  console.log(board.map(row => row.join(' | ')).join('\n'));
}

let playerBoard = generatePlayerBoard(3,4);
let bombBoard = generateBombBoard(3,4,5);

console.log('Player Board: ');
printBoard(playerBoard);

console.log('Bomb Board: ');
printBoard(bombBoard);
