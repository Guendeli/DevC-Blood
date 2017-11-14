'use strict';
/* global Parse */
/* global $ */

angular.module('rscwbApp')
  .controller('InstitutionPushNotificationCtrl', ['$scope',
    function ($scope) {
      $scope.checkUser();

      $scope.error = {
        hasError: false,
        msg: $scope.lang.notificationSent
      };

      $scope.notificationInfo = {};

      var select2 = $('#bloodtypes').select2();
      
      
      $scope.pushNotification = function() {
        console.log(select2.val());
        $onesignal.post('notifications', {
              app_id: 'fe297931-fa76-4688-968d-cd6443131ef1',
              contents: {en: 'Hi!'},
              included_segments: ["All"]
          }, function (data) {
              console.log(data);
          });
          
        var Events = Parse.Object.extend('Events');
        var events = new Events();

        events.save({
          name: $scope.notificationInfo.name,
          time: $scope.notificationInfo.time,
          location: $scope.notificationInfo.location
        },
        {
          success: function(event) {
            console.log('new event created');
            $scope.notificationInfo.name = '';
            $scope.notificationInfo.time = '';
            $scope.notificationInfo.location = '';

            $scope.error.hasError = true;
            $scope.$apply();
            setTimeout(function() {
              $scope.error.hasError = false;
              $scope.$apply();
            }, 2000);           

          },
          error: function(event, error) {
            console.log(error);
          }
        });

      };
    }]);
