(() => {
  angular
    .module('todoListsApp')
    .service('Day', ['$rootScope', $rootScope => {
      return function(name, fullDate) {
        this.name = name;
        this.fullDate = fullDate;
        this.month_day = moment(fullDate).format("DD");
        this.tasks = [];
      };

    }]);
})();
