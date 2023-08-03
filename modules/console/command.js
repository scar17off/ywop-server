const worldTemplate = require("../../modules/connection/world/worldTemplate.js");
const { getAllPlayers, getAllPlayersWithId } = require("../../modules/connection/player/players.js");
const ranks = require("../../modules/connection/player/ranks.json");
const worldData = server.databases["worldData"];
const log = require('./log.js');
const fs = require("fs");
const fetch = (...args) => import('node-fetch').then(({
    default: fetch
}) => fetch(...args));

function getRank(id) {
    let found;
    for(let i in ranks)
        if(ranks[i].id == id) found = ranks[i];
    return found;
};

function getWorld(worldName) {
	let world = server.worlds.find(function(world) {
        return world.name == worldName;
    }.bind(this));
	
	if(!world) {
        server.manager.world_init(worldName);
        world = new worldTemplate(worldName);
        server.worlds.push(world);
        server.events.emit("newWorld", world);
		return world;
    } else {
		return world;
	};
};

class Command {
	constructor(input) {
		this.input = input;
		this.args = input.split(' ');
		this.cmd = this.args[0];
		this.args.shift();

		if(typeof this[this.cmd] == "function") this[this.cmd](...this.args);
	};
	help() {
		console.log(server.helpmsg);
	};
	shutdown() {
		exit();
	};
	eval(code) {
		try {
            console.log(String(eval(code)));
        } catch (e) {
            console.log(e);
        };
	};
	setmodlogin(world, password) {
		if(!password) {
			server.databases["worldData"].setValue('', world, "modlogin")
			return;
		};
        server.databases["worldData"].setValue(password, world, "modlogin");
	};
	setpbucket(worldName, quota) {
        if(quota) {
            var newPQuota = quota.split("x");

             worldData.setPlaceBucket(worldName, ...newPQuota);
        } else {
            worldData.deleteKey(world, "pixelbucket");
        };
    };
	world(worldName) {
		if(!worldName) {
			log("No world specified! Usage: /world [worldName]", 3);
			return;
		};
		let world = getWorld(worldName);
		let worldBucket = worldData.getPlaceBucket(worldName).p + 'x' + worldData.getPlaceBucket(worldName).s;

		if(!worldData.getPlaceBucket(worldName).p || !worldData.getPlaceBucket(worldName).s) {
			worldBucket = ranks["user"].placeBucket;
		};
		
		console.log(worldBucket);
		
		log("World: " + worldName);
		log("-> PixelBucket: " + worldBucket);
		log("-> Modlogin: " + (server.databases["worldData"].getValue(worldName, "modlogin") || (worldName == "main" ? (typeof process.env.modlogin == "undefined" ? "No modlogin" : process.env.modlogin) : "No modlogin")));
		log("-> MOTD: " + (world.getProp("motd") ? world.getProp("motd") : "No MOTD"));
		log("-> Max players: " + (world.getProp("maxPlayers") ? world.getProp("maxPlayers") : "256"));
	};
	setprop(worldName, property) {
        var value = this.args;
        value.shift();
        value.shift();
        value = value.join(" ")
            .trim();
        if(property && value) {
            server.manager.set_prop(worldName, property, value);
            log(`Set world property ${property} to ${value}`);
        } else if(property && !value) {
            log(`Value of ${property} is ${server.manager.get_prop(worldName, property, "undefined")}`);
        } else if(!property || !worldName) {
            log("No property or world specified! Usage:\n /setprop [worldName] [property] [value]\n or /setprop [property] to get value", 3);
        };
    };
	clean() {
		fs.rmSync("./worlds/", { recursive: true, force: true });
		fs.rmSync("./logs/", { recursive: true, force: true });
		fs.writeFileSync("./bans.json", "{}");
		log("Successfully cleaned the server from cache. Stopping the server...", 3);
		process.exit(1);
	};
	cls() {
		const { clear } = require('console');

		clear();
	};
	whois(id) {
	    id = parseInt(id);
	    let targets = getAllPlayersWithId(id);
		
	    if(targets.length > 0) {
			targets.forEach(target => {
				fetch('https://ipapi.co/' + target.ip + '/json/')
			        .then(i => i.json())
			        .then(i => {
						if(targets.length > 1) log(`-> World: ${target.world}`);
		    			log(`-> ID: ${target.id}`);
		    			log(`-> Nick: ${target.nick || "Not set"}`);
			            log(`-> IP: ${target.ip}`);
				        log(`-> Rank: ${getRank(target.rank).fullName}`);
				        log(`-> Tool: ${target.tool}`);
				        log(`-> RGB: ${target.col_r} ${target.col_g} ${target.col_b}`);
			            log(`-> X, Y: ${target.x_pos}, ${target.y_pos}`);
			            log(`-> Connections from this IP: ${server.players.getAllPlayersWithIp(target.ip).length}`);
			            log(`-> Warning level: ${target.warnlvl.toString()}`);
				        log(`-> Origin header: ${target.req.headers.origin}`);
				        log(`-> Vanished: ${target.vanish ? "Yes" : "No"}`);
				        log(`-> Location: ${i.country_name}, ${i.region}, ${i.city}${(targets.length > 1) ? "\n" : ''}`);
			        });
			});
	    } else if(!id) {
			log(`No ID provided. Usage: /whois [id]`, 3);
		} else {
	        log(`User with id ${id} not found.`, 3);
	    };
	};
	say(msg) {
		function sendToWorlds(D) {
            for (var gw in server.worlds) {
                var worldCurrent = server.worlds[gw];
                var clientsOfWorld = worldCurrent.clients;
                for (var s = 0; s < clientsOfWorld.length; s++) {
                    clientsOfWorld[s].send(D);
                };
            };
        };
        sendToWorlds("[Server]: " + msg);
	};
	pl() {
		let finalstring = [];
		for(let i in server.plugins) {
			let plugin = server.plugins[i];
			if(plugin.loaded) finalstring.push(server.chalk.green(plugin.name));
			else finalstring.push(server.chalk.red(plugin.name));
		};
		log(`Plugins (${finalstring.length}): ${finalstring.join(', ')}`);
	};
	setrank(id, rank) {
		if(!id) return;
		if(!rank) rank = 1;
		var destination = getAllPlayers().filter(item => item.id == id)[0];
		if(destination) destination.setRank(rank);
		else log(`User with id ${id} not found.`, 3);
	};
};

module.exports = Command;