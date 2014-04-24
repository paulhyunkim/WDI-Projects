var playerNum = null;

angular.module("BabyApp", ["firebase"])
	.controller("BabyController", function($scope, $firebase){
		var ticTacRef = new Firebase("https://fiery-fire-8597.firebaseio.com/games");
		$scope.btnIWannaPlayClick = function(){
			// Ask for info from firebase
			ticTacRef.once('value', function(gamesSnapshot) {
				// get the actual games data
			  var games = gamesSnapshot.val();
				if(games == null)
				{
					// No games at all, so make a new game -- As if we're Areg
					lastGame = ticTacRef.push( {waiting: true} );
					playerNum = 1;
				}
				else	// I do have at least one game out there...
				{
				  var keys = Object.keys(games);
				  var lastGameKey = keys[ keys.length - 1 ];
				  var lastGame = games[ lastGameKey ];
					console.log(lastGame);
					console.log(lastGameKey);
					console.log(games);
					console.log(lastGame.waiting)
				  if(lastGame.waiting)
				  {
				  	var onComplete = function(error) {
						  if (error) alert('Synchronization failed.');
						  else alert('Synchronization succeeded.');
						};
				  	// lastGame = $firebase("https://fiery-fire-8597.firebaseio.com/games/" + lastGameKey);
				  	lastGame.set ( {waiting:false, playerTurn: 0, won: false, board: [0,0,0,0,0,0,0,0,0]}, onComplete() );
				  	playerNum = 2;
				  }
				  else
				  {
				  	// Make a new game -- As if we're Areg
						lastGame = ticTacRef.push( {waiting: true} );
						playerNum = 1;
				  }
				}
				// Show the actual last game!
			  // console.log(lastGame.val());
			});

		};
	});