import * as Discord from 'discord.js';

// Responsible for banning a guild member.
export async function banMember(client: Discord.Client, message: Discord.Message, args: string[]) {
    try {
        if (!message.guild.member(message.author).hasPermission('BAN_MEMBERS')) return;

        // In the event that the send doesn't provide a user to mention.
        if (message.mentions.users.size == 0) 
            return await message.reply("You need to mention a user for me to ban.");

        // If the bot itself doesn't have permission to ban the mentioned user.
        if (!message.guild.member(client.user).hasPermission('BAN_MEMBERS'))
            return await message.reply("I don't have permissions to ban this user.");

        // Grab the first mentioned user and ban them from the guild.
        const target: Discord.GuildMember = message.guild.member(message.mentions.users.first());
        if (!target) return await message.reply("The user you are trying to ban doesn't seem valid.");

        await target.ban();
        return await message.channel.sendMessage(`${target} was successfully banned from the server.`);

    } catch(err) {
        console.log(err);
        return await message.reply("I don't have permissions to ban this user.");
    }
}