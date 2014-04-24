function TicTacToeController($scope) {

	$scope.pieceL = 
		[[
			[1,0],
			[1,0],
			[1,1]
		],[
			[1,1,1],
			[1,0,0]
		],[
			[1,1],
			[0,1],
			[0,1]
		],[
			[0,0,1],
			[1,1,1]
		]];
	$scope.pieceJ = 
		[[
			[0,1],
			[0,1],
			[1,1]
		],[
			[1,0,0],
			[1,1,1]
		],[
			[1,1],
			[1,0],
			[1,0]
		],[
			[1,1,1],
			[0,0,1]
		]];
	$scope.pieceI =
		[[
			[1],
			[1],
			[1],
			[1]
		],[
			[1,1,1,1]
		]];
	$scope.pieceT =
		[[
			[0,1,0],
			[1,1,1]
		],[
			[1,0],
			[1,1],
			[1,0]
		],[
			[1,1,1],
			[0,1,0]
		],[
			[0,1],
			[1,1],
			[0,1]
		]];
	$scope.pieceO =
		[[
			[1,1],
			[1,1]
		]];
	$scope.pieceZ =
		[[
			[0,1,1],
			[1,1,0]
		],[
			[1,0],
			[1,1],
			[0,1]
		]];
	$scope.pieceS = 
		[[
			[1,1,0],
			[0,1,1]
		],[
			[0,1],
			[1,1],
			[1,0]
		]];
	$scope.allPieces = [$scope.pieceL,$scope.pieceJ,$scope.pieceI,$scope.pieceT,$scope.pieceO,$scope.pieceZ,$scope.pieceS];

	var createGame = function() {
		$scope.board = new Array(8);
		$scope.currentSpace = {};
		$scope.scoreboard = [0,0];
		$scope.currentPlayer = 1;
		randomPiece();

		for (var i = 0; i < 8; i++) { 
			$scope.board[i] = new Array(8); 
		}

		for (var i = 0; i < 8; i++) { 
			for (var j = 0; j < 8; j++) {
				$scope.board[i][j] = {
					row: i,
					col: j,
					player: 0,
					color: 0,
					empty: true,
					hover: 0
				} ; 
			}
		}
	}

 	var randomPiece = function() {
  	$scope.currentPieceType = $scope.allPieces[Math.floor((Math.random()*$scope.allPieces.length))]
  	$scope.currentPiece = $scope.currentPieceType[0];
  }
	
	$scope.hoverPiece = function(space) {
		// reset previous hover
		for (var i = 0; i < 8; i++) { 
			for (var j = 0; j < 8; j++) {
				$scope.board[i][j].hover = 0;
			}
		}

		// apply new hover
		$scope.currentSpace = space;
		var row = space.row;
		var col = space.col;

		for (var i = 0; i < $scope.currentPiece.length; i++) {
			for (var j = 0; j < $scope.currentPiece[i].length; j++) {
				$scope.board[row+i][col+j].hover = $scope.currentPiece[i][j];
			}
		}
	}

	$scope.hoverColor = function(space) {
    if (space.hover == 1) {
      return { opacity: "1" };
      }
    else
      return { opacity: "0.5"};
  }

	var updateScore = function(lineLength) {
		var points = 0;
		switch (lineLength) {
			case 5:
				points = 7;
				break;
			case 6:
				points = 15;
				break;
			case 7:
				points = 30;
				break;
			case 8:
				points = 50
		}

		$scope.scoreboard[$scope.currentPlayer-1] += points;
	}
	
  var switchPlayer = function() {
  	if ($scope.currentPlayer == 1) {
			$scope.currentPlayer = 2;

		} else if ($scope.currentPlayer == 2) {
			$scope.currentPlayer = 1;
		}
  }

  var placePiece = function(space) {
  	var row = space.row;
		var col = space.col;

		for (var i = 0; i < $scope.currentPiece.length; i++) {
			for (var j = 0; j < $scope.currentPiece[i].length; j++) {
				// only place piece if all piece spaces 'land' on empty spaces
				// also, for 0's in the piece, do not change 'empty' status
				if ($scope.currentPiece[i][j] == 1 && $scope.board[row+i][col+j].empty) {
					$scope.board[row+i][col+j].player = $scope.currentPiece[i][j] * $scope.currentPlayer;
					$scope.board[row+i][col+j].empty = false;
				}
			}
		}

		// $scope.$apply();
	}
  
  $scope.checkWin = function() {
  	for (var i = 0; i < $scope.scoreboard.length; i++){
  		if ($scope.scoreboard[i] >= 100) {
  			console.log("someone wins");
  			return true;
  		}
  	}
  	return false;	
  }

  $scope.playMusic = function() {
  	var tetrisMusic = document.getElementById("tetris");
  	tetrisMusic.loop = true;
  	tetrisMusic.play();
  }

  var checkLines = function() {
  	$scope.winSpaces = [];
  	
		var horizontals = [$scope.board[0], $scope.board[1], $scope.board[2], $scope.board[3], $scope.board[4], $scope.board[5], $scope.board[6], $scope.board[7]];
		var col0 = [$scope.board[0][0], $scope.board[1][0], $scope.board[2][0], $scope.board[3][0], $scope.board[4][0], $scope.board[5][0], $scope.board[6][0], $scope.board[7][0]];
		var col1 = [$scope.board[0][1], $scope.board[1][1], $scope.board[2][1], $scope.board[3][1], $scope.board[4][1], $scope.board[5][1], $scope.board[6][1], $scope.board[7][1]];
		var col2 = [$scope.board[0][2], $scope.board[1][2], $scope.board[2][2], $scope.board[3][2], $scope.board[4][2], $scope.board[5][2], $scope.board[6][2], $scope.board[7][2]];
		var col3 = [$scope.board[0][3], $scope.board[1][3], $scope.board[2][3], $scope.board[3][3], $scope.board[4][3], $scope.board[5][3], $scope.board[6][3], $scope.board[7][3]];
		var col4 = [$scope.board[0][4], $scope.board[1][4], $scope.board[2][4], $scope.board[3][4], $scope.board[4][4], $scope.board[5][4], $scope.board[6][4], $scope.board[7][4]];
		var col5 = [$scope.board[0][5], $scope.board[1][5], $scope.board[2][5], $scope.board[3][5], $scope.board[4][5], $scope.board[5][5], $scope.board[6][5], $scope.board[7][5]];
		var col6 = [$scope.board[0][6], $scope.board[1][6], $scope.board[2][6], $scope.board[3][6], $scope.board[4][6], $scope.board[5][6], $scope.board[6][6], $scope.board[7][6]];
		var col7 = [$scope.board[0][7], $scope.board[1][7], $scope.board[2][7], $scope.board[3][7], $scope.board[4][7], $scope.board[5][7], $scope.board[6][7], $scope.board[7][7]];
		var verticals = [col0, col1, col2, col3, col4, col5, col6, col7];
		var allLines = horizontals.concat(verticals);
		
		

		// count continuous pieces
		// iterating through rows/columns
		for (var i = 0; i < horizontals.length; i++) {
			var count = 0;
			var lastCount = 0;
			var longestCount = 0;
			var runningWinSpaces = [];
			// iterating through elements in arrays
			// i = index of rows
			// j = index of elems in row array
			for (var j = 0; j < horizontals[i].length; j++) {
				if (horizontals[i][j].player == $scope.currentPlayer) {
					count++;
					runningWinSpaces.push($scope.board[i][j]);
				} else {
					count = 0;
				}

				if (count == 0) {
					if (runningWinSpaces.length >= 5) {
						updateScore(runningWinSpaces.length);
						$scope.winSpaces.push(runningWinSpaces);
						runningWinSpaces = [];
					} else {
						runningWinSpaces = [];
					}
				}

				if (j == horizontals[i].length - 1) {
					if (runningWinSpaces.length >= 5) {
						updateScore(runningWinSpaces.length);
						$scope.winSpaces.push(runningWinSpaces);
						runningWinSpaces = [];
					} else {
						runningWinSpaces = [];
					}
				}
			}
		}

		for (var i = 0; i < verticals.length; i++) {
			var count = 0;
			var lastCount = 0;
			var longestCount = 0;
			var runningWinSpaces = [];
			// iterating through elements in arrays
			// i = index of rows
			// j = index of elems in row array
			for (var j = 0; j < verticals[i].length; j++) {
				// console.log("col: " + i + " row: " + j + " player: " + verticals[i][j].player);
				if (verticals[i][j].player == $scope.currentPlayer) {
					count++;
					// console.log("col: " + i + " row: " + j + " count: " + count);
					runningWinSpaces.push($scope.board[j][i]);
				} else {
					count = 0;
				}

				if (count == 0) {
					if (runningWinSpaces.length >= 5) {
						updateScore(runningWinSpaces.length);
						// console.log(runningWinSpaces.length);
						$scope.winSpaces.push(runningWinSpaces);

						// updateScore(runningWinSpaces.length);
						runningWinSpaces = [];

					} else {
						runningWinSpaces = [];
					}
				}

				if (j == verticals[i].length - 1) {
					if (runningWinSpaces.length >= 5) {
						updateScore(runningWinSpaces.length);
						$scope.winSpaces.push(runningWinSpaces);
						// updateScore(runningWinSpaces.length);
						runningWinSpaces = [];
					} else {
						runningWinSpaces = [];
					}
				}
			}
		}

		for (var i = 0; i < $scope.winSpaces.length; i++) {
			for (var j = 0; j < $scope.winSpaces[i].length; j++) {
				var row = $scope.winSpaces[i][j].row;
				var col = $scope.winSpaces[i][j].col;
				$scope.board[row][col].player = 0;
				$scope.board[row][col].empty = true;
			}	
		}
	}
	
 	$scope.keyPress = function(event) {
 		switch (event.keyCode) {
 			// r
 			case 114:
 				rotatePiece();
 				break;
 			// w
 			case 119: 
 				$scope.currentSpace = $scope.board[$scope.currentSpace.row-1][$scope.currentSpace.col];
 				$scope.hoverPiece($scope.currentSpace);
 				break;
 			// s
 			case 115:
 				$scope.currentSpace = $scope.board[$scope.currentSpace.row+1][$scope.currentSpace.col];
 				$scope.hoverPiece($scope.currentSpace);
 				break;
 			// a
 			case 97:
 				$scope.currentSpace = $scope.board[$scope.currentSpace.row][$scope.currentSpace.col-1];
 				$scope.hoverPiece($scope.currentSpace);
 				break;
 			// d
 			case 100:
 				$scope.currentSpace = $scope.board[$scope.currentSpace.row][$scope.currentSpace.col+1];
 				$scope.hoverPiece($scope.currentSpace);
 				break;
 			}
 	}

	var rotatePiece = function() {
	
		
			$scope.currentPieceType.push($scope.currentPieceType.shift());
			$scope.currentPiece = $scope.currentPieceType[0];
			$scope.resetHover();
			$scope.hoverPiece($scope.currentSpace);
	}

	var validMove = function(space) {
		var row = space.row;
		var col = space.col;

		for (var i = 0; i < $scope.currentPiece.length; i++) {
			for (var j = 0; j < $scope.currentPiece[i].length; j++) {
				// only place piece if all piece spaces 'land' on empty spaces
				// also, for 0's in the piece, do not change 'empty' status
				if ($scope.currentPiece[i][j] == 1 && !$scope.board[row+i][col+j].empty) {
					return false;
				}
			}
		}

		return true;
	}

	$scope.makeMove = function(space) {
		if (validMove(space)) {
			placePiece(space);
			checkLines();
			switchPlayer();
			randomPiece();
		} else {
			console.log("invalid move");
		}		
	}

	createGame();

}

