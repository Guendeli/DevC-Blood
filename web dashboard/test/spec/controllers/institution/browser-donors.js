'use strict';

describe('Controller: InstitutionBrowserDonorsCtrl', function () {

  // load the controller's module
  beforeEach(module('rscwbApp'));

  var InstitutionBrowserDonorsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    InstitutionBrowserDonorsCtrl = $controller('InstitutionBrowserDonorsCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
