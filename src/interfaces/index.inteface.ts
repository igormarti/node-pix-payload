import {QRCodeToFileOptions} from 'qrcode';

export interface Payload {
  pixKey:string,
  description:string,
  merchantName:string,
  merchantCity:string,
  txid:string,
  amount:number|string,
  uniquePayment:boolean,
  url:string,
  country_code:string
}

export interface QrCode {
    path:string;
    text:string;
    format?:'png' | 'svg' | 'utf8';
}