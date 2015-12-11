(function () {
  'use strict';

  angular.module("app").controller("DropsViewController", DropsViewController);

  DropsViewController.$inject = ["lootTables", "$state", "$timeout"];

  function DropsViewController(lootTables, $state, $timeout) {
    var vm = this;
    vm.viewDetails = viewDetails;

    $timeout(function () {
      vm.lootTables = lootTables;
    }, 300);

    function viewDetails(drop) {
      $timeout(function () {
        $state.go("dropsDetails", {id: drop.keyOrigin});
      }, 0);
    }
  }

})();