'use strict';
/* global Parse */

angular.module('rscwbApp')
  .controller('LoginCtrl', ['$rootScope', '$scope', '$cookieStore',
    function ($rootScope, $scope, $cookieStore) {
      $scope.checkUser();

      $scope.languages = [
      {
        name: 'English',
        value: 'en'
      },
      {
        name: 'Hrvatski',
        value: 'hr'
      },
      {
        name: 'Bosanski',
        value: 'bih'
      },
      {
        name: 'German',
        value: 'ger'
      }];
      $scope.language = $scope.languages[0];

      $scope.loginClicked = false;
      $scope.registerClicked = false;
      $scope.loginUser = {};

      $scope.error = {
        hasError: false,
        msg: '',
        show: function(msg) {
          this.hasError = true;
          this.msg = msg;
        }
      };

      var user = new Parse.User();

      $scope.onLoginClick = function () {
        Parse.User.logIn($scope.loginUser.username, $scope.loginUser.password, {
          success: function(user) {
            console.log('user logged in', user);
            $rootScope.currentUser = Parse.User.current();
            $cookieStore.put('currentUser', angular.toJson(Parse.User.current()));

            if ($rootScope.currentUser.get('type') === 'superadmin') {
              $scope.changeView('superadmin/home');
            } else if ($rootScope.currentUser.get('type') === 'admin') {
              $scope.changeView('institution/home');
            } else {
              Parse.User.logOut();
              $scope.error.show($scope.lang.youAreDonor);
              $scope.$apply();
            }

            $scope.$apply();
          },
          error: function(user, error) {
            console.log('error', error);
            $scope.error.show(error.message);
            $scope.$apply();
          }
        });
      };

      $scope.onRegisterClick = function() {
        user.signUp({
          username: $scope.loginUser.username,
          password: $scope.loginUser.password,
          type: 'superadmin'
        },
        {
          success: function(user) {
            console.log('user registered', user);
          },

          error: function(user, error) {
            console.log('error', error);
          }
        });
      };

    $scope.onForgotPassword = function() {
      Parse.User.requestPasswordReset($scope.loginUser.email, {
        success: function() {
          // Password reset request was sent successfully
          $scope.mailSent = true;
          $scope.$apply();
        },
        error: function(error) {
          // Show the error message somewhere
          $scope.error.show(error.message);
          $scope.$apply();
        }
      });
    };

    $scope.languageChanged = function() {
      $scope.loadTexts($scope.language.value);
    };

  }]);
