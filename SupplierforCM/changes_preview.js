		//Load the fake lrep connector
		jQuery.sap.require("sap.ui.fl.FakeLrepConnector");
		jQuery.extend(sap.ui.fl.FakeLrepConnector.prototype, {
			create: function(oChange) {
				return Promise.resolve();
			},

			loadChanges: function() {
				var oResult = {
					"changes": [],
					"settings": {
						"isKeyUser": true,
						"isAtoAvailable": false,
						"isProductiveSystem": false
					}
				};

				//Get the content of the changes folder.
				var changesFolder = "/webapp/changes";
				var ajaxFilesPromises = [];

				return new Promise(function(resolve, reject) {
					$.ajax({
						url: window.location.origin + changesFolder,
						type: "GET",
						cache: false
					}).then(function(data) {
						//Get the content of all the changes files under the change directory
						if (typeof data === "string") {
							data = $('<div/>').html(data).text();
							data = JSON.parse(data);
						}

						var keyOfFilesArray = Object.keys(data)[0];
						var filesArray = data[keyOfFilesArray];

						$.each(filesArray, function(index, file) {
							ajaxFilesPromises.push(
								$.ajax({
									url: window.location.origin + changesFolder + "/" + file["Name"],
									type: "GET",
									cache: false
								}).then(function(changeContent) {
									return JSON.parse(changeContent);
								})
							);
						});
					}).always(function() {
						return Promise.all(ajaxFilesPromises).then(function(changesArray) {
							//changesArray holds the content of all change files from the project (empty array if no such files)
							//Sort the array by the creation timestamp of the changes
							changesArray.sort(function(change1, change2) {
								return new Date(change1.creation) - new Date(change2.creation);
							});
							oResult.changes = changesArray;
							var oLrepChange = {
								changes: oResult,
								componentClassName: "SupplierProject"
							};
							resolve(oLrepChange);
						});
					});
				});
			}
		});
		sap.ui.fl.FakeLrepConnector.enableFakeConnector();