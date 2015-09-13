angular.module('App', ['Kaltura.directives'])
  .controller('KalturaPlayerCtrl', function($scope, $timeout) {
	$scope.flashvars={
		'titleLabel': {
			'plugin': true,
			"align": "left",
			"text": '{mediaProxy.entry.name}'
		}
	};
	$scope.sendToPlayer = function(playerAPI, command){
		$scope[playerAPI].sendNotification(command);
	};

	$scope.progress = "0.00 sec";
	$scope.$on("kalturaPlayerReady", function(event, api){
		$scope[api].addEventListener("playerUpdatePlayhead", function(data){
			$timeout(function() {
				$scope.progress = data.toFixed(2) + " sec";
			});
		})
	});

  });

