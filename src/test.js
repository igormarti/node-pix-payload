const Payload = require('./');

const location = 'qrpix.seupsp.com.br/qr/v2/c-8c7193b-34cc6180be87850a-89193060-9705a6b8';

const payload = Payload.setMerchantName('IJ Solutions')
                .setMerchantCity('VICOSA')
                .setAmount('113.00')
                .setTxid('***')
                .setUrl(location)
                .setUniquePayment(true);

payload.getData().then((data) => {
    console.log(data);
}).catch(err => console.log(err))    