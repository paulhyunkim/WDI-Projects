'use strict';


// Declare app level module which depends on filters, and services
var githubApp = angular.module('githubApp',[])

githubApp.controller('GithubUsersCtrl', ['$scope', '$http', 'GithubUsers', 'GithubFeeds', function($scope, $http, GithubUsers, GithubFeeds) {

}])

githubApp.factory('GithubUsers', ['$q', '$http', function($q, $http){
  var GithubUsers = {};

  GithubUsers.fixtureUsers = [
  {
    "login": "aabrahamians",
    "id": 7122662,
    "avatar_url": "https://avatars.githubusercontent.com/u/7122662?",
    "gravatar_id": "78282460eae250ae71d2dee40870229f",
    "url": "https://api.github.com/users/aabrahamians",
    "html_url": "https://github.com/aabrahamians",
    "followers_url": "https://api.github.com/users/aabrahamians/followers",
    "following_url": "https://api.github.com/users/aabrahamians/following{/other_user}",
    "gists_url": "https://api.github.com/users/aabrahamians/gists{/gist_id}",
    "starred_url": "https://api.github.com/users/aabrahamians/starred{/owner}{/repo}",
    "subscriptions_url": "https://api.github.com/users/aabrahamians/subscriptions",
    "organizations_url": "https://api.github.com/users/aabrahamians/orgs",
    "repos_url": "https://api.github.com/users/aabrahamians/repos",
    "events_url": "https://api.github.com/users/aabrahamians/events{/privacy}",
    "received_events_url": "https://api.github.com/users/aabrahamians/received_events",
    "type": "User",
    "site_admin": false
  },
  {
    "login": "Aarontsang8",
    "id": 7087101,
    "avatar_url": "https://avatars.githubusercontent.com/u/7087101?",
    "gravatar_id": "e7bba18620d5df74e3fc81d57418c7c8",
    "url": "https://api.github.com/users/Aarontsang8",
    "html_url": "https://github.com/Aarontsang8",
    "followers_url": "https://api.github.com/users/Aarontsang8/followers",
    "following_url": "https://api.github.com/users/Aarontsang8/following{/other_user}",
    "gists_url": "https://api.github.com/users/Aarontsang8/gists{/gist_id}",
    "starred_url": "https://api.github.com/users/Aarontsang8/starred{/owner}{/repo}",
    "subscriptions_url": "https://api.github.com/users/Aarontsang8/subscriptions",
    "organizations_url": "https://api.github.com/users/Aarontsang8/orgs",
    "repos_url": "https://api.github.com/users/Aarontsang8/repos",
    "events_url": "https://api.github.com/users/Aarontsang8/events{/privacy}",
    "received_events_url": "https://api.github.com/users/Aarontsang8/received_events",
    "type": "User",
    "site_admin": false
  }
  ]

  GithubUsers.getUsers = function(){
    var dataDefer = $q.defer();

    //$http({method: 'GET', url: url}).success(
    //  function(data,status,headers,config){
    //    if(typeof data === "object"){
    //      service.currentResponse = data;

    //      dataDefer.resolve(new ImageData(data));
    //    }
    //  });

    dataDefer.resolve(GithubUsers.fixtureUsers);

    return dataDefer.promise;
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