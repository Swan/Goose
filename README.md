# Goose
>Goose is a Discord bot that was made specifically for the [Ripple](https://ripple.moe) Discord server. It is a fairly basic bot but written (for the 4th time) with scalability in mind. 

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
* Say command.

**Commands In Depth**
* `.say (channelId) (Message)` - Fun command for the bot owner to say a message to any channel the bot has access to.
* `.pr / .playerreporting` - Sends the report information embed to the sent channel.
* `.mute / m @user` - Mutes a given user.
* `.unmute / um @unmute` - Unmutes a given user.
* `.kick / .k` - Kicks a user from the server.
* `.ban / .b` - Bans a user from the server.
* `.prune / .purge / .p (@user) (amount)` - Mass deletes x amount of messages from a channel, or a user.

# Setup
To setup the bot for yourself, you'll have to do quite a bit of stuff, but I've made it easy so anyone can run it.

* You'll need the babel-cli to run this, so run `$ sudo npm install -g babel-cli babel-preset-env`
* Install all of the dependencies needed for the bot by running `$ npm install`
* Create a config.json file with the [example](https://github.com/Swan/Goose/blob/master/config/config.example.json).
* If running on a linux machine, run `chmod +x start.sh`
* To start the bot, run `$ ./start.sh`
* If using [pm2](https://github.com/Unitech/pm2), you can also run `$ pm2 start ./start.sh --name Goose` instead
* Otherwise just run `$ npm start`.

# LICENSE 
tl;dr - You're free to do what you want with the source.

MIT License

Copyright (c) 2017 Swan

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
