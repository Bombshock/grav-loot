this["$$jst"] = this["$$jst"] || {};

this["$$jst"]["src/templates/blueprints.details.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<md-content flex layout="column" ng-show="vm.item">\r\n    <div class="md-toolbar-tools" layout="row">\r\n        <md-button aria-label="zurück" class="md-icon-button" ng-click="vm.$state.go(\'blueprints\')">\r\n            <md-icon class="fa fa-angle-left"></md-icon>\r\n        </md-button>\r\n\r\n        <h2>\r\n            BluePrints\r\n            - {{vm.id}}\r\n        </h2>\r\n    </div>\r\n\r\n    <md-divider></md-divider>\r\n\r\n    <md-list>\r\n        <md-list-item ng-repeat="drop in vm.item" layout="column">\r\n            <h3>{{drop.$parent}}</h3>\r\n            <p></p>\r\n        </md-list-item>\r\n    </md-list>\r\n\r\n</md-content>\r\n<md-content class="md-padding" layout="column" layout-align="center center" flex ng-show="!vm.item">\r\n    <div layout="row" layout-sm="column" layout-align="space-around">\r\n        <md-progress-circular md-mode="indeterminate" md-diameter="150"></md-progress-circular>\r\n    </div>\r\n</md-content>';

}
return __p
};

this["$$jst"]["src/templates/blueprints.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<md-content flex layout="column" ng-init="$root.searchTextBPsOffset = $root.searchTextBPsOffset || 0;">\r\n    <div layout="row">\r\n        <md-input-container flex style="margin: 30px 18px 0;">\r\n            <label>Search</label>\r\n            <input ng-model="$root.searchTextBPs">\r\n        </md-input-container>\r\n    </div>\r\n\r\n    <md-divider></md-divider>\r\n\r\n    <md-content flex ng-show="vm.lootTables.data" layout="row">\r\n\r\n        <md-virtual-repeat-container id="vertical-container" flex>\r\n            <md-list>\r\n                <md-list-item class="md-3-line blueprint-list-item"\r\n                              md-virtual-repeat="item in vm.lootTables.lootsArray | filter:$root.searchTextBPs | orderBy:\'__key\'"\r\n                              md-item-size="88"\r\n                              ng-click="vm.viewDetails(item)">\r\n                    <div class="md-list-item-text" layout="row">\r\n                        <h3>{{ item.__key }}</h3>\r\n                    </div>\r\n                    <md-divider ng-if="!$last"></md-divider>\r\n                </md-list-item>\r\n            </md-list>\r\n        </md-virtual-repeat-container>\r\n\r\n    </md-content>\r\n\r\n    <md-content class="md-padding" layout="column" layout-align="center center" flex ng-show="!vm.lootTables.data">\r\n        <div layout="row" layout-sm="column" layout-align="space-around">\r\n            <md-progress-circular md-mode="indeterminate" md-diameter="150"></md-progress-circular>\r\n        </div>\r\n    </md-content>\r\n</md-content>';

}
return __p
};

this["$$jst"]["src/templates/mobs.details.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<md-content flex layout="column" ng-show="vm.item">\r\n    <div class="md-toolbar-tools" layout="row">\r\n        <md-button aria-label="zurück" class="md-icon-button" ng-click="vm.$state.go(\'mobs\')">\r\n            <md-icon class="fa fa-angle-left"></md-icon>\r\n        </md-button>\r\n\r\n        <h2>\r\n            Mobs\r\n            - {{vm.item.name}} ({{vm.item.type}})\r\n        </h2>\r\n    </div>\r\n\r\n    <md-divider></md-divider>\r\n\r\n    <md-tabs md-border-bottom flex layout="column" md-selected="vm.selectedTab">\r\n        <md-tab label="{{size.size}} ({{size.lootCounter}})" flex layout="column" ng-repeat="size in vm.item.sizes">\r\n            <md-content id="editor" flex layout="column">\r\n\r\n                <md-list>\r\n                    <md-list-item ng-repeat-start="(key, value) in size.loot">\r\n                        <p>{{key}}</p>\r\n                    </md-list-item>\r\n                    <md-divider ng-repeat-end ng-if="!$last"></md-divider>\r\n                </md-list>\r\n\r\n            </md-content>\r\n        </md-tab>\r\n    </md-tabs>\r\n\r\n</md-content>\r\n<md-content class="md-padding" layout="column" layout-align="center center" flex ng-show="!vm.item">\r\n    <div layout="row" layout-sm="column" layout-align="space-around">\r\n        <md-progress-circular md-mode="indeterminate" md-diameter="150"></md-progress-circular>\r\n    </div>\r\n</md-content>';

}
return __p
};

this["$$jst"]["src/templates/mobs.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<md-content flex layout="column">\r\n    <div layout="row">\r\n        <md-input-container flex style="margin: 30px 18px 0;">\r\n            <label>Search</label>\r\n            <input ng-model="$root.searchTextMobs">\r\n        </md-input-container>\r\n    </div>\r\n\r\n    <md-divider></md-divider>\r\n\r\n    <md-content flex ng-show="vm.lootTables.mobsGroupedArray.length">\r\n        <md-list>\r\n            <md-list-item class="md-3-line"\r\n                          ng-repeat-start="mobGroup in vm.lootTables.mobsGroupedArray | filter:$root.searchTextMobs | orderBy:[\'name\', \'type\']"\r\n                          ng-click="vm.goToMob(mobGroup)">\r\n                <div class="md-list-item-text" layout="row">\r\n                    <div flex="70" layout="column">\r\n                        <h3>{{ mobGroup.name }}</h3>\r\n                        <h4>{{ mobGroup.type }}</h4>\r\n                    </div>\r\n                    <span flex></span>\r\n\r\n                    <p>{{ vm.genSizes(mobGroup) }}</p>\r\n                </div>\r\n            </md-list-item>\r\n            <md-divider ng-repeat-end ng-if="!$last"></md-divider>\r\n        </md-list>\r\n    </md-content>\r\n\r\n    <md-content class="md-padding" layout="column" layout-align="center center" flex\r\n                ng-show="!vm.lootTables.mobsGroupedArray.length">\r\n        <div layout="row" layout-sm="column" layout-align="space-around">\r\n            <md-progress-circular md-mode="indeterminate" md-diameter="150"></md-progress-circular>\r\n        </div>\r\n    </md-content>\r\n</md-content>';

}
return __p
};