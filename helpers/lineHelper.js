const processMessage = require('./processMessage');
const loginDetails = require('../credentials/tokens.json');
const LINE_ACCESS_TOKEN = loginDetails['line_atoken'];
const rp = require('request-promise');

module.exports = {
    parseEvent: (event) => {

        console.log('line evt:', event);

        const inquiry = {
            senderId: event.source.userId,
            senderPlatform: 'line',
            replyToken: event.replyToken,
            payload: '',
            parameters: {},
            message: ''
        };

        if (event.type === 'message') {
           // console.log('THIS IS JUST MESSAGE');
            inquiry.payload = 'TEXT_MESSAGE_PAYLOAD';
            inquiry.message = event.message.text;

            if (event.message.type === 'location') {
                console.log('User shared location');
                inquiry.payload = "ATM_LOCATION_RECEIVED_PAYLOAD";
                inquiry.parameters = {
                    lat: event.message.latitude,
                    long: event.message.longitude
                }
            }

        } else if (event.type === 'postback'){
            if (event.postback.data.startsWith('ACTION')){
               inquiry.payload = 'TEXT_MESSAGE_PAYLOAD';
               inquiry.message = event.postback.data;
            } else {
                console.log('THIS IS A POSTBACK and NOT ACTION');
                inquiry.payload = event.postback.data;
            }
            //inquiry.message = event.postback.title;
            //inquiry.message = event.postback.label;

        }
        processMessage(inquiry);
    },

    sendMessages: (userId, messages) =>{
        console.log('messages:', messages);
        return new Promise((fulfill, reject) => {
            for (let i = 0; i < messages.length; i++){
                console.log('messages[i]', messages[i]);
                switch(messages[i].type){
                    case 'text':
                        break;

                    case 'template':
                       // messages[i] = require('../templates/line/' + messages[i].text + '.json');
                        console.log('in template');
                        // messages[i] = messages[i].json;
                        if (messages[i].json === 'Unknown platform') {
                            messages[i] = {type: "text", text: "Sorry this feature is not supported!"};
                        } else {
                            messages[i] = messages[i].json;
                        }
                        break;

                    default:
                        messages[i].text = 'unexpected message type';
                        break;
                }
            }

            rp({
                url: 'https://api.line.me/v2/bot/message/reply',
                header: 'application/json',
                auth: { 'bearer': LINE_ACCESS_TOKEN},
                method: 'POST',
                json: {
                    "replyToken": userId,
                    "messages": messages
                    // "messages": [
                    // {
                    //     "type": "text",
                    //     "text": messages[i].text
                    // }
                    // ]
                    // "messages": [introCarouselLine]
                }
            }).catch((error) => {
                /* sometimes invalid format returns different err format */
                console.log('lineHelper() error:', error);
                //console.log('lineHelper() error.details.message: ', error.details.message);
                reject(error);
            });
        });
    }
};