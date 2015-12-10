(function () {
  'use strict';

  angular.module("app").controller("MobsViewController", MobsViewController);

  MobsViewController.$inject = ["lootTables", "$state"];

  function MobsViewController(lootTables, $state) {
    var vm = this;
    vm.lootTables = lootTables;
    vm.searchText = "";
    vm.goToMob = goToMob;
    vm.genSizes = genSizes;

    function goToMob(mob) {
      $state.go("mobsDetails", {id: mob.url});
    }

    function genSizes(mob) {
      return mob.sizes
        .map(function (size) {
          return size.size;
        })
        .join(", ");
    }
  }

})();