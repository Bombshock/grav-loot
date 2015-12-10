(function () {
  'use strict';

  angular.module("app").controller("BlueprintsViewController", BlueprintsViewController);

  BlueprintsViewController.$inject = ["lootTables", "$state", "$timeout"];

  function BlueprintsViewController(lootTables, $state, $timeout) {
    var vm = this;
    vm.viewDetails = viewDetails;
    vm.lootTables = lootTables;

    function viewDetails(bp) {
      $timeout(function () {
        $state.go("blueprintsDetails", {id: bp.__key});
      }, 0);
    }
  }

})();