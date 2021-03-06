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
        window.localStorage['virtualtoken-token'] = token;
        refreshProperties();
    };
    lib.getToken = function () {
        return window.localStorage['virtualtoken-token'];
    };
    lib.logout = function () {
        window.localStorage.removeItem('virtualtoken-token');
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
    lib.opReturnCleaning = function (hex) {        
        hex = hex.toString();
        hex = hex.substring(hex.indexOf(" ") + 1);
        return lib.HexToStr(hex);
    };
    lib.HexToStr = function (hex) {
        var hex = hex.toString();//force conversion
        var str = '';
        for (var i = 0; i < hex.length; i += 2)
            str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
        return str;
    };
    lib.StrToHex = function (str) {
        var hex = '';
        for (var i = 0; i < str.length; i++) {
            hex += '' + str.charCodeAt(i).toString(16);
        }
        return hex;
    };
    lib.createOpReturn = function (type, message) {
        var lengthHex = message.length.toString(16);
        if (lengthHex.length == 1) lengthHex = '0' + lengthHex;
        var opret = lib.StrToHex(message);
        return type + lengthHex + opret;
    };
} (window.lib = window.lib || {}, jQuery));