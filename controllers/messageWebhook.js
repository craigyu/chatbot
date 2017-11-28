const messengerHelper = require('../helpers/fbHelper');
//const processMessage = require('../helpers/processMessage');

module.exports = function (req, res) {
    //let inquiry = {};
    if (req.body.object === 'page') {
        req.body.entry.forEach(function (entry) {
            let webhookEvent = entry.messaging[0];
            messengerHelper.parseEvent(webhookEvent);
        });
        res.status(200).send('EVENT_RECEIVED');
    }
};