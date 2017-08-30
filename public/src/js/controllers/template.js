
angular.module('insight').controller('templateController',
  function($scope, $location) {
      $scope.isLoggedIn = lib.isLoggedIn() || (!lib.isLoggedIn() && $location.path() == '/');
  });