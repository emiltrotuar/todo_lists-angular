describe "Calendar", ->
  $scope = undefined

  testTasks = [
    {
      done: false
      id: "55460330457175623c000000"
      name: "task_0"
      start_at: "2015-05-03T11:14:56+00:00"
      user: "550419ed45717562b0000000"
    }
    {
      done: false
      id: "55460330457175623c010000"
      name: "task_1"
      start_at: "2015-05-04T11:14:56+00:00"
      user: "550419ed45717562b0000000"
    }
  ]

  beforeEach module('todoListsApp')

  beforeEach inject ($injector) ->
    $httpBackend = $injector.get('$httpBackend')
    $controller = $injector.get('$controller')

    $httpBackend.when('GET','/tasks')
      .respond(testTasks)

    $scope = {}
    $controller('CalendarController', { $scope: $scope })

  xdescribe "calendar", ->
    it "populates scope with tasks", ->
      expect($scope.tasks).toEqual testTasks
