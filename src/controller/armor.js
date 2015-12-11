(function () {
  'use strict';

  angular.module("app").controller("ArmorViewController", ArmorViewController);

  ArmorViewController.$inject = ["lootTables", "$state", "$timeout"];

  function ArmorViewController(lootTables, $state, $timeout) {
    var vm = this;

    vm.$state = $state;

    lootTables.$promise.then(function () {
      populate();
    });

    vm.lootTables = lootTables;

    vm.tiers = [
      {
        key: 'Wood',
        name: 'ARMOR_Wood',
        tier: 1
      },
      {
        key: 'Fossil',
        name: 'ARMOR_Fossil',
        tier: 2
      },
      {
        key: 'Ore',
        name: 'ARMOR_Ore',
        tier: 3
      },
      {
        key: 'Gem',
        name: 'ARMOR_Gem',
        tier: 4
      },
      {
        key: 'Plasma',
        name: 'ARMOR_Plasma',
        tier: 5
      },
      {
        key: 'Tundra',
        name: 'ARMOR_Tundra',
        tier: 6
      },
      {
        key: 'SunStone',
        name: 'ARMOR_SunStone',
        tier: 6
      },
      {
        key: 'ElementX',
        name: 'ARMOR_ElementX',
        tier: 7
      },
      {
        key: 'Magmanite',
        name: 'ARMOR_Magmanite',
        tier: 8
      },
      {
        key: 'NK',
        name: 'ARMOR_NK',
        tier: 9
      },
      {
        key: 'AlienTower',
        name: 'ARMOR_AlienTower',
        tier: 10
      }
    ];

    function populate() {
      for (var i = 0; i < vm.tiers.length; i++) {
        var tier = vm.tiers[i];
        tier.blueprints = [
          'CIA_Equipment_Head_' + tier.key,
          'CIA_Equipment_Shirt_' + tier.key,
          'CIA_Equipment_Gloves_' + tier.key,
          'CIA_Equipment_Legs_' + tier.key,
          'CIA_Equipment_Boots_' + tier.key
        ];

        tier.blueprints = tier.blueprints.map(resolveKey);
      }
    }

    function resolveKey(key) {
      return {
        data: lootTables.lootsIndexed[key],
        key: key,
        type: key.split("_").shift()
      };
    }
  }

})();