'use strict';

angular.module('insight.phoneNumber')
  .factory('PhoneNumber',
    function($resource, Api) {
    return $resource(Api.apiPrefix + '/phonenumber/:phoneNumber');
  });
