sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";
	var flpurl = "https://trackrequest-i322048sapdev.dispatcher.int.sap.hana.ondemand.com/webapp/test/flpSandbox.html?hc_reset#Demands-display";
	return Controller.extend("CSOSprintII.tiles.controller.TrackRequests", {
	onInit: function() {},
	onPress: function() {
		var navTargetUrl =  flpurl;
		window.open(navTargetUrl, "_self");

	}
	});

});