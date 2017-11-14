'use strict';

describe('Controller: InstitutionHomeCtrl', function () {

  // load the controller's module
  beforeEach(module('rscwbApp'));

  var InstitutionHomeCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    InstitutionHomeCtrl = $controller('InstitutionHomeCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
