import Payload from './class/Payload.class';

class Main{
    
    setPixKey (key:string)  {
        Payload.setPixKey(key);
        return this;
    }
    
    setDescription(description:string) {
        Payload.setDescription(description);
        return this;
    }
    
    setMerchantName(name:string) {
        Payload.setMerchantName(name);
        return this;
    }

    setMerchantCity (city:string) {
        Payload.setMerchantCity(city);
        return this;
    }

    setAmount(amount:string|number) {
        Payload.setAmount(amount);
        return this;
    }

    setTxid (txid:string) {
        Payload.setTxid(txid);
        return this;
    }

    setUrl (url:string) {
        Payload.setUrl(url);
        return this;
    }

    setUniquePayment (unique_payment:boolean) {
        Payload.setUniquePayment(unique_payment);
        return this;
    }

    setCountryCode (country_code:string) {
        Payload.setCountryCode(country_code);
        return this;
    }

    async getData () {
       return await Payload.getData()
    }        
}

export default new Main();