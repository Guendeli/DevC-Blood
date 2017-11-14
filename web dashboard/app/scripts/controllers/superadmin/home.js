'use strict';
/* global Parse */

angular.module('rscwbApp')
  .controller('SuperadminHomeCtrl', ['$scope',
    function ($scope) {
      $scope.checkUser();

      var getInstitutions = function() {
        var Institutions = Parse.Object.extend('User');
        var InstitutionData = Parse.Object.extend('InstitutionData');

        var queryData = new Parse.Query(InstitutionData);
        var query = new Parse.Query(Institutions);
        query.equalTo('type', 'admin');

        query.find({
          success: function(results) {
            $scope.institutions = [];
            for (var i = 0; i < results.length; i++) {
              queryData.equalTo('userObjectId', results[i].id);
              queryData.equalTo('isActive', true);
              queryData.find({
                success: function(user) {
                  if (user && user[0]) {
                    $scope.institutions.push(user[0]);
                    $scope.$apply();
                  }
                },
                error: function(user, error) {
                  console.log(error);
                }
              });
            }

            $scope.$apply();
          },

          error: function(error) {
            console.log(error);
          }
        });
      };

      getInstitutions();

      $scope.removeInstitution = function() {
        var InstitutionData = Parse.Object.extend('InstitutionData');
        var query = new Parse.Query(InstitutionData);

        query.get(this.institution.id,
        {
          success: function(instData) {
            instData.save({
              isActive: false
            },
            {
              success: function() {
                console.log('data updated');
                getInstitutions();
              },
              error: function(instData, error) {
                console.log(error);
              }
            });
          },
          error: function(inst, error) {
            console.log(error);
          }
        });
      };

      $scope.updateInstitution = function() {
        $scope.changeView('superadmin/edit/' + this.institution.get('userObjectId'));
      };

      $scope.addNewInstitution = function() {
        $scope.changeView('superadmin/edit');
      };

    }]);
