const globalFunctions = require('./globalHelpers');
const mortgageCalc = require('./mortgage_helpers/calculator');
const fxRate = require('./misc_helpers/fxRate');
const appointment = require('./misc_helpers/appointmentBooking');
const models = require('../models');
const ampData = require('../temp_data/apm.json');
const atmLocations = require('../templates/atmLocations.js');
const introCarousel = require('../templates/introCarousel.js');
const fxOptions = require('../templates/fxOptions.js');
const startOver = require('../templates/startOver.js');
const atmOptions = require('../templates/atmOptions.js');
const firstTimeOptions = require('../templates/firstTimeOptions.js');
const locationRequest = require('../templates/locationRequest.js');
const mortgageCatalogue = require('../templates/mortgageCatalogue.js');

module.exports = (request) => {
    return new Promise((fulfill, reject) => {
        console.log('request in handlePayload', request);
        let senderId = request.senderId;
        let params = request.parameters;
        let senderPlatform = request.senderPlatform;
        switch (request.type) {
//
//Mortgage catalogue payloads
            case 'MORTGAGE_CATALOGUE_PAYLOAD':
                fulfill({
                    status: 'ok',
                    messages: [
                        {type: 'text', text: 'HSBC offers a variety of mortgage products for different needs'},
                        {type: 'template', json: mortgageCatalogue.createJson(senderPlatform)}]
                });
                break;

            case 'FIRST_TIME_BUYER_PAYLOAD':
                fulfill({
                    status: 'ok',
                    messages: [
                        {type: 'text', text: 'We are glad to help!'},
                        {
                            type: 'text',
                            text: 'As a first-time home buyer, you should consider a few aspects, such as down payment, closing cost, and fixed or variable mortgage rate. Let me know if you would like to learn more about these terms'
                        },
                        {type: 'template', json: firstTimeOptions.createJson(senderPlatform)}]
                });
                break;

            case 'RENEWAL_PAYLOAD':
                fulfill({
                    status: 'ok',
                    messages: [
                        {type: 'text', text: 'We are glad to help!'},
                        {
                            type: 'text',
                            text: 'As a first-time home buyer, you should consider a few aspects, such as down payment, closing cost, and fixed or variable mortgage rate. Let me know if you would like to learn more about these terms'
                        },
                        {
                            type: 'text',
                            text: 'When you renew your mortgage, you’ll be asked to select a new term and type of mortgage. If your circumstances have changed, there may be a more appropriate solution for you.'
                        },
                        {type: 'text', text: 'Renewing early is one way to lock in a competitive interest rate.'},
                        {type: 'text', text: 'You can book an appointment. Just ask me!'}]
                });
                break;
//
//Exchange rates payloads
            case 'FX_OPTIONS_PAYLOAD':
                fulfill({
                    status: 'ok',
                    messages: [{type: 'template', json: fxOptions.createJson(senderPlatform)}]
                });
                break;

            case 'EXCHANGE_RATE_PAYLOAD':
                fxRate.parametersRetrieved(params.srcCurrency, params.dstCurrency)
                    .then((response) => {
                        fulfill({
                            status: 'ok',
                            messages: [
                                {type: 'text', text: 'I\'ve completed your conversion for you!'},
                                {
                                    type: 'text',
                                    text: '1 ' + response.srcCurrency + ' = ' + response.rates + ' ' + response.dstCurrency
                                },
                                {type: 'template', json: startOver.createJson(senderPlatform)}
                            ]
                        });
                    }).catch((err) => {
                    reject(err.message);
                });
                break;

            case 'CURRENCY_CONVERSION_PAYLOAD':
                fxRate.parametersRetrieved(params.srcCurrency, params.dstCurrency, params.exchangeAmount)
                    .then((response) => {
                        fulfill({
                            status: 'ok',
                            messages: [
                                {type: 'text', text: 'I\'ve completed your conversion for you!'},
                                {
                                    type: 'text',
                                    text: 'The amount converted from ' + response.srcCurrency + ' to ' + response.dstCurrency + ' would be ' + response.amount.toFixed(2)
                                },
                                {type: 'template', json: startOver.createJson(senderPlatform)}]
                        });
                    }).catch((err) => {
                    reject(err.message);
                });
                break;
//
//Mortgage calculator payload
            case 'MORTGAGE_CALCULATOR_PAYLOAD':
                mortgageCalc.init(params)
                    .then((response) => {
                        fulfill({
                            status: 'ok',
                            messages: [
                                {type: 'text', text: 'Thanks for your answers!'},
                                {
                                    type: 'text',
                                    text: 'Based on your input, your monthly payment is ' + response.monthlyPayment + '.'
                                },
                                {type: 'template', json: startOver.createJson(senderPlatform)}]
                        });
                    }).catch((err) => {
                    reject(err.message);
                });
                break;
//
//Appointments payloads
            case 'APPOINTMENT_REQUEST_PAYLOAD':
                globalFunctions.getUserInfo(senderId).then((response) => {
                    //console.log('FB RESPONSE      ' + JSON.stringify(response));
                    console.log('appointment_request_payload response:', response);
                    let firstName = response.first_name;
                    let lastName = response.last_name;
                    models.Appointment.findAll({
                        where: {
                            clientId: senderId
                        }
                    }).then((items) => {
                        if (Object.keys(items).length === 0) {
                            appointment.init(params, senderId, firstName, lastName).then((result) => {
                                let id = result.appointmentId;
                                models.Appointment
                                    .create({
                                        apiAppointmentToken: id,
                                        clientId: senderId
                                    }).then(() => {
                                    let message = "Hi " + firstName + ", your appointment is booked! " + "If you want to cancel the appointment in the future just let me know!";
                                    fulfill({
                                        status: 'ok',
                                        messages: [
                                            {type: 'text', text: message},
                                            {type: 'template', json: startOver.createJson(senderPlatform)}]
                                    });
                                });
                            }).catch((err) => {
                                reject(err.message);
                            });
                        }
                        else {
                            let alr_msg = "Sorry, you already have an appointment booked with us, please cancel that appointment first before making a new appointment.";
                            let help = "You can say cancel appointment to cancel an appointment";

                            fulfill({
                                status: 'ok',
                                messages: [
                                    {type: 'text', text: alr_msg},
                                    {type: 'text', text: help},
                                    {type: 'template', json: startOver.createJson(senderPlatform)}]
                            });
                        }
                    });

                }).catch((err) => {
                    reject(err.message);
                });
                break;

            case 'DELETE_APPOINTMENT_PAYLOAD':
                let messengerHelper = require('./fbHelper');
                let okMsg = 'Ok, let me retrieve your appointments first';
                messengerHelper.sendMessages(senderId, [{text: okMsg}]);
                models.Appointment.findAll({
                    where: {
                        clientId: senderId
                    }
                }).then((result) => {
                    globalFunctions.getUserInfo(senderId).then((response) => {
                        //console.log('FB RESPONSE      ' + JSON.stringify(response));
                        let firstName = response.first_name;
                        let apm_num = Object.keys(result).length;
                        if (apm_num === 0) {
                            let sorry = "Sorry " + firstName + ", it doesn't appear to be an appointment booked under your Facebook Account.";
                            fulfill({
                                status: 'ok',
                                messages: [
                                    {type: 'text', text: sorry},
                                    {type: 'template', json: startOver.createJson(senderPlatform)}]
                            });
                        }
                        else {
                            let res = [];
                            let all_id = [];
                            for (let obj of result) {
                                let apmToken = obj.apiAppointmentToken;
                                all_id.push(apmToken);
                                res.push(globalFunctions.restRequest("DEL", 'appointments/' + apmToken));
                            }
                            let str = "Hi " + firstName + ", your appointment has been canceled!";
                            Promise.all(res).then(() => {
                                models.Appointment.destroy({
                                    where: {
                                        apiAppointmentToken: all_id[0],
                                    }
                                }).then(() =>{
                                    fulfill({
                                        status: 'ok',
                                        messages: [
                                            {type: 'text', text: str},
                                            {type: 'template', json: startOver.createJson(senderPlatform)}
                                        ]
                                    });
                                })
                            });
                        }
                    });
                }).catch((err) => {
                    reject(err.message);
                });
                break;

//
//Definition payload
            case 'DEFINITION_REQUEST_PAYLOAD':
                globalFunctions.restRequest("GET", 'api/definitions/' + params.term)
                    .then((response) => {
                        fulfill({
                            status: 'ok',
                            messages: [
                                {
                                    type: 'text',
                                    text: response.definition
                                }
                            ]
                        });
                    }).catch((err) => {
                    reject(err.message);
                });
                break;
//
//Facebook default payload
            case 'FACEBOOK_WELCOME':
                fulfill({
                    status: 'ok',
                    // messages: [{type: 'template', text: 'introCarousel'}]
                    messages: [{type: 'template', json: introCarousel.createJson(senderPlatform)}]
                });
                break;
//
//Start over payload
            case 'START_OVER_PAYLOAD':
                fulfill({
                    status: 'ok',
                    //messages: [{type:'template',text:'introCarousel'}]
                    messages: [{type: 'template', json: introCarousel.createJson(senderPlatform)}]

                });
                break;
//
//ATM related payloads
            case 'ATM_PAYLOAD':
                fulfill({
                    status: 'ok',
                    messages: [{type: 'template', json: atmOptions.createJson(senderPlatform)}]
                });
                break;

            case 'ATM_LOCATION_PAYLOAD':
                fulfill({
                    status: 'ok',
                    messages: [{type: 'template', json: locationRequest.createJson(senderPlatform)}]
                });

                break;

            case 'ATM_LOCATION_RECEIVED_PAYLOAD':
                globalFunctions.restRequest("GET", 'nearestLocations/atm/myLocation', {
                    lat: params.lat,
                    lng: params.long
                }).then((response) => {
                    //console.log(response[0]);
                    fulfill({
                        status: 'ok',
                        // messages: [
                        //     {type: 'text',text: 'Alright, these are the closest ATMs:'},

                        //     {type: 'text',text: '1. ' + response.results[0].location.address.postalAddress + ', ' + response.results[0].location.address.city},
                        //     {type: 'text',text: '2. ' + response.results[1].location.address.postalAddress + ', ' + response.results[1].location.address.city},
                        //     {type: 'text',text: '3. ' + response.results[2].location.address.postalAddress + ', ' + response.results[2].location.address.city}]
                        messages:
                            [
                                {type: 'text', text: 'Alright, these are the closest ATMs:'},
                                {type: 'template', json: atmLocations.createJson(response.results, senderPlatform)}
                            ]
                    });
                }).catch((err) => {
                    reject(err.message);
                });
                break;

            case 'ATM_POSTAL_CODE_RECEIVED_PAYLOAD':
                globalFunctions.restRequest("GET", 'nearestLocations/atm', {postal: params.postalCode}).then((response) => {
                    //console.log(response[0]);
                    fulfill({
                        status: 'ok',
                        // messages: [
                        //     {type: 'text',text: 'Alright these are the closest ATMs:'},
                        //     {type: 'text',text: response.results[0].location.address.postalAddress + ', ' + response.results[0].location.address.city},
                        //     {type: 'text',text: response.results[1].location.address.postalAddress + ', ' + response.results[1].location.address.city},
                        //     {type: 'text',text: response.results[2].location.address.postalAddress + ', ' + response.results[2].location.address.city}]
                        messages:
                            [
                                {type: 'text', text: 'Alright, these are the closest ATMs:'},
                                {type: 'template', json: atmLocations.createJson(response.results, senderPlatform)}
                            ]
                    });
                }).catch((err) => {
                    reject(err.message);
                });
                break;
            default:
                reject('invalid payload');
                break;
        }
    });
};