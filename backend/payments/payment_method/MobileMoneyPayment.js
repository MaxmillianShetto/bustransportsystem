const PaymentInterface = require('../PaymentInterface');

class MobileMoneyPayment extends PaymentInterface {

    constructor() {
        super();
        this.name = 'Mobile Money';
        this.imageUrl = 'mobile_money.png';
    }

    initiatePayment() {
        super.initiatePayment();
    }

    checkPayment() {
        super.checkPayment();
    }

    completePayment() {
        super.completePayment();
    }

    cancelPayment() {
        super.cancelPayment();
    }
}

module.exports = MobileMoneyPayment;