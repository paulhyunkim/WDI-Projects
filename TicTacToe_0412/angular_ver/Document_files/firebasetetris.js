var ticTacTetrisApp = angular.module('ticTacTetrisApp', ['firebase']);
ticTacTetrisApp.controller('TicTacTetrisController', function($scope, $firebase, $timeout) { 

	var playerNum = null;
	var ticTacRef = new Firebase("https://tic-tac-toe-paul.firebaseio.com/games");
	var lastGame;
	// var board = new Array(8);
	// 	for (var i = 0; i < 8; i++) { 
	// 		board[i] = new Array(8); 
	// 	}
	// 	for (var i = 0; i < 8; i++) { 
	// 		for (var j = 0; j < 8; j++) {
	// 			board[i][j] = {
	// 				row: i,
	// 				col: j,
	// 				player: 0,
	// 				color: 0,
	// 				empty: true,
	// 				hover: 0,
	// 				blink: false
	// 			} ; 
	// 		}
	// 	}
	// $scope.board = board;

	// $scope.createNewGame = function() {
		console.log("hello");
		ticTacRef.once('value', function(gamesSnapshot) {
	  var games = gamesSnapshot.val();
	  if(games == null) {
	    lastGame = ticTacRef.push( {waiting: true} );
	    playerNum = 1;
	  } else {
	    var keys = Object.keys(games);
	    var lastGameKey = keys[ keys.length - 1 ];
	    var lastGame = games[ lastGameKey ];
	    if(lastGame.waiting) {
	      lastGame = ticTacRef.child(lastGameKey);
	      lastGame.set( {
	      	waiting: false, 
	      	playerTurn: 0, 
	      	won: false,
	      	board: $scope.board,
	      	currentPlayer: 1,
	      	scoreboard: [0,0] 
	      });
	      playerNum = 2;
	    } else {
	      lastGame = ticTacRef.push( {waiting: true} );
	      playerNum = 1;
	    }
	    $scope.game = $firebase(lastGame);
	    // console.log("$scope.game: " + $scope.game);
	    // console.log($scope.game);
	    
	  }
	});
	
	// console.log($scope.board);
	//     console.log($scope.game.board);
	//     console.log($scope.game.waiting);
	// }


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

	$scope.createGame = function() {
		console.log("trying to create new game");

		// console.log("$scope.game.board: " + $scope.game.board);
	 //    console.log($scope.game.board);

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
		// $console.log($scope.game.board);
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
		if (playerNum === $scope.game.currentPlayer) {
			if (space.hover == 1) {
	      return { opacity: "1" };
      } else {
     		return { opacity: "0.5"};
    	}
		} else {
   		return { opacity: "0.5"};
  	}
  }

	var updateScore = function(lineLength) {
		var points = 0;
		switch (lineLength) {
			case 5:
				points = 7;
				document.getElementById("click").play();
				break;
			case 6:
				points = 15;
				document.getElementById("laugh").play();
				break;
			case 7:
				points = 30;
				break;
			case 8:
				points = 50
		}

		$scope.game.scoreboard[$scope.game.currentPlayer-1] += points;
	}
	
  var switchPlayer = function() {
  	if ($scope.game.currentPlayer == 1) {
			$scope.game.currentPlayer = 2;
		} else if ($scope.game.currentPlayer == 2) {
			$scope.game.currentPlayer = 1;
		}

		$scope.game.$save();
  }

  var placePiece = function(space) {


  	var row = space.row;
		var col = space.col;

		for (var i = 0; i < $scope.currentPiece.length; i++) {
			for (var j = 0; j < $scope.currentPiece[i].length; j++) {
				// only place piece if all piece spaces 'land' on empty spaces
				// also, for 0's in the piece, do not change 'empty' status
				if ($scope.currentPiece[i][j] == 1 && $scope.board[row+i][col+j].empty) {
					$scope.board[row+i][col+j].player = $scope.currentPiece[i][j] * $scope.game.currentPlayer;
					$scope.board[row+i][col+j].empty = false;
				}
			}
		}

		$scope.game.board = $scope.board;
		$scope.game.$save();

		// $scope.$apply();
	}
  
  $scope.checkWin = function() {
  	for (var i = 0; i < $scope.game.scoreboard.length; i++){
  		if ($scope.game.scoreboard[i] >= 100) {
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
				if (horizontals[i][j].player == $scope.game.currentPlayer) {
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
				if (verticals[i][j].player == $scope.game.currentPlayer) {
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

		// delete lines
		for (var i = 0; i < $scope.winSpaces.length; i++) {
			for (var j = 0; j < $scope.winSpaces[i].length; j++) {
				var row = $scope.winSpaces[i][j].row;
				var col = $scope.winSpaces[i][j].col;
				$scope.board[row][col].player = 0;
				$scope.board[row][col].empty = true;
				$scope.board[row][col].blink = true;
				$timeout(function() { })
			}	
		}

		// var currentPlayer = $scope.game.currentPlayer;
		// $timeout(function () {
  //     for (var i = 0; i < $scope.winSpaces.length; i++) {
		// 		for (var j = 0; j < $scope.winSpaces[i].length; j++) {
		// 			var row = $scope.winSpaces[i][j].row;
		// 			var col = $scope.winSpaces[i][j].col;
		// 			$scope.board[row][col].player = 0;
		// 			$scope.board[row][col].empty = true;
		// 			$scope.$apply();
		// 			console.log("Step 1");
		// 		}	
		// 	}
		// 	$timeout(function () {
	 //      for (var k = 0; k < $scope.winSpaces.length; k++) {
		// 			for (var l = 0; l < $scope.winSpaces[k].length; l++) {
		// 				var row = $scope.winSpaces[k][l].row;
		// 				var col = $scope.winSpaces[k][l].col;
		// 				$scope.board[row][col].player = currentPlayer;
		// 				$scope.board[row][col].empty = false;
		// 				$scope.$apply();
		// 				console.log("Step 2");	
		// 			}	
		// 		}
		// 		$timeout(function () {
		//       for (var m = 0; m < $scope.winSpaces.length; m++) {
		// 				for (var n = 0; n < $scope.winSpaces[m].length; n++) {
		// 					var row = $scope.winSpaces[m][n].row;
		// 					var col = $scope.winSpaces[m][n].col;
		// 					$scope.board[row][col].player = 0;
		// 					$scope.board[row][col].empty = true;
		// 					$scope.$apply();
		// 					console.log("Step 3");
		// 				}	
		// 			}
		// 		}, 100);
		// 	}, 100);
		// }, 100);
	
		console.log($scope.board);

		$scope.game.board = $scope.board;
		$scope.game.$save();

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
 			case 102:
 				$scope.makeMove($scope.currentSpace);
 				break; 
 			}
 	}

	var rotatePiece = function() {
			$scope.currentPieceType.push($scope.currentPieceType.shift());
			$scope.currentPiece = $scope.currentPieceType[0];
			$scope.hoverPiece($scope.currentSpace);
			$scope.$apply();
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

		console.log("$scope.game.board: " + $scope.game.board);
	    console.log($scope.game.board);

		$scope.board = $scope.game.board;
		console.log($scope.game.board);
		$scope.$apply();
		if (validMove(space) && playerNum === $scope.game.currentPlayer) {
			placePiece(space);
			checkLines();
			switchPlayer();
			randomPiece();
		} else {
			console.log("invalid move");
		}		
	}

	$scope.resetGame = function() {
		console.log("trying to create new game");

		console.log("$scope.game.board: " + $scope.game.board);
	    console.log($scope.game.board);

		$scope.board = new Array(8);
		$scope.currentSpace = {};
		$scope.game.scoreboard = [0,0];
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

		$scope.game.board = $scope.board;
		$scope.game.$save();
		// $console.log($scope.game.board);
	}



	
	$scope.createGame();

})