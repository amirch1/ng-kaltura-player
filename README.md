# ng-kaltura-player
## Overview
A directive for [AngularJS](http://angularjs.org) for embedding the [Kaltura](http://www.kaltura.com) video player.<br/>
The directive supports basic embedding as well an API for controlling the player using notifications and events registration.<br/>
Player plugins can be configured as well.
## Setup
1. Download the directive file: ng-kaltura-player.js and add it to your HTML page:
<pre>
&lt;script src=&quot;ng-kaltura-player.js&quot;&gt;&lt;/script&gt;
</pre>
2. Inject the 'Kaltura.directives' namespace to your Angular application:
<pre>
angular.module('App', ['Kaltura.directives'])
</pre>
3. Use the directive in your HTML markup:
<pre>
&lt;kaltura-player width=&quot;640px&quot; height=&quot;320px&quot;&gt;&lt;/kaltura-player&gt;
</pre>
4. Explore the examples below to learn how to configure the player and use its API

## Usage

#### Attributes
* **width**: The player width. You can specify px for pixels or % for percentage
* **height**: The player height. You can specify px for pixels or % for percentage
* **pid**: Your Kaltura publisher ID.
* **uiconfid**: Your Kaltura player ID.
* **entryid**: The entry ID of the video to play.
* **flahvars**: A Kaltura player flashvars object listing player configuration and plugins.

#### Events
* **kalturaPlayerReady**: Dispatched by the directive to the $rootScope when the Kaltura player is ready to play:
<pre>
	$scope.$on("kalturaPlayerReady", function(event, kdp, id){
		// event: the event object
		// kdp: A reference to the Kaltura player that can be used with the Kaltura player API.
		// id: the player directive id attribute if specified.
	});
</pre>

## Examples
 * [Basic player](http://amirush.com/ng-kaltura-player/basic_player/index.html)
 * [Multiple players on the same page](http://amirush.com/ng-kaltura-player/multiple_players/index.html)
 * [Passing a Flashvar object for plugins configuration](http://amirush.com/ng-kaltura-player/pass_flashvar/index.html)
 * [Sending notifications to the player](http://amirush.com/ng-kaltura-player/send_notifications/index.html)
 * [Registering and un-registering to player events](http://amirush.com/ng-kaltura-player/player_events/index.html)