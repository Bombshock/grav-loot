(function () {
  'use strict';

  angular.module("app").controller("DropsDetailsViewController", DropsDetailsViewController);

  DropsDetailsViewController.$inject = ["lootTables", "$state"];

  function DropsDetailsViewController(lootTables, $state) {
    var vm = this;
    var regex = {
      pawn: /CAGPawn_([a-z0-9]*)_([a-z0-9]*)(_([a-z0-9]*))*/i,
      foe: /Foe(_([a-z0-9]*))?/i,
      fauna: /Fauna(_([a-z0-9]*))?/i
    };

    vm.id = decodeURIComponent($state.params.id);
    vm.$state = $state;

    lootTables.$promise.then(function () {
      vm.item = lootTables.lootsIndexed[vm.id] || [];
      init(vm.item);
    });

    function init(drops) {
      for (var i = 0; i < drops.length; i++) {
        var drop = drops[i];
        var parent = drop.$parent;
        var match;
        drop.mob = false;
        drop.hasMob = false;
        drop.hasSiblings = drop.$siblings.length > 1;

        if (regex.pawn.test(parent)) {
          match = parent.match(regex.pawn);
          drop.hasMob = true;
          drop.mob = {
            explicit: true,
            type: match[1],
            name: match[2],
            size: match[4]
          };
        } else if (regex.foe.test(parent)) {
          match = parent.match(regex.foe);
          drop.hasMob = true;
          drop.mob = {
            explicit: false,
            type: 'Foe',
            name: 'Any',
            size: match[2] ? match[2] : 'normal'
          };
        } else if (regex.fauna.test(parent)) {
          match = parent.match(regex.fauna);
          drop.hasMob = true;
          drop.mob = {
            explicit: false,
            type: 'Fauna',
            name: 'Any',
            size: match[2] ? match[2] : 'normal'
          };
        }

      }
    }
  }

})();