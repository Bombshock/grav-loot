/*global angular*/

(function () {
  'use strict';

  angular.module("app").config(routesConfig);

  routesConfig.$inject = ["$urlRouterProvider", "$stateProvider"];

  function routesConfig($urlRouterProvider, $stateProvider) {
    $urlRouterProvider.otherwise("/drops");

    $stateProvider.state("mobs", {
      url: "/mobs",
      templateUrl: "src/templates/mobs.html",
      controller: "MobsViewController",
      controllerAs: "vm"
    });

    $stateProvider.state("mobsDetails", {
      url: "/mobs/:id",
      templateUrl: "src/templates/mobs.details.html",
      controller: "MobsDetailsViewController",
      controllerAs: "vm"
    });

    $stateProvider.state("drops", {
      url: "/drops",
      templateUrl: "src/templates/drops.html",
      controller: "DropsViewController",
      controllerAs: "vm"
    });

    $stateProvider.state("dropsDetails", {
      url: "/drops/:id",
      templateUrl: "src/templates/drops.details.html",
      controller: "DropsDetailsViewController",
      controllerAs: "vm"
    });

    $stateProvider.state("armor", {
      url: "/armor",
      templateUrl: "src/templates/armor.html",
      controller: "ArmorViewController",
      controllerAs: "vm"
    });

    $stateProvider.state("about", {
      url: "/about",
      templateUrl: "src/templates/about.html"
    });
  }

})();