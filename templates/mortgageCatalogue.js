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
			      template_type: "generic",
			      elements: [
			        {
			          title: "First-time Buyers",
			          image_url:"http://www.hsbc.ca/1/content/canada4/images/personal/mortgages/small_images_280x110px_option-13.jpg",
			          subtitle: "We will be glad to help",
			          buttons: [
			            {
			              type: "postback",
			              title: "Find out more",
			              payload: "FIRST_TIME_BUYER_PAYLOAD"
			            }
			          ]
			        },
			        {
			          title: "Moving Up Moving On",
			          image_url:"http://www.hsbc.ca/1/content/canada4/images/personal/mortgages/small_images_280x110px_option-15.jpg",
			          subtitle: "We will be glad to help",
			          buttons: [
			            {
			              type: "postback",
			              title: "Find out more",
			              payload: "BUY_NEXT_PAYLOAD"
			            }
			          ]
			        },
			        {
			          title: "New to Canada",
			          image_url:"http://www.hsbc.ca/1/content/canada4/images/personal/mortgages/small_images_280x110px_option-7.jpg",
			          subtitle: "We will be glad to help",
			          buttons: [
			            {
			              type: "postback",
			              title: "Find out more",
			              payload: "NEW_TO_CANADA_PAYLOAD"
			            }
			          ]
			        },
			        {
			          title: "Renew with HSBC",
			          image_url:"http://www.hsbc.ca/1/content/canada4/images/personal/mortgages/small_images_280x110px_option-10.jpg",
			          subtitle: "We will be glad to help",
			          buttons: [
			            {
			              type: "postback",
			              title: "Find out more",
			              payload: "RENEWAL_PAYLOAD"
			            }
			          ]
			        },
			        {
			          title: "Increase your HSBC mortgage",
			          image_url:"http://www.hsbc.ca/1/content/canada4/images/personal/mortgages/small_images_280x110px_option-2.jpg",
			          subtitle: "We will be glad to help",
			          buttons: [
			            {
			              type: "postback",
			              title: "Find out more",
			              payload: "REFINANCE_PAYLOAD"
			            }
			          ]
			        },{
			          title: "Switch to HSBC and save",
			          image_url:"http://www.hsbc.ca/1/content/canada4/images/personal/mortgages/small_images_280x110px_option-8.jpg",
			          subtitle: "We will be glad to help",
			          buttons: [
			            {
			              type: "postback",
			              title: "Find out more",
			              payload: "SWITCH_PAYLOAD"
			            }
			          ]
			        },{
			          title: "Protect the Ones You Love",
			          image_url:"http://www.hsbc.ca/1/content/canada4/images/personal/mortgages/small_images_280x110px_option-3.jpg",
			          subtitle: "We will be glad to help",
			          buttons: [
			            {
			              type: "postback",
			              title: "Find out more",
			              payload: "INSURANCE_PAYLOAD"
			            }
			          ]
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