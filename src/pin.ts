import * as Discord from 'discord.js';
const config = require('./config/config.json');

// Pins a message in #reports if a user gives a reaction of :exclamation:
export async function pinReport(messageReaction) { 
    try {
        if (messageReaction.message.channel.id != config.channelIds.reports) return;

        const reaction = messageReaction.emoji.reaction;
        if (reaction._emoji.name == '❗' && !messageReaction.message.pinned)
            return await messageReaction.message.pin();

    } catch(err) {
        messageReaction.message.reply("I was unable to pin that message because I don't have permissions to do so.");
    }
}
