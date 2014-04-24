'use strict';


// Declare app level module which depends on filters, and services
var githubApp = angular.module('githubApp',[])

githubApp.controller('GithubUsersCtrl', ['$scope', '$http', 'GithubUsers', 'GithubFeeds', function($scope, $http, GithubUsers, GithubFeeds) {
  $scope.users = {};

  GithubUsers.getUsers().then(function(users) {
    $scope.users = users.data;
  });

  $scope.loadFeed = function(user) {
    GithubFeeds.getFeed(user).then(function(feed) {
      $scope.entries = feed.data;
      console.log($scope.entries);
    });
  };

}])

githubApp.factory('GithubUsers', ['$http', function($http){
  var GithubUsers = {};

  GithubUsers.getUsers = function(){
    var url = 'https://api.github.com/teams/747913/members?per_page=100&access_token=52866e6ad38ae58588d8553b37f13b3bd59d393b';
    return $http({method: 'GET', url: url});
  };

  return GithubUsers;

}]);

githubApp.factory('GithubFeeds', ['$http', function($http){
  var GithubFeeds = {};

  GithubFeeds.getFeed = function(user){
    var url = user.events_url.replace("{/privacy}","?per_page=100&access_token=52866e6ad38ae58588d8553b37f13b3bd59d393b");
  return $http({method: 'GET', url: url});
  };

  return GithubFeeds;

}]);