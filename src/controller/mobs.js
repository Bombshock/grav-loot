(function () {
  'use strict';

  angular.module("app").controller("MobsViewController", MobsViewController);

  MobsViewController.$inject = ["lootTables", "$state", "$timeout"];

  function MobsViewController(lootTables, $state, $timeout) {
    var vm = this;
    vm.searchText = "";
    vm.goToMob = goToMob;
    vm.genSizes = genSizes;

    vm.lootTables = lootTables;

    function goToMob(mob) {
      $timeout(function () {
        $state.go("mobsDetails", {id: mob.url});
      }, 0);
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