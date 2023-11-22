### To clean cache and chunkdata type `clean` in the console.
### If you're about to modify or host this server, please follow this requirements:

## ENV Variables:
`adminlogin` - password for /adminlogin command
<br>
`antiProxyKey` - get key here: proxycheck.io
<br>
`captchaBypass` - bypass password for captcha
<br>
`captchaKey` - get key here https://www.google.com/recaptcha/about/
<br>
`modlogin` - global modlogin
<br>
`token` - token for discord gateway bot
<br>
`databaseKey` - Secret key for every database in the server. (bans)
## Plugins
plugins with '-' on start or without '.js' at end will be ignored
<br>
`discord.js` - discord gateway

## CHANGE THIS (IMPORTANT!):
`/client/app.js:2449` (WS URL)
<br>
`/plugins/Discord Gateway/config.json` (CHANNEL ID, GUILD ID)
## Console
### There are console commands, you can access them by typing `help`.
## Plugin creation
### For plugin developers i made a documentations with a good examples, so you can modify the game without editing thousands of server code.