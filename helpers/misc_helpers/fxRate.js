const globalFunctions = require('../globalHelpers');


module.exports = {
    init: (senderId) => {
        let res = globalFunctions.sendApiAiRequests(senderId, "Get FX Rates");
        res.then((response) => {
            let res = response.content.result.fulfillment.messages;
            console.log(res);

            res.forEach((response) => {
                if (response.type === 4) {
                    globalFunctions.sendCarousel(senderId, response.payload);
                } else {
                    globalFunctions.sendTextMessage(senderId, response.speech);
                }
            });
        });
    },
    after: (senderId, call) => {
        let res = globalFunctions.sendApiAiRequests(senderId, call);
        res.then((response) => {
            let res = response.content.result.fulfillment.messages;
            console.log(res);
            res.forEach((response) => {
                if (response) {
                    globalFunctions.sendTextMessage(senderId, response.speech);
                }
            });

        });
    },
    parametersRetrieved: (currencyFrom, currencyTo, amountToConvert) => {
        let endpoint = '';
        if(amountToConvert) {
            endpoint = 'fxrates/amount'
        } else {
            endpoint = 'fxrates/compare'
        }
        let query = {
            srcCurrency: currencyFrom,
            dstCurrency: currencyTo,
            exchangeAmount: amountToConvert
        };
        return globalFunctions.restRequest('GET', endpoint, query);
    }
};
