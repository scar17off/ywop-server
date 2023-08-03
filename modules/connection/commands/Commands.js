var config = require("../../../config");
const si = require('systeminformation');
const os = require('os');
const log = require('../.././console/log.js');
const ranks = require("../player/ranks.json");

let allowSpeedTest = true;
try {
    const speedTest = require('speedtest-net');
} catch(err) {
	let simplifiedError = "";
	err = err.toString();
    if(err.includes("Cannot find module 'speedtest-net'")) {
		simplifiedError = "Error: Cannot find module 'speedtest-net'. Install Python 2.4 or newer.";
		allowSpeedTest = simplifiedError;
	};
};

const fetch = (...args) => import('node-fetch').then(({
     default: fetch
}) => fetch(...args));

function getRank(id) {
    let found;
    for(let i in ranks)
        if(ranks[i].id == id) found = ranks[i];
    return found;
};

function getDurationStringByUnix(duration) {
  let durationUnits = [
    { unit: "mo", seconds: 2592000 },
    { unit: "w", seconds: 604800 },
    { unit: "d", seconds: 86400 },
    { unit: "h", seconds: 3600 },
    { unit: "m", seconds: 60 },
    { unit: "s", seconds: 1 },
  ];

  let durationString = "";
  let remainingDuration = duration;

  for (let i = 0; i < durationUnits.length; i++) {
    let { unit, seconds } = durationUnits[i];
    let value = Math.floor(remainingDuration / seconds);

    if (value > 0) {
      durationString += value + unit;
      remainingDuration -= value * seconds;
    };
  };

  return durationString;
};

function parseDuration(durationString) {
  let durationRegex = /(\d+)(mo|w|d|h|m|s)?/g;
  let matches = durationString.match(durationRegex);

  if (matches) {
    let totalDuration = 0;

    for (let i = 0; i < matches.length; i++) {
      let match = matches[i];
      let value = parseInt(match);
      let unit = match.charAt(match.length - 1);

      if (!isNaN(value) && unit) {
        totalDuration += value * getDurationMultiplier(unit);
      };
    };

    return totalDuration;
  };

  return false;
};

function convertObjectToDuration(durationObject) {
  let durationInSeconds = 0;

  if (durationObject.days) {
    durationInSeconds += durationObject.days * 86400; // 24 hours in a day, 60 minutes in an hour, 60 seconds in a minute
  }

  if (durationObject.hours) {
    durationInSeconds += durationObject.hours * 3600; // 60 minutes in an hour, 60 seconds in a minute
  }

  if (durationObject.minutes) {
    durationInSeconds += durationObject.minutes * 60; // 60 seconds in a minute
  }

  if (durationObject.seconds) {
    durationInSeconds += durationObject.seconds;
  }

  return durationInSeconds;
};

function getDurationMultiplier(unit) {
  switch (unit) {
    case "mo":
      return 2592000; // Assuming 30 days per month
    case "w":
      return 604800; // 7 days per week
    case "d":
      return 86400; // 24 hours per day
    case "h":
      return 3600; // 60 minutes per hour
    case "m":
      return 60; // 60 seconds per minute
    case "s":
      return 1;
    default:
      return 0;
  }
}

function formatDuration(duration) {
    let years = Math.floor(duration / 31536000);
    let days = Math.floor((duration % 31536000) / 86400);
    let hours = Math.floor(((duration % 31536000) % 86400) / 3600);
    let minutes = Math.floor((((duration % 31536000) % 86400) % 3600) / 60);
    let seconds = (((duration % 31536000) % 86400) % 3600) % 60;

    let durationString = "";
    if (years > 0) durationString += years + " year(s) ";
    if (days > 0) durationString += days + " day(s) ";
    if (hours > 0) durationString += hours + " hour(s) ";
    if (minutes > 0) durationString += minutes + " minute(s) ";
    if (seconds > 0) durationString += seconds + " second(s) ";

    return durationString.trim();
};

function timeConverter(seconds) {
    let minutes = Math.floor(seconds / 60);
    let sec = Math.floor(seconds % 60);
    let hours = Math.floor(minutes / 60);
    minutes %= 60;
    let days = Math.floor(hours / 24);
    hours %= 24;
    let milliseconds = Math.floor((seconds % 1) * 1000);

    return `${days ? `${days}d ` : ""}${hours ? `${hours}h ` : ""}${minutes ? `${minutes}m ` : ""}${sec ? `${sec}s` : ""}${milliseconds ? ` ${milliseconds}ms` : ""}`;
};

