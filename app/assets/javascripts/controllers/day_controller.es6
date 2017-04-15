angular
  .module('todoListsApp')
  .controller('DayController', ['$scope',
    $scope => {
      $scope.$on($scope.day.fullDate, (event, task) => {
        $scope.day.tasks.push(task)
      })
    }]);
