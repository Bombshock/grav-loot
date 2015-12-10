/*global angular*/

(function () {
  'use strict';

  angular.module("app").run(packageRun);

  packageRun.$inject = ["$http", "$rootScope"];

  function packageRun($http, $rootScope) {
    $http.get('package.json').success(function (packageJson) {
      $rootScope.packageJson = packageJson;
    });
  }

})();