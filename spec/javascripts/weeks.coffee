describe 'Weeks', ->

  it 'fetches tasks', ->

    fixture.preload "fixtures.json"
    describe "Using fixtures", ->
      beforeEach module("todoListsApp")
      beforeEach inject(($injector, $controller, $rootScope) ->
        fixtures = fixture.load("fixtures.json")
        $http = $injector.get("$httpBackend")
        $http.expectGET("/documents").respond 200, fixtures[0]
        scope = $rootScope.$new()
        $controller "WeeksController",
          $scope: scope

        $http.flush()
        return
        )
      it "must fetch documents", ->
        expect(scope.tasks.length).toEqual fixtures[0].length
