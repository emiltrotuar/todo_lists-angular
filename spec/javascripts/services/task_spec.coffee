describe "Task", ->

  Task = undefined
  $httpBackend = undefined

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

  # newTask = {"task":{"id":"554a78cf4571753ddd000000","name":"32t","done":false,"user":"550419ed45717562b0000000","start_at":"2015-05-07T00:00:00+00:00"}}
  newTask = {
    done: false,
    id: "55460330457175623c001000",
    name: "task_2",
    start_at: "2015-05-03T11:15:56+00:00",
    user: "550419ed45717562b0000000"
  }
  beforeEach module('todoListsApp')

  beforeEach inject ($injector) ->
    Task = $injector.get('Task')
    $httpBackend = $injector.get('$httpBackend')
    $httpBackend.when('GET','/tasks')
      .respond(testTasks)
    $httpBackend.when('POST','/tasks', newTask)
      .respond(newTask)

  xdescribe "task", ->
    it "loads tasks from server", ->
      $httpBackend.expectGET('/tasks')
      Task.getList().then (tasks) ->
        expect(tasks).toEqual testTasks
      $httpBackend.flush()

    it "creates new task", ->
      Task.post(newTask).then (response) ->
        expect(response.task).toEqual newTask
      $httpBackend.flush()
