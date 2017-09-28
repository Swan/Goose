# Goose
Goose is a Discord bot that was made specifically for the [Ripple](https://ripple.moe) Discord server. This version of Goose is only part of the entire bot, but it contains most of its core features.

**Currently its features consist of:**

* Welcoming users when they join the server.
* Sending a good-bye when users leave the server.
* Handling & dumping reports from users to a private channel.
* Automatically pinning reports from users (in a private channel).
* Connection to the Ripple WebSocket to track user scores.
* Alerting a private channel if there are "suspicious" (High PP) scores. 
* Some neat administrative commands.

# Requirements
* NPM/Node.js v7.0+
* TypeScript Compiler
* MongoDB

# Commands
Below is a list of all the commands this version of Goose has

| Command | Description | Permission Required | Usage |
| --- | --- | --- | --- |
| **.pr/.playerreporting** | Sends an embedded message with information regarding player reports | OWNER | .pr |
| **.k/.kick**| Kicks a mentioned user from the server | KICK_MEMBERS | .kick @Swan |
| **.m/.mute** | Mutes a mentioned user from text/voice chat - either timed or forever | MUTE_MEMBERS | .m @Swan **OR** .mute @Swan 10 m Spamming |
| **.u/.unmute** | Unmutes a mentioned user from text/voice chat | MUTE_MEMBERS | .u @Swan |
| **.b/.ban** | Bans a mentioned user from the server | BAN_MEMBERS | .b @Swan |
| **.p/.prune/.purge** | Deletes messages in bulk from either the entire chat or a given user | MANAGE_MESSAGES | .prune 10 **OR** .prune @Swan 5 |
| **.f/.filter** | Deletes messages if they contain a certain keyword | MANAGE_MESSAGES | .filter stupid |

# Setup
To setup the bot for yourself, you'll have to do quite a bit of stuff, but I've made it easy so anyone can run it.

* You'll need the TypeScript compiler. `npm install -g typescript`
* Compile the project by running `tsc`
* Install the dependencies for the project by running `npm install`
* Create a copy of [config.example.json](https://github.com/Swan/Goose/blob/master/config/config.example.json) named config.json, and fill in the appropriate details.
* Run the bot by running `node index.js` or `npm start`

# LICENSE 
[MIT](https://github.com/Swan/Goose/blob/master/README.md)
