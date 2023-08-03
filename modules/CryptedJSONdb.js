const CryptoJS = require('crypto-js');
const fs = require('graceful-fs');

class CryptedJSONdb {
    constructor(filename, databaseKey) {
        this.filename = filename;
        this.databaseKey = databaseKey;
        this.data = {};
        this.load();
    };
    load() {
        try {
            if(!fs.existsSync(this.filename)) {
                fs.writeFileSync(this.filename, CryptoJS.AES.encrypt("{}", this.databaseKey).toString());
            };
            const encryptedData = fs.readFileSync(this.filename, 'utf8');
            let decryptedData = {};
            if(encryptedData) {
                try {
                    const bytes = CryptoJS.AES.decrypt(encryptedData, this.databaseKey);
                    decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
                } catch (error) {
                    console.log('Error parsing JSON data:', error);
                };
            };
            this.data = decryptedData;
        } catch (error) {
            console.log('Error loading data:', error);
        };
    };
    save() {
        try {
            const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(this.data), this.databaseKey).toString();
            fs.writeFileSync(this.filename, encryptedData, 'utf8');
        } catch (error) {
            console.log('Error saving data:', error);
        };
    };
    setValue(value, ...keys) {
        let obj = this.data;
        for(let i = 0; i < keys.length - 1; i++) {
            if(!obj[keys[i]]) {
                obj[keys[i]] = {};
            }
            obj = obj[keys[i]];
        };
        if(obj[keys[keys.length - 1]] !== value)
            obj[keys[keys.length - 1]] = value;
        else return false;
        this.save();
        return true;
    };
    getValue(...keys) {
        let obj = this.data;
        for(let i = 0; i < keys.length; i++) {
            if(!obj[keys[i]]) {
                return undefined;
            }
            obj = obj[keys[i]];
        };
        return obj;
    };
    deleteKey(key, ...keys) {
        let obj = this.data;
        if (!keys.length) {
            delete obj[key];
        } else {
            for(let i = 0; i < keys.length - 1; i++) {
                if(!obj[keys[i]]) {
                    return;
                }
                obj = obj[keys[i]];
            };
            delete obj[keys[keys.length - 1]][key];
        };
        this.save();
    };
    addKeyToArr(value, ...keys) {
        let arr = this.getValue(...keys);
        if (!Array.isArray(arr)) arr = [];
        arr.push(value);
        this.setValue(arr, ...keys);
    };
    getItemByIndex(index, ...keys) {
        const arr = this.getValue(...keys);
        if (Array.isArray(arr) && index >= 0 && index < arr.length) {
            return arr[index];
        } else {
            return undefined;
        };
    };
};

module.exports = CryptedJSONdb;