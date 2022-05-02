const PaymentInterface = require('../PaymentInterface');

class CardPayment extends PaymentInterface {

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

module.exports = CardPayment;