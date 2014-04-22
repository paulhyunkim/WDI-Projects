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
				console.log($scope.board[row+i][col+j]);
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

	function updateScore() {
		$scope.scoreboard[$scope.currentPlayer]++;
	}
	
  $scope.switchPlayer = function() {
  	if ($scope.currentPlayer == 1) {
			$scope.currentPlayer = 2;

		} else if ($scope.currentPlayer == 2) {
			$scope.currentPlayer = 1;
		}
  }

  $scope.randomPiece = function() {
  	$scope.currentPiece = $scope.allPieces[Math.floor((Math.random()*$scope.allPieces.length))][0];
  	console.log(Math.floor((Math.random()*$scope.allPieces.length)));
  	console.log($scope.currentPiece);
  }

  $scope.placePiece = function(space) {
  	var row = space.row;
		var col = space.col;

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

		$scope.checkWin();
  }

  $scope.playMusic = function() {
  	var tetrisMusic = document.getElementById("tetris");
  	tetrisMusic.loop = true;
  	tetrisMusic.play();
  }

  $scope.checkWin = function() {
		var horizontals = [board[0], board[1], board[2], board[3], board[4], board[5], board[6], board[7]];
		
		// work on this!!!
		for (var i = 0; i < horizontals.length; i++) {
		var count = 0;
		var previousSpace;
			for (var j = 0; j < horizontals[i].length; j++) {
				if (horizontals[i][j].player == $scope.currentPlayer ) {
					count++;
				} else {
					count = 0;
				}
			}
			if (count >= 4) {
				console.log("awesome!");
				
				for (var k = 0; k < checkSpaces[i].length; k++) {
					checkSpaces[i][k].winningSpace = true;
				}
				console.log(checkSpaces[i]);
				return checkSpaces[i];

				}
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

