/*
 * The sole purpose of this file is to provide an event handler 
 * which will take a report that is send in #playerreporting, and
 * dump it into a private channel for Community Managers.
 */
import * as config from '../config/config.json';
import { randomColor } from 'randomcolor';
import { RichEmbed } from 'discord.js';

export async function dumpReport(client, message) {
    try {
        /*
        * Only execute this event handler if the message sender isn't a bot,
        * and if it's a normal user that sent it in #playerreporting
        */
        if (message.author.bot) return;

        if (message.author.id != config.OWNER_ID && message.channel.id == config.channels.PLAYER_REPORTING) {
            // Delete the message from the channel.
            await message.delete();

            /*
            * Create an embedded message and send it to both #reports and
            * the user, with a confirmation that it was received.
            */
            const embed = getReportEmbed(message);
            await client.channels.get(config.channels.REPORTS).sendEmbed(embed);
            await message.author.sendMessage(`Hey there, ${message.author}! Thank you for your report. It will be reviewed by the Ripple Community Managers soon!`);
            return await message.author.sendEmbed(embed);
        }

    } catch(err) {
        console.log(err);
    }

}

/*
 * This function is solely responsible for returning an embedded message
 * so we can use this to dump in #reports, and to send to the report sender.
 */
const getReportEmbed = (message) => {

    let color = randomColor();
    let hex = parseInt(color.replace(/^#/, ''), 16);

    const embed = new RichEmbed()
        .setAuthor(`New Player Report Received!`)
        .setColor(hex)
        .setThumbnail(message.author.avatarURL)
        .setTimestamp()
        .addField('Author', message.author.toString())
        .addField('Report', message.content.toString())

    return embed;

};