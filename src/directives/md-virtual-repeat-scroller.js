/*global angular*/

(function () {
  'use strict';

  var remeberedOffsets = {};

  angular.module("app").directive("mdVirtualRepeatScroller", mdVirtualRepeatScroller);

  mdVirtualRepeatScroller.$inject = ["$timeout"];

  function mdVirtualRepeatScroller($timeout) {
    return {
      restrict: 'C',
      require: '^mdVirtualRepeatContainer',
      link: function (scope, iElement, iAttrs, controller) {
        var id = controller.$element.attr('id');
        var element = iElement[0];

        $timeout(function () {
          element.scrollTop = remeberedOffsets[id] || 0;
        });

        iElement.on("scroll", remember);

        function remember() {
          remeberedOffsets[id] = element.scrollTop;
        }
      }
    };
  }

})();