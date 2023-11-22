const protocol = require('../../server/protocol.js');
const getTile = require('../world/getTile.js');
const compress_data_to = require("../world/compressData.js");
const ranks = require("./ranks.json");
const eq = (a, b) => a[0] === b[0] && a[1] === b[1] && a[2] === b[2];

function getRank(id) {
    let found;
    for(let i in ranks)
        if(ranks[i].id == id) found = ranks[i];
    return found;
};

class Case {
    constructor(message, client, world) {
        this.message = message
        this.client = client
        this.world = world
        this.data = new Uint8Array(this.message)
        this.dv = new DataView(this.data.buffer)
        this.len = this.message.length;
        this.case()
    }
    case() {
        switch (this.len) {
            case protocol.client.rankVerification:
                var clientRank = this.dv.getUint8(0);
                if (clientRank > this.client.rank) {
                    this.client.ws.close();
                };
                break;
            case protocol.client.requestChunk:
                var x = this.dv.getInt32(0, true);
                var y = this.dv.getInt32(4, true);
                server.events.emit("requestChunk", this.client, x, y)
                var tile = getTile(this.world.name, x, y, server.manager);
                this.client.send(tile);
                break;
            case protocol.client.protectChunk:
                if (getRank(this.client.rank).gamePermissions.includes("protect")) {
                    var tileX = this.dv.getInt32(0, true);
                    var tileY = this.dv.getInt32(4, true);
                    var tile_protect = !!this.dv.getUint8(8);
                    server.events.emit("protectChunk", this.client, tileX, tileY, tile_protect)

                    server.manager.set_chunk_protection(this.world.name, tileX, tileY, tile_protect);
                    var newState = new Uint8Array(10)
                    var newState_dv = new DataView(newState.buffer);
                    newState_dv.setUint8(0, protocol.server.chunkProtected);
                    newState_dv.setInt32(1, tileX, true);
                    newState_dv.setInt32(5, tileY, true);
                    newState_dv.setUint8(9, tile_protect);


                    server.players.sendToWorld(this.world.name, newState)
                } else {
                    this.client.ws.close()
                }
                break;
            case protocol.client.setPixel:
                if (this.client.rank === 0) return;
                if (!this.client.pixelBucket.canSpend(1) && !this.client.pixelBucket.infinite) return;
                var x = this.dv.getInt32(0, true);
                var y = this.dv.getInt32(4, true);
                var r = this.dv.getUint8(8);
                var g = this.dv.getUint8(9);
                var b = this.dv.getUint8(10);

                var tileX = Math.floor(x / 16);
                var tileY = Math.floor(y / 16);
                var pixX = x - Math.floor(x / 16) * 16;
                var pixY = y - Math.floor(y / 16) * 16;

				if(eq(server.manager.get_pixel(this.world.name, tileX, tileY, pixX, pixY), [r, g, b])) return;

                var distx = Math.trunc(x / 16) - Math.trunc(this.client.x_pos / (16 * 16));
                distx *= distx;
                var disty = Math.trunc(y / 16) - Math.trunc(this.client.y_pos / (16 * 16));
                disty *= disty;
                var dist = Math.sqrt(distx + disty);

				let borderReached = false;

				if(server.config.worldborder.enabled) {
					if((x >= server.config.worldborder.x * 16 ||
						y >= server.config.worldborder.y * 16 ||
						x <= -server.config.worldborder.x * 16 ||
						y <= -server.config.worldborder.y * 16) &&
					   	!getRank(this.client.rank).gamePermissions.includes("editOutsideBorder") &&
					   	server.config.worldborder.x !== -1 &&
					  	server.config.worldborder.x !== -1
					) borderReached = true;
				};
				
                if ((dist < 3 || getRank(this.client.rank).gamePermissions.includes("anyDrawDistance")) && !borderReached) {
                    if (server.manager.chunk_is_protected(this.client.world, tileX, tileY) && !getRank(this.client.rank).gamePermissions.includes("protect")) return;
                    server.events.emit("setPixel", this.client, x, y, [r, g, b]);
                    server.updateClock.doUpdatePixel(this.client, {
                        x,
                        y,
                        r,
                        g,
                        b,
                        id: this.client.id
                    });
                    server.manager.set_pixel(this.world.name, tileX, tileY, pixX, pixY, r, g, b);
                };
                break;
            case protocol.client.playerUpdate:
                var x = this.dv.getInt32(0, true);
                var y = this.dv.getInt32(4, true);
                var r = this.dv.getUint8(8);
                var g = this.dv.getUint8(9);
                var b = this.dv.getUint8(10);
                var tool = this.dv.getUint8(11);

                this.client.x_pos = x;
                this.client.y_pos = y;
                this.client.col_r = r;
                this.client.col_g = g;
                this.client.col_b = b;
                // vanish worker
                if(this.client.vanish) {
                    this.client.x_pos = 0;
                    this.client.y_pos = 0;
                    this.client.col_r = 0;
                    this.client.col_g = 0;
                    this.client.col_b = 0;
                };
                // users won't be able to take mod/admin tools
				// TODO: make it normal way associated with ranks.json
                let NONEmodToolsIDs = [9, 10, 11, 12, 14, 3];
                if (NONEmodToolsIDs[tool] && this.client.rank >= 2) {
                    this.client.tool = tool;
                    tool = tool;
                } else if (NONEmodToolsIDs[tool] && this.client.rank < 2) {
                    this.client.tool = 0;
                    tool = 0;
                } else if (!NONEmodToolsIDs && this.client.rank < 2) {
                    this.client.tool = tool;
                    tool = tool;
                };
                server.events.emit("playerUpdate", this.client, x, y, [r, g, b], tool)
                server.updateClock.doUpdatePlayerPos(this.world.name, {
                    id: this.client.id,
                    x,
                    y,
                    r,
                    g,
                    b,
                    tool
                });
                break;
            case protocol.client.clearChunk:
                if(getRank(this.client.rank).gamePermissions.includes("clearChunks")) {
				    var x = this.dv.getInt32(0, true);
				    var y = this.dv.getInt32(4, true);
				    var r = this.dv.getUint8(8);
				    var g = this.dv.getUint8(9);
				    var b = this.dv.getUint8(10);

				    var currentChunkColor = server.manager.get_chunk(this.world.name, x, y);

					var newData = new Uint8Array(16 * 16 * 3); for (var i = 0; i < 16 * 16 * 3;) { newData[i++] = 255; newData[i++] = 255; newData[i++] = 255; };

				    server.events.emit("clearChunk", this.client, x, y, [r, g, b]);
				
				    var newData = new Uint8Array(16 * 16 * 3);
				    for(var i = 0; i < 16 * 16 * 3;) {
				        newData[i++] = r;
				        newData[i++] = g;
				        newData[i++] = b;
				    };
				    server.manager.set_chunk_rgb(this.world.name, x, y, newData);
				    var newTileUpdated = getTile(this.world.name, x, y);
				    server.players.sendToWorld(this.world.name, newTileUpdated);
                } else {
                    this.client.ws.close();
                };
                break;
            case protocol.client.paste:
                if (getRank(this.client.rank).gamePermissions.includes("paste")) {
                    var x = this.dv.getInt32(0, true);
					var y = this.dv.getInt32(4, true);
					var offset = 8;
					var newData = new Uint8Array(16 * 16 * 3);
					for(var i = 0; i < 16 * 16 * 3; i++) {
					    newData[i] = this.dv.getUint8(i + offset);
					};

					var r = newData[0];
					var g = newData[1];
					var b = newData[2];
					var currentChunkColor = server.manager.get_chunk(this.world.name, x, y);
					
					server.events.emit("paste", this.client, x, y, newData);
					server.manager.set_chunk_rgb(this.world.name, x, y, newData);
					var newTileUpdated = getTile(this.world.name, x, y);
					server.players.sendToWorld(this.world.name, newTileUpdated);
                } else {
                    this.client.ws.close();
                };
                break;
        }
    }
}

module.exports = Case
