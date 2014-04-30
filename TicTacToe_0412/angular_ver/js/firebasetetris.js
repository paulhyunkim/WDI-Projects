var ticTacTetrisApp = angular.module('ticTacTetrisApp', ['firebase']);
ticTacTetrisApp.controller('TicTacTetrisController', function($scope, $firebase, $timeout) { 
	$scope.startMenu = true;
	var playerNum = null;
	var ticTacRef = new Firebase("https://tic-tac-toe-paul.firebaseio.com/games");
	var lastGame;
	$scope.playerName = "";
	$scope.nameSubmitted = false;
	$scope.joinedRoom = false;
	$scope.gameStart = false;

	ticTacRef.on('value', function(gamesSnapshot) {
	  var games = gamesSnapshot.val();
    var keys = Object.keys(games);
    $scope.allWaitGames = [];
    console.log(keys);
    for (var i = 0; i < keys.length; i++) {
	    	if (games[keys[i]].waiting === true)
	    	{
    			$scope.allWaitGames.push(games[keys[i]]);
	    	}
	    }

	    // var lastGameKey = keys[ keys.length - 1 ];
	    // var lastGame = games[ lastGameKey ];
	    // if(lastGame.waiting) {
	    //   lastGame = ticTacRef.child(lastGameKey);
	    //   lastGame.set( {
	    //   	waiting: false, 
	    //   	playerTurn: 0, 
	    //   	won: false,
	    //   	board: $scope.board,
	    //   	currentPlayer: 1,
	    //   	scoreboard: [0,0] 
	    //   });
	    //   playerNum = 2;
	    // } else {
	    //   lastGame = ticTacRef.push( {waiting: true} );
	    //   playerNum = 1;
	    // }
	    // $scope.game = $firebase(lastGame);
	    // // console.log("$scope.game: " + $scope.game);
	    // // console.log($scope.game);
	    
	  }
	);

	$scope.createNewRoom = function() {


		ticTacRef.once('value', function(gamesSnapshot) {
		  var games = gamesSnapshot.val();
		  // if(games === null) {
		  //   lastGame = ticTacRef.push( {waiting: true, board: $scope.board, playerOneName: playerName} );
		  //   playerNum = 1;
		  // } else {
      lastGame = ticTacRef.push( {waiting: true, board: $scope.board, playerOneName: playerName});
      playerNum = 1;
	    // }
	    console.log(lastGame);
	    // var keys = Object.keys(games);
	    // var newGameKey = keys[keys.length - 1];
	    // var newGame = games[newGameKey];
	    $scope.game = $firebase(lastGame);

	    // console.log("$scope.game: " + $scope.game);
	    // console.log($scope.game);
	  }
	  );
	  
		$scope.joinedRoom = true;
	  // $scope.gameStart = true;
	  // $scope.$apply();
	}

	$scope.joinRoom = function(index) {
		
		console.log("index: " + index);

		ticTacRef.once('value', function(gamesSnapshot) {
		  var games = gamesSnapshot.val();
		  var waitingGameKeys = [];
			var keys = Object.keys(games);
	    for (var i = 0; i < keys.length; i++) {
	    	if (games[keys[i]].waiting === true) {
	  			waitingGameKeys.push(keys[i]);
	    	}
		  }
		  console.log(waitingGameKeys);
	    // var keys = Object.keys(games);
	    var targetGameKey = waitingGameKeys[index];
	    console.log(keys);
	    console.log("targetgamekey: " +targetGameKey);
	    var targetGame = games[ targetGameKey ];
	    
      targetGame = ticTacRef.child(targetGameKey);
      targetGame.update( {
      	waiting: false, 
      	playerTwoName: playerName,
      	playerTurn: 0, 
      	won: false,
      	board: $scope.board,
      	currentPlayer: 1,
      	scoreboard: [0,0] 
      });
      playerNum = 2;
	    
	    $scope.game = $firebase(targetGame);
	    // console.log("$scope.game: " + $scope.game);
	    // console.log($scope.game);
	    
		  
		});
		$scope.joinedRoom = true;
		
	}

	$scope.startGame = function() {

		ticTacRef.once('value', function(gamesSnapshot) {
		  var games = gamesSnapshot.val();
		  if(games === null) {
		    lastGame = ticTacRef.push( {waiting: true, playerOneName: $scope.playerName} );
		    playerNum = 1;
		  } else {
		    var keys = Object.keys(games);
		    var lastGameKey = keys[ keys.length - 1 ];
		    var lastGame = games[ lastGameKey ];
		    if(lastGame.waiting) {
		      lastGame = ticTacRef.child(lastGameKey);
		      lastGame.update( {
		      	waiting: false, 
		      	playerTwoName: $scope.playerName,
		      	playerTurn: 0, 
		      	won: false,
		      	board: $scope.board,
		      	currentPlayer: 1,
		      	scoreboard: [0,0] 
		      });
		      playerNum = 2;
		    } else {
		      lastGame = ticTacRef.push( {waiting: true, playerOneName: $scope.playerName});
		      playerNum = 1;
		    }
		    $scope.game = $firebase(lastGame);
		    // console.log("$scope.game: " + $scope.game);
		    // console.log($scope.game);
		    
		  }
		});
	}

	


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
		

		// console.log("$scope.game.board: " + $scope.game.board);
	 //    console.log($scope.game.board);

		$scope.board = new Array(12);
		$scope.currentSpace = {};
		$scope.scoreboard = [0,0];
		$scope.currentPlayer = 1;
		randomPiece();

		for (var i = 0; i < 12; i++) { 
			$scope.board[i] = new Array(12); 
		}

		for (var i = 0; i < 12; i++) { 
			for (var j = 0; j < 12; j++) {
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
		if (isInsideBoard(space)) {
			// reset previous hover
			console.log("is inside board");
			for (var i = 0; i < 12; i++) { 
				for (var j = 0; j < 12; j++) {
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
	}

	$scope.hoverColor = function(space) {
		if (playerNum === $scope.game.currentPlayer) {
			if (space.hover === 1) {
	      return { opacity: "1" };
      } else {
     		return { opacity: "0.6"};
    	}
		} else {
   		return { opacity: "0.6"};
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
				points = 12;
				document.getElementById("click").play();
				break;
			case 7:
				points = 18;
				document.getElementById("click").play();
				break;
			case 8:
				points = 25;
				document.getElementById("click").play();
				break;
			case 9:
				points = 33;
				document.getElementById("click").play();
				break;
			case 10:
				points = 42;
				document.getElementById("click").play();
				break;
			case 11:
				points = 52;
				document.getElementById("click").play();
				break;
			case 12:
				points = 64;
				document.getElementById("click").play();
				break;
		}

		$scope.game.scoreboard[$scope.game.currentPlayer-1] += points;
	}
	
  var switchPlayer = function() {
  	if ($scope.game.currentPlayer === 1) {
			$scope.game.currentPlayer = 2;
		} else if ($scope.game.currentPlayer === 2) {
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
				if ($scope.currentPiece[i][j] === 1 && $scope.board[row+i][col+j].empty) {
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
  	
		var horizontals = [];
		var verticals = [];
		var tempArray = [];

		for (var i = 0; i < $scope.board.length; i++) {
			horizontals.push($scope.board[i]);
		}

		for (var i = 0; i < $scope.board.length; i++) {
			for (var j = 0; j < $scope.board.length; j++) {
				tempArray.push($scope.board[j][i]);
			}
			verticals.push(tempArray);
			tempArray = [];
		}

		console.log(verticals);

		// var col0 = [$scope.board[0][0], $scope.board[1][0], $scope.board[2][0], $scope.board[3][0], $scope.board[4][0], $scope.board[5][0], $scope.board[6][0], $scope.board[7][0]];
		// var col1 = [$scope.board[0][1], $scope.board[1][1], $scope.board[2][1], $scope.board[3][1], $scope.board[4][1], $scope.board[5][1], $scope.board[6][1], $scope.board[7][1]];
		// var col2 = [$scope.board[0][2], $scope.board[1][2], $scope.board[2][2], $scope.board[3][2], $scope.board[4][2], $scope.board[5][2], $scope.board[6][2], $scope.board[7][2]];
		// var col3 = [$scope.board[0][3], $scope.board[1][3], $scope.board[2][3], $scope.board[3][3], $scope.board[4][3], $scope.board[5][3], $scope.board[6][3], $scope.board[7][3]];
		// var col4 = [$scope.board[0][4], $scope.board[1][4], $scope.board[2][4], $scope.board[3][4], $scope.board[4][4], $scope.board[5][4], $scope.board[6][4], $scope.board[7][4]];
		// var col5 = [$scope.board[0][5], $scope.board[1][5], $scope.board[2][5], $scope.board[3][5], $scope.board[4][5], $scope.board[5][5], $scope.board[6][5], $scope.board[7][5]];
		// var col6 = [$scope.board[0][6], $scope.board[1][6], $scope.board[2][6], $scope.board[3][6], $scope.board[4][6], $scope.board[5][6], $scope.board[6][6], $scope.board[7][6]];
		// var col7 = [$scope.board[0][7], $scope.board[1][7], $scope.board[2][7], $scope.board[3][7], $scope.board[4][7], $scope.board[5][7], $scope.board[6][7], $scope.board[7][7]];
		// var col8 = [$scope.board[0][8], $scope.board[1][8], $scope.board[2][8], $scope.board[3][8], $scope.board[4][8], $scope.board[5][8], $scope.board[6][8], $scope.board[7][8]];
		// var col9 = [$scope.board[0][7], $scope.board[1][7], $scope.board[2][7], $scope.board[3][7], $scope.board[4][7], $scope.board[5][7], $scope.board[6][7], $scope.board[7][7]];
		// var col10 = [$scope.board[0][7], $scope.board[1][7], $scope.board[2][7], $scope.board[3][7], $scope.board[4][7], $scope.board[5][7], $scope.board[6][7], $scope.board[7][7]];
		// var col11 = [$scope.board[0][7], $scope.board[1][7], $scope.board[2][7], $scope.board[3][7], $scope.board[4][7], $scope.board[5][7], $scope.board[6][7], $scope.board[7][7]];
		// var verticalsTest = [col0, col1, col2, col3, col4, col5, col6, col7, col8, col9, col10, col11];
		// var allLines = horizontals.concat(verticals);
		
		

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
				if (horizontals[i][j].player === $scope.game.currentPlayer) {
					count++;
					runningWinSpaces.push($scope.board[i][j]);
				} else {
					count = 0;
				}

				if (count === 0) {
					if (runningWinSpaces.length >= 5) {
						updateScore(runningWinSpaces.length);
						$scope.winSpaces.push(runningWinSpaces);
						runningWinSpaces = [];
					} else {
						runningWinSpaces = [];
					}
				}

				if (j === horizontals[i].length - 1) {
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
				if (verticals[i][j].player === $scope.game.currentPlayer) {
					count++;
					// console.log("col: " + i + " row: " + j + " count: " + count);
					runningWinSpaces.push($scope.board[j][i]);
				} else {
					count = 0;
				}

				if (count === 0) {
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

				if (j === verticals[i].length - 1) {
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
 				$scope.$apply();
 				break;
 			// w
 			case 119: 
 				if (isValidMove($scope.board[$scope.currentSpace.row-1][$scope.currentSpace.col])) {
	 				$scope.currentSpace = $scope.board[$scope.currentSpace.row-1][$scope.currentSpace.col];
	 				$scope.hoverPiece($scope.currentSpace);
	 				console.log("d inside");
	 			}
	 			console.log("d outside");
 				break;
 			// s
 			case 115:
	 			if (isValidMove($scope.board[$scope.currentSpace.row+1][$scope.currentSpace.col])) {
	 				$scope.currentSpace = $scope.board[$scope.currentSpace.row+1][$scope.currentSpace.col];
	 				$scope.hoverPiece($scope.currentSpace);
	 				console.log("d inside");
	 			}
	 			console.log("d outside");
 				break;
 			// a
 			case 97:
	 			if (isValidMove($scope.board[$scope.currentSpace.row][$scope.currentSpace.col-1])) {
	 				$scope.currentSpace = $scope.board[$scope.currentSpace.row][$scope.currentSpace.col-1];
	 				$scope.hoverPiece($scope.currentSpace);
	 				console.log("d inside");
	 			}
	 			console.log("d outside");
 				break;
 			// d
 			case 100:
	 			if (isValidMove($scope.board[$scope.currentSpace.row][$scope.currentSpace.col+1])) {
	 				$scope.currentSpace = $scope.board[$scope.currentSpace.row][$scope.currentSpace.col+1];
	 				$scope.hoverPiece($scope.currentSpace);
	 				console.log("d inside");
	 			}
	 			console.log("d outside");
 				break;
			// f
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

	var isValidMove = function(space) {
		var row = space.row;
		var col = space.col;

		for (var i = 0; i < $scope.currentPiece.length; i++) {
			for (var j = 0; j < $scope.currentPiece[i].length; j++) {
				// only place piece if all piece spaces 'land' on empty spaces
				// also, for 0's in the piece, do not change 'empty' status
				if ($scope.currentPiece[i][j] === 1 && !$scope.board[row+i][col+j].empty) {
					return false;
				}
			}
		}

		return true;
	}

	var isInsideBoard = function(space) {
		var row = space.row;
		var col = space.col;
		for (var i = 0; i < $scope.currentPiece.length; i++) {
			for (var j = 0; j < $scope.currentPiece[i].length; j++) {
				// only place piece if all piece spaces 'land' on empty spaces
				// also, for 0's in the piece, do not change 'empty' status
				if ($scope.currentPiece[i][j] === 1 && $scope.board[row+i][col+j] === undefined) {
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
		if (isValidMove($scope.currentSpace) && playerNum === $scope.game.currentPlayer) {
			placePiece($scope.currentSpace);
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

		$scope.board = new Array(12);
		$scope.currentSpace = {};
		$scope.game.scoreboard = [0,0];
		$scope.currentPlayer = 1;
		randomPiece();

		for (var i = 0; i < 12; i++) { 
			$scope.board[i] = new Array(12); 
		}

		for (var i = 0; i < 12; i++) { 
			for (var j = 0; j < 12; j++) {
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

	$scope.setName = function(name) {
		console.log("hello");
		playerName = name;
		$scope.nameSubmitted = true;
	}

	
	$scope.createGame();

})