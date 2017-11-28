let json;
module.exports = {

	createJson: (results, platform) => {
		switch (platform) {
			case 'fb':
    		json = {};
    		const key = "attachment";
    		json[key] = {
					type: "template",
					payload: {
						template_type: "list",
						top_element_style: "compact",
						elements: [
							{
								title: results[1].location.name + " - " + results[1].location.distance + " away",
								subtitle: results[1].location.address.postalAddress + " " + results[1].location.address.city + " " + results[1].location.address.province + " " + results[1].location.address.postalCode,
							},
							{
								title: results[2].location.name + " - " + results[2].location.distance + " away",
								subtitle: results[2].location.address.postalAddress + " " + results[2].location.address.city + " " + results[2].location.address.province + " " + results[2].location.address.postalCode
							},
							{
								title: results[3].location.name + " - " + results[3].location.distance + " away",
								subtitle: results[3].location.address.postalAddress + " " + results[3].location.address.city + " " + results[3].location.address.province + " " + results[3].location.address.postalCode
							}
						]
						}
					}
        break;

     //    case 'line':
     //    	json = {
					//   type: "template",
					//   altText: "this is a carousel template",
					//   template: {
				 //      type: "carousel",
				 //      columns: [
			  //         {
			  //           title: results[1].location.name,
			  //           text: results[1].location.distance + " away - " + results[1].location.address.postalAddress + " " + results[1].location.address.city + " " + results[1].location.address.province + " " + results[1].location.address.postalCode,
			  //           action: {
			  //           	type: "postback",
			  //           	label: "Get Location",
			  //           	data: "START_OVER_PAYLOAD"
			  //           }
			  //         },
			  //         {
			  //           title: results[2].location.name,
			  //           text: results[2].location.distance + " away - " + results[2].location.address.postalAddress + " " + results[2].location.address.city + " " + results[2].location.address.province + " " + results[2].location.address.postalCode,
			  //           action: {
			  //           	type: "postback",
			  //           	label: "Get Location",
			  //           	data: "START_OVER_PAYLOAD"
			  //           }
			  //         },
			  //         {
			  //           title: results[3].location.name,
			  //           text: results[3].location.distance + " away - " + results[3].location.address.postalAddress + " " + results[3].location.address.city + " " + results[3].location.address.province + " " + results[3].location.address.postalCode,
			  //           action: {
			  //           	type: "postback",
			  //           	label: "Get Location",
			  //           	data: "START_OVER_PAYLOAD"
		   //          	}
			  //         }
				 //      ]
					//   }
					// };

     //    	break;
     	default:
     		json = 'Unknown platform';
		}
		return json;
	}
}