angular.module('App', ['Kaltura.directives'])
  .controller('ctrl', function($scope, $timeout) {

	$scope.progress = "0.00 sec";
	$scope.apiID = null;

	$scope.flashvars={
		'autoPlay': true
	};

	$scope.$on("kalturaPlayerReady", function(event, api){
		$scope.apiID = api; // save the api identifier in a scope variable for later usage in the stopTracking function

		$scope[api].addEventListener("playerUpdatePlayhead", function(data){
			$timeout(function() { // use a timeout to update the DOM once the digest cycle is complete
				$scope.progress = data.toFixed(2) + " sec";
			});
		});
	});

	$scope.stopTracking = function(){
		$scope[$scope.apiID].removeEventListener("playerUpdatePlayhead");
	}
});

