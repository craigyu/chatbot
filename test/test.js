// Dummy test for setting up Jenkins
let assert = require('assert');
let globalFunctions = require('../helpers/globalHelpers');
let messengerHelper = require('../helpers/fbHelper');
//

describe('Array', function () {
    describe('#indexOf()', function () {
        it('should return -1 when the value is not present', function () {
            assert.equal(-1, [1, 2, 3].indexOf(4));
        });
    });
});

describe('MessengerHelper', function () {
    let event = {
        "object":"page",
            "entry":[
            {
                "id":"our_id",
                "time":1458692752478,
                "messaging":[
                    {
                        "sender":{
                            "id":"user_id"
                        },
                        "recipient":{
                            "id":"our_id"
                        },
                        "timestamp":1458692752478,
                        "message":{
                            "mid":"mid.1457764197618:41d102a3e1ae206a38",
                            "text":"hello, world!"
                        }
                    },
                    {
                        "sender":{
                            "id":"user_id"
                        },
                        "recipient":{
                            "id":"our_id"
                        },
                        "timestamp":1458692752478,
                        "postback":{
                            "title": "Mortgage Catalogues",
                            "payload": "MORTGAGE_CATALOGUE_PAYLOAD",
                        }
                    }
                ]
            }
        ]
    };
    event.entry.forEach(function (event) {
        event.messaging.forEach(function (event) {
            if (event) {
                messengerHelper.parseEvent(event);
            }
        });
    });
});

describe('FX Rates Compare API Calls:', () => {
    it('Valid inputs', (done) => {
        const query = {
            srcCurrency: "CAD",
            dstCurrency: "USD"
        };
        const callback = globalFunctions.restRequest("GET", "fxrates/compare", query);
        callback.then((response) => {
            assert.equal(response.srcCurrency, 'CAD');
            assert.equal(response.dstCurrency, 'USD');
            done();
        })
    });
});
/*
describe('FX Rates Compare API Calls:', () => {
    it('Invalid inputs', (done) => {
        const query = {
            srcCurrency: "123456",
            dstCurrency: "USD"
        };
        const callback = globalFunctions.restRequest("GET", "fxrates/compare", query);
        callback.then((response) => {
            assert.equal(response.statusCode, 400);
            done();
        }).catch((err) => {
            assert.equal(err.statusCode, 400);
            done();
        });
    });
});
*/
describe('FX Rates Amount API Calls:', () => {
    it('Valid inputs', (done) => {
        const query = {
            srcCurrency: "CAD",
            dstCurrency: "USD",
            exchangeAmount: 100
        };
        const callback = globalFunctions.restRequest("GET", "fxrates/amount", query);
        callback.then((response) => {
            assert.equal(response.srcCurrency, 'CAD');
            assert.equal(response.dstCurrency, 'USD');
            done();
        })
    });
});

describe('FX Rates Amount API Calls:', () => {
    it('Invalid inputs', (done) => {
        const query = {
            srcCurrency: "CAD",
            dstCurrency: "123456",
            exchangeAmount: 100
        };
        const callback = globalFunctions.restRequest("GET", "fxrates/amount", query);
        callback.then((response) => {
            assert.equal(response.statusCode, 400);
            done();
        }).catch((err) => {
            assert.equal(err.statusCode, 400);
            done();
        });
    });
});

describe('Definitions API Calls:', () => {
    it('Valid inputs', (done) => {
        const callback = globalFunctions.restRequest("GET", "api/definitions/closing_cost");
        callback.then((response) => {
            assert.equal(response.definition, 'Closing costs are the legal and administrative fees that all homebuyers are required/recommended to pay before and after the transaction is complete.');
            done();
        })
    });
});

describe('Definitions API Calls:', () => {
    it('Invalid inputs', (done) => {
        const callback = globalFunctions.restRequest("GET", "api/definitions/abc123");
        callback.then((response) => {
            assert.equal(response.statusCode, 400);
            done();
        }).catch((err) => {
            assert.equal(err.statusCode, 400);
            done();
        });
    });
});
