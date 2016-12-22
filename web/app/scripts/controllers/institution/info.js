'use strict';

angular.module('rscwbApp')
  .controller('InstitutionInfoCtrl', ['$scope','joinTables',
    function ($scope, joinTables) {
      $scope.checkUser();

      $scope.blood = [];
      $scope.institution = {};
      var values = [];
      var max = 0;

      joinTables.join($scope.currentUser.id).then(function(institution) {
        values = [];
        max = 0;

        $scope.institution = {
          name: institution.institution.get('name'),
          location: institution.institution.get('city'),
          description: institution.institution.get('description')
        };

        for(var i = 0; i < institution.blood.length; i++) {
          var att = institution.blood[i];

          values.push(att.get('value'));
          if(parseInt(att.get('value')) > max) {
            max = parseInt(att.get('value'));
          }

          $scope.blood[i] = { value: parseInt(att.get('value')), newvalue: parseInt(att.get('value'))/2, type: att.get('bloodType').slice(0, -1), super: att.get('bloodType').slice(-1) };
        }

        for(var i in values) {
          $scope.blood[i].height = values[i]/max*115;
        }
      }, function(error) {
        console.log(error);
      });

      $scope.onBloodChange = function(b) {
        if(b.newvalue < 0) {
          b.newvalue = 0;
          b.height = 0;
        }
        max = 0;
        values = [];
        for(var i in $scope.blood) {
          $scope.blood[i].value = $scope.blood[i].newvalue * 2;
          values.push($scope.blood[i].value);
          if($scope.blood[i].value > max) {
            max = $scope.blood[i].value;
          }
        }
        for(var i in values) {
          $scope.blood[i].height = values[i]/max*115;
        }
      };
      $scope.updateBloodValues = function() {
        joinTables.join($scope.currentUser.id).then(function(institution) {
          for(var i = 0; i < institution.blood.length; i++) {
            $scope.blood[i].value = $scope.blood[i].newvalue*2;
            institution.blood[i].save({
              value: $scope.blood[i].value + ''
            }, {
              success: function(result) {
                console.log('updated blood values', result);
              },
              error: function(result, error) {
                console.log(error);
              }
            });
          }
        });
      };

      $scope.updateInstitution = function() {
        joinTables.join($scope.currentUser.id).then(function(institution) {
          institution.institution.save({
            name: $scope.institution.name,
            city: $scope.institution.location,
            description: $scope.institution.description
          }, {
            success: function(result) {
              console.log('updated institute values', result);
            },
            error: function(result, error) {
              console.log(error);
            }
          });
        });
      };
  }]);
