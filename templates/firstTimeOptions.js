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
			      text: "For your reference 😉:",
			      buttons: [
			        {
			          type: "postback",
			          title: "What is down payment?",
			          payload: "ACTION_DEFINITIONS"
			        },
			        {
			          type: "postback",
			          title: "What is closing cost?",
			          payload: "ACTION_DEFINITIONS"
			        },
			        {
			          type: "postback",
			          title: "What is mortgage rate?",
			          payload: "ACTION_DEFINITIONS"
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
