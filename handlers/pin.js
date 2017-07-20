/*
 * This file is responsible for setting up an event handler where
 * when an administrator gives a reaction of :exclamation: to
 * a report in #reports, then it will pin the message.
 */ 
import * as config from '../config/config.json'

export async function pinReport(messageReaction) { 
    try {
        if (messageReaction.message.channel.id != config.channels.REPORTS) return;

        const reaction = messageReaction.emoji.reaction;
        if (reaction._emoji.name == '❗' && !messageReaction.message.pinned)
            return await messageReaction.message.pin();

    } catch(err) {
        messageReaction.message.reply("I was unable to pin that message because I don't have permissions to do so.");
    }
}

