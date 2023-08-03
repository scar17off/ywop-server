let starttime = Date.now();
console.log('Loading libraries, please wait...');
const chalk = require("chalk");
const fs = require("graceful-fs");
const WebSocket = require("ws");
const express = require("express");
const EventEmitter = require("events");
const http = require("http");
const path = require('path');
const proxy_check = require('proxycheck-node.js');
const fetch = (...args) => import('node-fetch').then(({
    default: fetch
}) => fetch(...args));
const log = require('./modules/console/log.js');

const app = express();

app.use(function(req, res, next) {
  	res.header('Access-Control-Allow-Origin', '*');
  	res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  	next();
});

const httpserver = http.createServer(app);

log('Loading server modules');
const Plugin = require('./modules/Plugin.js');
const UpdateClock = require("./modules/server/UpdateClock.js");
const ConfigManager = require("./modules/server/ConfigManager.js");
const BansManager = require("./modules/server/BansManager.js");
const CryptedJSONdb = require("./modules/CryptedJSONdb.js");
var config = require("./config.json");
var wss;
var terminatedSocketServer = false;

global.server = {
    cbans: {},
    chalk,
	bans: require("./bans.json"),
    worlds: [],
    config,
    updateClock: new UpdateClock(),
    events: new EventEmitter(),
    plugins: [],
    ConfigManager,
    bansManager: new BansManager(),
    players: require("./modules/connection/player/players.js"),
    antiProxy: new proxy_check({
        api_key: process.env.antiProxyKey
    }),
    api: app,
    loadtook: 0,
	databases: {},
	checkPassword: (world, variable, password) => {
		const passwordFromDatabase = server.databases["worldData"].getValue(world, variable);
		const passwordFromEnvironment = process.env[variable];
		if(passwordFromDatabase !== '' && passwordFromDatabase == password) return true;
		if(passwordFromEnvironment !== '' && passwordFromEnvironment == password) return true;
		return false;
	}
};

const worldData = require("./modules/connection/world/worldData.js");
server.databases["worldData"] = worldData;

const Command = require("./modules/console/command.js");
const manager = require("./modules/server/manager.js");
server.manager = manager;
const Connection = require('./modules/Connection.js');

log('Starting OWOP server on *:' + config.port);

server.helpmsg = `/shutdown - Shutdown the server
/eval [code] - Evaluates the given code
/setmodlogin [world] [pass] - Per world mod logins
/say [msg] - Say message globally
/pl - List of plugins
/setrank [id] [rank] - Set player rank
/world [worldName] - Get world info from database
/setprop [worldName] [property] - Set world property
/setpbucket [worldName] [100x2] - Set world pixelbucket
/whois [id] - Player information
/cls - Clear console`;

if(config.ignoreErrors) {
    process.on('uncaughtException', function(ex) {
		if(config.showFormattedErrors) log('Uncaught Exception: ' + ex.message, 1);
        if(config.showErrors) console.log(ex);
		else return;
    });
};

