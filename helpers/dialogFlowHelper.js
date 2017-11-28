const payloadHandler = require('./handlePayload');
const loginDetails = require('../credentials/tokens.json');
const API_AI_TOKEN = loginDetails['api_ai_atoken'];
const apiAiClient = require('apiai')(API_AI_TOKEN);


module.exports = (userId, message, platform) => {

    return new Promise((fulfill, reject) => {

        const apiaiSession = apiAiClient.textRequest(message, {sessionId: userId});

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

    }).then((response) => {
        console.log('response in dialog flow:', response);
        let action = response.content.result.action;
        let complete = !response.content.result.actionIncomplete;

        if (complete && action.endsWith("PAYLOAD")){
            const payloadRequest = {
                type: action,
                parameters: response.content.result.parameters,
                messages: [],
                senderId: userId,
                senderPlatform: platform
            };
            return payloadHandler(payloadRequest);
        } else {
            return new Promise((fulfill) => {
                let speechList = [];
                response.content.result.fulfillment.messages.forEach((response) => {
                    speechList.push({
                        type: 'text',
                        text: response.speech
                    });

                });
                fulfill({
                    status: 'ok',
                    messages: speechList
                });
            });
        }
    }).catch((err) => {
        console.log('err in dialogflow:', err.message);
        reject(err);
    });
};