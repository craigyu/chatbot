const globalFunctions = require('../globalHelpers');
const models = require('../../models');

module.exports ={
    init: (param, senderId, firstName, lastName) => {


        let apmtDate = param.appointmentTime;
        // let dateLength = apmtDate.length;
        // apmtDate = apmtDate.substr(0, dateLength - 1) + '.000Z';
        let clientPhone = param.customerPhoneNumber;
        let name = firstName + ' ' + lastName;
        let note = param.note;
        let body = {
                timeSlot : apmtDate,
                clientName : name,
                notes : note,
                phoneNumber : clientPhone
        };

       let query = {};
        //console.log(query);
        return globalFunctions.restRequest("POST", "appointments", query, body);
        /*.then((result) => {
            console.log(JSON.stringify(result));
            let id = result.appointmentId;
            let message = "Hi " + firstName + ", your appointment is booked! The appointment ID is " +
                id + ". If you want to change the appointment in the future you can use this ID as a reference. Thank you for choosing HSBC.";

            globalFunctions.sendTextMessage(senderId, message);
        })
            .catch((err) => {
                console.log(JSON.stringify(err));
                let message = "Sorry " + firstName + ", I wasn't about to book an appointment due to a technical issue, please call 1-888-310-HSBC (4722).";
                globalFunctions.sendTextMessage(senderId, messagesenderId, message);
            })*/
    },

    cancelConfirm: (result) =>{
        return new Promise((resolve, reject) => {


        });

    }


};