function followSyntax(plugin) {
    if(typeof plugin.name == "string" &&
        typeof plugin.version == "string" &&
        typeof plugin.install == "function") return true;
    else return false;
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
function loadPlugins() {
    let folder = 'plugins';
    fs.readdirSync(`./${folder}/`).forEach(file => {
		if(!file.endsWith(".js")) return;
        if(!file.startsWith("-")) {
            let plugin = require(`./${folder}/` + file);
            log(`[${plugin.name}] Loading ${plugin.name} v${plugin.version}`);
            plugin.loaded = true;
            plugin.filename = file;
			
            if(followSyntax(plugin)) {
                let start = Date.now();
                plugin.install();
                let end = Date.now();
                plugin.took = end - start;
                log(`[${plugin.name}] Enabling ${plugin.name} v${plugin.version} took${timeConverter(plugin.took / 1000)}`);

                if(typeof plugin.onload == 'function') plugin.onload();
                server.plugins.push(new Plugin(plugin));
            } else {
                plugin.filename = file;
                plugin.loaded = false;
                let ex = 'Doesn\'t follow syntax';
                log(`Could not load '${folder}/${plugin.filename}' in folder '${folder}'\n${ex}`, 1);
                server.plugins.push(new Plugin(plugin));
            };
        } else {
            let plugin = require(`./${folder}/${file}`);
            plugin.loaded = false;
            server.plugins.push(new Plugin(plugin));
		};
    });
};

loadPlugins();

function createWSServer() {
    wss = new WebSocket.Server({
        server: httpserver
    });
    wss.on("connection", async function(ws, req) {
        let ip = (req.headers['x-forwarded-for'] || req.connection.remoteAddress).split(",")[0].replace('::ffff:', '');
        if(terminatedSocketServer) {
            ws.send(config.closeMsg);
            ws.close();
        };
        if(server.bansManager.checkIfIsBanned(ip)) {
            let ban = server.bansManager.bans[ip];
			let rem = server.bansManager.banEndsAfter(ip);
            if(!isNaN(ban.duration)) {
                let banString = server.bansManager.generateString(server.bansManager.banEndsAfter(ip));
                ws.send(`You are banned: ${ban.reason}\n${config.messages.unbanMessage}.\nTime remaining: ${timeConverter(ban.duration)}`);
            } else {
                ws.send(`You are permanently banned: ${ban.reason}\n${config.messages.unbanMessage}.`);
            };
            ws.close();
            return;
        };
        if(config.maxConnections > 0) {
            if(server.players.getAllPlayers().length >= config.maxConnections) {
                ws.send("Reached max connections limit")
                ws.close();
                return;
            };
        };
        if(config.maxConnectionsPerIp > 0) {
			let players = server.players.getAllPlayersWithIp(ip);

			let ranks = Object.values(players).map(player => player.rank);

			if(players.length > 0) {
				if(ranks.includes(3)) {
				
		            if(players.length >= config.maxConnectionsPerAdminIp) {
		                ws.send("Reached max connections per ip limit");
		                ws.close();
		                return;
		            };
				} else {
					if(players.length >= config.maxConnectionsPerIp) {
		                ws.send("Reached max connections per ip limit");
		                ws.close();
		                return;
		            };
				};
			};
        };
        if(config.antiProxy.status == true) {
            let result = await server.antiProxy.check(ip, {
                vpn: config.antiProxy.vpnCheck,
                limit: config.antiProxy.limit
            });
            if(result.status == "denied" && result.message[0] == "1") {
                log("Check your dashboard the queries limit reached!", 5, "AntiProxy");
            };
            if(result.error || !result[ip]) return;
            if(result[ip].proxy == "yes") {
                ws.close();
            };
        };
        if(config.CountryBan) {
            fetch('https://ipapi.co/' + ip + '/json/').then(i => i.json()).then(i => {
                if(server.cbans.hasOwnProperty(i.country_name) || config.BannedCountries.hasOwnProperty(i.country_name)) {
                    server.bansManager.addBanIp(ip, "CountryBan", 60);
                    ws.close();
                };
            });
        };

        new Connection(ws, req);
    });

    httpserver.listen(config.port, () => {
        server.loadtook = Date.now() - starttime;
        log(`Done loading in ${timeConverter(server.loadtook / 1000)}! For help, type "help"`);
        log('Query running on 0.0.0.0:' + config.port);
    });
};

server.events.on("chat", async function(client, msg) {
    if(config.antiProxy.status == "chatmode") {
      	let result = await server.antiProxy.check(client.ip, {
        	vpn: config.antiProxy.vpnCheck,
        	limit: config.antiProxy.limit
     	});
      	if(result.status == "denied" && result.message[0] == "1") {
        	log("Check your dashboard the queries limit reached!", 5, "AntiProxy");
      	};
      	if(result.error || !result[client.ip]) return;
      	if(result[client.ip].proxy == "yes") {
        	server.BansManager.addBanIp(client.ip, 300, "Antiproxy");
      	};
	};
});

let files = [];

// thanks arthurDent ( https://stackoverflow.com/users/8842015/arthurdent )
const getFilesRecursively = (directory) => {
    const filesInDirectory = fs.readdirSync(directory);
    for(const file of filesInDirectory) {
        let absolute = path.join(directory, file);
        if(fs.statSync(absolute).isDirectory()) {
            getFilesRecursively(absolute);
        } else {
            files.push(absolute);
            let routePath = `/${path.relative("routing/client/", absolute)}`;
            app.get(routePath, (req, res) => {
                return res.sendFile(absolute, {
                    root: '.'
                });
            });
        };
    };
};
getFilesRecursively("./routing/client/");

app.get('/*', (req, res) => {
	if(req.params[0] == "admin") {
		return res.sendFile(`./routing/admin/index.html`, {
			root: '.'
	    });
	};
	
    return res.sendFile("./routing/client/index.html", {
        root: '.'
    });
});

app.get('/api', (req, res) => {
    let ip = (req.headers['x-forwarded-for'] || req.connection.remoteAddress).split(",")[0].replace('::ffff:', '');
    let yourConns = server.players.getAllPlayersWithIp(ip).length;
    let captchaEnabled = config.captcha.enabled;
    let maxConnectionsPerIp = config.maxConnectionsPerIp;
    let users = server.players.getAllPlayers().length;
    
    let toReturn = {
        banned: server.bansManager.checkIfIsBanned(ip) ? -1 : 0,
        captchaEnabled: captchaEnabled,
        maxConnectionsPerIp: maxConnectionsPerIp,
        users: users,
        yourConns: yourConns,
        yourIp: ip
    };

    res.send(JSON.stringify(toReturn));
});

app.get('/api/banme', (req, res) => {
	let ip = (req.headers['x-forwarded-for'] || req.connection.remoteAddress).split(",")[0].replace('::ffff:', '');

	server.bansManager.addBanIp(ip, "Selfban", -1);
});

app.get('/api/playerinfo', (req, res) => {
    let id = req.headers["x-player-id"];
    let password = req.headers["x-password"];

	let access = false;
	access = server.checkPassword("main", "adminlogin", password);
	if(!access) access = server.checkPassword("main", "modlogin", password);
	
    if(!access) {
        res.status(403).send("Forbidden");
        return;
    };

    if(!id || !password) {
        res.status(400).send("Bad Request");
        return;
    };

    id = parseInt(id);
    let target = {};

    let player = server.players.getAllPlayersWithId(id)[0];
    if(!player) {
        res.status(404).send("Not Found");
        return;
    };

    let visibleInfo = ["x_pos", "y_pos", "col_r", "col_g", "col_b", "tool", "warnlvl", "id", "nick", "rank", "ip", "world"];

    for(let i in visibleInfo) {
        target[visibleInfo[i]] = player[visibleInfo[i]];
    };

    res.json(target);
});

var rl = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout,
	prompt: "" // custom
});

rl.prompt();

if(process.platform === "win32") {
    rl.on("SIGINT", function() {
        process.emit("SIGINT");
    });
};

async function exit() {
    console.log("Exiting...");
    for(var w in server.worlds) {
        var world = server.worlds[w];
        for(var c = 0; c < world.clients.length; c++) {
            var client = world.clients[c];
            client.send(config.messages.closeMsg);
        };
    };
    await server.manager.close_database();
    process.exit();
};

process.on("SIGINT", exit)
process.on("beforeExit", exit);

rl.on("line", function(d) {
    var msg = d.toString().trimLeft().trimRight();
    if(terminatedSocketServer) return;
	if(msg.startsWith('/')) msg = msg.replace('/', '');
    new Command(msg);
	rl.prompt();
});

createWSServer();