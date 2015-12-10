/*global angular*/

(function () {
  'use strict';

  angular.module("app").config(routesConfig);

  routesConfig.$inject = ["$urlRouterProvider", "$stateProvider"];

  function routesConfig($urlRouterProvider, $stateProvider) {
    $urlRouterProvider.otherwise("/mobs");

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

    $stateProvider.state("blueprints", {
      url: "/blueprints",
      templateUrl: "src/templates/blueprints.html",
      controller: "BlueprintsViewController",
      controllerAs: "vm"
    });

    $stateProvider.state("blueprintsDetails", {
      url: "/blueprints/:id",
      templateUrl: "src/templates/blueprints.details.html",
      controller: "BlueprintsDetailsViewController",
      controllerAs: "vm"
    });
  }

})();