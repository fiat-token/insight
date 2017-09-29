'use strict';

angular.module('insight.opreturns').controller('OpReturnController',
  function ($scope, $rootScope, $routeParams, $location, Global, OpReturn) {
    $scope.global = Global;
    $scope.loading = false;

    $scope.findOne = function () {
      $scope.loading = true;

      OpReturn.get({
        opreturnHash: $routeParams.opreturnHash
      }, function (opreturn) {
        $rootScope.titleDetail = opreturn.value;
        $rootScope.flashMessage = null;
        $scope.loading = false;
        $scope.opreturn = opreturn;
      }, function (e) {

        $rootScope.flashMessage = 'OpReturn Not Found';
        $location.path('/insight');
      });
    };

    $scope.params = $routeParams;

  });
