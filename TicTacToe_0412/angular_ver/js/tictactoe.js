var ticTacToeApp = angular.module('ticTacToeApp', []);

function TicTacToeController($scope) {
	
	$scope.scoreboard = [0,0];
	$scope.currentPlayer = 1;

	$scope.createGame = function () {
	
		$scope.spacesLeft = 9;
		$scope.gameOver = false;

		$scope.board = new Array(3);

		for (var i = 0; i < 3; i++) { 
			$scope.board[i] = new Array(3); 
		}

		// assign 0's
		for (var i = 0; i < 3; i++) { 
			for (var j = 0; j < 3; j++) {
				$scope.board[i][j] = {
					row: i,
					col: j,
					player: 0,
					empty: true,
					winningSpace: false
				} ; 
			}
		}

		console.log("created game");
	}

	document.getElementById("tetris").play();
	$scope.createGame();

	

	function updateScore() {
		$scope.scoreboard[$scope.currentPlayer-1]++;
	}
	
  function switchPlayer() {
  	if ($scope.currentPlayer == 1) {
			$scope.currentPlayer = 2;
		} else if ($scope.currentPlayer == 2) {
			$scope.currentPlayer = 1;
		}
  }

  // function active(space) {
  // 	if ($scope.currentPlayer == 0) {
		// 	return "active";
		// } 
  // }

  function placePiece(space) {
  	if ($scope.currentPlayer == 1) {
			space.player = 1;
		}
		if ($scope.currentPlayer == 2) {
			space.player = 2;
		}
		space.empty = false;
  }

	function checkWin() {
		var board = $scope.board;
		var horizontals = [board[0], board[1], board[2]];
		var verticals = [[board[0][0], board[1][0], board[2][0]], [board[0][1], board[1][1], board[2][1]], [board[0][2], board[1][2], board[2][2]]];
		var diagonals = [[board[0][0], board[1][1], board[2][2]], [board[2][0], board[1][1], board[0][2]]];
		var checkSpaces = horizontals.concat(verticals, diagonals);

		for (var i = 0; i < checkSpaces.length; i++) {
		var count = 0;
			for (var j = 0; j < 3; j++) {
				if (checkSpaces[i][j].player == $scope.currentPlayer) {
					count++;
				}
				if (count == 3) {
					$scope.gameOver = true;
					
					for (var k = 0; k < checkSpaces[i].length; k++) {
						checkSpaces[i][k].winningSpace = true;
					}
					console.log(checkSpaces[i]);
					return checkSpaces[i];

				}
			}
		}
	}

	$scope.xOrO = function(space) {
		if (space.player == 1) {
			return "X";
		}
		else if (space.player == 2) {
			return "O";
		}
	}

	$scope.spaceColor = function(space) {
    if (space.player == 1) {
      return { backgroundColor: "#9ff26e" };
      }
    else if (space.player == 2)
      return { backgroundColor: "#dc8170" };
  }


	$scope.displayPlayer = function(row,col) {
		if ($scope.board[row][col].player == 0) {
			return $scope.board[row][col].player;
		} else {
			return "";
		}
	}

	$scope.continue = function() {
		$scope.displayResult = { display: "none" };
		$scope.createGame();
	}

	$scope.makeMove = function(space) {
		console.log("makeMove");
		if (space.empty) {
			placePiece(space);
			document.getElementById("click").play();
			$scope.spacesLeft--;
			if(checkWin()) {
				// gameWin();
				
				updateScore();
				// $scope.$apply();
				// show game win message, make it show from hidden
				$scope.displayResult = { display: "inline-block" };
				document.getElementById("audio1").play();
				// prompt user to play again?
				// createGame();
			}
			else if ($scope.spacesLeft == 0) { 
				createGame();
			}
			switchPlayer();
		}
	}	
}

