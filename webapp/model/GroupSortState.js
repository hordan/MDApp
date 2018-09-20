sap.ui.define([
	"sap/ui/base/Object",
	"sap/ui/model/Sorter"
], function (BaseObject, Sorter) {
	"use strict";

	return BaseObject.extend("project.MDGateway.model.GroupSortState", {

		constructor: function (oViewModel, fnGroupFunction) {
			this._oViewModel = oViewModel;
			this._fnGroupFunction = fnGroupFunction;
		},

		sort: function (sKey) {
			var sGroupedBy = this._oViewModel.getProperty("/groupBy");

			if (sGroupedBy !== "None") {
				this._oViewModel.setProperty("/groupBy", "None");
			}

			return [new Sorter(sKey, false)];
		},

		group: function (sKey) {
			var aSorters = [];

			if (sKey === "CustomerId") {
				this._oViewModel.setProperty("/sortBy", "CustomerId");

				aSorters.push(
					new Sorter("CustomerId", false,
						this._fnGroupFunction.bind(this))
				);
			} else if (sKey === "None") {
				this._oViewModel.setProperty("/sortBy", "FirstName");
			}

			return aSorters;
		}

	});
});