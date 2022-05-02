class PaymentInterface {

    constructor() {
        this.name = 'PaymentInterface';
        this.imageUrl = 'N/A';
    }

    initiatePayment() {
        throw "Not Implemented";
    }

    checkPayment() {
        throw "Not Implemented";
    }

    completePayment() {
        throw "Not Implemented";
    }

    cancelPayment() {
        throw "Not Implemented";
    }
}

module.exports = PaymentInterface;