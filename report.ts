import { randomColor } from 'randomcolor';
import * as Discord from 'discord.js';
const config = require('./config/config.json');

// Responsible for taking a report and dumping it into another (private) channel.
export async function dumpReport(client, message: Discord.Message) {
    try {
        if (message.author.bot) return;

        if (message.channel.id == config.channelIds.playerReporting) {
            // Delete the message from the channel.
            await message.delete();

            // create the embedded message
            const embed = getReportEmbed(message);

            // Dump the embed into #reports, and send a confirmation to the user.
            await client.channels.get(config.channelIds.reports).sendEmbed(embed);
            await message.author.sendMessage(`Hey there, ${message.author}! Thank you for your report. It will be reviewed by the Ripple Community Managers soon!`);
            return await message.author.sendEmbed(embed);
        }

    } catch(err) {
        console.log(err);
    }

}

// Returns an embedded message with the content of the report.
const getReportEmbed = (message: Discord.Message) => {

    let color = randomColor();
    let hex = parseInt(color.replace(/^#/, ''), 16);

    return new Discord.RichEmbed()
        .setAuthor(`New Player Report Received!`)
        .setColor(hex)
        .setThumbnail(message.author.avatarURL)
        .setTimestamp()
        .addField('Author', message.author.toString())
        .addField('Report', message.content.toString())
};