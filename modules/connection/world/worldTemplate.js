const ranks = require("../../connection/player/ranks.json");

class WorldTemplate {
	constructor(name) {
		this.name = name;
		this.latestId = 1;
		this.motd = this.getProp("motd") || "";
		this.maxPlayers = server.databases["worldData"].getValue("maxPlayers", this.name) || server.config.maxPlayersInWorld;
		this.clients = [];
		this.pixelBucket = ranks["user"].placeBucket.split("x").map(Number);;
        this.chatBucket = ranks["user"].chatBucket.split("x").map(Number);;
	};
	isFull() {
		return this.clients.length >= this.maxPlayers+1;
	};
	kickAll() {
		for(let i in this.clients) this.clients[i].ws.close();
	};
	setPlaceBucket(per, rate) {
		server.databases["worldData"].setValue(per, this.name, "pixelquota", "p");
		server.databases["worldData"].setValue(rate, this.name, "pixelquota", "s");
		this.pixelBucket = [parseInt(per), parseInt(rate)];
		for(let i in this.clients) {
			this.clients[i].setPixelBucket(parseInt(per), parseInt(rate));
		};
	};
	setProp(key, value) {
    	this[key] = value;
		server.databases["worldData"].setValue(value, this.name, key);
  	};
	getProp(key) {
		return this[key] || server.databases["worldData"].getValue(key, this.name);
	};
	setMOTD(text) {
		server.databases["worldData"].setValue(text, this.name, "motd");
		this.motd = text;
	};
};

module.exports = WorldTemplate;