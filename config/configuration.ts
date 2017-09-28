import * as Discord from 'discord.js';
import { connectToWebSocket } from './websocket';
import { checkUnmuteTime } from '../checkunmute';
const config = require('./config.json');
const mongoose = require('mongoose');

// Responsible for starting up the bot, connecting to the websocket,
// db, and setting other preliminary configuration options.
export async function start (client: Discord.Client) {
    try {
        await client.login(config.botToken);
        await client.user.setStatus(config.defaultStatus);
        await client.user.setGame(config.playingGame);
        await connectToWebSocket(client);
        await checkUnmuteTime(client);

        mongoose.Promise = global.Promise;
        await mongoose.connect(config.mongoDbURI, { useMongoClient: true });
        console.log("[CONFIG] Successfully connected to the mongo database.");

        printLoginSuccess(client);

    } catch (err) {
        console.error(err);
        process.exit();
    }
};



// Responsible for printing a success message upon logging the bot in.
function printLoginSuccess(client: Discord.Client) {
        console.log(`\n----------------------\n\n` +
        `Connection: ${config.botName} has connected succesfully!\n` +
        `Started at: ${client.readyAt}\n` + 
        `User: ${client.user}\n` +
        `Playing Game: ${config.playingGame}\n` + 
        `Owner Discord Id: ${config.ownerId}\n` +
        `Uptime: ${client.uptime}ms\n` +
        `Guilds: ${client.guilds.array().length}\n` +
        `Channels: ${client.channels.array().length}\n` +
        `\n----------------------\n`);
}