sap.ui.controller("CSOSprintII.ext.controller.ListReportExt", {
	onInit: function() {
	 
	},
	onClickActionDemands1: function(oEvent) {
		
	},
	calculateSpend: function(a,b) {
		var c = a*b;
		return c;
	},
	calculateStatus: function(a) {
		if(!a || a.length === 0) {
			return 'New';
		}
		var flag = 0;
		var oModel = this.getView().getModel();
		$.each(a,function(x,y){
			var c = oModel.getProperty("/"+y);
			if(c.QuotedPrice && c.QuotedPrice !== 0) {
				flag = 1;
				return;
			}
		}
		);
		if(flag == 0) {
			return 'New';
		} else {
			return 'In Process';
		}
	}
});