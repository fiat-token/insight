var loginCtrl = function ($scope, $window, userServices) {
    
        var currentUser = lib.getCurrentUser();
    
        if (currentUser) {
            $scope.notLoggedIn = false;
            $scope.loginDescription = 'You are already logged in!';
            $window.location.assign('/insight/home');
            return;
        }
    
        $scope.notLoggedIn = true;
        $scope.loginDescription = "Please insert your credentials: "
    
        userServices.getUser()
            .then(
            function (pls) { $scope.users = pls.data; },
            function (err) { console.log(err); }
            )
    
        $scope.login = function () {
            userServices.login({ username: $scope.username, password: $scope.userPassword })
                .then(
                function() { $window.location.assign('/insight/home') },
                function(err) { console.error(err); $scope.loginDescription = 'error: ' + err.data.message; }
                );
        }
    }
    
    angular
        .module('insight.login')
        .controller('loginCtrl', loginCtrl);