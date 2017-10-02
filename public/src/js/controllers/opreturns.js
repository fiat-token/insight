'use strict';

angular.module('insight.opreturns').controller('OpReturnController',
  function ($scope, $rootScope, $routeParams, $location, Global, OpReturn) {
    $scope.global = Global;
    $scope.loading = false;
    $scope.opreturn = {
      "hash": $routeParams.opreturnHash,
      "value": lib.HexToStr($routeParams.opreturnHash)
    };

    $scope.params = $routeParams;

  });
