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

class Payload {
  setPixKey(pixKey: string) {
    payload_params.pixKey = pixKey;
  }

  setUniquePayment(uniquePayment: boolean) {
    payload_params.uniquePayment = uniquePayment;
  }

  setUrl(url: string) {
    payload_params.url = url;
  }

  setDescription(description: string) {
    payload_params.description = description;
  }

  setMerchantName(merchantName: string) {
    payload_params.merchantName = merchantName;
  }

  setMerchantCity(merchantCity: string) {
    payload_params.merchantCity = merchantCity;
  }

  setTxid(txid: string) {
    payload_params.txid = txid;
  }

  setAmount(amount: string | number) {
    payload_params.amount = amount;
  }

  setCountryCode(countryCode: string) {
    payload_params.country_code = countryCode;
  }

  /**
   * this method is responsible for return account information complete
   */
  private getMerchantAccountInformation = () => {
    // bank domain
    const gui = this.getValueFormated(ID_MERCHANT_ACCOUNT_INFORMATION_GUI, 'br.gov.bcb.pix');

    // pix key
    const key =
      payload_params.pixKey.length > 0
        ? this.getValueFormated(ID_MERCHANT_ACCOUNT_INFORMATION_KEY, payload_params.pixKey)
        : '';

    // pix description
    const description =
      payload_params.description.length > 0
        ? this.getValueFormated(ID_MERCHANT_ACCOUNT_INFORMATION_DESCRIPTION, payload_params.description)
        : '';

    // url dynamic qr code pix
    const url =
      payload_params.url.length > 0
        ? this.getValueFormated(ID_MERCHANT_ACCOUNT_INFORMATION_URL, payload_params.url.replace('/^https?:///', ''))
        : '';

    // value account complete
    return this.getValueFormated(ID_MERCHANT_ACCOUNT_INFORMATION, gui + key + description + url);
  };

  /**
   * this method is responsible for returning the value of the additional pix field
   */
  private getAdditionalDataFieldTemplate = () => {
    const txid = this.getValueFormated(ID_ADDITIONAL_DATA_FIELD_TEMPLATE_TXID, payload_params.txid);
    return this.getValueFormated(ID_ADDITIONAL_DATA_FIELD_TEMPLATE, txid);
  };

  /**
   *  this method is responsible for return value of the ID_POINT_OF_INITIATION_METHOD
   */
  private getUniquePayment = () => {
    return payload_params.uniquePayment ? this.getValueFormated(ID_POINT_OF_INITIATION_METHOD, '12') : '';
  };

  /**
   * this method is responsible for the complete return value of the payload object
   * @param id
   * @param value
   * @return id+size+val
   */
  private getValueFormated = (id: string, val: any): string => {
    return id + val.length.toString().padStart(2, '0') + val;
  };

  /**
   * this method is responsible for generate the full pix payload code
   */
  getData = async () => {
    const payload =
      this.getValueFormated(ID_PAYLOAD_FORMAT_INDICATOR, '01') +
      this.getUniquePayment() +
      this.getMerchantAccountInformation() +
      this.getValueFormated(ID_MERCHANT_CATEGORY_CODE, '0000') +
      this.getValueFormated(ID_TRANSACTION_CURRENCY, '986') +
      this.getValueFormated(ID_TRANSACTION_AMOUNT, payload_params.amount) +
      this.getValueFormated(ID_COUNTRY_CODE, payload_params.country_code) +
      this.getValueFormated(ID_MERCHANT_NAME, payload_params.merchantName) +
      this.getValueFormated(ID_MERCHANT_CITY, payload_params.merchantCity) +
      this.getAdditionalDataFieldTemplate();

    const text = payload + ID_CRC16 + '04' + Crc.calculeCrc16(payload + ID_CRC16 + '04');

    const qrcodePayload = await Qrcode.generateQrCode(text);

    this.clearParams();

    return {
      text_payload: text,
      qrcode_payload: qrcodePayload,
      outPut: (path: string, format: 'png' | 'svg' | 'utf8' = 'png') => Qrcode.outPutImage({ path, text, format }),
    };
  };
  /**
   * this method responsible for clear payload params
   */
  private clearParams() {
    payload_params.amount = '';
    payload_params.country_code = 'BR';
    payload_params.description = '';
    payload_params.merchantCity = '';
    payload_params.merchantName = '';
    payload_params.pixKey = '';
    payload_params.txid = '';
    payload_params.uniquePayment = false;
    payload_params.url = '';
  }
}

export default new Payload();
