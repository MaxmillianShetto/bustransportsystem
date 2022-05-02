const PaymentInterface = require('../PaymentInterface');

class MobileMoney extends PaymentInterface {

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

module.exports = MobileMoney;