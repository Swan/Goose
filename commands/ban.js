/*
 * This file is responsible for defining a  ban command. This
 * will essentially ban users from the server if the message 
 * sender has the correct permissions.
 */
export async function banMember(client, message, args) {
    try {
        /*
        * Don't bother running the command if the message sender 
        * doesn't have the correct permissions.
        */
        if (!message.guild.member(message.author).hasPermission('BAN_MEMBERS')) return;

        /*
        * In the event that the message sender doesn't provide a 
        * guild member to ban.
        */
        if (message.mentions.users.size == 0) 
            return await message.reply("You need to mention a user for me to ban.");

        /* 
        * In the event that the bot itself doesn't have the permission to 
        * ban users.
        */
        if (!message.guild.member(client.user).hasPermission('BAN_MEMBERS'))
            return await message.reply("I don't have permissions to ban this user.");

        /*
         *  Grab the first mentioned user and ban them from the server.
         */
        const target = message.guild.member(message.mentions.users.first());
        if (!target) return await message.reply("The user you are trying to ban doesn't seem valid.");

        await target.ban();
        return await message.channel.sendMessage(`${target} was successfully banned from the server.`);

    } catch(err) {
        console.log(err);
        return await message.reply("I don't have permissions to ban this user.");
    }


}