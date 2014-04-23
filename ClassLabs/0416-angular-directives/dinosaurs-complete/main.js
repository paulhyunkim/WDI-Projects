angular.module('JurassicApp', ['ngRoute']);
angular.module('JurassicApp',['ngResource']);
function ParkController($scope, $resource){

    $scope.greeting = "Welcome to Jurassic Park";

    $scope.todos = [{task: "Get out of the Jeep", done: true}, 
                    {task: "Run away from the T-Rex", done: false}, 
                    {task: "Climb the fence", done: false}, 
                    {task: "Dodge the herd of dinosaurs", done: false}, 
                    {task: "Turn the power back on", done: false}, 
                    {task: "Escape the raptors in the kitchen", done: false}, 
                    {task: "Figure out a way off the island", done: false}];

    $scope.addOne = function(){
        $scope.todos.push({task:$scope.task, done:false} );
        };

    $scope.count = -2;

    $scope.$watch('greeting', function() {
        $scope.count++;
    })

    $scope.$watchCollection('todos', function() {
        $scope.count++;
    })


    $scope.myColor = function (todo) {
          if (todo.done == false) {
            return { color: "red" }
            }
          else 
            return { color: "lime" }
        }

    };