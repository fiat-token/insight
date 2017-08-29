function userServices($http) {
    var self = this;

    function _setProperties() {
        var currentUser = lib.getCurrentUser();

        if (currentUser) {
            self.currentUser = currentUser.username;
        }
        else {
            self.currentUser = undefined;
        }
    };

    _setProperties();

    self.removeCurrentUser = function () {
        lib.logout(_setProperties);
    };

    self.getUser = function () {
        console.log('Calling get user method...');
        var users = $http.get('/insight-api/user/get');
        console.log('Get users method called!');
        return users;
    };

    self.login = function (body) {

        return $http.post('/insight-api/user/login', body)
            .then( function(data) { lib.makePromise(lib.saveToken(data.data.token, _setProperties)) })
            .catch(lib.rejectPromise);
    }

    self.register = function (body) {

        var doLogin = function() {
            var user = {
                username: body.username,
                password: body.password,
            };
            return $http.post('/insight-api/user/register', user)
        };

        return doLogin()
            .then( function(data) { lib.makePromise(lib.saveToken(data.data.token, _setProperties)) })
            .catch(lib.rejectPromise);
    };
}

angular
    .module('insight.login')
    .service('userServices', userServices);