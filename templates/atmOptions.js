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
			      text: "Select an option",
			      buttons: [
			        {
			          type: "postback",
			          title: "My location",
			          payload: "ATM_LOCATION_PAYLOAD"
			        },
			        {
			          type: "postback",
			          title: "Postal Code",
			          payload: "ACTION_ATM_POSTAL_CODE_PAYLOAD"
			        }
			      ]
			    }
			  };
        break;

        case 'line':
        	json = {type:'text', text: 'I have not learned how to do this yet, sorry!'};
        	break;
     	default:
     		json = 'Unknown platform';
		}
		return json;
	}
}
