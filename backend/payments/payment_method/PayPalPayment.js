const PaymentInterface = require('../PaymentInterface');

class PayPalPayment extends PaymentInterface {

    constructor() {
        super();
        this.name = 'PayPal';
        this.imageUrl = 'paypal.png';
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

module.exports = PayPalPayment;