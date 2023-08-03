const fs = require('fs');

class JSONdb {
    constructor(filename) {
        this.filename = filename;
        this.data = {};
        this.load();
    };
    load() {
        try {
            const jsonData = fs.readFileSync(this.filename, 'utf8');
            this.data = JSON.parse(jsonData);
        } catch (error) {
            console.log('Error loading data:', error);
        };
    };
    save() {
        try {
            const jsonData = JSON.stringify(this.data, null, 2);
            fs.writeFileSync(this.filename, jsonData, 'utf8');
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

module.exports = JSONdb;
