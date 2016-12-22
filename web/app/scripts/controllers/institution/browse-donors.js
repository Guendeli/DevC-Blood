'use strict';
/* global Parse */

angular.module('rscwbApp')
  .controller('InstitutionBrowseDonorsCtrl', ['$scope', 'joinTables',
    function ($scope, joinTables) {
      $scope.checkUser();

      var getDonors = function() {
        var Users = Parse.Object.extend('User');
        var query = new Parse.Query(Users);

        query.equalTo('type', 'donor');

        $scope.donors = [];

        query.find({
          success: function(donors) {
            for (var i = 0; i < donors.length; i++) {
              joinTables.join(donors[i].id).then(function(response) {
                if (response.userData) {
                  var UserDonation = Parse.Object.extend('UserDonation');
                  var queryDonation = new Parse.Query(UserDonation);
                  queryDonation.equalTo('userObjectId', response.userData[0].get('userObjectId'));

                  queryDonation.find({
                    success: function(donations) {
                      var achievement = 0;

                      if(donations.length > 14) {
                        achievement = 15;
                      } else {
                        if(donations.length > 9){
                          achievement = 10;
                        } else {
                          if(donations.length > 4){
                            achievement = 5;
                          } else {
                            if(donations.length > 0){
                              achievement = 1;
                            }
                          }
                        }
                      }
                      console.log(achievement);
                      $scope.donors.push({
                        userData: response.userData[0],
                        numberOfDonations: donations.length,
                        achievement: achievement
                      });
                      $scope.$apply();
                    },
                    error: function(donations, error) {
                      console.log(error);
                    }
                  });
                }
              });
            }
          },
          error: function(donors, error) {
            console.log(donors);
          }
        });
      };

      getDonors();

      $scope.onAddDonationClick = function(userId) {
        var currentUserID = $scope.currentUser.id;

        var UserDonation = Parse.Object.extend('UserDonation');
        var donation = new UserDonation();

        var UserData = Parse.Object.extend('UserData');
        var queryUserData = new Parse.Query(UserData);
        var bloodType = '';

        var InstitutionBlood = Parse.Object.extend('InstitutionBlood');
        var queryBlood = new Parse.Query(InstitutionBlood);

        queryUserData.equalTo('userObjectId', userId);

        queryUserData.find({
          success: function(resultType) {
            bloodType = resultType[0].get('bloodType');

            queryBlood.equalTo('userObjectId', currentUserID);
            queryBlood.equalTo('bloodType', bloodType);

            queryBlood.find({
              success: function(resultBlood) {
                resultBlood[0].save({'value': (parseInt(resultBlood[0].get('value'))+1)+'' }, {
                  success: function(result) {
                    console.log('blood added');
                    donation.save({userObjectId: userId, institutionObjectId: currentUserID, dateOfDonation: $scope.donationDate
                    },{
                      success: function(result) {
                        console.log('donation added');
                        getDonors();
                        $scope.$apply();
                      },
                      error: function(result, error) {
                        console.log(error);
                      }
                    });
                  },
                  error: function(result, error){
                    console.log(error);
                  }
                });
              },
              error: function(result, error){
                console.log(error);
              }
            });
          },
          error: function(result, error) {
            console.log(error);
          }
        });
      };
    }]);
