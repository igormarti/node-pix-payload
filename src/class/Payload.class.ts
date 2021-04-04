import Crc from './Crc.class';
import Qrcode from './QrCode.class';

// payload params
import payload_params from '../models/payload';

/**
 * Pix payload Ids
 * @const string
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

export const setPixKey = (pixKey: string) => {
  payload_params.pixKey = pixKey;
};

export const setUniquePayment = (uniquePayment: boolean) => {
  payload_params.uniquePayment = uniquePayment;
};

export const setUrl = (url: string) => {
  payload_params.url = url;
};

export const setDescription = (description: string) => {
  payload_params.description = description;
};

export const setMerchantName = (merchantName: string) => {
  payload_params.merchantName = merchantName;
};

export const setMerchantCity = (merchantCity: string) => {
  payload_params.merchantCity = merchantCity;
};

export const setTxid = (txid: string) => {
  payload_params.txid = txid;
};

export const setAmount = (amount: string | number) => {
  payload_params.amount = amount;
};

export const setCountryCode = (countryCode: string) => {
  payload_params.country_code = countryCode;
};

/**
 * this method is responsible for return account information complete
 */
const getMerchantAccountInformation = () => {
  // bank domain
  const gui = getValueFormated(ID_MERCHANT_ACCOUNT_INFORMATION_GUI, 'br.gov.bcb.pix');

  // pix key
  const key =
    payload_params.pixKey.length > 0
      ? getValueFormated(ID_MERCHANT_ACCOUNT_INFORMATION_KEY, payload_params.pixKey)
      : '';

  // pix description
  const description =
    payload_params.description.length > 0
      ? getValueFormated(ID_MERCHANT_ACCOUNT_INFORMATION_DESCRIPTION, payload_params.description)
      : '';

  // url dynamic qr code pix
  const url =
    payload_params.url.length > 0
      ? getValueFormated(ID_MERCHANT_ACCOUNT_INFORMATION_URL, payload_params.url.replace('/^https?:///', ''))
      : '';

  // value account complete
  return getValueFormated(ID_MERCHANT_ACCOUNT_INFORMATION, gui + key + description + url);
};

/**
 * this method is responsible for returning the value of the additional pix field
 */
const getAdditionalDataFieldTemplate = () => {
  const txid = getValueFormated(ID_ADDITIONAL_DATA_FIELD_TEMPLATE_TXID, payload_params.txid);
  return getValueFormated(ID_ADDITIONAL_DATA_FIELD_TEMPLATE, txid);
};

/**
 *  this method is responsible for return value of the ID_POINT_OF_INITIATION_METHOD
 */
const getUniquePayment = () => {
  return payload_params.uniquePayment ? getValueFormated(ID_POINT_OF_INITIATION_METHOD, '12') : '';
};

/**
 * this method is responsible for the complete return value of the payload object
 * @param id
 * @param value
 * @return id+size+val
 */
const getValueFormated = (id: string, val: any): string => {
  return id + val.length.toString().padStart(2, '0') + val;
};

/**
 * this method is responsible for generate the full pix payload code
 */
export const getData = async () => {
  const payload =
    getValueFormated(ID_PAYLOAD_FORMAT_INDICATOR, '01') +
    getUniquePayment() +
    getMerchantAccountInformation() +
    getValueFormated(ID_MERCHANT_CATEGORY_CODE, '0000') +
    getValueFormated(ID_TRANSACTION_CURRENCY, '986') +
    getValueFormated(ID_TRANSACTION_AMOUNT, payload_params.amount) +
    getValueFormated(ID_COUNTRY_CODE, payload_params.country_code) +
    getValueFormated(ID_MERCHANT_NAME, payload_params.merchantName) +
    getValueFormated(ID_MERCHANT_CITY, payload_params.merchantCity) +
    getAdditionalDataFieldTemplate();

    const text = payload + ID_CRC16 + '04' + Crc.calculeCrc16(payload + ID_CRC16 + '04');

    clearParams();

    const qrcodePayload = await Qrcode.generateQrCode(text);

    return {
      text_payload: text,
      qrcode_payload: qrcodePayload,
      outPut: (path: string, format: 'png' | 'svg' | 'utf8' = 'png') => Qrcode.outPutImage({ path, text, format }),
    };
};
/**
 * this method responsible for clear payload params
 */
const clearParams = () => {
  payload_params.amount = '';
  payload_params.country_code = 'BR';
  payload_params.description = '';
  payload_params.merchantCity = '';
  payload_params.merchantName = '';
  payload_params.pixKey = '';
  payload_params.txid = '';
  payload_params.uniquePayment = false;
  payload_params.url = '';
};
