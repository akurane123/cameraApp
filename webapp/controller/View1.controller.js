sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast",
	"sap/m/Dialog",
	"sap/m/Button",
	"sap/m/Input"
], function(Controller, MessageToast, Dialog, Button, Input) {
	"use strict";

	return Controller.extend("camCameraApp.controller.View1", {
		takePhoto: function() {
			var that = this;
			this.cameraDialog = new Dialog({
				title: "Click on Capture to take a Photo",
				beginButton: new sap.m.Button({
					text: "Click",
					press: function(oEvent) {
						that.imageVal = document.getElementById("player");
						that.cameraDialog.close();
					}
				}),
				content: [
					new sap.ui.core.HTML({
						content: "<video id='player' alt='camera' autoplay></video>"
					}),
					new sap.m.Input({
						placeholder: 'Please Enter Image Here',
						required: true
					})
				],
				endButton: new sap.m.Button({
					text: "Cancel",
					press: function() {
						that.cameraDialog.close();
					}
				})

			});

			this.getView().addDependent(this.cameraDialog);

			this.cameraDialog.open();

			this.cameraDialog.attachBeforeClose(this.setImage, this);

			var handleSuccess = function(stream) {
				player.srcObject = stream;
			}

			navigator.mediaDevices.getUserMedia({
				video: true
			}).then(handleSuccess);
		},
		setImage: function() {
		// take the image from live stream
		var myVbox = this.getView().byId("_image0");
		var items = myVbox.getItems();
		var snapId = 'pic-' + items.length;
		var textId = snapId + '-text';
		var imageVal = this.imageVal;
		
		var oCanvas = new sap.ui.core.HTML({
			content: "<canvas id='" +snapId+"'width='320px' height='320px' style='2px solid red'></canvas>"+"<label id='"+textId+"'>"+this.attachName+
			"</label>"
		});		
		myVbox.addItem(oCanvas);
		oCanvas.addEventDelegate({
			onAfterRendering: function(){
				var  snapShotCanvas = document.getElementById(snapId);
				var oContext = snapShotCanvas.getContext('2d');
				oContext.drawImage(imageVal, 0,0, snapShotCanvas.width, snapShotCanvas.height);
			}	
		});
		}
	});
});