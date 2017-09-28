import * as Discord from 'discord.js';
const config = require('../config/config.json');
const Mute = require('../models/mute');

// Responsible for unmuting a user from the chat.
export async function unmuteMember(client: Discord.Client, message: Discord.Message, args: string[]) {
    try {
        if (!message.guild.member(message.author).hasPermission("MUTE_MEMBERS")) return;

        // In the event the sender does not mention a user.
        if (message.mentions.users.size == 0) 
            return await message.reply("You need to mention a user in order to unmute them.");

        // Get the first user mentioned and unmute them.
        const target: Discord.GuildMember = message.guild.member(message.mentions.users.first());
        if (!target)
            return await message.reply("The user you are trying to unmute isn't valid.");

        await target.removeRole(config.roles.muted);
        await target.setMute(false);

        // Check if user in DB and remove them if that is the case.
        const foundMutedUsers: any = await Mute.find({ discordId: target.id }).remove().exec();
        console.log(`[COMMANDS] ${target} was unmuted and removed from the database.`);

        return await message.channel.sendMessage(`${target} has been unmuted from text/voice chat.`);
        
    } catch (err) {
        console.log(err);
        message.reply("I don't have permissions to unmute that user.");
    }
}