import Payload from './class/Payload.class';

class Main {
  setPixKey(key: string) {
    Payload.setPixKey(key);
    return this;
  }

  setDescription(description: string) {
    Payload.setDescription(description);
    return this;
  }

  setMerchantName(name: string) {
    Payload.setMerchantName(name);
    return this;
  }

  setMerchantCity(city: string) {
    Payload.setMerchantCity(city);
    return this;
  }

  setAmount(amount: string | number) {
    Payload.setAmount(amount);
    return this;
  }

  setTxid(txid: string) {
    Payload.setTxid(txid);
    return this;
  }

  setUrl(url: string) {
    Payload.setUrl(url);
    return this;
  }

  setUniquePayment(uniquePayment: boolean) {
    Payload.setUniquePayment(uniquePayment);
    return this;
  }

  setCountryCode(countryCode: string) {
    Payload.setCountryCode(countryCode);
    return this;
  }

  async getData() {
    return await Payload.getData();
  }
}

export default new Main();
