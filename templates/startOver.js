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
			      text: "If you need more assistance, please click the button below to be redirected to the main menu!",
			      buttons: [
			        {
			          type: "postback",
			          title: "Start Over",
			          payload: "START_OVER_PAYLOAD"
			        }
			      ]
			    }
			  };
        break;

        case 'line':
        	json = {
					  type: "template",
					  altText: "Start over template",
					  template: {
				      type: "buttons",
				      title: "Thanks for using our service!",
				      text: "Would you like to start over?",
				      actions: [
			          {
			            type: "postback",
			            label: "Yes",
			            text: "Start Over",
			            data: "START_OVER_PAYLOAD"
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