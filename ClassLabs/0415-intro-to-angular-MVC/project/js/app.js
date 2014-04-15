var studentListApp = angular.module('studentListApp', []);

studentListApp.controller('StudentListCtrl', function($scope) {
	$scope.students = [{
		name: 'Michael Choi', 
		hobby: 'Restauranteur',
	},
	{
		name: 'Rocky Nicholson',
		hobby: 'Keeping America Safe...'
	},
	{
		name: 'William Sipes',
		hobby: 'Running like crazy...'
	}
	];
	$scope.addStudent = function(name, hobby) {
		$scope.students.push({
			name: name,
			hobby: hobby
		});
	};
}
);

