# node-pix-payload
This package that aims to build the payload of pix payment, with this payload the developer can generate the qr code payable or pay informed the same in the bank's app.

- [Installation](#installation)
- [Example](#example)

## Installation
Inside your project folder do:

```shell
npm i node-pix-payload
```

## Example

```javascript
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
```
