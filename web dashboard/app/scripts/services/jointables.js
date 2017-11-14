'use strict';
/* global Parse */

// joins tables InstitutionData, InstitutionBlood, UserData and return result
angular.module('rscwbApp')
  .service('joinTables', ['$q', function ($q) {
    var join = function(objectId) {
      var User = Parse.Object.extend('User');
      var Institution = Parse.Object.extend('InstitutionData');
      var Blood = Parse.Object.extend('InstitutionBlood');
      var UserData = Parse.Object.extend('UserData');

      var queryUser = new Parse.Query(User);
      var queryInstitution = new Parse.Query(Institution);
      var queryBlood = new Parse.Query(Blood);
      var queryUserData = new Parse.Query(UserData);

      var fullInstitution = {};

      var returnResult = $q.defer();

      queryUser.get(objectId, {
        success: function(user) {
          fullInstitution.user = user;

          queryInstitution.equalTo('userObjectId', objectId);
          queryInstitution.find({
            success: function(institution) {
              fullInstitution.institution = institution[0];

              queryBlood.equalTo('userObjectId', objectId);
              queryBlood.find({
                success: function(blood) {
                  fullInstitution.blood = blood;
                  queryUserData.equalTo('userObjectId', objectId);
                  queryUserData.find({
                    success: function(userdata) {
                      fullInstitution.userData = userdata;
                      returnResult.resolve(fullInstitution);
                    },
                    error: function(error) {
                      console.log(error);
                      returnResult.reject(error);
                    }
                  });
                },
                error: function(result, error) {
                  console.log(error);
                  returnResult.reject(error);
                }
              });
            },
            error: function(result, error) {
              console.log(error);
              returnResult.reject(error);
            }
          });
        },
        error: function(result, error) {
          console.log(error);
          returnResult.reject(error);
        }
      });
      return returnResult.promise;
    };
    return {
      join: join
    };

  }]);
