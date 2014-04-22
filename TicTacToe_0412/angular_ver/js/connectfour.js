function TicTacToeController($scope) {

	// create nested array of 'space' objects
	function createGame() {
		$scope.spacesLeft = 42;
		$scope.board = new Array(6);

		for (var i = 0; i < 6; i++) { 
			$scope.board[i] = new Array(7); 
		}

		// assign 0's
		for (var i = 0; i < 6; i++) { 
			for (var j = 0; j < 7; j++) {
				$scope.board[i][j] = {
					row: i,
					col: j,
					player: 0,
					color: 0,
					empty: true
				} ; 
			}
		}
	}

	createGame();

	
	// $scope.gameInfo = {
	// 	playerOneScore: 0,
	// 	playerTwoScore: 0,
	// 	turnNumber: 1,
	// 	gameNumber: 1,
	// 	currentPlayer: 1
	// };
	// var gameInfo = $scope.gameInfo;
	$scope.scoreboard = [0,0];
	// var scoreboard = $scope.scoreboard;
	$scope.currentPlayer = 1;

	function updateScore() {
		$scope.scoreboard[$scope.currentPlayer]++;
	}
	
  function switchPlayer() {
  	if ($scope.currentPlayer == 1) {
			$scope.currentPlayer = 2;

		} else if ($scope.currentPlayer == 2) {
			$scope.currentPlayer = 1;
		}
  }

  function placePiece(space) {
  	
  	var row = 0;
  	var col = space.col;
  	// assigning to playerPiece because currentPlayer is switched before animateDrop() completes 
  	var playerPiece = $scope.currentPlayer;
  	

		$scope.board[row][col].color = playerPiece;
		$scope.$apply();
		$scope.board[row][col].empty = false;
		

		
  	// setTimeout(function () {
  	// 	console.log("before iteration");

  	// 	console.log(row);
  	// 	console.log(col);

   //    if (row < 5 && $scope.board[row+1][col].empty) {
   //    	console.log("entered iteration");
   //    	$scope.board[row][col].color = 0;
   //    	$scope.board[row][col].empty = true;
	  // 		row++;
	  // 		$scope.$apply();

	  // 		placePiece($scope.board[row][col]);

	  // 	} 
	  // 	// else {
	  // 	// 	if (checkWin(board[row][col])) {
	  // 	// 		updateScore();
				
			// 	// createGame();
	  // 	// 	}
	  // 	// }          
   // 	}, 10);
		
  	animateDrop(row, col, playerPiece);
  	
  	
  	while (row < 5 && $scope.board[row+1][col].empty) {
  		row++;
  
  	}

  	$scope.board[row][col].player = $scope.currentPlayer;

  	return $scope.board[row][col];

  }

  function animateDrop(row, col, playerPiece) {

  		
			$scope.board[row][col].color = playerPiece;
			$scope.$apply();
			$scope.board[row][col].empty = false;
			
  	setTimeout(function () {
      if (row < 5 && $scope.board[row+1][col].empty) {
      	$scope.board[row][col].color = 0;
      	$scope.board[row][col].empty = true;
	  		row++;
	  		$scope.$apply();
	  		animateDrop(row, col, playerPiece);
	  	} 
	  	else {
	  		if (checkWin($scope.board[row][col])) {
	  			updateScore();
				
					createGame();
					$scope.$apply();
	  		}
	  		switchPlayer();
	  	}          
   	}, 20);
  }

	function checkWin(space) {
		var y = space.col;
		var x = space.row;
		var board = $scope.board;
		var horizontalArrays = new Array();
		var verticalArrays = new Array();


		for (var i = 0; i < 4; i++) {
			var startY = y - 3 + i;
			var lastY = y + i ;
			var startX = x - 3 + i;
			var lastX = x + i;
			if (startY >= 0 && lastY < 7) {
				horizontalArrays.push([board[x][y+i-3], board[x][y+i-2], board[x][y+i-1], board[x][y+i]]);
			}
			if (startX >= 0 && lastX < 6) {
				verticalArrays.push([board[x+i-3][y], board[x+i-2][y], board[x+i-1][y], board[x+i][y]]);
			}
		}

		var checkSpaces = horizontalArrays.concat(verticalArrays);

		for (var i = 0; i < checkSpaces.length; i++) {
			var count = 0;
			for (var j = 0; j < 4; j++) {
				// console.log(checkSpaces[i][j].player);
				if (checkSpaces[i][j].player == $scope.currentPlayer) {
					count++;
				}
				console.log(count);
				if (count == 4) {
					return true;
				} 
			}
		}
			// if ((startX >= 0 && lastX < board.length) && (startY >= 0 && lastY < board.length)) {
			// 	diagonalArrays.push([board[x+i-2][y+i-2], board[x+i-1][y+i-1], board[x+i][y+i]]);
			// }
			// if ((lastX < board.length && startY >= 0) && (startX >= 0 && lastY < board.length)) {
			// 	diagonalArrays.push([board[x+i-2][y-i+2], board[x+i-1][y-i+1], board[x+i][y-i]]);
			// }

			// // fix
			// if ((y - 2 + i >= 0 && y + 2 - i < board.length) && (x - 2 + i >= 0 && x + 2 - i < board.length)) {
			// 	diagonalArrays.push([board[x+i-2][y+i-2], board[x+i-1][y+i-1], board[x+i][y+i]]);
			// }
			// // if ((y - 2 + i >= 0 && y + 2 - i < board.length) && (x - 2 + i >= 0 && x + 2 - i < board.length)) {
			// 	diagonalArrays.push([board[x+i-2][y-i+2], board[x+i-1][y-i+1], board[x+i][y-i]]);
			// }
		

	}



	
		// console.log(diagonalArrays);


		// var board = board;
		// var horizontals = [board[0], board[1], board[2], board[]];
		// var verticals = [[board[0][0], board[1][0], board[2][0]], [board[0][1], board[1][1], board[2][1]], [board[0][2], board[1][2], board[2][2]]];
		// // var diagonals = [[board[0][0], board[1][1], board[2][2]], [board[2][0], board[1][1], board[0][2]]];
		// var checkSpaces = horizontals.concat(verticals, diagonals);
		

	

	$scope.xOrO = function(space) {
		if (space.player == 1) {
			return "X";
		}
		else if (space.player == 2) {
			return "O";
		}
	}

	$scope.myColor = function(space) {
    if (space.color == 1) {
      return { backgroundColor: "#9ff26e" };
      }
    else if (space.color == 2)
      return { backgroundColor: "#dc8170" };
  }

	$scope.displayPlayer = function(row,col) {
		if ($scope.board[row][col].player == 0) {
			return $scope.board[row][col].player;
		} else {
			return "";
		}
	}

	$scope.makeMove = function(space) {
		if (space.empty) {
			
			// placePiece() returns space where piece lands
			var spaceLand = placePiece(space);
			$scope.spacesLeft--;

			

			// if (checkWin(spaceLand)) {
			// 	updateScore();
			// 	createGame();
			// }
			// if ($scope.spacesLeft == 0) { 
			// 	createGame();
			// }
			

			// switchPlayer();
			// $scope.$apply();
		}
	}
}

