import { setAmount,setCountryCode,setDescription,setMerchantCity,
setMerchantName, setPixKey,setTxid,setUniquePayment,setUrl,getData } from './class/Payload.class';

export = {
  setAmount (amount: string | number) {
    setAmount(amount);
    return this;
  },
  setCountryCode(countryCode:string) {
    setCountryCode(countryCode);
    return this;
  },
  setDescription(description:string) {
    setDescription(description);
    return this;
  },
  setMerchantCity(city:string) {
    setMerchantCity(city);
    return this;
  },
  setMerchantName(name:string) {
    setMerchantName(name);
    return this;
  },
  setPixKey(key:string) {
    setPixKey(key);
    return this;
  },
  setTxid(txid:string) {
    setTxid(txid);
    return this;
  },
  setUniquePayment(uniquePayment:boolean) {
    setUniquePayment(uniquePayment);
    return this;
  },
  setUrl(url:string) {
    setUrl(url);
    return this;
  },
  getData: async () => getData()
};
