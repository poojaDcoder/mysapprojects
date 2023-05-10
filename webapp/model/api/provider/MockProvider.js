// @ts-nocheck
/* eslint-disable @sap/ui5-jsdocs/no-jsdoc */
sap.ui.define(["sap/ui/base/Object"], function (UI5Object) {
	"use strict";

	var sMockdataPath = jQuery.sap.getModulePath("com.example.salesorderdemo") + "/model/api/mockdata/";

	var aDataSets = [
		
		"Sales"		
	];

	var oSimulateError = {
		getRequestSales: false
	};

	return UI5Object.extend("com.example.salesorderdemo.model.api.provider.MockProvider", {
		_iDelay: 1000,
		_oData: {},
		_oInitialDataLoadPromise: {},

		constructor: function () {
            this._sUserName = "DUMMY_USER";
			this._oInitialDataLoadPromise = Promise.all(this._getDataLoadPromises());
		},

		_getDataLoadPromises: function () {
			return aDataSets.map(
				function (sDataSet) {
					return new Promise(
						function (resolve) {
							$.getJSON(
								sMockdataPath + sDataSet + ".json",
								function (oJson) {
									this._oData[sDataSet] = oJson;
									resolve();
								}.bind(this)
							);
						}.bind(this)
					);
				}.bind(this)
			);
		},

		_onDataReady: function () {
			return new Promise(
				function (resolve) {
					this._oInitialDataLoadPromise.then(
						function () {
							setTimeout(
								function () {
									resolve();
								}.bind(this),
								this._iDelay
							);
						}.bind(this)
					);
				}.bind(this)
			);
		},
		getRequestSales:function(){
			var aRequestList;
			var oPromise = new Promise(
				function (resolve, reject) {
					this._onDataReady().then(
						function () { 	
								resolve(this._oData.Sales);							
						}.bind(this)
					);
				}.bind(this)
			);
			oPromise.abort = function () {};
			return oPromise;
		}
       
    });
});
