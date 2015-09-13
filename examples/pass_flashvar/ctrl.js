angular.module('App', ['Kaltura.directives'])
  .controller('ctrl', function($scope) {
	$scope.flashvars={
		'titleLabel': {
			'plugin': true,
			"align": "left",
			"text": '{mediaProxy.entry.name}'
		},
		'share':{
			'plugin': true
		}
	};
});

