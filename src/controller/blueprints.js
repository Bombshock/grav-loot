(function () {
  'use strict';

  angular.module("app").controller("BlueprintsViewController", BlueprintsViewController);

  BlueprintsViewController.$inject = ["lootTables"];

  function BlueprintsViewController(lootTables) {
    var vm = this;
    vm.lootTables = lootTables;
    vm.searchText = "";
  }

})();