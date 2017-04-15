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
        $scope.editedTask = task;
        $scope.originalTask = angular.extend({}, task);
        $scope.isEditing = true;
      };

      $scope.revertEditing = () => {
        $scope.doneEditing($scope.originalTask);
      };

      $scope.doneEditing = task => {
        $scope.editedTask = null;
        task.name = task.name.trim();

        if (!task.name) {
          $scope.removeTask(task);
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

      $scope.removeTask = task => {
        $http.delete('/tasks/'+task.id);
      };
    }]);
