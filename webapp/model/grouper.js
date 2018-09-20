sap.ui.define([], function () {
	"use strict";

	return {

		groupUnitNumber: function (oResourceBundle) {
			return function (oContext) {
				var iId = oContext.getProperty("CustomerId"),
					sKey,
					sText;

				if (iId <= 20) {
					sKey = "LE20";
					sText = oResourceBundle.getText("masterGroup1Header1");
				} else {
					sKey = "GT20";
					sText = oResourceBundle.getText("masterGroup1Header2");
				}

				return {
					key: sKey,
					text: sText
				};
			};
		}

	};
});