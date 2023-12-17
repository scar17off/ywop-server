module.exports = (() => {
    let name = "Discord Gateway";
    let version = "1.0.6";

    function install() {
		const log = require('../modules/console/log.js');
   		const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');
        let config = new server.ConfigManager(name, {
            guildId: "1052691436384026655",
            channelId: {
                "1069763467537551381": "main"
            },
            prefix: "y!",
			allowPings: false
        }).config;

        let fs = require("fs");

        const bot = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMessages] });
        server.discord = bot;

        function getKeyByValue(object, value) {
            for (var prop in object) {
                if (object.hasOwnProperty(prop)) {
                    if (object[prop] === value)
                        return prop;
                };
            };
            return false;
        };

        bot.once("ready", () => {
            log("Ready!", 5, name);
        });

		server.events.on("chat", function(client, msg) {
      		var channelId = getKeyByValue(config.channelId, client.world);
      		if(!channelId) return;
      		let before = client.before.replace(/<(?:alt=("|')(.+?)\1|.|\n)+>/gm, "$2");
			if(!config.allowPings) before = client.before.replace(/<@([0-9]+)>/g, "{ping}");
      		bot.channels.cache.get(channelId).send(`**${before}:** ${msg}`);
    	});
        
        bot.on("messageCreate", async (message) => {
            if(message.author.bot) return;
            if(message.channel.type === "dm") return;
			
            if(message.channel.id == getKeyByValue(config.channelId, "main")) {
    			let attachmentLinks = [];
				if(message.attachments.size > 0) {
    				message.attachments.forEach(attachment => {
        				attachmentLinks.push(attachment.url);
    				});
  				};
                server.players.sendToWorld(config.channelId[message.channel.id], `[D] ${message.author.username}: ${message.content}${(attachmentLinks.length > 0) ? " " + attachmentLinks.join(" ") : ""}`);
            };
        });
        bot.login(process.env.token);
    }
    return {
        install,
        name,
        version
    }
})()