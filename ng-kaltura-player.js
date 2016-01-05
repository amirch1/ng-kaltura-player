(function() {
    'use strict';

    angular
        .module('Kaltura.directives', [])
        .directive('kalturaPlayer', kalturaPlayer);

    kalturaPlayer.$inject = ['$rootScope'];

    // @ngInject
    function kalturaPlayer($rootScope) {
        return {
            restrict: 'E',
            template: '<div id="kaltura_player_{{id}}" style="width:{{width}}; height:{{height}};' +
                'background-color: black"></div>',
            scope: {},
            compile: compile
        };

        function compile($scope, element, attributes) {
            return {
                pre: function ($scope, element, attributes) {
                    if (document.getElementById('kalturaLib') === null) {
                        var s = document.createElement('script');
                        s.src = 'http://cdnapi.kaltura.com/p/' + attributes.pid + '/sp/' + attributes.pid +
                            '/embedIframeJs/uiconf_id/' + attributes.uiconfid + '/partner_id/' + attributes.pid;
                        s.id = 'kalturaLib';
                        s.async = false;
                        document.head.appendChild(s);
                    }
                },
                post: function ($scope, element, attributes) {
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
                                    'wid': '_' + attributes.pid,
                                    'uiconf_id': attributes.uiconfid,
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
    }
})();
