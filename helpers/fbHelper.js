const processMessage = require('./processMessage');
const loginDetails = require('../credentials/tokens.json');
const FACEBOOK_ACCESS_TOKEN = loginDetails['facebook_atoken'];
const rp = require('request-promise');

module.exports = {
    parseEvent: (event) => {
        console.log('event', event);
        console.log('event.postback', event.postback);

        let inquiry = {
            senderId: event.sender.id,
            senderPlatform: 'fb',
            payload: '',
            parameters: {},
            message: ''
        };

        if (event.message){
            //inquiry.payload = 'TEXT_MESSAGE_PAYLOAD';
            //inquiry.message = event.message.text;
            if (!event.message.attachments){
                inquiry.payload = 'TEXT_MESSAGE_PAYLOAD';
                inquiry.message = event.message.text;
            } else {
                inquiry.payload = 'ATM_LOCATION_RECEIVED_PAYLOAD';
                inquiry.parameters = {lat: event.message.attachments[0].payload.coordinates.lat, long: event.message.attachments[0].payload.coordinates.long};
            }
        } else if (event.postback){
            if (event.postback.payload.startsWith('ACTION')){
                inquiry.payload = 'TEXT_MESSAGE_PAYLOAD';
                inquiry.message = event.postback.payload;
            } else{
                inquiry.payload = event.postback.payload;
            }
        }
        processMessage(inquiry);
    },

    sendMessages: (userId, messages, i = 0) =>{
        return new Promise((fulfill, reject) => {
            console.log('messages[i].tpye:' + messages[i].type);
            switch(messages[i].type){
                case 'text':
                    messages[i] = {text: messages[i].text};
                    break;

                case 'template':
                    //messages[i] = require('../templates/fb/' + messages[i].text + '.json');
                    if (messages[i].json === 'Unknown platform') {
                        messages[i] = {text: "Sorry this feature is not supported!"};
                    } else {
                         messages[i] = messages[i].json;
                    }
                    break;
                    
                default:
                    messages[i] = {text: 'unexpected message type'};
                    break;

            }
            console.log('messages[i]:', messages[i]);
            rp({
                url: 'https://graph.facebook.com/v2.6/me/messages',
                qs: {access_token: FACEBOOK_ACCESS_TOKEN},
                method: 'POST',
                json: {
                    recipient: {id: userId},
                    message: messages[i],
                }
            }).then(function () {
                if(i++ < messages.length - 1) {
                    module.exports.sendMessages(userId, messages, i);
                } else {
                    fulfill("OMG ITS DONE");
                }
            }).catch((error) => {
                console.log('fbHelper() error:', error);

                reject(error);
            });
        });
    }
};