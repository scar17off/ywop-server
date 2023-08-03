## Worlds
### As in the official OWOP, there are worlds.
### Server's storing online WorldTemplate classes in  `server.worlds []`.
## class WorldTemplate
### Properties:
`name` - world name
<br>
`latestID` - Latest ID of player.
<br>
`motd` - World MOTD. The message that server is sending when a player joins.
<br>
`maxPlayers` - Maximum limit of players in the world.
<br>
`clients []` - Arraylist of a clients in the world.
<br>
`pixelBucket [per, rate]` - PixelBucket. (won't affect on rank 2 and higher)
<br>
`chatBucket [per, rate]` - ChatBucket. (won't affect on rank 2 and higher)
### Methods:
`isFull()` - Check if the world is full.
<br>
`kickAll()` - Kick everyone in the world.
<br>
`setPlaceBucket(per, rate)` - Set world place bucket
<br>
`setProp(key, value)` - Set a specific property in the server and worlds database.