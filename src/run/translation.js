/*global angular*/

(function () {
  'use strict';

  angular.module("app").run(translationRun);

  translationRun.$inject = ["$rootScope"];

  function translationRun($rootScope) {
    $rootScope.translation = window.glt.translations.en;
    $rootScope.fallbackTranslation = window.glt.translations.en;

    var secondLevelClasses = [
      "CIA_Weapon",
      "CIA_Equipment",
      "CIA_Ammo",
      "CIF_Trap",
      "CIF_Vehicle"
    ];

    $rootScope.translate = function (str) {
      return $rootScope.translation[str] || $rootScope.fallbackTranslation[str] || str;
    };

    $rootScope.translateType = function (key) {

      var str = key.split("_").shift();

      for (var i = 0; i < secondLevelClasses.length; i++) {
        var cls = secondLevelClasses[i];
        if(key.indexOf(cls) === 0){
          str = cls;
        }
      }

      return $rootScope.translate(str);
    };
  }

})();