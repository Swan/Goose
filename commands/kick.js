/*
 * This file is responsible for defining a kick command. This
 * will essentially kick users from the server if the message 
 * sender has the correct permissions.
 */
export async function kickMember(client, message, args) {
    try {
        /*
        * Don't bother running the command if the message sender 
        * doesn't have the correct permissions.
        */
        if (!message.guild.member(message.author).hasPermission('KICK_MEMBERS')) return;

        /*
        * In the event that the message sender doesn't provide a 
        * guild member to kick.
        */
        if (message.mentions.users.size == 0) 
            return await message.reply("You need to mention a user for me to kick.");

        /* 
        * In the event that the bot itself doesn't have the permission to 
        * kick users.
        */
        if (!message.guild.member(client.user).hasPermission('KICK_MEMBERS'))
            return await message.reply("I don't have permissions to kick this user.");

        /*
         *  Grab the first mentioned user and kick them from the server.
         */
        const target = message.guild.member(message.mentions.users.first());
        if (!target) return await message.reply("The user you are trying to kick doesn't seem valid.");

        await target.kick();
        return await message.channel.sendMessage(`${target} was successfully kicked from the server.`);

    } catch(err) {
        console.log(err);
        return await message.reply("I don't have permissions to kick this user.");
    }


}