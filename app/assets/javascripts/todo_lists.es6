//= require_self
//= require_tree ./controllers
//= require_tree ./directives
//= require_tree ./services

angular.module('todoListsApp', ['ui.router','restangular']);

angular
  .module('todoListsApp')
  .config(['$stateProvider', '$urlRouterProvider', '$httpProvider', 'RestangularProvider',
    ($stateProvider, $urlRouterProvider, $httpProvider, RestangularProvider ) => {
      $stateProvider
        .state('signin', {
          url: '/signin',
          templateUrl: '/assets/sign_in.slim'
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
          controller: 'NotesController'
        })
        .state('calendar', {
          url: '/calendar',
          templateUrl: '/assets/calendar/calendar.slim',
          controller: 'CalendarController'
        });
      $urlRouterProvider.otherwise("/calendar");

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
