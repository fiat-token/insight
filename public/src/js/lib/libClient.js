(function (lib, $, undefined) {
    
    lib.makePromise = function (promiseBody) {
        return new Promise(function (resolve, reject) { resolve(promiseBody); });
    };
    lib.rejectPromise = function (error) {
        var promise = new Promise(function (resolve, reject) { console.log(error); reject(error); });
        return promise;
    };
    lib.logError = function (err) { console.error(err); };
    lib.getDataFromArray = function (array) { return array.map(function (elem) { return elem.data }); }
    lib.saveToken = function (token, refreshProperties) {
        window.localStorage['commodityTrading-token'] = token;
        refreshProperties();
    };
    lib.getToken = function () {
        return window.localStorage['commodityTrading-token'];
    };
    lib.logout = function (refreshProperties) {
        window.localStorage.removeItem('commodityTrading-token');
        refreshProperties();
    };
    lib.isLoggedIn = function () {
        var token = lib.getToken();
        if (!token || token == 'undefined')
            return false;

        var payload = JSON.parse(window.atob(token.split('.')[1]));
        return payload.exp > Date.now() / 1000;

    };
    lib.getCurrentUser = function () {
        if (lib.isLoggedIn()) {
            var token = lib.getToken();
            var payload = JSON.parse(window.atob(token.split('.')[1]));
            return payload;
        }
    };
} (window.lib = window.lib || {}, jQuery));