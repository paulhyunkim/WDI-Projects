function TicTacToeController($scope) {

	// create nested array of 'space' objects
	function createGame() {
		$scope.spacesLeft = 42;
		$scope.board = new Array(8);

		for (var i = 0; i < 8; i++) { 
			$scope.board[i] = new Array(8); 
		}

		// assign 0's
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

	$scope.pieceL = 
		[[
			[1,1,1],
			[1,0,0]
		],[
			[1,0],
			[1,0],
			[1,1]
		],[
			[0,0,1],
			[1,1,1]
		],[
			[1,1],
			[0,1],
			[0,1]
		]];
	$scope.pieceJ = 
		[[
			[1,1,1],
			[0,0,1]
		],[
			[0,1],
			[0,1],
			[1,1]
		],[
			[1,0,],
			[1,1,1]
		],[
			[1,1],
			[1,0],
			[1,0]
		]];
	$scope.pieceI =
		[[
			[1,1,1,1],
		],[
			[1],
			[1],
			[1],
			[1]
		]];
	$scope.pieceT =
		[[
			[1,1,1],
			[0,1,0]
		],[
			[1,0],
			[1,1],
			[1,0]
		],[
			[0,1,0],
			[1,1,1]
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


	createGame();

	$scope.scoreboard = [0,0];
	$scope.currentPlayer = 1;

	$scope.hoverPiece = function(space) {
		var row = space.row;
		var col = space.col;

		
		for (var i = 0; i < $scope.currentPiece.length; i++) {
			for (var j = 0; j < $scope.currentPiece[i].length; j++) {
				$scope.board[row+i][col+j].hover = $scope.currentPiece[i][j];
			}
		}
	}

	$scope.resetHover = function() {
		for (var i = 0; i < 8; i++) { 
			for (var j = 0; j < 8; j++) {
				$scope.board[i][j].hover = 0;
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

  $scope.occupiedColor = function(space) {
  	if (space.player == 1) {
      return { backgroundColor: "red" };
      }
    else if (space.player == 2) {
      return { backgroundColor: "blue" };
      }
    else {
    	return;
    }
  }

	$scope.updateScore = function(lineLength) {
		var points = 0;
		console.log("inside of updateScore");
		switch (lineLength) {
			case 4:
				points = 4;
				break;
			case 5:
				points = 10;
				break;
			case 6:
				points = 30;
				break;
			case 7:
				points = 100;
				break;
		}

		$scope.scoreboard[$scope.currentPlayer-1] += points;
	}
	
  $scope.switchPlayer = function() {
  	if ($scope.currentPlayer == 1) {
			$scope.currentPlayer = 2;

		} else if ($scope.currentPlayer == 2) {
			$scope.currentPlayer = 1;
		}
  }

  $scope.placePiece = function(space) {
  	var row = space.row;
		var col = space.col;
		var noOverlap = false;


		// for (var i = 0; i < $scope.currentPiece.length; i++) {
		// 	for (var j = 0; j < $scope.currentPiece[i].length; j++) {
		// 		// only place piece if all piece spaces 'land' on empty spaces
		// 		// also, for 0's in the piece, do not change 'empty' status
		// 		if ($scope.currentPiece[i][j] == 1 && $scope.board[row+i][col+j].empty) {
		// 			$scope.board[row+i][col+j].player = $scope.currentPiece[i][j]*$scope.currentPlayer;
		// 			$scope.board[row+i][col+j].empty = false;
		// 		}
		// 	}
		// }

		for (var i = 0; i < $scope.currentPiece.length; i++) {
			for (var j = 0; j < $scope.currentPiece[i].length; j++) {
				// only place piece if all piece spaces 'land' on empty spaces
				// also, for 0's in the piece, do not change 'empty' status
				if ($scope.currentPiece[i][j] == 1 && $scope.board[row+i][col+j].empty) {
					$scope.board[row+i][col+j].player = $scope.currentPiece[i][j]*$scope.currentPlayer;
					$scope.board[row+i][col+j].empty = false;
				}
			}
		}

		$scope.$apply();

		$scope.checkWin();

		$scope.switchPlayer();
		$scope.randomPiece();

  }

  $scope.playMusic = function() {
  	var tetrisMusic = document.getElementById("tetris");
  	tetrisMusic.loop = true;
  	tetrisMusic.play();
  }

  $scope.displayWin = function() {
  	$scope.winSpaces = new Array();
  	
		var horizontals = [$scope.board[0], $scope.board[1], $scope.board[2], $scope.board[3], $scope.board[4], $scope.board[5], $scope.board[6], $scope.board[7]];
		
		// count continuous pieces
		// iterating through rows/columns
		for (var i = 0; i < horizontals.length; i++) {
			var count = 0;
			var longestCount = 0;
			var runningWinSpaces = [];
			// iterating through elements in arrays
			for (var j = 0; j < horizontals[i].length; j++) {
				if (horizontals[i][j].player == $scope.currentPlayer && j != horizontals[i].length - 1) {
					count++;
					runningWinSpaces.push($scope.board[i][j]);
					confirm("row: " + i + " col: " + j + "running count: " + count);
				} else if (count >= 4) {
					confirm("entered else if (count >= 4");
					count = 0;
					$scope.winSpaces.push(runningWinSpaces);
					confirm("winSpaces: " + $scope.winSpaces);
					runningWinSpaces = [];
					console.log($scope.winSpaces);
				} else {
					count = 0;
					runningWinSpaces = [];
				}
				
				
			}
		}
  }

  $scope.checkWin = function() {
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
					if (runningWinSpaces.length >= 4) {
						$scope.updateScore(runningWinSpaces.length);
						$scope.winSpaces.push(runningWinSpaces);
						runningWinSpaces = [];
					} else {
						runningWinSpaces = [];
					}
				}

				if (j == horizontals[i].length - 1) {
					if (runningWinSpaces.length >= 4) {
						$scope.updateScore(runningWinSpaces.length);
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
					if (runningWinSpaces.length >= 4) {
						$scope.updateScore(runningWinSpaces.length);
						// console.log(runningWinSpaces.length);
						$scope.winSpaces.push(runningWinSpaces);

						// $scope.updateScore(runningWinSpaces.length);
						runningWinSpaces = [];

					} else {
						runningWinSpaces = [];
					}
				}

				if (j == verticals[i].length - 1) {
					if (runningWinSpaces.length >= 4) {
						$scope.updateScore(runningWinSpaces.length);
						$scope.winSpaces.push(runningWinSpaces);
						// $scope.updateScore(runningWinSpaces.length);
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

	$scope.displayBoard = function() {
		for (var i = 0; i < $scope.board.length; i++) {
			console.log($scope.board[i][0].player,$scope.board[i][1].player,$scope.board[i][2].player,$scope.board[i][3].player,$scope.board[i][4].player,$scope.board[i][5].player,$scope.board[i][6].player,$scope.board[i][7].player);
		}
	}
		

  $scope.randomPiece = function() {
  	$scope.currentPieceType = $scope.allPieces[Math.floor((Math.random()*$scope.allPieces.length))]
  	$scope.currentPiece = $scope.currentPieceType[0];
  }

	$scope.rotatePiece = function() {
		$scope.currentPieceType.unshift($scope.currentPieceType.pop());
		$scope.currentPiece = $scope.currentPieceType[0];

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

