import * as Discord from 'discord.js';

// Responsible for deleting messages that contain a certain keyword
export async function filterMessages(client: Discord.Client, message: Discord.Message, args: string[]) {
    try {
        if (!message.guild.member(message.author).hasPermission("MANAGE_MESSAGES")) return;
        if (args.length == 0) return;

        // Get the words the user wants to filter.
        const filterKeywords: string = args.join(" ").toLowerCase();
        console.log(filterKeywords);

        const messages: any = await message.channel.fetchMessages({ limit: 50 })
        let messagesToDelete: Discord.Message[] = [];

        // Get messages to delete.
        messages.forEach(async (message: any) => {
            if (message.embeds != 'undefined') {
                message.embeds.forEach((embed: Discord.MessageEmbed) => {
                        if (embed.title.toLowerCase().includes(filterKeywords)) {
                            messagesToDelete.push(message);
                        }
                });
            } 
            
            if (message.content != 'undefined' && message.content.toLowerCase().includes(filterKeywords)) {
                messagesToDelete.push(message);
            }
        });

        await message.channel.bulkDelete(messagesToDelete);

    } catch (err) {
        console.log(err);
        return await message.reply("Unable to filter messages.");
    }
}