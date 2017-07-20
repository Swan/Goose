/*
 *  The purpose of this file is to provide a command
 *  to mute guild members in the Discord server.
 *  When using this command, it will give them
 * the role that has the id specified in 
 * config/config.json -- roles.MUTED
 */
import * as config from '../config/config.json';

export async function muteMember(client, message, args) {
    try {
        /*
         *  We'll only want to execute this command if the message sender
         * has the correct permissions. In this case it's "MUTE_MEMBERS."
         * For the Ripple Discord, only administrators & Chat Mods will
         * have access to this permission, so it circumvents the reason
         * to have permissions for specific roles.
         */
        if (!message.guild.member(message.author).hasPermission("MUTE_MEMBERS")) return;

        if (message.mentions.users.size == 0) 
            return await message.reply("You need to mention a user in order to mute them.");

        /*
         * Get the first user mentioned, check if it's a valid user
         * and then proceed to mute them from text/voice chat.
         */
        const target = message.guild.member(message.mentions.users.first());
        if (!target)
            return await message.reply("The user you are trying to mute isn't valid.");

        await target.addRole(config.roles.MUTED);
        await target.setMute(true);

        return await message.channel.sendMessage(`${target} has been muted from text/voice chat.`);
        
    } catch (err) {
        console.log(err);
        message.reply("I don't have permissions to mute that user.");
    }
}