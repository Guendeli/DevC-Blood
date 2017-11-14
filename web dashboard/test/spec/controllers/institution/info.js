'use strict';

describe('Controller: InstitutionInfoCtrl', function () {

  // load the controller's module
  beforeEach(module('rscwbApp'));

  var InstitutionInfoCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    InstitutionInfoCtrl = $controller('InstitutionInfoCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
