'use strict';

angular.module('insight.search').controller('SearchController',
  function ($scope, $routeParams, $location, $timeout, Global, Block, Transaction, Address, OpReturn, BlockByHeight, PhoneNumber) {
    $scope.global = Global;
    $scope.loading = false;

    var _badQuery = function () {
      $scope.badQuery = true;

      $timeout(function () {
        $scope.badQuery = false;
      }, 2000);
    };

    var _resetSearch = function () {
      $scope.q = '';
      $scope.loading = false;
    };

    $scope.search = function () {
      var q = $scope.q;
      $scope.badQuery = false;
      $scope.loading = true;

      Block.get({
        blockHash: q
      }, function () {
        _resetSearch();
        $location.path('block/' + q);
      }, function () { //block not found, search on TX
        Transaction.get({
          txId: q
        }, function () {
          _resetSearch();
          $location.path('tx/' + q);
        }, function () { //tx not found, search on Address
          Address.get({
            addrStr: q
          }, function () {
            _resetSearch();
            $location.path('address/' + q);
          },
            function () { //address not found, search on BlockByHeight
              if (isFinite(q)) { // ensure that q is a finite number. A logical height value.
                BlockByHeight.get({
                  blockHeight: q
                }, function (hash) {
                  _resetSearch();
                  $location.path('/block/' + hash.blockHash);
                }, function () { // block by height not found, search on PhoneNumber
                  PhoneNumber.get({
                    phoneNumber: q
                  }, function (phoneResponse) {
                    var addr = phoneResponse.value.address;
                    Address.get({
                      addrStr: addr
                    }, function () {
                      _resetSearch();
                      $location.path('address/' + addr);
                    })
                  }, function () { // phone number not found, search on OpReturn
                    var hex = lib.createOpReturn("1d", q);
                    OpReturn.get({
                      opreturnHash: hex
                    }, function () {
                      _resetSearch();
                      $location.path('opreturn/' + hex);
                    }, function () { //not found, fail :(
                      $scope.loading = false;
                      _badQuery();
                    })
                  })
                })
              }
              else {
                var hex = lib.createOpReturn("1d", q);
                OpReturn.get({
                  opreturnHash: hex
                }, function (response) {
                  if (!response.error) {
                    _resetSearch();
                    $location.path('opreturn/' + hex);
                  }
                  else {
                    var iban = lib.createOpReturn("1c", q);
                    OpReturn.get({
                      opreturnHash: iban
                    }, function (ibanResponse) {
                      if (!ibanResponse.error) {
                        _resetSearch();
                        $location.path('opreturn/' + iban);
                      }
                      else {
                        $scope.loading = false;
                        _badQuery();
                      }
                    })
                  }

                });
              }
            });
        });

      })
    }
  });
