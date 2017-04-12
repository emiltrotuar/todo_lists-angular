xdescribe "ApplicationController", ->
  $controller = undefined
  $authentication = undefined
  beforeEach ->
    module('todoListsApp')
    inject (_$controller_,$injector) ->
      $controller = _$controller_
      $authentication = $injector.get('Authentication');

  describe "authentication", ->
    $scope = {}
    beforeEach ->
      $controller "ApplicationController",
        $scope: $scope
        Authentication: $authentication

    it "logs in user", ->
      email = 'test@mail.com'
      password = 'password'
      spyOn($authentication, 'logIn').and.callThrough();
      $scope.logIn(email,password)
      expect($authentication.logIn).toHaveBeenCalledWith(email,password)

    it "logs out user", ->
      spyOn($authentication, 'logOut').and.callThrough();
      $scope.logOut()
      expect($authentication.logOut).toHaveBeenCalled()
