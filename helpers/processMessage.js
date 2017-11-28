const payloadHandler = require('./handlePayload');
// const messengerHelper = require('./messengerHelper');
// const lineHelper = require('./lineHelper');
const dialogFlowHelper = require('./dialogFlowHelper');
//const globalHelpers = require('./globalHelpers');

module.exports = (inquiry) => {
    const userId = inquiry.senderId;
    let promises;
    console.log('processMessage: ', inquiry);

    if (inquiry.payload === 'TEXT_MESSAGE_PAYLOAD'){
        promises = dialogFlowHelper(userId, inquiry.message, inquiry.senderPlatform, inquiry.replyToken);
    } else {
        let payloadRequest = {
          type: inquiry.payload,
          senderId: userId,
          parameters: inquiry.parameters,
          senderPlatform: inquiry.senderPlatform
        };
        promises = payloadHandler(payloadRequest);
    }


    Promise.resolve(promises).then((response) => {

        // this needs refactor, here for now:
        if (inquiry.senderPlatform === 'line') {
            const lineHelper = require('./lineHelper');
            //lineHelper.sendMessages(userId, response.messages);
            lineHelper.sendMessages(inquiry.replyToken, response.messages);
        } else {
            const messengerHelper = require('./fbHelper');
            messengerHelper.sendMessages(userId, response.messages);    
        }
    }).catch((err)=>{

        // needs refactor here for now:
        if (inquiry.senderPlatform === 'line') {
            console.log('in processMessage for line (err),', err);
            const lineHelper = require('./lineHelper');
            lineHelper.sendMessages(inquiry.replyToken, [{type: 'text', text: err.message}]);
        } else {
            const messengerHelper = require('./fbHelper');
            messengerHelper.sendMessages(userId, [{text: err.message}]);
        }
    });
};
