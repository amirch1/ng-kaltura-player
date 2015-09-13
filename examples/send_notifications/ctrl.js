angular.module('App', ['Kaltura.directives'])
  .controller('ctrl', function($scope) {
	$scope.sendToPlayer = function(playerAPI, command){
		$scope[playerAPI].sendNotification(command);
	};
});

