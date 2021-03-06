describe("Authentication", function() {
  var $auth, $httpBackend, fakeResponse;
  $auth = undefined;
  $httpBackend = undefined;

  fakeResponse = {
    "_id": {
      "$oid": "550419ed45717562b0000000"
    },
    "email": "user@mail.com",
    "extension_token": "bK6cFoy8Y9Fobi6kdRtz"
  };

  beforeEach(module('todoListsApp'));

  beforeEach(inject(function($injector) {
    $auth = $injector.get('Authentication');
    $httpBackend = $injector.get('$httpBackend');
    $httpBackend.when('POST', '/users/sign_in.json').respond(fakeResponse);
    return $httpBackend.when('DELETE', '/users/sign_out.json').respond(null);
  }));

  describe("methods", function() {
    it("logs in", function() {
      $httpBackend.expectPOST('/users/sign_in.json');
      expect($auth.getLoginStatus()).toBe(false);
      $auth.logIn("user@mail.com", "password").then(function() {
        return expect($auth.getLoginStatus()).toBe(true);
      });
      return $httpBackend.flush();
    });
    return it("logs out", function() {
      $auth.setLoginStatus(true);
      $httpBackend.expectDELETE('/users/sign_out.json');
      expect($auth.getLoginStatus()).toBe(true);
      $auth.logOut().then(function() {
        return expect($auth.getLoginStatus()).toBe(false);
      });
      return $httpBackend.flush();
    });
  });
});

// ---
// generated by coffee-script 1.9.2