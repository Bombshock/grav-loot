/*global angular*/
/*global _*/

(function () {
  'use strict';

  angular.module("app").service("lootTables", lootTablesService);

  lootTablesService.$inject = ["$http", "$timeout", "$q"];

  function lootTablesService($http, $timeout, $q) {
    var lootTables = {};
    var deferred = $q.defer();

    lootTables.$promise = deferred.promise;

    $http.get('grav-settings/DefaultDataObject_LootTables.ini')
      .success(function (result) {
        $timeout(function () {
          lootTables.data = parseIni(result);
          lootTables.loots = extractLoots(lootTables.data);
          lootTables.lootsIndexed = indexLoots(lootTables.loots);
          lootTables.mobs = extractMobs(lootTables.data);
          lootTables.mobsGrouped = groupMobs(lootTables.mobs);
          lootTables.mobsGroupedArray = groupMobAsArray(lootTables.mobsGrouped);
          deferred.resolve(lootTables);
        }, 1000);
      })
      .catch(function (err) {
        console.error(err);
        deferred.reject(err);
      });

    lootTables.getLootFromObject = getLootFromObject;

    return lootTables;
  }

  function indexLoots(loots) {
    var indexed = {};
    var keys = Object.keys(loots).filter(function (key) {
      return loots.hasOwnProperty(key);
    });

    keys.forEach(function (key) {
      var obj = loots[key];
      getLootFromObject(obj, indexed);
    });
    return indexed;
  }

  function getLootFromObject(obj, output) {
    output = output || {};
    if (obj.hasOwnProperty("DroppedBlueprintData")) {
      obj.DroppedBlueprintData.forEach(function (bpData) {
        var bps = Object.keys(bpData.DroppedBlueprints).map(function (bp) {
          return bp.replace(/"/g, "");
        });
        bps.forEach(function (bp) {
          var data = angular.copy(bpData);
          delete data.DroppedBlueprints;
          output[bp] = output[bp] || [];
          output[bp].push(data);
        });
      });
    }
    return output;
  }

  function groupMobs(mobs) {
    return _.groupBy(mobs, function (item) {
      return item.name + "-" + item.type;
    });
  }

  function groupMobAsArray(mobsGrouped) {
    var mobsGroupedArray = [];
    for (var key in mobsGrouped) {
      if (mobsGrouped.hasOwnProperty(key)) {
        var group = {};
        for (var i = 0; i < mobsGrouped[key].length; i++) {
          var mob = mobsGrouped[key][i];
          group.name = mob.name;
          group.type = mob.type;
          group.sizes = group.sizes || [];
          group.sizes.push(angular.extend({size: mob.size}, mob));
          group.url = group.name + '-' + group.type;
          group.$parent = key;
        }
        mobsGroupedArray.push(group);
      }
    }
    return mobsGroupedArray;
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
      var match = name.match(/CAGPawn_([a-z0-9]*)_([a-z0-9]*)(_([a-z0-9]*))*/i);
      var type = match[1];
      return {
        $origin: key,
        $type: type,
        $size: match[3] ? match[3] : '',
        type: type.toLowerCase(),
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
        out[section][key] = out[section][key] || [];

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