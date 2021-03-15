const {setPixKey,setDescription,setMerchantName,
      setMerchantCity,setAmount,setTxid,setUrl,
      setUniquePayment,setCountryCode,getPayload} 
  = require('./payload')

module.exports = {
  setPixKey: function(key){
    setPixKey(key);
    return this
  },
  setDescription: function (description) {
    setDescription(description);
    return this
  },
  setMerchantName: function(name) {
    setMerchantName(name);
    return this
  },
  setMerchantCity: function (city){
    setMerchantCity(city);
    return this
  },
  setAmount: function(amount) {
    setAmount(amount);
    return this
  },
  setTxid: function (txid) {
    setTxid(txid);
    return this
  },
  setUrl: function (url) {
    setUrl(url);
    return this
  },
  setUniquePayment: function (unique_payment) {
    setUniquePayment(unique_payment);
    return this
  },
  setCountryCode: function (country_code) {
    setCountryCode(country_code);
    return this
  },
  getPayload: () => getPayload()
}