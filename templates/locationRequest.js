let json;
module.exports = {

	createJson: (platform) => {
		switch (platform) {
			case 'fb':
    		json =
    		{
				  text: "Please share your location",
				  quick_replies:[{"content_type":"location"}]
				}
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