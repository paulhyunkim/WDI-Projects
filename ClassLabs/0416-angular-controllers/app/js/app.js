'use strict';


// Declare app level module which depends on filters, and services
var myApp = angular.module('myApp',[])

myApp.controller('ProjectsCtrl', ['$scope', '$http', function($scope, $http) {

  $scope.projects = [];

  // you need to copy your API Key here
  $http.defaults.headers.common['X-TrackerToken'] = '737d0bc4097f50f9aff1fadd61b7ba08';

  // we'll need to get the API to load Pivotal here
  var pivotalUrl = "https://www.pivotaltracker.com/services/v5/projects";

  $http({method: 'GET', url: pivotalUrl}).success(function(projects) {
    // This runs when the http has returned project information
    $scope.projects = projects;
  });


  $scope.getStories = function(projectID) {
    $http({method: 'GET', url: pivotalUrl + "/" + projectID + "/stories"}).success(function(stories) {
    // This runs when the http has returned project information
    $scope.stories = stories;
  });
  }
// curl -X GET -H "X-TrackerToken: 737d0bc4097f50f9aff1fadd61b7ba08" "https://www.pivotaltracker.com/services/v5/projects/1056200/stories"

  
  $scope.$watch("projects.length", function(){ $scope.totalProjects = $scope.projects.length; });
    

}])