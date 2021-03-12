//payload params
const payload_params = require('../models/payload')

/**
  * Pix payload Ids
  * @var string
  */
 const ID_PAYLOAD_FORMAT_INDICATOR = '00';
 const ID_POINT_OF_INITIATION_METHOD = '01';
 const ID_MERCHANT_ACCOUNT_INFORMATION = '26';
 const ID_MERCHANT_ACCOUNT_INFORMATION_GUI = '00';
 const ID_MERCHANT_ACCOUNT_INFORMATION_KEY = '01';
 const ID_MERCHANT_ACCOUNT_INFORMATION_DESCRIPTION = '02';
 const ID_MERCHANT_ACCOUNT_INFORMATION_URL = '25';
 const ID_MERCHANT_CATEGORY_CODE = '52';
 const ID_TRANSACTION_CURRENCY = '53';
 const ID_TRANSACTION_AMOUNT = '54';
 const ID_COUNTRY_CODE = '58';
 const ID_MERCHANT_NAME = '59';
 const ID_MERCHANT_CITY = '60';
 const ID_ADDITIONAL_DATA_FIELD_TEMPLATE = '62';
 const ID_ADDITIONAL_DATA_FIELD_TEMPLATE_TXID = '05';
 const ID_CRC16 = '63';

exports.setPixKey = (pixKey) => {
    payload_params.pixKey = pixKey;
}

exports.setUniquePayment = (uniquePayment) => {
    payload_params.uniquePayment = uniquePayment;
}

exports.setUrl = (url) => {
    payload_params.url = url;
}

exports.setDescription = (description) => {
    payload_params.description = description;
}

exports.setMerchantName = (merchantName) => {
    payload_params.merchantName = merchantName;
}

exports.setMerchantCity = (merchantCity) => {
    payload_params.merchantName = merchantCity;
}

exports.setTxid = (txid) => {
    payload_params.txid = txid;
}

exports.setAmount = (amount) => {
    payload_params.amount = amount;
}

/**
* this function is responsible for the complete return value of the payload object
* @param id
* @param value
* @return id+size.val
*/
getValueFormated = (id,val) => {
    return id+val.length+val;
}