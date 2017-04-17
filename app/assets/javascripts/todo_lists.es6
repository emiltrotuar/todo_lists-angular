//= require_self
//= require_tree ./controllers
//= require_tree ./directives
//= require_tree ./services

angular.module('todoListsApp', ['ui.router','restangular']);

angular
  .module('todoListsApp')
  .config(['$stateProvider', '$urlRouterProvider', '$httpProvider', 'AuthenticationProvider',
    ($stateProvider, $urlRouterProvider, $httpProvider, AuthenticationProvider ) => {
      $stateProvider
        .state('signin', {
          url: '/signin',
          templateUrl: '/assets/sign_in.slim',
          onEnter: function($state, Authentication) {
            if (Authentication.getLoginStatus()){
              $state.go('calendar');
            }
          }
        })
        .state('notes', {
          url: '/notes',
          resolve: {
            raw: ['$http',
              $http => {
                return $http.get('/notes.json');
              }
            ]
          },
          templateUrl: '/assets/notes/notes.slim',
          controller: 'NotesController',
          onEnter: function($state, Authentication) {
            if (!Authentication.getLoginStatus()){
              $state.go('signin');
            }
          }
        })
        .state('calendar', {
          url: '/calendar',
          templateUrl: '/assets/calendar/calendar.slim',
          controller: 'CalendarController',
          onEnter: function($state, Authentication) {
            if (!Authentication.getLoginStatus()){
              $state.go('signin');
            }
          }
        });
      // $urlRouterProvider.otherwise("/calendar");
      // $urlRouterProvider.when('/', ['$match', '$state', '$stateParams', function ($match, $state, $stateParams) {
      //   debugger;
      // }]);
      $urlRouterProvider.rule(function ($injector, $location) {
        var Authentication = $injector.get('Authentication')
        if ($location.path() == '' || $location.path() == '/' )
          if (Authentication.getLoginStatus()){
            $location.replace().path('/calendar');
          } else {
            $location.replace().path('/signin');
          }
      });

      $httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';
      $httpProvider.defaults.headers.common['X-TL-Client'] = 'application';

      $httpProvider.defaults.xsrfHeaderName = 'X-CSRF-Token'
      $httpProvider.defaults.xsrfCookieName = 'CSRF-Token'
    }]);

angular
  .module('todoListsApp')
  .run(['Authentication', Authentication => {
    if (window.tlAuthenticated)
      Authentication.setLoginStatus(true);
  }]);

angular.element(function() {
  setTimeout(() => angular.element(document).foundation(), 1000)
});
