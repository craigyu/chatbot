let json;
module.exports = {

	createJson: (platform) => {
		switch (platform) {
			case 'fb':
    		json = {};
    		const key = "attachment";
    		json[key] = {
			    type: "template",
			    payload: {
			      template_type: "button",
			      text: "What kind of currency conversion would you like?",
			      buttons: [
			        {
			          type: "postback",
			          title: "Get Exchange Rates",
			          payload: "ACTION_EXCHANGE_RATE_PAYLOAD"
			        },
			        {
			          type: "postback",
			          title: "Do Conversion",
			          payload: "ACTION_CURRENCY_CONVERSION_PAYLOAD"
			        }
			      ]
			    }
			  };
        break;

        case 'line':
        	json = {
					  type: "template",
					  altText: "FX Rates Choices",
					  template: {
					    type: "buttons",
				      title: "Options",
				      text: "Please select",
				      actions: [
			          {
			            type: "postback",
			            label: "Get Exchange Rates",
			            text: "Get Exchange Rates",
			            data: "ACTION_EXCHANGE_RATE_PAYLOAD"
			          },
			          {
			            type: "postback",
			            label: "Do Conversion",
			            text: "Do Conversion",
			            data: "ACTION_CURRENCY_CONVERSION_PAYLOAD"
			          }
				      ]
					  }
					};
        	break;
     	default:
     		json = 'Unknown platform';
		}
		return json;
	}
}