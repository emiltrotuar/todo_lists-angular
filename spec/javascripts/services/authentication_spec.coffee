describe "Authentication", ->

  $auth = undefined
  $httpBackend = undefined

  fakeResponse = {
    "_id": {"$oid":"550419ed45717562b0000000"},
    "email":"user@mail.com",
    "extension_token":"bK6cFoy8Y9Fobi6kdRtz"
  }

  beforeEach module('todoListsApp')

  beforeEach inject ($injector) ->
    $auth = $injector.get('Authentication')
    $httpBackend = $injector.get('$httpBackend')
    $httpBackend.when('POST','/users/sign_in.json')
      .respond(fakeResponse)
    $httpBackend.when('DELETE','/users/sign_out.json')
      .respond(null)

  describe "methods", ->
    it "logs in", ->
      $httpBackend.expectPOST('/users/sign_in.json')
      expect($auth.getLoginStatus()).toBe(false)
      $auth.logIn("user@mail.com","password").then ->
        expect($auth.getLoginStatus()).toBe(true)
      $httpBackend.flush()

    it "logs out", ->
      $auth.setLoginStatus(true)

      $httpBackend.expectDELETE('/users/sign_out.json')
      expect($auth.getLoginStatus()).toBe(true)
      $auth.logOut().then ->
        expect($auth.getLoginStatus()).toBe(false)
      $httpBackend.flush()
