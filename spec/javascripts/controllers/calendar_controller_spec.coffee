xdescribe "CalendarController", ->
  $controller = undefined
  beforeEach ->
    module('todoListsApp')
    inject((_$controller_) ->
      $controller = _$controller_
    )
  describe "task creation", ->
    it "creates task", ->
      $scope = {}
      rawData = { data: { calendar: [] } }
      controller = $controller("CalendarController",
        '$scope': $scope, 'raw': rawData
      )
      $scope.newTask = "new task"
      $scope.startAt = "2015-01-01"
      $scope.priority = "2"
      $scope.createTask()
      expect($scope.newTask).toEqual ''
      expect($scope.startAt).toEqual ''
      expect($scope.priority).toEqual 1
