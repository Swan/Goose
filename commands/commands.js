/*
 * This file is responsible for being a "house" for all of our commands.
 * All commands are written in different files, but are executed here.
 */
import * as config from '../config/config.json';

import { say } from './say';
import { sendPlayerReportingEmbed } from './reports';
import { kickMember } from './kick';
import { muteMember } from './mute';
import { unmuteMember } from './unmute';
import { banMember } from './ban';
import { pruneMessages } from './prune';

export async function execute(client, message) {
    try {
        /*
        * If the message sender is either the bot, or doesn't start
        * with the command prefix, we don't want to do anything 
        * with it.
        */
        if (message.author.bot) return;
        if (!message.content.startsWith(config.COMMAND_PREFIX)) return;

        /*
        * If the message wasn't sent in a guild, then we'll just return because
        * this can cause bot crashes with certain commands.
        */
        if (!message.guild) return await message.reply("Excuse me. Why are you trying to execute commands outside of a guild?");

        /*
        * Isolate both the commands and any given arguiments from the message,
        * so we can use them later.
        */
        const command = message.content.split(" ")[0].slice(config.COMMAND_PREFIX.length);
        const args = message.content.split(" ").slice(1);

        /*
        * Lastly, run a switch on all of the possible commands, and execute them 
        * accordingly. 
        */
        switch (command) {
            case 'say':
                return await say(client, message, args);
            case 'pr':
            case 'playerreporting':
                return await sendPlayerReportingEmbed(client, message, args);
            case 'kick':
            case 'k':
                return await kickMember(client, message, args);
            case 'm':
            case 'mute':
                return await muteMember(client, message, args);
            case 'u':
            case 'unmute':
                return await unmuteMember(client, message, args);
            case 'b':
            case 'ban':
                return await banMember(client, message, args);
            case 'p':
            case 'prune':
            case 'purge':
                return await pruneMessages(client, message, args);
            default: 
                return;
        }

    } catch (err) {
        console.log(err);
    }
}