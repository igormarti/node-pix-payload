# node-pix-payload
This package that aims to build the payment pix payload, with this payload the developer can generate the qr code to pay or pay informing the same in the bank's app

- [Installation](#installation)
- [Example](#example)
- [Saving](#saving)

## Installation
Inside your project folder do:

```shell
npm i node-pix-payload
```

## Example
Example static
```javascript
const Payload = require('node-pix-payload');

const payload_static = Payload.setPixKey('1c995784-b8a4-482a-952e-4b8cd6928216')
.setDescription('payment xyz')
.setMerchantName('IJ Solutions')
.setMerchantCity('MACEIO')
.setAmount('100.00')
.setTxid('ij123');

payload_static.getData().then((data) =>{
    console.log(data)
})
.catch(err => console.log(err));  
```
Example dynamic
```javascript
const Payload = require('node-pix-payload');

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
## Saving
Possible output formats are: png and svg. format default is png.

```javascript
    const location = 'qrpix.seupsp.com.br/qr/v2/c-8c7193b-34cc6180be87850a-89193060-9705a6b8';
    const payload_dynamic = Payload.setMerchantName('IJ Solutions')
                    .setMerchantCity('VICOSA')
                    .setAmount('113.00')
                    .setTxid('***')
                    .setUrl(location)
                    .setUniquePayment(true);

    const data = await payload_dynamic.getData();
    data.outPut('files/qrcode_dynamic.png');
```

Output svg

```javascript
   const payload_static = Payload.setPixKey('1c995784-b8a4-482a-952e-4b8cd6928216')
    .setDescription('payment xyz')
    .setMerchantName('IJ Solutions')
    .setMerchantCity('MACEIO')
    .setAmount('100.00')
    .setTxid('ij123');

    const data = await payload_static.getData();
    data.outPut('files/qrcode_static.svg','svg');
```
