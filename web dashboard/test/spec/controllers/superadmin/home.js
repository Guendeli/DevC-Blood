'use strict';

describe('Controller: SuperadminHomeCtrl', function () {

  // load the controller's module
  beforeEach(module('rscwbApp'));

  var SuperadminHomeCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SuperadminHomeCtrl = $controller('SuperadminHomeCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
