angular.module("BabyApp", ["firebase"])
	.controller("BabyController", function($scope, $firebase) {
		var babyRef = new Firebase("https://issuesapp.firebaseio.com");
		$scope.issues = $firebase(babyRef);

		$scope.addOne = function() {
				babyRef.push({title: $scope.title, body: $scope.body});
		};
	});