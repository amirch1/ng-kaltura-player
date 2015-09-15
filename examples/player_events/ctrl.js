angular.module('App', ['Kaltura.directives'])
  .controller('ctrl', function($scope, $timeout) {

	$scope.progress = "0.00 sec";
	$scope.kdp = null;

	$scope.flashvars={
		'autoPlay': true
	};

	$scope.$on("kalturaPlayerReady", function(event, kdp, id){
		$scope.kdp = kdp; // save the player reference identifier in a scope variable for later usage in the stopTracking function

		$scope.kdp.kBind("playerUpdatePlayhead", function(data){
			$timeout(function() { // use a timeout to update the DOM once the digest cycle is complete
				$scope.progress = data.toFixed(2) + " sec";
			});
		});
	});

	$scope.stopTracking = function(){
		$scope.kdp.kUnbind("playerUpdatePlayhead");
	}
});

