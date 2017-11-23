'use strict';

angular.module('insight.outstanding').controller('OutstandingController',
    function ($scope, $http, Api) {
        $scope.outstanding = {};

        $http.get(Api.apiPrefix + '/outstanding' )
            .success(function (txoutsetinfo, status, headers, config) {
                $scope.outstanding = txoutsetinfo.result;
            })
            .error(function (data, status, headers, config) {
                console.log(data);
            });

    });
