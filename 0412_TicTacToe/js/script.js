window.onload = startup;

function startup() {
  var grid = document.getElementsByClassName('button');
  for (i = 0; i < grid.length; i++) {
    grid[i].onclick = play;
  }
}

function startGame(dim) {
	// board game
	board = new Array(dim);
	for (var i = 0; i < dim; i++) {
		board[i] = new Array(dim);
	}

	// scoreboard
	scoreBoard = new Array();
	for (var i, i < num; i++) {
		scoreBoard[i] = 0;
	}

	// player list
	playersList;

	// current player, last turn
	checkSpaces = [board[x,y], board[x,y+1], board[x,y+2]], [board[x,y-1], board[x,y], board[x,y+1]], [board[x,y-2], board[x,y-1], board[x,y]], [board[x-2,y], board[x-1,y], board[x,y]], [board[x-1,y], board[x,y], board[x+1,y]], [board[x,y], board[x+1,y], board[x+2,y]], [board[x-1,y-1], board[x,y], board[x+1,y+1]], [board[x-1,y+1], board[x,y], board[x+1,y-1]];

	lastMoveX;
	lastMoveY;

}

function placePiece(player, playerMove) {
	board[playerMove[0],playerMove[1]] = player;
	// turn off button
}
// have javascript change class of div to 'played' to block players from choosing again

function checkWin(player, playerMove) {
	// var array1 = [board[x,y], board[x,y+1], board[x,y+2]]
	// var array2 = [board[x,y-1], board[x,y], board[x,y+1]]
	// var array3 = [board[x,y-2], board[x,y-1], board[x,y]]
	// var array4 = [board[x-2,y], board[x-1,y], board[x,y]]
	// var array5 = [board[x-1,y], board[x,y], board[x+1,y]]
	// var array6 = [board[x,y], board[x+1,y], board[x+2,y]]
	// var array7 = [board[x-1,y-1], board[x,y], board[x+1,y+1]]
	// var array8 = [board[x-1,y+1], board[x,y], board[x+1,y-1]]

	for () {
		for () {
			// have a counter that counts through each array and if 3...
			gameWon(currentPlayer);
		}
	}
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