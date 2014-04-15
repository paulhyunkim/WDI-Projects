window.onload = startup;

var winNum;


function startup() {

  var grid = document.getElementsByClassName('button');
  for (i = 0; i < grid.length; i++) {
    grid[i].onclick = play;
  }
}

function displayBoard() {
	for (var i = 0; i < board.length; i++) {
		console.log(board[i]);
	}	
}

function createBoard(boardDim) {
	board = new Array(boardDim);
	for (var i = 0; i < boardDim; i++) { board[i] = new Array(boardDim); }
}

function createPlayers(numPlayers) {
	for (var i = 0; i < numPlayers; i++) {
		playersList[i] = i;
	}
}

function startGame() {
	// scoreboard
	scoreBoard = new Array();
	for (var i; i < num; i++) {
		scoreBoard[i] = 0;
	}

	// player list, current player, last turn
	playersList;

	checkSpaces = [board[x,y], board[x,y+1], board[x,y+2]], [board[x,y-1], board[x,y], board[x,y+1]], [board[x,y-2], board[x,y-1], board[x,y]], [board[x-2,y], board[x-1,y], board[x,y]], [board[x-1,y], board[x,y], board[x+1,y]], [board[x,y], board[x+1,y], board[x+2,y]], [board[x-1,y-1], board[x,y], board[x+1,y+1]], [board[x-1,y+1], board[x,y], board[x+1,y-1]];

	var horizontalIndex = 0;
	var verticalIndex = 0;
	var diagonalDownIndex = 0;
	var diagonalUpIndex = 0;

	// test parameters
	board = [[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]];
	x = 2;
	y = 2;

	horizontalCheck = new Array(3);
	for (var i = 0; i < horizontalCheck.length; i++) {
		horizontalCheck[i] = new Array(3);
	}

	for (var i = 0; i < winNum; i++) {
		for (var j = 0; j < winNum; j++) {
			horizontalCheck[i][j] = board[x][y-winNum+1+i+j];
		}
	}

	lastMoveX;
	lastMoveY;

}

function placePiece(player, playerMove) {
	board[playerMove[0],playerMove[1]] = player;
	// turn off button
}
// have javascript change class of div to 'played' to block players from choosing again

function checkWin(player, playerMove) {

	// for () {
	// 	for () {
	// 		// have a counter that counts through each array and if 3...
	// 		gameWon(currentPlayer);
	// 	}
	// }
}

function gameWon(currentPlayer) {
	// stop game,

}

function nextTurn() {
	// switch player
	play ();
}

function play() {
	playerMove = [this.attributes.x, this.attributes.y]
	placePiece(currentPlayer, x, y);
	checkWin();
	nextTurn();
}