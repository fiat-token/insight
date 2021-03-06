'use strict';

var defaultLanguage = localStorage.getItem('insight-language') || 'en';
var defaultCurrency = 'vTKN';

angular.module('insight',[
  'ngAnimate',
  'ngResource',
  'ngRoute',
  'ngProgress',
  'ui.bootstrap',
  'ui.route',
  'monospaced.qrcode',
  'gettext',
  'angularMoment',
  'insight.system',
  'insight.socket',
  'insight.api',
  'insight.blocks',
  'insight.transactions',
  'insight.address',
  'insight.search',
  'insight.status',
  'insight.connection',
  'insight.currency',
  'insight.messages',
  'insight.login',
  'insight.opreturns',
  'insight.phoneNumber',
  'insight.outstanding'
]);

angular.module('insight.system', []);
angular.module('insight.socket', []);
angular.module('insight.api', []);
angular.module('insight.blocks', []);
angular.module('insight.transactions', []);
angular.module('insight.address', []);
angular.module('insight.search', []);
angular.module('insight.status', []);
angular.module('insight.connection', []);
angular.module('insight.currency', []);
angular.module('insight.messages', []);
angular.module('insight.login', []);
angular.module('insight.opreturns', []);
angular.module('insight.phoneNumber',[]);
angular.module('insight.outstanding',[]);

angular.module('insight').config(['$httpProvider', function ($httpProvider) {
  $httpProvider.defaults.headers.common['Authorization'] = 'Bearer ' + lib.getToken();
}]);