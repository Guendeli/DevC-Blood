'use strict';

describe('Service: joinTables', function () {

  // load the service's module
  beforeEach(module('rscwbApp'));

  // instantiate service
  var joinTables;
  beforeEach(inject(function (_joinTables_) {
    joinTables = _joinTables_;
  }));

  it('should do something', function () {
    expect(!!joinTables).toBe(true);
  });

});
