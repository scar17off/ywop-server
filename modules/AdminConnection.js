const log = require("./console/log.js");
const ranks = require("./connection/player/ranks.json");
const config = require("../config");

function getRank(id) {
    let found;
    for(let i in ranks)
        if(ranks[i].id == id) found = ranks[i];
    return found;
};

class AdminConnection {
    constructor(ws, req) {
        this.ws = ws;
        this.req = req;
		
		this.authorized = false;

        ws.on("message", this.onMessage.bind(this));
        ws.on("close", this.onClose.bind(this));
        ws.on("error", this.onError.bind(this));
		this.onOpen();
    };
	send() {
		if(!this.ws) return;
		var players = server.players.getAllPlayers();
		players = players.map(({ ws, req, ...player }) => player);

		this.ws.send(JSON.stringify({ type: "players", content: players }));
	};
	onOpen() {
		
	};
	onAuthorize() {
		this.authorized = true;
		this.send();
		
		server.events.on("playerUpdate", () => this.send());
		server.events.on("join", () => this.send());
		server.events.on("leave", () => this.send());
	};
    onMessage(message) {
        message = JSON.parse(message);

		// authorize user
		if(message.type == "auth" && !this.authorized && server.checkPassword("main", "adminlogin", message.password)) {
			this.onAuthorize();
		} else if(!server.checkPassword("main", "adminlogin", message.password)) {
			this.ws.send(JSON.stringify({ type: "redirect", path: "/" }));
		};
		// player actions
		if(this.authorized) {
			if(message.type == "kick") {
				let world = server.worlds.find(function(world) {
					return world.name == message.world;
				}.bind(this));
				
				let target = world.clients.find(function(item) {
					return item.id == message.target;
				}.bind(this));

				if(!target) return;
				
				target.ws.close();
			};
			if(message.type == "setrank") {
				let world = server.worlds.find(function(world) {
					return world.name == message.world;
				}.bind(this));
				
				let target = world.clients.find(function(item) {
					return item.id == message.target;
				}.bind(this));

				if(!target) return;
				
				target.setRank(message.rank);
			};
		};
    };
    onClose() {
        
    };
    onError(error) {
        console.log(error);
    };
};

module.exports = AdminConnection;