/*
 * The purpose of this file is to provide a command
 * for administrators to prune messages. Whether it be 
 * from the chat itself, or from a given user. We'll be
 * able to specify the amount of messages as well.
 */
export async function pruneMessages(client, message, args) {
    try {
        /*
         *  Don't bother runnign the command if the message sender
         * doesn't have the ability themselves to delete messages.
         */
        if (!message.guild.member(message.author).hasPermission("MANAGE_MESSAGES")) return;

        const NUM_NOT_SPECIFIED = 'You must specify the amount of messages you would like to prune.';

        if (args.length < 1) 
            return await message.reply(NUM_NOT_SPECIFIED);

        /*
        * If no user was mentioned, we'll assume that the message sender
        * wants to prune messages from all users in the chat.
        * AKA, Delete mass spam.
        */
        if (message.mentions.users.size == 0) {
            const numMessagesToDelete = args[0];

            if (isNaN(numMessagesToDelete)) 
                return await message.reply(NUM_NOT_SPECIFIED);

            if (numMessagesToDelete < 2 || numMessagesToDelete > 100)
                return await message.reply("You can only prune between 2 and 100 messages at a time.");

            return await message.channel.bulkDelete(parseInt(numMessagesToDelete));
        }

        /*
         * If a user WAS mentioned, then only delete their messages.
         */
        if (message.mentions.users.size > 0) {
            const target = message.guild.member(message.mentions.users.first());
            if (!target)
                return await message.reply("The user you are trying to prune isn't valid.");

            const numMessagesToDelete = args[1];
            if (isNaN(numMessagesToDelete))
                return await message.reply(NUM_NOT_SPECIFIED);

            /* 
             * Fetch all of the channel's messages and map over them to find and 
             * delete messages by the specific user.
             */
            let channelMessages = await message.channel.fetchMessages();
            channelMessages = channelMessages.array();

            let targetMessages = channelMessages.filter((channelMessage) => {
                if (channelMessage.author.id == target.id) return channelMessage;
            });

            /*
             * Get only up to the numMessagesToDelete'th message and remove them.
             */
            targetMessages = targetMessages.slice(0, numMessagesToDelete);
            message.channel.bulkDelete(targetMessages);
            
        }

    } catch (err) {
        console.log(err);
        return await message.reply("I don't have permission to prune messages");
    }
}