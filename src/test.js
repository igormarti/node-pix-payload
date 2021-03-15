const Payload = require('./');

const location = 'qrpix-h.bradesco.com.br/qr/v2/c-8c7193b-34cc6180be87850a-89193060-9705a6b8';

const payload = Payload.setMerchantName('IJ Solutions')
                .setMerchantCity('VICOSA')
                .setAmount('113.00')
                .setTxid('***')
                .setUrl(location)
                .setUniquePayment(true);

console.log(payload.getPayload());    