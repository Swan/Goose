import * as Discord from 'discord.js';
const config = require('./config/config.json');
import { pruneMessages } from './commands/prune';
import { kickMember } from './commands/kick';
import { sendPlayerReportingEmbed } from './commands/pr';
import { banMember } from './commands/ban';
import { muteMember } from './commands/mute';
import { unmuteMember } from './commands/unmute';
import { filterMessages } from './commands/filter';

// Handles the execution of commands.
export async function execute(client: Discord.Client, message: Discord.Message) {
    try {
        if (message.author.bot) return;
        if (!message.content.startsWith(config.commandPrefix)) return;
        if (!message.guild) return await message.reply("You are not allowed to execute commands outside of a guild.");

        // Get both the command and arguments from the message content 
        const command: string = message.content.split(" ")[0].slice(config.commandPrefix.length);
        const args: string[] = message.content.split(" ").slice(1);

        // Switch over all of the possible command strings and execute them
        switch (command) {
            case 'pr': case 'playerreporting':
                await sendPlayerReportingEmbed(client, message, args);
                break;
            case 'k': case 'kick':
                await kickMember(client, message, args);
                break;
            case 'm': case 'mute':
                await muteMember(client, message, args);
                break;
            case 'u': case 'unmute':
                await unmuteMember(client, message, args);
                break;
            case 'b': case 'ban':
                await banMember(client, message, args);
                break;
            case 'p': case 'prune': case 'purge':
                await pruneMessages(client, message, args);
                break;
            case 'f': case 'filter':
                await filterMessages(client, message, args);
                break;
            default:
                return;
        }

    } catch (err) {
        console.error(err);
        await message.reply("Could not execute command.");
    }
}