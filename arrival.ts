import * as Discord from 'discord.js';

const config = require('./config/config.json');

// Sends a message welcoming a user upon their arrival.
export async function sayJoinMessage(client, member: Discord.GuildMember) {
    try {
        return await client.channels.get(config.channelIds.general).sendMessage(`Welcome to Ripple, ${member}!`);
    } catch(err) {
        console.log(err);
    }
}

// Sends a message letting everyone know about a user's departure.
export async function sayLeaveMessage(client, member: Discord.GuildMember) {
    try {
        return await client.channels.get(config.channelIds.general).sendMessage(`See you next time, ${member.displayName}!`);
    } catch(err) {
        console.log(err);
    }
}