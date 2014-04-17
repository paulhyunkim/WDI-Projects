function TicTacController($scope) {
	$scope.rows = [ ['a', 'b', 'c'], ['d', 'e', 'f'], ['g', 'h', 'i'] ];
	$scope.makeMove = function(r,c) {
		$scope.rows[r][c] = 'X';
	};
	console.log($scope);
}



