function TicTacToeController($scope) {
	// $scope.board = [];	

  function switchPlayer() {
  	if ($scope.currentPlayer == 1) {
			$scope.currentPlayer = 2;
		} else if ($scope.currentPlayer == 2) {
			$scope.currentPlayer = 1;
		}
  }

  function placePiece(space) {
  	if ($scope.currentPlayer == 1) {
			space.player = 1;
		}
		if ($scope.currentPlayer == 2) {
			space.player = 2;
		}
  }

  // problem here!!!
	function checkWin(space) {
		var x = space.x;
		var y = space.y;
		console.log("x = " + x);
		console.log("y = " + y);
		
		var x = space.x;
		var y = space.y;
		var board = $scope.board;
		var horizontalArrays = new Array();
		var verticalArrays = new Array();
		var diagonalArrays = new Array();

		// debug
		for (var i = 0; i < 3; i++) {
			var startY = y - 2 + i;
			var lastY = y + i ;
			var startX = x - 2 + i;
			var lastX = x + i;
			if (startY >= 0 && lastY < board.length) {
				horizontalArrays.push([board[x][y+i-2], board[x][y+i-1], board[x][y+i]]);
			}
			if (startX >= 0 && lastX < board.length) {
				verticalArrays.push([board[x+i-2][y], board[x+i-1][y], board[x+i][y]]);
			}
			// if ((startX >= 0 && lastX < board.length) && (startY >= 0 && lastY < board.length)) {
			// 	diagonalArrays.push([board[x+i-2][y+i-2], board[x+i-1][y+i-1], board[x+i][y+i]]);
			// }
			if ((lastX < board.length && startY >= 0) && (startX >= 0 && lastY < board.length)) {
				diagonalArrays.push([board[x+i-2][y-i+2], board[x+i-1][y-i+1], board[x+i][y-i]]);
			}

			// // fix
			// if ((y - 2 + i >= 0 && y + 2 - i < board.length) && (x - 2 + i >= 0 && x + 2 - i < board.length)) {
			// 	diagonalArrays.push([board[x+i-2][y+i-2], board[x+i-1][y+i-1], board[x+i][y+i]]);
			// }
			// // if ((y - 2 + i >= 0 && y + 2 - i < board.length) && (x - 2 + i >= 0 && x + 2 - i < board.length)) {
			// 	diagonalArrays.push([board[x+i-2][y-i+2], board[x+i-1][y-i+1], board[x+i][y-i]]);
			// }
				

		}
		console.log(horizontalArrays);
		console.log(verticalArrays);
		console.log(diagonalArrays);
		// var checkSpaces = [[$scope.board[x][y].player, $scope.board[x][y+1].player, $scope.board[x][y+2].player], [$scope.board[x][y-1].player, $scope.board[x][y].player, $scope.board[x][y+1].player], [$scope.board[x][y-2].player, $scope.board[x][y-1].player, $scope.board[x][y].player], [$scope.board[x-2][y].player, $scope.board[x-1][y].player, $scope.board[x][y].player], [$scope.board[x-1][y].player, $scope.board[x][y].player, $scope.board[x+1][y].player], [$scope.board[x][y].player, $scope.board[x+1][y].player, $scope.board[x+2][y].player], [$scope.board[x-1][y-1].player, $scope.board[x][y].player, $scope.board[x+1][y+1].player], [$scope.board[x-1][y+1].player, $scope.board[x][y].player, $scope.board[x+1][y-1]]];
		// console.log(checkSpace);
		// for (var i = 0; i < checkSpaces.length; i++) {
		// 	var count = 0;
		// 	for (var j = 0; j < 3; j++) {
		// 		if (checkSpaces[i][j] == $scope.currentPlayer) {
		// 			count++;
		// 		}
		// 		if (count == 3) {
		// 			return true;
		// 		} 
		// 	}
		// }
	}

	function createCheckSpaces(space) {
		var x = space.x;
		var y = space.y;
		var board = $scope.board;
		// change for games larger than 3x3
		for (var i = -2; i <+ 0; i++) {
			horizontalArrays = [board[x][y], board[x][y]];
		}
	}

  // function switchColor(row,col,space) {
	$scope.myColor = function(space) {
    if (space.player == 1) {
      return { color: "red" };
      }
    else if (space.player == 2)
      return { color: "lime" };
    else 
    	return { color: "black" };
  }
  // }	

  // creates nested array representing board
	$scope.createGame = function() {
		$scope.currentPlayer = 1;
		$scope.win = "No Winner Yet";

		$scope.board = new Array($scope.boardDimension);

		for (var i = 0; i < $scope.boardDimension; i++) { 
			$scope.board[i] = new Array($scope.boardDimension); 
		}

		// assign 0's
		for (var i = 0; i < $scope.boardDimension; i++) { 
			for (var j = 0; j < $scope.boardDimension; j++) {
				$scope.board[i][j] = {
					x: i,
					y: j,
					player: 0,
					empty: true
				} ; 
			}
		}

		// you get nested array of objects [{x:i,y:j,player:0,empty:true}, {}s...]
	}

	$scope.displayPlayer = function(row,col) {
		if ($scope.board[row][col].player == 0) {
			return $scope.board[row][col].player;
		} else {
			return "";
		}
	}

	$scope.makeMove = function(space) {
		placePiece(space);


		// switchColor(row, col);

		// if ($scope.currentPlayer == 1) {
		// 	$scope.board[row][col].player = 1;
		// }
		// if ($scope.currentPlayer == 2) {
		// 	$scope.board[row][col].player = 2;
		// }


		// check if win
		// if win, congratulate, and start new game
		// if (checkWin(player)) {
		// 	document.getElementById("result").innerHTML = "You Win!";
		// 	gameWon(player);
		// 	// update scoreboard
		// 	scoreboard[player-1]++;
		// 	document.getElementById("scoreboard").innerHTML = scoreboard[0] + " " + scoreboard[1];
		// 	// not clearing boxes from color
		// 	createNewGame();
		// }

		switchPlayer();

		checkWin(space);

		
		// $scope.switchPlayer();
	}

	// $scope.switchPlayer = function() {
	// 	switchPlayer();
	// }
}




// function newBoard() {
// 	board = new Array(3);
// 	for (var i = 0; i < 3; i++) { board[i] = new Array(3); }

// 	// assign 0's
// 	for (var i = 0; i < 3; i++) { 
// 		for (var j = 0; j < 3; j++) {
// 			board[i][j] = 0; 
// 		}
// 	}
// }
	

// window.onload = function() {
// 	newBoard();
// 	console.log(board);
// }

