'use strict';

describe('Controller: InstitutionEditCtrl', function () {

  // load the controller's module
  beforeEach(module('rscwbApp'));

  var InstitutionEditCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    InstitutionEditCtrl = $controller('InstitutionEditCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
