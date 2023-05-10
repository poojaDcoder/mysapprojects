sap.ui.define([
	"./Base.controller",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
], function (BaseController, Filter, FilterOperator) {
	"use strict";

	return BaseController.extend("com.example.salesorderdemo.controller.Main", {
		onInit: function () {
			BaseController.prototype.onInit.call(this);

			this._oRouter.getRoute("main");
			this._fetchRequestSalesData(); //method called to search the data
			
		},
		
		_fetchRequestSalesData: function () {
			//debugger;
			if (this._oComponent._oBackendModelAPI) {
  
			  this._oComponent._oBackendModelAPI
				.getRequestSales()
				.then(this.onRequestLoaded.bind(this))
				.catch(this.onRequestLoadFailed.bind(this));
			}
		  },
		  onRequestLoaded: function () {
			this._postProcessInitialDataLoad(true);
		  },
  
		  onRequestLoadFailed: function (oResponse) {
			debugger;
			this._postProcessInitialDataLoad(false);
		  },
		  
		  _postProcessInitialDataLoad: function () {
			var aRequest =
			  this._oAppModel.getProperty("/REQ_SALESDATA") || [];
		  },
		
			  //Searchbar
			  onSearch: function (oEvent) {
				  var oTableSearchState = [],
					  sQuery = oEvent.getParameter("query");
	  
				  if (sQuery && sQuery.length > 0) {
					  oTableSearchState = [new Filter("Name", FilterOperator.Contains, sQuery)];
				  }
				  this.oProductsTable.getBinding("items").filter(oTableSearchState, "Application");
			  }

	});
});
