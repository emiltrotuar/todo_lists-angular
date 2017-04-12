(() => {
  angular
    .module('todoListsApp')
    .service('Week', ['Day', Day => {
      return function(start_date, tasks){

        this.start_date = start_date.format();

        this.days = [];

        for (let i=0; i<7; i++){
          let dayName = moment().isoWeekday(i+1).format('ddd');
          let fullDate = moment(this.start_date).add(i,'days').format("YYYY-MM-DD");
          let day = this.days[i] = new Day(dayName, fullDate);

          for (let j=0; j < tasks.length; j++) {
            let task = tasks[j];
            let taskStart = moment(task.start_at).format("YYYY-MM-DD");
            if (taskStart == day.fullDate)
              day.tasks.push(task);
          }
        }
      };
    }]);
})();
