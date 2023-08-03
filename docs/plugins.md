## Plugin API
### The server has a plugin system and an API.
#### Server events
`requestChunk [Client, x, y]`
<br>
`protectChunk [Client, tileX, tileY, protected]`
<br>
`chat [Client, message]`
<br>
`newWorld [WorldTemplate]`
<br>
`savedWorlds []`
<br>
`command [Client, command, args]`
### Interacting with events
```javascript
server.events.on("event", (something) => {
	// your code
});
```
#### How to make commands
You don't have to modify the server, you can just make it inside your plugin. Example plugin:
```javascript
module.exports = (() => {
    let name = "Echo command";
    let version = "1.0.0";

    function install() {
		const Commands = require("./modules/connection/commands/Commands.js");
		
		Commands.prototype.echo = (message) => {
			Commands.client.send(message);
		};
	};
	return {
        install,
        name,
        version
    };
})();
```