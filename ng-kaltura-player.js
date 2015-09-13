var kalturaDirectivesModule = angular.module('Kaltura.directives', []);

kalturaDirectivesModule.directive('kalturaPlayer', ['$rootScope','$timeout', function($rootScope,$timeout) {
	return {

		restrict: 'E' ,
		template: '<div id="kaltura_player_{{id}}" style="width:{{width}}; height:{{height}}; background-color: black"></div>' ,
		scope: {
			api: '='
		} ,

		compile: function ( element , attributes ) {


			var linkFunction = function ( $scope , element , attributes ) {
				var embed = function () {
					if ( !$scope.kdp ) {
						var target = attributes.id ? "kaltura_player_" + attributes.id : "kaltura_player_";
						var flashvars = attributes.flashvars ? JSON.parse( attributes.flashvars ) : {};
						window.kWidget.embed( {
							"targetId": target ,
							"wid": "_" + attributes.pid ,
							"uiconf_id": attributes.uiconfid ,
							"flashvars": flashvars ,
							"cache_st": Math.random() ,
							"entry_id": attributes.entryid ,
							"readyCallback": function ( playerID ) {
								$scope.kdp = document.getElementById( playerID );
								$rootScope.$broadcast( 'kalturaPlayerReady' , attributes.api );
							}
						} );
					}
				};
				if ( document.getElementById( "kalturaLib" ) === null ) {
					var s = document.createElement( 'script' );
					var host = "http://cdnapi.kaltura.com";
					if ( attributes.host ) {
						host = attributes.host;
					}
					s.src = host + '/p/' + attributes.pid + '/sp/' + attributes.pid + '00/embedIframeJs/uiconf_id/' + attributes.uiconfid + '/partner_id/' + attributes.pid;
					s.id = "kalturaLib";
					s.async = false;
					$rootScope.kalturaLibLoading = true;
					$rootScope.kalturaPlayerQueue = [];
					s.onload = s.onreadystatechange = function () {
						$rootScope.kalturaLibLoading = false;
						embed();
						$rootScope.kalturaPlayerQueue.forEach( function ( delegate ) {
							delegate();
						} );
						delete $rootScope.kalturaPlayerQueue;
					};
					document.head.appendChild( s );
				} else {
					if ( $rootScope.kalturaLibLoading ) {
						$rootScope.kalturaPlayerQueue.push( embed );
					} else {
						embed();
					}
				}

				if ( attributes.width ) {
					$scope.width = attributes.width;
				}
				if ( attributes.height ) {
					$scope.height = attributes.height;
				}
				if ( attributes.id ) {
					$scope.id = attributes.id;
				}
				if ( attributes.api ) {
					$scope.api = {
						sendNotification: function ( val ) {
							$scope.kdp.sendNotification( val );
						} ,
						addEventListener: function ( eventName , callback ) {
							$scope.kdp.kBind( eventName , function ( data ) {
								callback( data );
							} );
						} ,
						removeEventListener: function ( eventName ) {
							$scope.kdp.kUnbind( eventName );
						}
					};
				}
			};
			return linkFunction;
		}
	}
}]);