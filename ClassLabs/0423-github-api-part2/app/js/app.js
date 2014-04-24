'use strict';


// Declare app level module which depends on filters, and services
var githubApp = angular.module('githubApp',[])

githubApp.controller('GithubUsersCtrl', ['$scope', '$http', 'GithubUsers', 'GithubFeeds', function($scope, $http, GithubUsers, GithubFeeds) {
  $scope.users = {};

  GithubUsers.getUsers().then(function(users) {
    $scope.users = users.data;
    console.log($scope.users);
  });

  $scope.loadFeed = function(user) {
    GithubFeeds.getFeed(user.html_url).then(function(feed) {
      $scope.entries = feed.entry;
    });
  };

}])

githubApp.factory('GithubUsers', ['$http', function($http){
  var GithubUsers = {};


  GithubUsers.getUsers = function(){
    var url = "https://api.github.com/teams/747913/members?per_page=100&access_token=52866e6ad38ae58588d8553b37f13b3bd59d393b"
    return $http({method: 'GET', url: url});
  };

  return GithubUsers;

}]);

githubApp.factory('GithubFeeds', ['$q', '$http', function($q, $http){
  var GithubFeeds = {};

  GithubFeeds.fixtureFeeds = {
    "https://github.com/aabrahamians": aabrahamiansXML,
    "https://github.com/Aarontsang8": Aarontsang8XML
  }

  GithubFeeds.getFeed = function(user_url){
    var dataDefer = $q.defer();

    //$http({method: 'GET', url: url}).success(
    //  function(data,status,headers,config){
    //    if(typeof data === "object"){
    //      service.currentResponse = data;

    //      dataDefer.resolve(new ImageData(data));
    //    }
    //  });

    var x2js = new X2JS();
    var feed = x2js.xml_str2json(GithubFeeds.fixtureFeeds[user_url]);
    dataDefer.resolve(feed.feed);

    return dataDefer.promise;
  };

  return GithubFeeds;

}]);