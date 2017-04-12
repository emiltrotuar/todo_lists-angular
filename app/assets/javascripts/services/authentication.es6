(() => {
  angular
    .module('todoListsApp')
    .service('Authentication', ['$http', function($http) {
      let isAuthenticated = false;
      let promiseHandlers = (promise, boolValue) => {
        return promise.success((data, status, headers, config) => {
                 isAuthenticated = boolValue;
               }).error((data, status, headers, config) => {
                 console.log(status, 'something went wrong');
               });
      }
      this.setLoginStatus = val => {
        return isAuthenticated = val;
      }
      this.getLoginStatus = () => {
        return isAuthenticated;
      }
      this.logIn = (email, password) => {
        let data = {
          user: {
            email: email,
            password: password
          }
        };
        let promise = $http.post('/users/sign_in.json', data)
        return promiseHandlers( promise, true )
      };

      this.logOut = () => {
        let promise = $http.delete('/users/sign_out.json')
        return promiseHandlers( promise, false )
      }
    }])
})();
