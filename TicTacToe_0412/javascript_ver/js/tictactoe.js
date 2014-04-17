function createNewGame() {
	// create empty board
	board = new Array(3);
	for (var i = 0; i < 3; i++) { board[i] = new Array(3); }

	// assign 0's
	for (var i = 0; i < 3; i++) { 
		for (var j = 0; j < 3; j++) {
			board[i][j] = 0; 
		}
	}

	// console.log(clickableSpaces);

	// reset background colors
	for (var i = 0; i < 9; i++) {
		clickableSpaces[i].style.backgroundColor = "gray";
		clickableSpaces[i].dataset.clicked = 0;
	}
}


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
	row1 = board[0];  // [0,0,0]
	row2 = board[1];
	row3 = board[2];
	col1 = [board[0][0], board[1][0], board[2][0]]; // [0,0,0]
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


function placePiece(player, playerMove, clickedSpace) {
	board[playerMove[0]][playerMove[1]] = player;
	console.log(clickedSpace);

	// color space to player ID
	if (player == 1) {
		clickedSpace.style.backgroundColor = "red";
	}
	if (player == 2) {
		clickedSpace.style.backgroundColor = "green";
	}

	// change space to "clicked"
	clickedSpace.dataset.clicked = 1;

	// check if win
	// if win, congratulate, and start new game
	if (checkWin(player)) {
		document.getElementById("result").innerHTML = "You Win!";
		gameWon(player);
		// update scoreboard
		scoreboard[player-1]++;
		document.getElementById("scoreboard").innerHTML = scoreboard[0] + " " + scoreboard[1];
		// not clearing boxes from color
		createNewGame();
	}
	
}



window.onload = function() { 
	scoreboard = [0,0];
	player = 1;
	document.getElementById("turn").innerHTML = "Turn: Player " + player;
	document.getElementById("scoreboard").innerHTML = scoreboard[0] + " " + scoreboard[1];

	clickableSpaces = document.getElementsByClassName("space");
	createNewGame(clickableSpaces);
	
	for (var i = 0; i < clickableSpaces.length; i++) {
		clickableSpaces[i].onclick = play;
	}
}

function play() {
	var clickedSpace = this;
	console.log(this.style.backgroundColor);
	console.log(this.id);
	
	if (clickedSpace.dataset.clicked == 0) {
		console.log(this);
		placePiece(player, [parseInt(this.dataset.x), parseInt(this.dataset.y)], clickedSpace);
		displayBoard();
		player = switchPlayer();
		document.getElementById("turn").innerHTML = "Turn: Player " + player;
	}	
}

// upon load, createNewBoard
// player 1 goes
// event handler to placePiece
// if he doesn't win, switch turns

