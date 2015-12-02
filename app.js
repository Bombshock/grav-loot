/*global angular*/
/*global _*/

(function () {
  'use strict';

  angular.module("app", ["ngMaterial"]);

  angular.module("app").controller("AppController", AppController);

  AppController.$inject = ["$scope", "$http", "$timeout"];

  function AppController($scope, $http, $timeout) {
    console.log("bootstrap");
    $http.get('grav-settings/DefaultDataObject_LootTables.ini')
      .success(function (result) {
        $timeout(function () {
          $scope.data = parseIni(result);
        }, 1000);
      })
      .catch(function (err) {
        console.error(err);
      });

    $scope.$watch("data", function (data) {
      $scope.loots = data ? extractLoots(data) || [] : [];
      console.log("$scope.loots %o", $scope.loots);
    });

    $scope.$watch("data", function (data) {
      var mobsGroupedArray = [];
      $scope.mobs = data ? extractMobs(data) || [] : [];
      $scope.mobsGrouped = _.groupBy($scope.mobs, function (item) {
        return item.name + "-" + item.type;
      });

      for (var key in $scope.mobsGrouped) {
        if ($scope.mobsGrouped.hasOwnProperty(key)) {
          var group = {};
          for (var i = 0; i < $scope.mobsGrouped[key].length; i++) {
            var mob = $scope.mobsGrouped[key][i];
            group.name = mob.name;
            group.type = mob.type;
            group.sizes = group.sizes || [];
            group.sizes.push(mob.size);
          }
          mobsGroupedArray.push(group);
        }
      }

      $scope.mobsGroupedArray = mobsGroupedArray;

      console.log("$scope.mobsGroupedArray %o", $scope.mobsGroupedArray);
    });
  }

  function extractMobs(data) {
    var keys = Object.keys(data);
    keys = keys.filter(data.hasOwnProperty.bind(data));
    keys = keys.filter(function (key) {
      return key.indexOf("CAGPawn") !== -1;
    });
    keys = keys.map(function (key) {
      var keySplit = key.split(" ");
      var name = keySplit.shift();
      var className = keySplit.shift();
      var match = name.match(/CAGPawn_([a-z0-9]*)_([a-z0-9]*)(_([a-z0-9]*))*/i);
      return {
        $class: className,
        $origin: key,
        type: match[1].toLowerCase(),
        name: match[2],
        size: match[4] ? match[4].toLowerCase() : 'normal'
      };
    });
    return keys;
  }

  function extractLoots(data) {
    var keys = Object.keys(data);
    var out = {};
    keys = keys.filter(data.hasOwnProperty.bind(data));
    keys = keys.filter(function (key) {
      return !!data[key].DroppedBlueprintData;
    });
    keys.forEach(function (key) {
      out[key] = data[key];
    });
    return out;
  }

  var regex = {
    param: /(\S*)=(.*)/,
    args: /^(\S*)=\((.*)\)$/,
    section: /\s*\[\s*([^\]]*)\s*\]\s*/,
    comment: /[;|#](.*)$/
  };

  function parseIni(ini) {
    ini = ini.replace(/\n\s*\n\s*\n/g, '\n\n');
    var out = {};
    var lines = ini.split(/\r\n|\r|\n/);
    var section, match;

    lines = lines.filter(function (line) {
      return !/^[#|;|\/\/]/.test(line.trim());
    });

    lines.forEach(function (line) {
      line = line.trim();
      line = line.replace(regex.comment, "");

      if (regex.section.test(line)) {
        match = line.match(regex.section);
        section = match[1];
        out[section] = {};
      } else if (section && regex.param.test(line)) {
        match = line.match(regex.param);
        var key = match[1];
        var value = match[2];
        out[section][key] = section[key] || [];

        value = parseArgs(value);
        out[section][key].push(value);
      }

    });

    return out;
  }

  function parseArgs(val) {
    val = val.replace(/^"/, "").replace(/"$/, "");
    var match = val.match(/\((.*)\)/);

    if (match) {
      var params = match[1];
      if (params) {
        var out = {};
        params = splitLow(params.trim());
        for (var i = 0; i < params.length; i++) {
          var param = params[i];
          var splitted = param.split("=");
          var key = splitted.shift();
          var res = splitted.join("=");
          out[key] = parseArgs(res);
        }
        return out;
      }
    }

    if (/[\d*\.\d*f|\d*]/.test(val)) {
      val = parseFloat(val);
    }

    return val;
  }

  function splitLow(str) {
    var open = 0;
    var soFar = "";
    var out = [];

    for (var i = 0; i < str.length; i++) {
      var char = str[i];
      if (char === "(") {
        open++;
        soFar += char;
      } else if (char === ")") {
        open--;
        soFar += char;
      } else if (char === ",") {
        if (open) {
          soFar += char;
        } else {
          out.push(soFar.trim());
          soFar = "";
        }
      } else {
        soFar += char;
      }
    }

    if (soFar) {
      out.push(soFar.trim());
    }

    return out;
  }

})();