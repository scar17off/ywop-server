const captchaStates = require('./captchaStates');
const request = require('request');
const protocol = require('../../server/protocol');
const config = require('../../../config.json');
const verifedIps = {};

class Captcha {
    constructor(client) {
        this.client = client;
        this.state = 'waiting';
    };
    show() {
        const security = config.captcha.security;
        if(security < 1 || security > 3) return this.sendState('ok');
        if(security === 1 && verifedIps[this.client.ip]) return this.sendState('ok');
        this.sendState('waiting');
    };
    sendState(state) {
        this.state = state;
        this.client.send(new Uint8Array([protocol.server.captcha, captchaStates[state]]));
    };
    async onToken(message) {
        if(!message.startsWith(config.captcha.clientSideVerificationKey)) return;
        const key = message.slice(config.captcha.clientSideVerificationKey.length);
        this.sendState('veryfying');
        const security = config.captcha.security;
        if(security === 1 && verifedIps[this.client.ip]) return;
        const success = await this.verifyToken(key);
        if(!success) {
            this.sendState('invaild');
            this.client.ws.close();
            return;
        }
        if(security === 1) verifedIps[this.client.ip] = true;
        this.sendState('ok');
    };
    verifyToken(key) {
        if(process.env.captchaBypass && key === process.env.captchaBypass) return true;
        return new Promise((resolve) => {
            request(`https://www.google.com/recaptcha/api/siteverify?secret=${process.env.captchaKey}&response=${key}`, (error, response, body) => {
                if(error) {
                    resolve(false);
                    return;
                }
                body = body.replace(/\r/g, '');
                const jsonresponse = JSON.parse(body);
                resolve(jsonresponse.success);
            });
        });
    };
};

module.exports = Captcha;