function getAllPlayersWithIp(ip) {
    var players = [];
    for(var i = 0; i < server.worlds.length; i++) {
        var world = server.worlds[i];
        for(var c = 0; c < world.clients.length; c++) {
            var client = world.clients[c];
            if(client.ip == ip) players.push(client);
        };
    };
    return players;
};

function getAllPlayersWithId(id) {
    var players = [];
    for(var i = 0; i < server.worlds.length; i++) {
        var world = server.worlds[i];
        for(var c = 0; c < world.clients.length; c++) {
            var client = world.clients[c];
            if(client.id == id) players.push(client);
        };
    };
    return players;
};

function sendToAll(message, rank = 0) {
    for(var i = 0; i < server.worlds.length; i++) {
        var world = server.worlds[i];
        for(var c = 0; c < world.clients.length; c++) {
            var client = world.clients[c];
            if(client.rank >= rank) client.send(message);
        };
    };
};

function getAllPlayers() {
    var players = [];
    for(var i = 0; i < server.worlds.length; i++) {
        var world = server.worlds[i];
		if(typeof world.clients == "undefined") return;
        for(var c = 0; c < world.clients.length; c++) {
            var client = world.clients[c];
            players.push(client);
        };
    };
    return players;
};

function sendToWorld(worldName, message, rank = 0) {
    let world = server.worlds.find(function(world) {
        return world.name == worldName;
    });
    if(!world) return;
    if(world.clients.length == 0) return;
    world.clients.forEach(function(client) {
        if(client.rank >= rank) client.send(message);
    });
};

module.exports = {
    getAllPlayers,
    getAllPlayersWithIp,
	getAllPlayersWithId,
    sendToAll,
    sendToWorld
};