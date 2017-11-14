'use strict';

describe('Controller: SuperadminEditCtrl', function () {

  // load the controller's module
  beforeEach(module('rscwbApp'));

  var SuperadminEditCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SuperadminEditCtrl = $controller('SuperadminEditCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
