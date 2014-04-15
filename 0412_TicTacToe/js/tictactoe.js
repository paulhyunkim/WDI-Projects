// window.onload = startup;

// create empty board
function createNewBoard() {
	board = new Array(3);
	for (var i = 0; i < 3; i++) { board[i] = new Array(3); }

	// assign 0's
	for (var i = 0; i < 3; i++) { 
		for (var j = 0; j < 3; j++) {
			board[i][j] = 0; 
		}
	}
}

player = 1;

function switchPlayer() {
	if (player == 1) {
		return 2;
	}
	if (player == 2) {
		return 1;
	}
}

function displayBoard() {
	for (var i = 0; i < board.length; i++) {
		console.log(board[i]);
	}	
}

function checkWin(player) {
	row1 = board[0];
	row2 = board[1];
	row3 = board[2];
	col1 = [board[0][0], board[1][0], board[2][0]];
	col2 = [board[0][1], board[1][1], board[2][1]];
	col3 = [board[0][2], board[1][2], board[2][2]];
	diag1 = [board[0][0], board[1][1], board[2][2]];
	diag2 = [board[2][0], board[1][1], board[0][2]];
	checkSpaces = [row1, row2, row3, col1, col2, col3, diag1, diag2];
	for (var i = 0; i < checkSpaces.length; i++) {
		var count = 0;
		for (var j = 0; j < 3; j++) {
			if (checkSpaces[i][j] == player) {
				count++;
			}
			if (count == 3) {
				return true;
			} 
		}
	}
}

function gameWon(player) {
}

function placePiece(player, playerMove, space) {
	console.log(event);
	board[playerMove[0]][playerMove[1]] = player;
	if (checkWin(player)) {
		console.log("You Win!");
	}
	if (player == 1) {
		document.getElementById(space).style.backgroundColor = "red";
	}
	if (player == 2) {
		document.getElementById(space).style.backgroundColor = "green";
	}
	// document.getElementById(space).className = document.getElementById(space).className.replace("", " clicked");


}



window.onload = function() { 
	createNewBoard();
	var clickable = document.getElementsByClassName("space");
	for (var i = 0; i < clickable.length; i++) {
		clickable[i].onclick = play;
	}

	// var rows = document.getElementsByClassName("row");
	// for(var i = 0; i < rows.length; i++) {
	// 	cells = rows[i].getElementsByTagName("div");
	// 	for(var c = 0; c < cells.length; c++) {
	// 		cells[c].onclick = play;
	// 	}
	// }
}

function play() {
	// if (this.style.backgroundColor) {
		console.log(this);
		placePiece(player, [parseInt(this.dataset.x), parseInt(this.dataset.y)], parseInt(this.id));
		displayBoard();
		player = switchPlayer();
	// }
	
}

// upon load, createNewBoard
// player 1 goes
// event handler to placePiece
// if he doesn't win, switch turns

