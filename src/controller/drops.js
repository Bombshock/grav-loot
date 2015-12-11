(function () {
  'use strict';

  angular.module("app").controller("DropsViewController", DropsViewController);

  DropsViewController.$inject = ["lootTables", "$state", "$timeout"];

  function DropsViewController(lootTables, $state, $timeout) {
    var vm = this;
    vm.viewDetails = viewDetails;

    vm.lootTables = lootTables;

    function viewDetails(drop) {
      $timeout(function () {
        $state.go("dropsDetails", {id: drop.keyOrigin});
      }, 0);
    }
  }

})();