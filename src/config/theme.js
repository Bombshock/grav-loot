/*global angular*/

(function () {
  'use strict';

  angular.module("app").config(themeConfig);

  themeConfig.$inject = ["$mdThemingProvider"];

  function themeConfig($mdThemingProvider) {
    $mdThemingProvider.theme('default')
      .accentPalette('green')
      .primaryPalette('blue');

    $mdThemingProvider.setDefaultTheme('default');
  }

})();