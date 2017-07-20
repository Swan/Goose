# Goose
Goose is a Discord bot that was made specifically for the [Ripple](https://ripple.moe) Discord server. It is a fairly basic bot but written with scalability in mind. 

**Currently its features consist of:**

* Welcoming users when they join the server.
* Sending a good-bye when users leave the server.
* Handling & dumping reports from users to a private channel.
* Automatically pinning reports from users (in a private channel).
* Connection to the Ripple WebSocket to track user scores.
* Alerting a private channel if there are "suspicious" (High PP) scores. 
* Ban user command.
* Kick user command.
* Mute user command.
* Unmute user command.
* Prune (@user) command.
* Send #playerreporting embed command.
* Say Ccommand.

**Commands In Depth**
* `.say (channelId) (Message)` - Fun command for the bot owner to say a message to any channel the bot has access to.
* `.pr / .playerreporting` - Sends the report information embed to the sent channel.
* `.mute / m @user` - Mutes a given user.
* `.unmute / um @unmute` - Unmutes a given user.
* `.kick / .k` - Kicks a user from the server.
* `.ban / .b` - Bans a user from the server.
* `.prune / .purge / .p (@user) (amount)` - Mass deletes x amount of messages from a channel, or a user.

