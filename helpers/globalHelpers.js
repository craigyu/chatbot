const loginDetails = require('../credentials/tokens.json');
const API_AI_TOKEN = loginDetails['api_ai_atoken'];
const FACEBOOK_ACCESS_TOKEN = loginDetails['facebook_atoken'];
const apiAiClient = require('apiai')(API_AI_TOKEN);
const rp = require('request-promise');

/*
sendTextMessage = (senderId, text) => {
    console.log('sendTextMessage()');
    console.log(text);
    rp({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: {access_token: FACEBOOK_ACCESS_TOKEN},
        method: 'POST',
        json: {
            recipient: {id: senderId},
            message: {text},
        },
        "sender_action": "typing_on"
    });
};
*/
module.exports = {
/*
    sendMessages: (senderId, text, i = 0) => {
        console.log('sendTextMessages()');
        return new Promise((fulfill, reject) => {
            rp({
                url: 'https://graph.facebook.com/v2.6/me/messages',
                qs: {access_token: FACEBOOK_ACCESS_TOKEN},
                method: 'POST',
                json: {
                    recipient: {id: senderId},
                    message: text[i],
                },
                "sender_action": "typing_on"
            }).then(function () {
                if(i++ < text.length - 1) {
                    module.exports.sendMessages(senderId, text, i);
                } else {
                    fulfill("OMG ITS DONE");
                }
            }).catch((error) => {
                reject(error);
            });
        });

    },
    // method to help send a text-based message back to facebook messenger

    sendTextMessage: (senderId, text) => {
        console.log('sendTextMessage()');
        return rp({
            url: 'https://graph.facebook.com/v2.6/me/messages',
            qs: {access_token: FACEBOOK_ACCESS_TOKEN},
            method: 'POST',
            json: {
                recipient: {id: senderId},
                message: {text},
            },
            "sender_action": "typing_on"
        })

    },

    sendLocationRequest: (senderId)=> {
        return rp({
            url: 'https://graph.facebook.com/v2.6/me/messages',
            qs: {access_token: FACEBOOK_ACCESS_TOKEN},
            method: 'POST',
            json: {
                recipient: {id: senderId},
                message: {
                    "text": "Please share your location",
                    "quick_replies":[{"content_type":"location"}]
                }
            }
        })
    },
*/
    // method to send a request to api.ai
    sendApiAiRequests: (senderId, message) => {
        console.log('sendApiAiRequests()');
        return new Promise((fulfill, reject) => {

            const apiaiSession = apiAiClient.textRequest(message, {sessionId: senderId});

            apiaiSession.on('response', (response) => {
                let callback = {
                    isErr: false,
                    content: response
                };

                fulfill(callback);
            });

            apiaiSession.on('error', (error) => {
                let callback = {
                    isErr: true,
                    content: error
                };

                reject(callback);
            });
            apiaiSession.end();
        })

        // apiaiSession.on('response', (response) => {
        //     console.log(response);
        //     let callback = {
        //         isErr: false,
        //         content: response
        //     };
        //
        //
        //     // if (response.result.action.startsWith("smalltalk.")) {
        //     //     result = response.result.fulfillment.messages;
        //     //     result.forEach((message) => {
        //     //         sendTextMessage(senderId, message.speech);
        //     //     })
        //     // }
        //
        //
        //
        //     return callback;
        //     // // for custom payloads
        //     // if (!response.result.fulfillment.speech && response.result.fulfillment.messages) {
        //     //     result = response.result.fulfillment.messages[0].payload;
        //     //     sendTextMessage(senderId, result);
        //     // }
        //     //
        //     // // for text replies
        //     // else {
        //     //
        //     //     console.log(response.result.fulfillment);
        //     //     result = response.result.fulfillment.messages;
        //     //     result.forEach((message) => {
        //     //         sendTextMessage(senderId, message.speech);
        //     //     });
        //     //
        //     // }
        //

    },


    // method to send a carousel back to messenger
/*
    sendCarousel: (senderId, theCarousel) => {
        console.log('in sendCarousl()');
        return rp({
            url: 'https://graph.facebook.com/v2.6/me/messages',
            qs: {access_token: FACEBOOK_ACCESS_TOKEN},
            method: 'POST',
            json: {
                recipient: {id: senderId},
                message: theCarousel
            },
            "sender_action": "typing_on"
        });
    },
*/

    // type: Type of Request
    // parameter: URL after the URI
    // query: queries needed for the link
    // body: if its a post call we need a body
    restRequest: (type, parameter, query, body) => {
        let options = {
            method: type,
            body: body,
            uri: 'http://35.184.3.105:8000/' + parameter,
            qs: query,
            headers: {
                'User-Agent': 'Request-Promise'
            },
            json: true // Automatically parses the JSON string in the response
        };

        return rp(options)
    },


    // returns back messages from a APi.ai response (array format)
    /*getMessages: (response) => {
        console.log(response);
        return response.content.result.fulfillment.messages;
    },*/

    getUserInfo: (senderId) => {
        console.log('in getUserInfo()');
        let options = {
            method: 'GET',
            uri: 'https://graph.facebook.com/v2.6/' + senderId + '?fields=first_name,last_name,profile_pic&access_token=' + FACEBOOK_ACCESS_TOKEN,
            json: true // Automatically parses the JSON string in the response
        };

        return rp(options)
    }
};
