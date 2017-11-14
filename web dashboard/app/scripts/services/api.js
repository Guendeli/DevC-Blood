'use strict';

angular.module('rscwbApp')
  .service('api', ['$http', function api($http) {
    return {
      getLocalize: function(language) {
        return $http ({
          method: 'GET',
          url: 'lang/' + language + '.json'
        }).then(
          function(result) {
            return result;
          }
        );
      }
    };
  }]);
