describe("CalendarController", function() {
  var $controller;

  beforeEach(function() {
    module('todoListsApp');
    inject(function(_$controller_) {
      $controller = _$controller_;
    });
  });

  var testTasks = [
    {
      done: false,
      id: "55460330457175623c000000",
      name: "task_0",
      start_at: "2015-05-03T11:14:56+00:00",
      user: "550419ed45717562b0000000"
    }, {
      done: false,
      id: "55460330457175623c010000",
      name: "task_1",
      start_at: "2015-05-04T11:14:56+00:00",
      user: "550419ed45717562b0000000"
    }
  ];

  describe("task creation", function() {
    return it("creates task", function() {
      var $scope, rawData;
      inject(function($injector) {
        $httpBackend = $injector.get('$httpBackend');
        $httpBackend.when('GET', '/tasks').respond(testTasks);

      $scope = {};
      rawData = {
        data: {
          calendar: []
        }
      };
      $controller("CalendarController", {
        '$httpBackend': $httpBackend,
        '$scope': $scope,
        'raw': rawData
      });
      $scope.newTask = "new task";
      $scope.startAt = "2015-01-01";
      $scope.priority = "2";
      $scope.createTask();
      expect($scope.newTask).toEqual('');
      expect($scope.startAt).toEqual('');
      expect($scope.priority).toEqual(1);
      })
    });
  });
});