class Commands {
    constructor(chat, client, world) {
        chat = chat.substr(1);
        this.world = world;
        this.command = chat.split(" ")[0].toLowerCase();
        this.args = chat.split(" ");
        this.args.shift();
        this.client = client;
        server.events.emit("command", this.client, this.command, this.args);
        if(typeof this[this.command] == "function" && this.command !== "sendTo") {
			let allowedCommands = getRank(this.client.rank).commands;
			let havePermission = allowedCommands.indexOf(this.command) !== -1;
            if(getRank(this.client.rank).id <= this.client.rank && havePermission) {
                this[this.command](...this.args);
            } else {
                this.client.send("You don't have permission!");
            };
        };
    }
	network() {
		function getIPAddresses() {
    		const interfaces = os.networkInterfaces();
		    const addresses = [];
		    for(const name in interfaces) {
		        const iface = interfaces[name];
		        for(const info of iface) {
		            if(info.family === 'IPv4' && !info.internal) {
		                addresses.push(info.address);
		            };
		        };
		    };
		    return addresses;
		};
		let ips = getIPAddresses();
		if(allowSpeedTest == true) {
			speedTest({
		        maxTime: 5000
		    }, function(err, data) {
		        if(err) {
		            log(err, 1);
		        } else {
		            const downloadSpeed = (data.speeds.download / 1000000).toFixed(2);
		            const uploadSpeed = (data.speeds.upload / 1000000).toFixed(2);
		            const downloaded = (data.bytesReceived / 1024).toFixed(2);
		            const uploaded = (data.bytesSent / 1024).toFixed(2);
		
		            this.client.send(`Download speed: ${downloadSpeed} MB/s`);
		            this.client.send(`Upload speed: ${uploadSpeed} MB/s`);
		            this.client.send(`Total downloaded: ${downloaded} KiB/s`);
		            this.client.send(`Total uploaded: ${uploaded} KiB/s`);
		        };
		    });
		} else {
			this.client.send("An error occurred. Check the console for more information.");
			log(allowSpeedTest, 1);
		};
		this.client.send("Server IPs: " + ips.join(", "));
	};
    mem() {
        let msg = "";
        msg += "The information about server performance could be wrong, because the server was made for Windows servers.\n";
        msg += "Uptime: " + timeConverter(process.uptime()) + "\n";
        const totalCores = os.cpus()
            .length;
        const startTime = Date.now() - os.uptime() * 1000;
        const startUsage = os.cpus()
            .reduce((acc, core) => acc + core.times.user + core.times.nice + core.times.sys + core.times.irq, 0);
        setTimeout(() => {
            const endTime = Date.now();
            const endUsage = os.cpus()
                .reduce((acc, core) => acc + core.times.user + core.times.nice + core.times.sys + core.times.irq, 0);
            const elapsedSeconds = (endTime - startTime) / 1000;
            const cpuPercentage = ((endUsage - startUsage) / (elapsedSeconds * totalCores * 100)) * 100;
            msg += `CPU usage: ${cpuPercentage.toFixed(2)}%\n`;
        }, 1000);

        const totalBytes = os.totalmem();
        const freeBytes = os.freemem();
        const used = totalBytes - freeBytes;
        msg += 'Memory usage: ' + (used / 1024 / 1024)
            .toFixed(2) + 'MB\n';

        si.fsSize()
            .then(data => {
                msg += 'Storage usage: ' + (data[0].used / 1024 / 1024 / 1024)
                    .toFixed(2) + 'GB';
                this.client.send(msg);
            })
            .catch(error => console.error('Error retrieving storage usage:', error));
    }
    s(targetId) {
        let target;

        let x, y;

        let message;
        switch(this.args.length) {
            case 1:
                //tp id
                var destination = this.world.clients.find(function(item) {
                    return item.id == targetId;
                }.bind(this));

                if(destination) {
                    target = this.client;
                    x = Math.floor(target.x_pos / 16);
                    y = Math.floor(target.y_pos / 16);
                    message = `Teleported player ${destination.id} to you.`;
                } else {
                    message = `Error! Player '${targetId}' not found!`;
                };
                break;
            default:
                this.client.send("To teleport player to you: /s <id>");
                break;
        };

        if(target) {
            destination.teleport(x, y);
            this.client.send(message);
        };
    }
    pl() {
        let finalstring = [];
        for(let i in server.plugins) {
            let plugin = server.plugins[i];
            if(plugin.loaded) finalstring.push(`<span style="color: #33d46b">${plugin.name}</span>`);
            else finalstring.push(`${plugin.name}`);
        };
        this.client.send(`Plugins (${finalstring.length}): ${finalstring.join('<span style="color: white">, </span>')}`);
    }
    setpbucket(quota) {
        if(quota) {
            var newPQuota = quota.split("x");

             server.databases["worldData"].setValue(newPQuota[0], this.client.world, "pixelbucket", "p");
             server.databases["worldData"].setValue(newPQuota[1], this.client.world, "pixelbucket", "s");
        } else {
             server.databases["worldData"].deleteKey(this.client.world, "pixelbucket");
        };
    }
    adminlogin(password) {
        if(server.checkPassword(this.client.world, "adminlogin", password)) {
            this.client.setRank(3);
            this.client.send(`<span style="color: #7ed433">[Server] You are now an admin. Do /help for a list of commands.</span>`);
        } else {
            this.client.send(`<span style="color: #ed2b2b">[Server] Wrong password.</span>`);
        };
    }
    modlogin(password) {
        if(server.checkPassword(this.client.world, "modlogin", password)) {
            this.client.setRank(2);
            this.client.send(`<span style="color: #7ed433">[Server] You are now an moderator. Do /help for a list of commands.</span>`);
        } else {
            this.client.send(`<span style="color: #ed2b2b">[Server] Wrong password.</span>`);
        };
    }
    logout() {
        this.client.setRank(1);
		this.client.send(`<span style="color: #7ed433">[Server] You are now an user. Do /help for a list of commands.</span>`);
    }
    l() {
        let clients = this.world.clients;
        let final = "";
        let admins = [];
        let moderators = [];
        let users = [];
        for(let i in clients) {
            let client = clients[i];
            let plrname = `${client.nick == '' ? client.id : client.nick + ` (${client.id})`}`;
            if(client.rank === 3) admins.push(plrname);
            if(client.rank === 2) moderators.push(plrname);
            if(client.rank === 1) users.push(plrname);
        };
        if(admins.length > 0) final += `Admins: ${admins.join(", ")}\n`;
        if(moderators.length > 0) final += `Moderators: ${moderators.join(", ")}\n`;
        if(users.length > 0) final += `Users: ${users.join(", ")}`;
        this.client.send(final);
    }
    nick(...N) {
        let newNick = N.join(" ");
        // if(this.client.rank < 3) {
            newNick = newNick.replaceAll(/\n/gm, '');
        // };
        if(newNick.length == 0) {
            this.client.nick = '';
            this.client.send(`<span style="color: #ed2b2b">Nickname reset.</span>`);
            return;
        };
        if(newNick.length <= config.maxNickLength || this.client.rank > 1) {
            this.client.nick = newNick;
            this.client.send(`<span style="color: #33d46b">Nickname set to: "${newNick}"</span>`);
        } else {
            this.client.send(`<span style="color: #2b8fed">Nickname too long! (Max: "${config.maxNickLength}")</span>`);
        };
    }
    clear() {
        server.players.sendToAll(`<script>let chatMessages=OWOP.elements.chat.children[0].children,interval=setInterval(async()=>{if(0!==chatMessages.length)for(let e in chatMessages)"object"==typeof chatMessages[e]&&chatMessages[e].remove();else clearInterval(interval)});></script>`);
    }
    color(color) {
        if(color) {
            if(/^#[0-9a-f]{3,6}$/i.test(color)) {
                this.client.setChatColorHex(color);
                this.client.send("Set your chat color to: " + `<span style="color: ${color}">${color}</span>`);
            };
        } else {
            this.client.setChatColorHex("");
            this.client.send("Chat color reset.");
        };
    }
    setprop(property) {
        var value = this.args;
        value.shift();
        value = value.join(" ")
            .trim();
        if(property && value) {
            server.manager.set_prop(this.world.name, property, value);
            server.players.sendToAll(`DEVSet world property ${property} to ${value}`, 3);
        } else if(property && !value) {
            this.client.send(`Value of ${property} is ${server.manager.get_prop(this.world.name, property, "undefined")}`);
        } else if(!property) {
            this.client.send("Usage:\n /setprop [property] [value]\n or /setprop [property] to get value");
        };
    }
    sayraw(message) {
        if(message) {
            server.players.sendToAll(message);
        } else {
            this.client.send("Usage:\n /sayraw [message]")
        }
    }
    bc(message) {
        if(message) {
            server.players.sendToAll(`<span style='color: #ffff00'>[BROADCAST]</span> ${message} (author: ${this.client.nick || this.client.id})`);
        } else {
            this.client.send("Usage:\n /bc [message]");
        };
    }
    vanish() {
	    this.client.vanish = !this.client.vanish;
	    this.client.send(this.client.vanish ? "Vanished" : "Unvanished");
	}
    hiderank() {
        if(this.client.hiderank) {
            this.client.hiderank = false;
            this.client.send("Your rank is now public again!");
        } else {
            this.client.hiderank = true;
            this.client.send("You rank is now hidden.");
        };
    }
    setrank(id, rank) {
        id = parseInt(id);
        rank = parseInt(rank);
        var target = this.world.clients.find(function(client) {
            return client.id == id;
        });

        if(isNaN(rank)) {
            this.client.send("Usage:\n /setrank [target id] [new rank from 0 to 3]");
        } else if(!target) {
            this.client.send(`Cannot find client with id ${id}`);
        } else if(target.rank >= this.client.rank && target.id !== this.client.id) {
            this.client.send("You cannot change the rank of players who have a higher rank than you or equal.");
        } else {
            this.client.send(`Changed rank of ${target.id} (${target.rank}) to `);
            target.setRank(rank);
        };
    }
    pass(password) {
        if(password == server.manager.get_prop(this.world.name, "pass")) {
            this.client.setRank(1);
        } else {
            this.client.send("Wrong password.");
        };
    }
    tp(targetId) {
        let target;

        let x, y;

        let message
        switch(this.args.length) {
            case 3:
                //tp id x y
                target = this.world.clients.find(function(item) {
                    return item.id == targetId;
                }.bind(this));

                if(target) {
                    x = this.args[1];
                    y = this.args[2];
                    message = `Teleported player ${targetId} (${target.x_pos}, ${target.y_pos}) to ${x},${y}`;
                } else {
                    message = `Error! Player '${targetId}' not found!`;
                };
                break;
            case 2:
                //tp x y
                target = this.client;
                x = this.args[0];
                y = this.args[1];

                message = `Teleported to ${x} ${y}`;
                break;
            case 1:
                //tp id
                var destination = this.world.clients.find(function(item) {
                    return item.id == targetId;
                }.bind(this));

                if(destination) {
                    target = this.client;
                    x = Math.floor(destination.x_pos / 16);
                    y = Math.floor(destination.y_pos / 16);
                    message = `Teleported to player ${targetId} (${x},${y})`;
                } else {
                    message = `Error! Player '${targetId}' not found!`;
                };
                break;
            default:
                this.client.send("To change the position of another player: /tp id x y");
                this.client.send("To teleport to another player: /tp id");
                this.client.send("To change your location: /tp x y");
                break
        }

        if(target) {
            target.teleport(x, y)
            this.client.send(message)
        };
    }
    tpall() {
        for(let i = 0; i < this.world.clients.length; i++) {
            let client = this.world.clients[i];
            if(client.id != this.client.id) {
                client.teleport(Math.floor(this.client.x_pos / 16), Math.floor(this.client.y_pos / 16));
            };
        };
        this.client.send(`Teleported all clients to ${this.client.x_pos}, ${this.client.y_pos}`);
    }
    kick(id) {
        id = parseInt(this.args[0]);
        let target = this.world.clients.find(function(item) {
            return item.id == id;
        }.bind(this));
        if(target.rank >= this.client.rank) {
            this.client.send("Target's rank is not lower than yours.");
            return;
        };
        if(target) {
            target.ws.close();
            server.players.sendToWorld(this.world.name, `DEVKicked: ${id} (${target.ip})`, 3);
        } else if(!id) {
            this.client.send("Usage:\n /kick [id]");
        } else if(!target) {
            this.client.send(`User with id ${id} not found.`);
        };
    }
    kickall() {
        for(let i in this.world.clients) {
            this.world.clients[i].ws.close();
        };
    }
    ao(msg) {
        if(msg) {
            server.players.sendToAll(` [${this.client.world}] [${this.client.id}] ${this.client.nick}: ${msg}`, 3)
        } else {
            this.client.send("Usage:\n /ao [message]")
        };
    }
    whois(id) {
	    if(!id) id = this.client.id;
	    id = parseInt(id);
	    let target = this.world.clients.find(item => item.id == id);
	    if(target) {
	        let info = `Client info:\n` +
	            `-> ID: ${target.id}\n` +
	            `-> Nick: ${target.nick || "Not set"}\n`;	
	
	        const sendInfo = () => {
	            fetch('https://ipapi.co/' + target.ip + '/json/')
	                .then(i => i.json())
	                .then(i => {
	                    info += `-> IP: ${target.ip}\n` +
	                        `-> Rank: ${getRank(target.rank).fullName}\n` +
	                        `-> Tool: ${target.tool}\n` +
	                        `-> RGB: ${target.col_r} ${target.col_g} ${target.col_b}\n` +
	                        `-> X, Y: ${target.x_pos}, ${target.y_pos}\n` +
	                        `-> Connections from this IP: ${server.players.getAllPlayersWithIp(target.ip).length}\n` +
	                        `-> Warning level: ${target.warnlvl.toString()}\n` +
	                        `-> Origin header: ${target.req.headers.origin}\n` +
	                        `-> Vanished: ${target.vanish ? "Yes" : "No"}\n` +
	                        `-> Location: ${i.country_name}, ${i.region}, ${i.city}`;
	
	                    this.client.send(info);
	                });
	        };
	
	        this.client.rank > 2 ? sendInfo() : this.client.rank == 2 ? this.client.send(target.rank >= 2 ? "Target's rank is higher than yours." : info += `-> Rank: ${getRank(target.rank).fullName}\n` + `-> Tool: ${target.tool}\n` + `-> RGB: ${target.col_r} ${target.col_g} ${target.col_b}\n` + `-> X, Y: ${target.x_pos}, ${target.y_pos}\n`) : null;
	    } else {
	        this.client.send(`User with id ${id} not found.`);
	    };
	};
    banip() {
	    let ip = this.args[0];
	
	    if (ip) {
	        let durationString = this.args[1];
	        let duration = parseDuration(durationString);
	        let reason = this.args.slice(2).join(" ");
	        reason = reason.length ? reason : server.config.messages.defaultBanReason;
	
	        if (duration !== false) {
	            let realDuration = duration * 1000;
	            let perm = duration === 0;
	
	            server.bansManager.addBanIp(ip, reason, realDuration);
	            server.players.sendToAll(`DEVBanned ip ${ip}. Reason: ${reason}`, 3);
	
	            let banString = `${server.config.messages.unbanMessage}\nYou are ${perm ? "permanently" : `banned for ${formatDuration(duration)}`}\nReason: ${reason}`;
	
	            server.players.getAllPlayersWithIp(ip).forEach((client) => {
	                client.send(banString);
	                client.ws.close();
	            });
	        } else {
	            this.client.send("Invalid duration format. Please use a valid format like '1h30m5s'.");
	        };
	    } else {
	        this.client.send("Usage:\n /banip [ip] [duration] [reason]");
	    };
	};
    ban(id, formattedDuration) {
	    id = parseInt(id);
	    let target = this.world.clients.find(function(item) {
	        return item.id == id;
	    }.bind(this));
	
	    if(target) {
	        if(target.rank >= 2) return;
	        let ip = target.ip;
	        let {
	            duration,
	            unit
	        } = parseDurationString(formattedDuration);
	        let durationValue = Math.abs(parseInt(duration));
	        if(isNaN(durationValue)) durationValue = 0;
	        let durationTimeUnit = unit || "seconds";
	        let reason = this.args.slice(2).join(" ");
	        reason = reason.length ? reason : server.config.messages.defaultBanReason;
	        let realDuration = parseDuration(durationValue + durationTimeUnit);
	        let perm = durationValue === 0;
	
	        server.bansManager.addBanIp(ip, reason, realDuration);
	        server.players.sendToAll(`DEVBanned ip ${ip}. Reason: ${reason}`, 3);
	        let banString = `${server.config.messages.unbanMessage}\nYou are banned!\nReason: ${reason}`;
	
	        if(!perm) {
	            let banEndsAfter = server.bansManager.generateString(server.bansManager.banEndsAfter(ip));
	            banString = `${server.config.messages.unbanMessage}\nYou are banned for ${banEndsAfter}\nReason: ${reason}`;
	        }
	
	        server.players.getAllPlayersWithIp(ip)
	            .forEach((client) => {
	                client.send(banString);
	                client.ws.close();
	            });
	    } else if(!target && id) {
	        this.client.send(`User with id ${id} not found.`);
	    } else {
	        this.client.send("Usage:\n /ban [id] [duration] [reason]");
	    }
	}
	baninfo(ip) {
	  	if(ip) {
	    	const isBanned = server.bansManager.checkIfIsBanned(ip);
	    	if(isBanned) {
	      		const banEndsAfter = server.bansManager.banEndsAfter(ip);
	      		const banDuration = getDurationStringByUnix(convertObjectToDuration(banEndsAfter));
	      		const banReason = server.bansManager.bans[ip].reason;
	
	      		let banInfo = `IP: ${ip}\n`;
	      		banInfo += `-> Status: Banned\n`;
	      		banInfo += `-> Duration: ${banDuration}\n`;
	      		banInfo += `-> Reason: ${banReason}`;
	
	      		this.client.send(banInfo);
	    	} else {
	      		this.client.send(`IP: ${ip}\n-> Status: Not Banned`);
	    	};
	  	} else {
	    	this.client.send("Usage:\n/baninfo [ip]");
	  	};
	};
    unbanip(ip) {
        if(ip) {
            server.bansManager.unBanIp(ip);
            server.players.sendToAll(`DEVUnBanned ip ${ip}`, 3);
        } else {
            this.client.send("Usage:\n /unbanip [ip]");
        };
    }
    kickip(ip) {
        if(!/^(?=.*[^\.]$)((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.?){4}$/igm.test(ip)) {
            this.world.clients.find(function(item) {
                ip = item.ip;
            }.bind(this));
        };
        var clients = server.players.getAllPlayersWithIp(ip);
        clients.forEach(function(client) {
            client.ws.close();
        });
        server.players.sendToAll(`DEVKicked ${clients.length} clients with ip ${ip}`, 3);
    }
    disconnect() {
        this.client.send("Disconnected");
        this.client.ws.close();
    }
    help() {
        let methodNames = getRank(this.client.rank).commands;
		let helpString = "";
        helpString += methodNames.join(', ');
        // helpString = helpString.slice(0, helpString.length - 2);
        this.client.send("Commands: " + helpString);
    }
    bans() {
        var string = "Bans:\n";
        for(var i in server.bansManager.bans) {
            var ban = server.bansManager.bans[i];
            string += `${i}: ${ban.reason}\n`;
        };
        this.client.send(string);
    }
    tellraw(id) {
        var id = parseInt(id);
        var message = this.args;
        message.shift();
        message = message.join(" ");
        var target = this.world.clients.find(function(item) {
            return item.id == id;
        }.bind(this));
        if(message && target) {
            target.send(message);
            this.client.send("Message sent.");
        } else if(!target && message) {
            this.client.send(`User with id ${id} not found.`);
        } else if(!id) {
            this.client.send("Usage:\n /tellraw [id] [message]");
        };
    }
    tell(id) {
        id = parseInt(id);

        let msg = this.args;
        msg.shift();
        msg = msg.join(" ");

        let target = this.world.clients.find(function(target) {
            return target.id == id;
        });

        if(target && msg) {
            if(target.id !== this.client.id) {
                this.client.send(`[me -> ${target.id}] ${msg}`);
                target.send(`[${this.client.id} -> me] ${msg}`);
            } else {
                this.client.send(`<span style="color: #ed2b2b;">You can't DM yourself.</span>`);
            };
        } else if(!target && msg) {
            this.client.send(`User ${id} not found.`);
        } else {
            this.client.send("Usage:\n /tell [id] [msg]");
        };
    }
    getid() {
        var nick = this.args.join(" ");
        var listOfIds = [];

        if(nick) {
            for(var i = 0; i < this.world.clients.length; i++) {
                var client = this.world.clients[i];

                if(client.nick == nick) {
                    listOfIds.push(client.id);
                };
            };
            if(listOfIds.length) {
                var ids = listOfIds.join(", ");
                this.client.send(`There is total ${listOfIds.length}.\nIds: ${ids}`);
            } else {
                this.client.send("There is no ids");
            };
        } else {
            this.client.send("Usage:\n /getId [nick]");
        };
    }
    save() {
        server.manager.updateDatabase();
    }
}

module.exports = Commands;