import * as Discord from 'discord.js';

// Responsible for pruning messages in a given channel.
// Usage: .p/prune/purge 10
// Usage: .p/prune/purge @Swan 20
export async function pruneMessages(client: Discord.Client, message: Discord.Message, args: string[]) {
    try {
        if (!message.guild.member(message.author).hasPermission("MANAGE_MESSAGES")) return;

        const NUM_NOT_SPECIFIED: string = 'You must specify the amount of messages you would like to prune.';

        if (args.length < 1) return await message.reply(NUM_NOT_SPECIFIED);

        // If no users were mentioned, we'll prune messages from everyone in the entire chat.
        if (message.mentions.users.size == 0) {
            const numMessagesToDelete: any = args[0];

            if (isNaN(numMessagesToDelete)) 
                return await message.reply(NUM_NOT_SPECIFIED);

            if (numMessagesToDelete < 2 || numMessagesToDelete > 100)
                return await message.reply("You can only prune between 2 and 100 messages at a time.");

            return await message.channel.bulkDelete(parseInt(numMessagesToDelete) + 1);
        }

        // If a user was mentioned however, we'll delete messages fom only that user. 
        if (message.mentions.users.size > 0) {
            const target: Discord.GuildMember = message.guild.member(message.mentions.users.first());
            if (!target)
                return await message.reply("The user you are trying to prune isn't valid.");

            const numMessagesToDelete: any = args[1];
            if (isNaN(numMessagesToDelete))
                return await message.reply(NUM_NOT_SPECIFIED);

            /* 
             * Fetch all of the channel's messages and map over them to find and 
             * delete messages by the specific user.
             */
            let channelMessages: any = await message.channel.fetchMessages();
            channelMessages = channelMessages.array();

            let targetMessages: Discord.Message[] = channelMessages.filter((channelMessage) => {
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