const MobileMoney = require('./payment_method/MobileMoneyPayment');
const CardPayment = require('./payment_method/CardPayment');
const PayPalPayment = require('./payment_method/PayPalPayment');

class PaymentMethodFactory {
    static getPaymentMethod(type) {
        if (type==='Card') {
            return new CardPayment();
        } else if (type==='Mobile Money') {
            return new MobileMoney();
        } else if (type==='PayPal') {
            return new PayPalPayment();
        } else {
            throw "Payment Method not found";
        }
    }
}

module.exports = PaymentMethodFactory;