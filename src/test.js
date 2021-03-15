const Payload = require('./');

const location = 'https://qrpix-h.bradesco.com.br/qr/v2/8a192-9b1e99-183fbb56b6040-3efe10e2c68b0-1f1';

const payload = Payload.setMerchantName('IJ Solutions')
                .setMerchantCity('Vicosa')
                .setAmount('130.00')
                .setTxid('***')
                .setUrl(location)
                .getPayload()

console.log(payload);    