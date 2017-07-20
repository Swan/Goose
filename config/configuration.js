/*
 * This file is responsible for all of the configuration of Goose,
 * which is mainly starting the bot, setting it's status & playing game.
 * And also connecting to the MONGO database. See config.json
 */
import * as config from './config.json';
import { connectToWebSocket } from '../utils/websocket';

export async function loginBot(client) {
    try {
        /*
         * Log the bot in, and set up its status
         * and playing game.
         */
        await client.login(config.BOT_TOKEN);
        await client.user.setStatus(config.DEFAULT_STATUS);
        await client.user.setGame(config.PLAYING_GAME);
        await connectToWebSocket(client);

        /*
         * Send a succes log to the console with preliminary
         * configuration details.
         */
        console.log(`\n----------------------\n\n` +
                        `Connection: Goose has connected succesfully!\n` +
                        `Started at: ${client.readyAt}\n` + 
                        `User: ${client.user}\n` +
                        `Playing Game: ${config.PLAYING_GAME}\n` + 
                        `Owner Discord Id: ${config.OWNER_ID}\n` +
                        `Uptime: ${client.uptime}ms\n` +
                        `Guilds: ${client.guilds.array().length}\n` +
                        `Channels: ${client.channels.array().length}\n` +
                        `\n----------------------\n`)

    } catch (err) {
        throw new Error(err);
    }
}