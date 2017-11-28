'use strict';

angular.module('insight.opreturns')
  .factory('OpReturn', function ($resource, Api) {
    return $resource(Api.apiPrefix + '/opreturn/:opreturnHash', {
      opreturnHash: '@opreturnHash'
    }, {
        get: {
          method: 'GET',
          interceptor: {
            response: function (res) {
              return res.data;
            },
            responseError: function (res) {
              if (res.status === 404) {
                return res;
              }
            }
          }
        }
      });
  })
  .factory('SendToIBAN', function ($resource, Api) {
    return $resource(Api.apiPrefix + '/sendToIban', {
      get: {
        method: 'GET',
        interceptor: {
          response: function (res) {
            return res.data;
          },
          responseError: function (res) {
            if (res.status === 404) {
              return res;
            }
          }
        }
      }
    });
  });
