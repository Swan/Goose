/*
 * The purpose of this file is to have event handlers for when users join or leave
 * the discord server. In this case, we'll just send a message to the channel 
 * letting everyone know.
 */
import * as config from '../config/config.json';

export async function sayJoinMessage(client, member) {
    try {
        return await client.channels.get(config.channels.GENERAL).sendMessage(`Welcome to Ripple, ${member}!`);
    } catch(err) {
        console.log(err);
    }
}

export async function sayLeaveMessage(client, member) {
    try {
        return await client.channels.get(config.channels.GENERAL).sendMessage(`See you next time, ${member.displayName}!`);
    } catch(err) {
        console.log(err);
    }
}