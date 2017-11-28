const globalFunctions = require('../globalHelpers');


module.exports = {
    init: (param) => {
        let amtToBorrow = parseInt(param.amtToBorrow);
        let interestRate = parseInt(param.interestRate);
        let payOut = parseInt(param.payOut);
        let retirementYear = parseInt(param.retirementYear);
        let date = new Date;

        //@Todo remember to check for int
        if (payOut < parseInt(date.getFullYear())){
            payOut = parseInt(date.getFullYear()) + payOut;
        }
        if (retirementYear < parseInt(date.getFullYear())){
            retirementYear = parseInt(date.getFullYear()) + retirementYear;
        }
        const query = {
            retirementYear : retirementYear,
            amtToBorrow : amtToBorrow,
            interestRate : interestRate,
            repaymentYear : payOut
        };
        return globalFunctions.restRequest("GET", "mortgages/calculators/borrow", query);
        /*
            .then((result) => {
            console.log(result);
            let monthlyPayment = result.monthlyPayment;
            let message = 'Your monthly payment is ' + monthlyPayment + '.';
            globalFunctions.sendTextMessage(senderId, message);
        })
        */
    }
};