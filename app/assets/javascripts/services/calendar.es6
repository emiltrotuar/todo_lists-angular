(() => {
  angular
    .module('todoListsApp')
    .service('Calendar', ['Week', Week => {
      return function(tasks, numOfWeeks) {
        let weeks = this.weeks = [];
        numOfWeeks = numOfWeeks || 2;

        for (let n=0; n < numOfWeeks; n++){
          let start_of_week = moment().isoWeekday(1).add(n,'weeks');

          let week = new Week(start_of_week, tasks);
          weeks.push(week);
        }
      };
    }]);
})();
