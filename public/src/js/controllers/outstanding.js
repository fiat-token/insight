'use strict';

angular.module('insight.outstanding').controller('OutstandingController',
    function ($scope, $rootScope, $http, Api) {
        $scope.issuerAddress = "VQojEPjGcbiHr4UzEahegSdwwHeCqQKxCd";
        $scope.outstanding = {};

        $http.get(Api.apiPrefix + '/outstanding' )
            .success(function (txoutsetinfo, status, headers, config) {
                $scope.outstanding = txoutsetinfo.result;
                $scope.outstanding.total_amount = $rootScope.currency.getConvertionValue($scope.outstanding.total_amount);
                
                $http.get(Api.apiPrefix + '/addr/' + $scope.issuerAddress + '/balance')
                .success(function (balance, status, headers, config) {
                    if(balance)
                        $scope.outstanding.total_amount -= (balance / 10000);
    
                })
                .error(function (data, status, headers, config) {
                    console.log("Error calling getaddress balance");
                    console.log(data);
                });

            })
            .error(function (data, status, headers, config) {
                console.log("Error calling getoutstanding");
                console.log(data);
            });

    });
