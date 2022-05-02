const PaymentInterface = require('../PaymentInterface');

class CardPayment extends PaymentInterface {

    constructor() {
        super();
        this.name = 'Card Payment';
        this.imageUrl = 'card.png';
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

module.exports = CardPayment;