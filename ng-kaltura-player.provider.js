(function() {
    'use strict';

    angular
        .module('Kaltura.directives')
        .provider('kalturaPlayerConfig', function() {
            var options = {};

            this.setOptions = function (pid, uiconfid) {
                options.pid = pid;
                options.uiconfid = uiconfid;
            };

            this.$get = function() {
                return {
                    getOptions: function () {
                        return options;
                    }
                };
            };
        });
})();
