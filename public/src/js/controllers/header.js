'use strict';

angular.module('insight.system').controller('HeaderController',
  function($scope, $rootScope, $modal, $window, $location, getSocket, Global, Block) {
    $scope.global = Global;

    if (lib.isLoggedIn()) {
      $scope.isLoggedIn = true;
    }
    // else if ($location.path() != '/') {
    //   $scope.isLoggedIn = false;
    //   $window.location.assign('/insight');
    // }
    else {
      $scope.isLoggedIn = false;
    }

    $scope.logout = function () {
        lib.logout();
        $window.location.assign('/insight');
    };

    $rootScope.currency = {
      factor: 10000,
      bitstamp: 0,
      symbol: 'vTkn'
    };

    $scope.menu = [{
      'title': 'Blocks',
      'link': 'blocks'
    }, {
      'title': 'Status',
      'link': 'status'
    }];

    $scope.openScannerModal = function() {
      var modalInstance = $modal.open({
        templateUrl: 'scannerModal.html',
        controller: 'ScannerController'
      });
    };

    var _getBlock = function(hash) {
      Block.get({
        blockHash: hash
      }, function(res) {
        $scope.totalBlocks = res.height;
      });
    };

    var socket = getSocket($scope);
    socket.on('connect', function() {
      socket.emit('subscribe', 'inv');

      socket.on('block', function(block) {
        var blockHash = block.toString();
        _getBlock(blockHash);
      });
    });

    $rootScope.isCollapsed = true;
  });
