(() => {
  angular
    .module('todoListsApp')
    .controller('ApplicationController', ['$scope', '$location', 'Authentication',
      ($scope, $location, Authentication) => {
        $scope.isAuthenticated = Authentication.getLoginStatus();
        $scope.logIn = function(email,password){
          Authentication.logIn(email,password)
            .success((data, status, headers, config) => {
              $scope.isAuthenticated = true;
              $location.path('/calendar');
            })
        };
        $scope.logOut = function(){
          Authentication.logOut()
            .success((data, status, headers, config) => {
              $scope.isAuthenticated = false;
              $location.path('/signin');
            })
        };
      }]);
})();
