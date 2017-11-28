const lineHelper = require('../helpers/lineHelper');
const loginDetails = require('../credentials/tokens.json');
const LINE_CHANNEL_SECRET = loginDetails['line_channelsecret'];
const rp = require('request-promise');
const crypto = require('crypto');

module.exports = function (req, res) {

    // let signature = req.get('X-LINE-Signature');
    // let body = req.body;
    // let hash = crypto.createHmac('SHA256', new Buffer(LINE_CHANNEL_SECRET, 'utf-8')).update(body).digest('base64');

    // if (hash !== signature) {
    //     console.log("Unauthorized request");
    //     return res.status(401).send('Wrong request signature');
    // }

    if (req.body.events[0].replyToken) {
    	let webhookEvent = req.body.events[0];
    	lineHelper.parseEvent(webhookEvent);
    	res.sendStatus(200);
    }
};