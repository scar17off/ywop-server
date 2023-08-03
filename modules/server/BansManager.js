let path = "./bans.json"
let bans = require("../../bans.json");
const fs = require("fs");

class BansManager {
    constructor() {
        this.bans = bans
    };
    checkIfIsBanned(ip) {
        var ban = this.bans[ip];
        if(!ban) return false;
        if(ban.duration) {
            var banned = ban.duration + ban.date > Date.now();
            if(!banned) this.unBanIp();

            return banned;
        }
        return true;
    };
    writeBans() {
        fs.writeFileSync(path, JSON.stringify(this.bans, null, 2), function(err) {
            if(err) console.error(err);
        });
    };
    addBanIp(ip, reason, duration = 0) {
        let ban = this.bans[ip] = {};
        if(duration === 0) {
            ban.reason = reason;
            ban.date = Date.now();
        } else {
            ban.reason = reason;
            ban.duration = Math.abs(duration);
            ban.date = Date.now();
        }
        this.writeBans();
        return true;
    };
    unBanIp(ip) {
        delete this.bans[ip];
        this.writeBans();
    };
    banEndsAfter(ip) {
        if(!this.checkIfIsBanned(ip)) return false;
        var ban = this.bans[ip];
        if(!ban.duration) return false;
        var delta = Math.abs(ban.date + ban.duration - Date.now()) / 1000;

        var years = Math.floor(delta / (60 * 60 * 24 * 365));
        delta -= years * (60 * 60 * 24 * 365);

        var months = Math.floor(delta / (60 * 60 * 24 * 30));
        delta -= months * (60 * 60 * 24 * 30);

        var weeks = Math.floor(delta / (60 * 60 * 24 * 7));
        delta -= weeks * (60 * 60 * 24 * 7);

        var days = Math.floor(delta / (60 * 60 * 24));
        delta -= days * (60 * 60 * 24);

        var hours = Math.floor(delta / (60 * 60));
        delta -= hours * (60 * 60);

        var minutes = Math.floor(delta / 60);
        delta -= minutes * 60;

        var seconds = Math.floor(delta % 60);

        return {
            years,
            months,
            weeks,
            days,
            hours,
            minutes,
            seconds,
        };
    };
    generateString(ends) {
        if(!ends.days) return "";
        let string = "";
        for(var timeUnit in ends) {
            let value = ends[timeUnit]
            if(value !== 0) {
                string += `${value} ${timeUnit} `
            }
        }
        return string.slice(0, string.length - 1)
    };
};
module.exports = BansManager;