(function() {
    'use strict';

    angular
        .module('Kaltura.directives')
        .directive('kalturaPlayer', kalturaPlayer);

    kalturaPlayer.$inject = ['$rootScope', 'kalturaPlayerConfig'];

    // @ngInject
    function kalturaPlayer($rootScope, kalturaPlayerConfig) {
        return {
            restrict: 'E',
            template: '<div id="kaltura_player_{{id}}" style="width:{{width}}; height:{{height}};' +
                'background-color: black"></div>',
            scope: {},
            compile: compile
        };

        function compile() {
            var options = kalturaPlayerConfig.getOptions();

            return {
                pre: appendScript(options),
                post: function postLink($scope, element, attributes) {
                    if (attributes.width) {
                        $scope.width = attributes.width;
                    }
                    if (attributes.height) {
                        $scope.height = attributes.height;
                    }
                    if (attributes.id) {
                        $scope.id = attributes.id;
                    }

                    if (!$scope.kdp) {
                        var intervalID = setInterval(function() {
                            if (typeof window.kWidget !== 'undefined') {
                                clearInterval(intervalID);
                                var target = attributes.id ? 'kaltura_player_' + attributes.id : 'kaltura_player_',
                                    flashvars = attributes.flashvars ? JSON.parse(attributes.flashvars) : {};

                                window.kWidget.embed({
                                    'targetId': target,
                                    'wid': '_' + options.pid,
                                    'uiconf_id': options.uiconfid,
                                    'flashvars': flashvars,
                                    'cache_st': Math.random(),
                                    'entry_id': attributes.entryid,
                                    'readyCallback': function(playerID) {
                                        $scope.kdp = document.getElementById(playerID);
                                        $rootScope.$broadcast('kalturaPlayerReady', $scope.kdp, attributes.id);
                                    }
                                });
                            }
                        },50);
                    }
                }
            };
        }

        function appendScript(options) {
            if (document.getElementById('kalturaLib') === null) {
                var s = document.createElement('script');
                s.src = 'http://cdnapi.kaltura.com/p/' + options.pid + '/sp/' + options.pid +
                    '/embedIframeJs/uiconf_id/' + options.uiconfid + '/partner_id/' + options.pid;
                s.id = 'kalturaLib';
                s.async = false;
                document.head.appendChild(s);
            }
        }
    }
})();
