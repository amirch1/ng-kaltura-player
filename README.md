# ng-kaltura-player
## Overview
A directive for [AngularJS](http://angularjs.org) for embedding the [Kaltura](http://www.kaltura.com) video player.<br/>
The directive supports basic embedding as well an API for controlling the player using notifications and events registration.<br/>
Player plugins can be configured as well.
## Setup
1. Download the directive file: ng-kaltura-player.js and add it to your HTML page.
<pre>
<!doctype html>
<html ng-app="App">
  <head>
    <script src="angular.min.js"></script>
    <script src="ng-kaltura-player.js"></script>
  </head>
</html>
</pre>
##Examples
 * Basic player
 * Multiple players on the same page
 * Passing a Flashvar object for plugins configuration
 * Sending notifications to the player
 * Registering and un-registering to player events