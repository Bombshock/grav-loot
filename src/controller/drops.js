(function () {
  'use strict';

  angular.module("app").controller("DropsViewController", DropsViewController);

  DropsViewController.$inject = ["lootTables", "$state", "$timeout"];

  function DropsViewController(lootTables, $state, $timeout) {
    var vm = this;
    vm.viewDetails = viewDetails;

    $timeout(function () {
      vm.lootTables = lootTables;
    }, 150);

    function viewDetails(bp) {
      $timeout(function () {
        $state.go("dropsDetails", {id: bp.__key});
      }, 0);
    }
  }

})();