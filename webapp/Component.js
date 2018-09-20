sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/Device",
	"project/MDApp/model/models",
	"project/MDApp/controller/ListSelector",
	"project/MDApp/controller/ErrorHandler"
], function (UIComponent, Device, models, ListSelector, ErrorHandler) {
	"use strict";

	return UIComponent.extend("project.MDApp.Component", {

		metadata: {
			manifest: "json"
		},

		init: function () {
			this.oListSelector = new ListSelector();
			this._oErrorHandler = new ErrorHandler(this);

			this.setModel(models.createDeviceModel(), "device");
			this.setModel(models.createFLPModel(), "FLP");

			UIComponent.prototype.init.apply(this, arguments);
			this.getRouter().initialize();
		},

		 destroy: function () {
		 	this.oListSelector.destroy();
		 	this._oErrorHandler.destroy();
		 	UIComponent.prototype.destroy.apply(this, arguments);
		 },

		getContentDensityClass: function () {
			if (this._sContentDensityClass === undefined) {
				// check whether FLP has already set the content density class; do nothing in this case
				if (jQuery(document.body).hasClass("sapUiSizeCozy") || jQuery(document.body).hasClass("sapUiSizeCompact")) {
					this._sContentDensityClass = "";
				} else if (!Device.support.touch) { // apply "compact" mode if touch is not supported
					this._sContentDensityClass = "sapUiSizeCompact";
				} else {
					// "cozy" in case of touch support; default for most sap.m controls, but needed for desktop-first controls like sap.ui.table.Table
					this._sContentDensityClass = "sapUiSizeCozy";
				}
			}
			return this._sContentDensityClass;
		}

	});

});