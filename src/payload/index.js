const crc = require('node-crc');

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

exports.setCountryCode = (country_code) => {
    payload_params.country_code = country_code;
}

/**
* this function is responsible for the complete return value of the payload object
* @param id
* @param value
* @return id+size+val
*/
getValueFormated = (id,val) => {
    return id+val.length+val;
}

/**
 * this function is responsible for return account information complete
 */
getMerchantAccountInformation = () => {
    //bank domain
    const gui = getValueFormated(ID_MERCHANT_ACCOUNT_INFORMATION_GUI,'br.gov.bcb.pix');

    //pix key
    const key = payload_params.pixKey.length>0? getValueFormated(ID_MERCHANT_ACCOUNT_INFORMATION_KEY,payload_params.pixKey):'';

    //pix description
    const description = payload_params.description.length>0? getValueFormated(ID_MERCHANT_ACCOUNT_INFORMATION_DESCRIPTION,payload_params.description):'';

    //url dynamic qr code pix
    const url = payload_params.url.length>0? getValueFormated(ID_MERCHANT_ACCOUNT_INFORMATION_URL,payload_params.url.replace('/^https?\:\/\//','')):'';

    //value account complete
    return getValueFormated(ID_MERCHANT_ACCOUNT_INFORMATION,gui+key+description+url);
}

/**
 * this function is responsible for returning the value of the additional pix field
 */
getAdditionalDataFieldTemplate = () => {

    const txid = getValueFormated(ID_ADDITIONAL_DATA_FIELD_TEMPLATE_TXID,payload_params.txid);
    return getValueFormated(ID_ADDITIONAL_DATA_FIELD_TEMPLATE,txid);
    
}

/**
 *  this function is responsible for return value of the ID_POINT_OF_INITIATION_METHOD
 */
getUniquePayment = () => {
    return payload_params.uniquePayment? getValueFormated(ID_POINT_OF_INITIATION_METHOD,'12'):'';
}

/**
 * this function is responsible for generate pix the full pix payload code
 */
exports.getPayload = () => {
    let payload = getValueFormated(ID_PAYLOAD_FORMAT_INDICATOR,'01')
    +payload_params.uniquePayment
    +getMerchantAccountInformation()
    +getValueFormated(ID_MERCHANT_CATEGORY_CODE,'0000') 
    +getValueFormated(ID_TRANSACTION_CURRENCY,'986') 
    +getValueFormated(ID_TRANSACTION_AMOUNT,payload_params.amount) 
    +getValueFormated(ID_COUNTRY_CODE,'BR') 
    +getValueFormated(ID_MERCHANT_NAME,payload_params.merchantName) 
    +getValueFormated(ID_MERCHANT_CITY,payload_params.merchantCity)
    +getAdditionalDataFieldTemplate();

    return payload+calculeCrc16(payload);
}
 
/**
 * this function is responsible for calcule crc16 and generate validation hash of the pix code.
 */
calculeCrc16 = (payload) => {
    return crc.crcccitt(Buffer.from(payload,'utf8'),{}).toString('hex');
}