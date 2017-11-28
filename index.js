const PORT = 3000; // Don't change this or it will break deployment!

const env           = process.env.NODE_ENV || 'development';
const config        = require(__dirname + '/config.json')[env];
const https = require('https');
const http = require('http');
const fs = require('fs');

const express = require('express');
const bodyParser = require('body-parser');

const models        = require('./models');
const Sequelize     = require('sequelize');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MySQL Admin Panel
const nodeadmin = require('nodeadmin');
app.use(nodeadmin(app));

models.sequelize.sync().then(function() {

    if(env === 'production') {
        const https_options = {
            key: fs.readFileSync("/etc/letsencrypt/archive/teamhortons-api.ca/privkey1.pem"),
            cert: fs.readFileSync("/etc/letsencrypt/archive/teamhortons-api.ca/fullchain1.pem"),
            ca: fs.readFileSync("/etc/letsencrypt/archive/teamhortons-api.ca/chain1.pem")
        };

        https.createServer(https_options, app).listen(443);
        console.log("CREATED CHATBOT HTTPS SERVER");
        app.listen(PORT, function() {
            console.log('Prod webhook server is listening, port ' + PORT);
            console.log('This does not redirect to HTTPS');
        })
    } else {
        app.listen(PORT, function() {
            console.log('Dev webhook server is listening, port ' + PORT);
        })
    }

    //endpoints
    const healthCheck = function(req, res) { res.status(200).send("HSBC Chatbot says 'Hello World'!"); };
    const verificationController = require('./controllers/verification');
    const messageWebhookController = require('./controllers/messageWebhook');
    const lineWebhookController = require('./controllers/lineWebhook');

    app.get('/healthCheck', healthCheck);

    //verify
    app.get('/v1/facebook/message', verificationController);

    //process message
    app.post('/v1/facebook/message', messageWebhookController);

    //process message
    app.post('/lineWebhook', lineWebhookController);

});
