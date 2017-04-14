describe("CalendarController", function() {
  var $controller;
  $controller = void 0;

  beforeEach(function() {
    module('todoListsApp');
    return inject(function(_$controller_) {
      return $controller = _$controller_;
    });
  });

  xdescribe("task creation", function() {
    return it("creates task", function() {
      var $scope, controller, rawData;
      $scope = {};
      rawData = {
        data: {
          calendar: []
        }
      };
      controller = $controller("CalendarController", {
        '$scope': $scope,
        'raw': rawData
      });
      $scope.newTask = "new task";
      $scope.startAt = "2015-01-01";
      $scope.priority = "2";
      $scope.createTask();
      expect($scope.newTask).toEqual('');
      expect($scope.startAt).toEqual('');
      return expect($scope.priority).toEqual(1);
    });
  });
});
