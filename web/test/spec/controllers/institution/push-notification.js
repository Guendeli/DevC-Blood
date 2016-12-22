'use strict';

describe('Controller: InstitutionPushNotificationCtrl', function () {

  // load the controller's module
  beforeEach(module('rscwbApp'));

  var InstitutionPushNotificationCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    InstitutionPushNotificationCtrl = $controller('InstitutionPushNotificationCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
