/*global angular*/

(function () {
  'use strict';

  angular.module("app").run(translationRun);

  translationRun.$inject = ["$rootScope"];

  function translationRun($rootScope) {
    $rootScope.translation = window.glt.translations.en;
    $rootScope.fallbackTranslation = window.glt.translations.en;

    $rootScope.translate = function (str) {
      return $rootScope.translation[str] || $rootScope.fallbackTranslation[str] || str;
    };
  }

})();