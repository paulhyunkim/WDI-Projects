var ticTacTetrisApp = angular.module('ticTacTetrisApp', ['firebase']);
ticTacTetrisApp.controller('TicTacTetrisController', function($scope, $firebase, $timeout) { 
	$scope.startMenu = true;
	var playerNum = null;
	var ticTacRef = new Firebase("https://tic-tac-toe-paul.firebaseio.com/feedbackBoard");
	var lastMessage;
	$scope.playerName = "";
	$scope.nameSubmitted = false;
	$scope.joinedRoom = false;
	$scope.gameStart = false;

	
	var messages = [];
	console.log("loaded");
	ticTacRef.once('value', function(feedbackBoardSnapshot) {
	  var feedbackBoard = feedbackBoardSnapshot.val();
    
    var keys = Object.keys(feedbackBoard);
    for (var i = 0; i < keys.length; i++) {
    	messages.push(feedbackBoard[keys[i]].feedback);
    }
    console.log(messages);
    $scope.messages = messages;
    console.log($scope.messages);
    // $scope.messages = $firebase(feedbackBoard);
    // console.log($scope.messages);
  }
  );


	$scope.postFeedback = function(message) {
		message1 = message;
		var messages = [];
		console.log("hello");
		ticTacRef.once('value', function(feedbackBoardSnapshot) {
		  var feedbackBoard = feedbackBoardSnapshot.val();
      lastMessage = ticTacRef.push( {feedback: message1});
	    var keys = Object.keys(feedbackBoard);
	    for (var i = 0; i < keys.length; i++) {
	    	messages.push(feedbackBoard[keys[i]].feedback);
	    }
	    console.log(messages);
	    $scope.messages = messages;
	    console.log($scope.messages);
	    // $scope.messages = $firebase(feedbackBoard);
	    // console.log($scope.messages);
	  }
	  );
	}

})