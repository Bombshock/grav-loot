(function () {
  'use strict';

  angular.module("app").controller("BlueprintsDetailsViewController", BlueprintsDetailsViewController);

  BlueprintsDetailsViewController.$inject = ["lootTables", "$state"];

  function BlueprintsDetailsViewController(lootTables, $state) {
    var vm = this;

    vm.id = $state.params.id;
    vm.$state = $state;

    lootTables.$promise.then(function () {
      vm.item = lootTables.lootsIndexed[vm.id];
    });
  }

})();