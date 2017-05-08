angular
  .module('todoListsApp')
  .controller('TaskController', ['$scope', '$http',
    ($scope, $http) => {

      $scope.isEditing = false;
      $scope.detailsHidden = true;

      $scope.$watch('task.done', (newVal, oldVal) => {
        if (newVal !== oldVal){
          let task = $scope.task;
          data = {
            task: {
              name: task.name.trim(),
              done: newVal
            }
          };
          $http.put('/tasks/'+task.id, data);
        }
      });

      $scope.toggleDetails = () => {
        $scope.detailsHidden = !$scope.detailsHidden;
      };

      $scope.editTask = task => {
        $scope.originalTask = angular.extend({}, task);
        $scope.isEditing = true;
      };

      $scope.doneEditing = (task, event)=> {
        if (event.keyCode == 13) {
          $scope.updateTask(task);
        }
        else if (event.keyCode == 27) {
          $scope.task = $scope.originalTask;
          $scope.isEditing = false;
        }
      };

      $scope.updateTask = task => {
        if (!task.name.length) {
          return;
        }
        let data = {
          task: {
            name: task.name.trim()
          }
        };
        $http.put('/tasks/'+task.id, data);
        $scope.isEditing = false;
      };

      $scope.removeTask = (task, index) => {
        $http.delete('/tasks/'+task.id);
        $scope.day.tasks.splice(index, 1);
      };
    }]);
