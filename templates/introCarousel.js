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
			          title: "Ask us a question",
			          image_url:"http://www.hsbc.com/-/media/hsbc-com/newsroomassets/media-gallery/media-gallery-main-banner-560x420.jpg",
			          subtitle: "We will be glad to help",
			          buttons: [
			            {
			              type: "postback",
			              title: "Get FX Rates 💱",
			              payload: "FX_OPTIONS_PAYLOAD"
			            },
			            {
			              type: "postback",
			              title: "Nearest ATM📍",
			              payload: "ATM_PAYLOAD"
			            },
			            {
			              type: "postback",
			              title: "Appointment 🗒",
			              payload: "ACTION_APPOINTMENT_REQUEST_PAYLOAD"
			            }
			          ]
			        },
			        {
			          title: "Mortgages",
			          image_url: "http://www.hsbc.ca/1/content/canada4/images/personal/mortgages/masthead_options6_rateson.jpg",
			          subtitle: "Learn about our mortgage products",
			          buttons: [
			            {
			              type: "postback",
			              title: "Mortgage Calculator",
			              payload: "ACTION_MORTGAGE_CALCULATOR_PAYLOAD"
			            },
			            {
			              type: "postback",
			              title: "Mortgage Catalogue",
			              payload: "MORTGAGE_CATALOGUE_PAYLOAD"
			            },
			            {
			              type: "postback",
			              title: "Look Up a Term",
			              payload: "ACTION_DEFINITION_REQUEST_PAYLOAD"
			            }
			          ]
			        }
			      ]
			    }
			  };
        break;

        case 'line':
        	json = {
					  type: "template",
					  altText: "Intro Carousel for Line",
					  template: {
					      type: "image_carousel",
					      columns: [
					          {
					            imageUrl: "https://static.pexels.com/photos/34204/pexels-photo.jpg",
					            action: {
					              type: "postback",
					              label: "Get FX Rates",
					              data: "FX_OPTIONS_PAYLOAD"
					            }
					          },
					          {
					            imageUrl: "https://static.pexels.com/photos/159804/accountant-accounting-adviser-advisor-159804.jpeg",
					            action: {
					              type: "postback",
					              label: "Calculator",
					              data: "ACTION_MORTGAGE_CALCULATOR_PAYLOAD"
					            }
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