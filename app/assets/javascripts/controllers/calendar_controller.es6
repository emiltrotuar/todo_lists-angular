angular
  .module('todoListsApp')
  .controller('CalendarController',
    ['$scope', '$http', 'Calendar', 'Task', 'Week',
      ($scope, $http, Calendar, Task) => {
        Task.getList().then(tasks => {
          $scope.tasks = tasks
          $scope.calendar = new Calendar(tasks);
        })
        $scope.currentDay = moment().format("YYYY-MM-DD")
        $scope.currentMonth = moment().format("MMM")
        $scope.createTask = () => {
          let startAt;
          if (!($scope.newTask && $scope.newTask.length)) {
            alert('Please fill in task name');
            return;
          }
          if(!$scope.startAt){
            startAt = moment().add(1,'days').format("YYYY-MM-DD");
          }

          if(!$scope.priority){
            $scope.priority = 1;
          }

          let data = {
            task: {
              name: $scope.newTask,
              start_at: $scope.startAt || startAt,
              priority: $scope.priority
            }
          };
          $scope.tasks.post(data).then((task) => {
            let taskStart = moment(task.start_at).format("YYYY-MM-DD");
            $scope.$broadcast(taskStart, task);
          })
          $scope.newTask = '';
          $scope.startAt = '';
          $scope.priority = 1;
        };
      }]);
