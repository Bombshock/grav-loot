(function () {
  'use strict';

  angular.module("app").controller("MobsDetailsViewController", MobsDetailsViewController);

  MobsDetailsViewController.$inject = ["lootTables", "$state"];

  function MobsDetailsViewController(lootTables, $state) {
    var vm = this;
    var id = $state.params.id;

    vm.$state = $state;

    lootTables.$promise.then(function () {
      lootTables.mobsGroupedArray.forEach(function (item) {
        if (item.url === id) {
          init(item);
        }
      });
    });

    function init(item) {
      console.log("lootTables %o", lootTables);

      vm.item = item;
      vm.loot = {};
      vm.pickedSize = item.sizes[0];

      for (var i = 0; i < item.sizes.length; i++) {
        handleOneSize(item.sizes[i]);
      }

    }

    function handleOneSize(size) {
      var keys = [];
      var loot = {};

      if (size.loot) {
        return;
      }

      keys.push(size.$origin);
      keys.push("LootTable_" + size.$type + (size.$size ? size.$size : "") + " CAGDataObject_LootTable");

      keys.forEach(function (key) {
        lootTables.getLootFromObject(lootTables.data[key], loot);
      });

      size.loot = loot;
      size.lootCounter = Object.keys(loot).length;
      size.lootArray = [];

      for(var key in size.loot){
        if(size.loot.hasOwnProperty(key)){
          size.lootArray.push({
            key: key,
            type: key.split("_").shift(),
            value: size.loot[key][0]
          });
        }
      }

      console.log("size.lootArray", size.lootArray);
    }
  }

})();