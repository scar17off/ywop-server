const worldTemplate = require("./connection/world/worldTemplate.js");
const captchaStates = require("./connection/captcha/captchaStates.js");
const Commands = require("./connection/commands/Commands.js");
const protocol = require("./server/protocol.js");
const Case = require('./connection/player/cases.js');
const Bucket = require("./connection/player/Bucket.js");
const Captcha = require("./connection/captcha/Captcha.js");
const Client = require('./connection/player/Client.js');
const ranks = require('./connection/player/ranks.json');
const worldData = server.databases["worldData"];
const log = require("./console/log.js");
const config = require("../config");
const request = require("request");

function getKeyByValue(object, value) {
    for(var prop in object) {
        if(object.hasOwnProperty(prop)) {
            if(object[prop] === value)
                return prop;
        };
    };
    return false;
};

function getRank(id) {
    let found;
    for(let i in ranks)
        if(ranks[i].id == id) found = ranks[i];
    return found;
};

function getDefaultRank() {
    for(const key in ranks) {
        if(ranks.hasOwnProperty(key) && ranks[key].default) {
            return ranks[key];
        };
    };
    return null;
};

class Connection {
    constructor(ws, req) {
        this.ws = ws;
        this.req = req;
        this.world = null;
        this.client = new Client(ws, req);
        this.player = false; 
        this.captcha = new Captcha(this.client, server.worlds);

        ws.on("message", this.onMessage.bind(this));
        ws.on("close", this.onClose.bind(this));
        ws.on("error", this.onError.bind(this));

        this.captcha.show();
    };
    onMessage(message) {
        var data = new Uint8Array(message)
        var dv = new DataView(data.buffer)
        var len = message.length;
        var isBinary = (typeof message == "object");
		
        if(this.player && isBinary && this.captcha.state == "ok") {
            // player is sending not a message in chat, but a message to the server (placing pixel, requesting chunk, see: cases.js)
            new Case(message, this.client, this.world)
        } else if(this.player && !isBinary && this.captcha.state == "ok") {
            if(!this.client.chatBucket.canSpend(1)) return;
			
            if(len > 1 && message[len - 1] == String.fromCharCode(10)) {
                var chat = message.slice(0, len - 1).trim();
                if(chat.length < server.config.maxChatLength || getRank(this.client.rank).gamePermissions.includes("bypassMaxChatLength")) {
                    if(chat[0] == "/") {
                        new Commands(chat, this.client, this.world);
						log(`${this.client.nick == '' ? this.client.id : this.client.nick + ` (${this.client.id})`} issued server command: ${chat}`, 4);
                    } else {
                        if(this.client.rank === 1) {
                            var string = chat.split("\n").slice(0, 3).join("\n"); //weirdo way
                            string += chat.split("\n").slice(3).join("")
                            chat = string;
                        };
						
                        const rankInfo = getRank(this.client.rank);
						
						let before = "";
						if (!this.client.hiderank) {
							let hasPrefix = rankInfo.prefix !== '';
						  	if(hasPrefix) before += rankInfo.prefix + " ";
						};
						
						if (this.client.nick) {
						  	before += rankInfo.hideID ? this.client.nick : `[${this.client.id}] ${this.client.nick}`;
						} else {
						  	before += this.client.id;
						};
						
						this.client.before = before;
						
						log(`${before}: ${chat}`, 2);
						
						const color = this.client.chatc !== "" ? `<span style="color: ${this.client.chatc}">` : "";
						server.players.sendToWorld(this.client.world, color + before + ": " + chat + (color ? "</span>" : ""));
						
						server.events.emit("chat", this.client, chat);
                    };
                };
            };
        } else if(!this.player && isBinary && this.captcha.state == "ok") {
            //player on real connect
            if(len > 2 && len - 2 <= 24) {
                for(var i = 0; i < data.length - 2; i++) {
                    this.client.world += String.fromCharCode(data[i]);
                }
                this.client.world = this.client.world.replace(/[^a-zA-Z0-9\._]/gm, "").toLowerCase();
                if(!this.client.world) this.client.world = "main";
                this.world = server.worlds.find(function(world) {
                    return world.name == this.client.world
                }.bind(this));
                if(!this.world) {
                    server.manager.world_init(this.client.world)
                    this.world = new worldTemplate(this.client.world);
                    server.worlds.push(this.world)
                    server.events.emit("newWorld", this.world)
                };

                this.client.setId(this.world.latestId);
                this.client.setRank(getDefaultRank().id);

                var pass = server.manager.get_prop(this.world.name, "pass");
                if(pass) {
                    this.client.send(`<span style="color: #ed2b2b">[Server] </span><span style="color: #969696;">This world has a password set. Use '/pass [password]' to unlock drawing.</span>`)
                    this.client.setRank(getDefaultRank().id);
                };
                var motd = this.world.getProp("motd");
                if(motd) this.client.send(motd);
                this.world.latestId++;
                this.player = true;
                this.world.clients.push(this.client);
				if(this.client.rank < 2 && worldData.getPlaceBucket(this.client.world)) {
					let world = worldData.getPlaceBucket(this.client.world);
					this.client.setPixelBucket(world.p, world.s);
				};
				if(server.config.maxPlayersInWorld > 0) {
					if(this.world.isFull()) {
						this.client.send("World is full");
						this.client.ws.close();
						return;
					};
				};
                server.events.emit("join", this.client);
                // send client list to that client
                server.updateClock.doUpdatePlayerPos(this.world.name, {
                    id: this.client.id,
                    x: 0,
                    y: 0,
                    r: 0,
                    g: 0,
                    b: 0,
                    tool: 0
                });
                for(var w in this.world.clients) {
                    var cli = this.world.clients[w];
                    var upd = {
                        id: cli.id,
                        x: cli.x_pos,
                        y: cli.y_pos,
                        r: cli.col_r,
                        g: cli.col_g,
                        b: cli.col_b,
                        tool: cli.tool
                    };
                    server.updateClock.doUpdatePlayerPos(this.world.name, upd);
                };
            };

        } else if(!this.player && !isBinary && this.captcha.state == "waiting") {
            this.captcha.onToken(message);
        };
    };
    onClose() {
        if(!this.world) return;
        if(!this.client) return;
        server.events.emit("leave", this.client)
        var worldIndex = server.worlds.indexOf(this.world);
        var clIdx = this.world.clients.indexOf(this.client);
        if(clIdx > -1) {
            server.updateClock.doUpdatePlayerLeave(this.world.name, this.client.id)
            delete this.world.clients[clIdx]
            this.world.clients.sort().pop()
        };
        if(!this.world.clients.length) {
            server.manager.world_unload()
            delete server.worlds[worldIndex]
            server.worlds.sort().pop()
        };
    };
    onError(error) {
        console.log(error);
    };
};

module.exports = Connection;