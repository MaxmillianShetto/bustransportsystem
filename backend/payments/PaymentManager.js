const PaymentMethodFactory = require('./PaymentMethodFactory');

class PaymentManager {

    constructor() {
        this.paymentMethods = new Set();
        this.paymentMethods.add(PaymentMethodFactory.getPaymentMethod('Card'));
        this.paymentMethods.add(PaymentMethodFactory.getPaymentMethod('Mobile Money'));
    }

    getPaymentMethods() {
        return Array.from(this.paymentMethods);
    }

    addPaymentMethod(type) {
        this.paymentMethods.add(PaymentMethodFactory.getPaymentMethod(type));
    }

    removePaymentMethod(type) {
        this.paymentMethods.delete(PaymentMethodFactory.getPaymentMethod(type));
    }
}

module.exports = new PaymentManager();