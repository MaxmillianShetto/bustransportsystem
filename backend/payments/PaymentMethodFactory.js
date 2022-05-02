const MobileMoney = require('./payment_method/MobileMoney');
const CardPayment = require('./payment_method/CardPayment');

class PaymentMethodFactory {
    static getPaymentMethod(type) {
        if (type==='Card') {
            return new CardPayment();
        } else if (type==='Mobile Money') {
            return new MobileMoney();
        } else {
            throw "Payment Method not found";
        }
    }
}

module.exports = PaymentMethodFactory;