import * as Discord from 'discord.js';

// Responsible for kicking a mentioned user from the discord server.
// Usage: .kick/k @user
export async function kickMember(client: Discord.Client, message: Discord.Message, args: string[]) {
    try {
        if (!message.guild.member(message.author).hasPermission('KICK_MEMBERS')) return;

        // In the event that the sender doesn't mention a user to kick.
        if (message.mentions.users.size == 0) 
            return await message.reply("You need to mention a user for me to kick.");

        // In the event that the bot itself doesn't have permission to kick the user.
        if (!message.guild.member(client.user).hasPermission('KICK_MEMBERS'))
            return await message.reply("I don't have permissions to kick this user.");

        // Grab the first mentioned user and kick them from the server.
        const target: Discord.GuildMember = message.guild.member(message.mentions.users.first());
        if (!target) return await message.reply("The user you are trying to kick doesn't seem valid.");

        await target.kick();
        return await message.channel.sendMessage(`${target} was successfully kicked from the server.`);

    } catch(err) {
        console.log(err);
        return await message.reply("I don't have permissions to kick this user.");
    }
}