angular.module('App', ['Kaltura.directives'])
  .controller('ctrl', function($scope) {
	$scope.kdp = false;
	$scope.$on("kalturaPlayerReady", function(event, kdp, id){
		$scope.$apply(function(){
			$scope.kdp = kdp;
		});
	});
	$scope.sendToPlayer = function(command){
		$scope.kdp.sendNotification(command);
	};
});

