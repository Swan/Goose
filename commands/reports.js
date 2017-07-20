/* 
 * The purpose of this file is to setup a command that will send information about
 * how to report players in the #playerreporting channel of the discord.
 * This message SHOULD be the only one in the channel, as all newer messages
 * will be deleted and dumped into a private channel.
 */
import { RichEmbed } from 'discord.js';
import * as config from '../config/config.json';

export async function sendPlayerReportingEmbed(client, message, args) {
    try {
        if (message.author.id != config.OWNER_ID) return;

        const embed = getPlayerReportingEmbed();
        return await message.channel.sendEmbed(embed);

    } catch(err) {
        console.log(err);
        return await message.reply("Unable to send the Player Reporting embedded message.");
    }
}

/* 
 * This function's purpose is to solely return the RichEmbed that will be sent in the channel.
 */
const getPlayerReportingEmbed = () => {
    const embeddedMessage = new RichEmbed()
        .setTitle('Welcome To The Player Reporting Channel!')
        .setColor(0xDB88C2)
        .setThumbnail('https://suck.eggplants.org/7kw3b4.png')
        .setTimestamp()
        .addField('Information', "**PLEASE READ EVERYTHING TO AVOID GETTING SILENCED!!!**\n\n"+
                                 "• Welcome to the #playerreporting channel. Here, you can report players you suspect of rule breaking.", true)
        .addField('Rules', "**TO ENSURE WE ONLY RECEIVE QUALITY REPORTS, WE HAVE A FEW RULES, SO READ THEM.**\n\n" +
                            "• Please **DO NOT** highlight the Community Managers in this channel.\n\n" +
                            "• Do **NOT** spam in this channel. You only need to post **ONE TIME!!**\n\n" +
                            "• Any troll or false reports will **NOT** be tolerated, and will result in a silence.\n\n", true)
        .addField('Report Format', "**• TO SUBMIT A REPORT, PLEASE COPY AND FILL IN THE DETAILS.** \n\n **• REMEMBER, YOU ONLY NEED TO SUBMIT ONE REPORT**\n\n" +
                                    "```Player's Username:\n\n"+
                                    "Link To Player's Profile:\n\nReason For Reporting (Cheating, Multi-Accouting, Etc.):\n\n"+
                                    "Any Evidence You Might Have (Suspicious Plays, Videos, Screenshots, Etc.):```", true);

    return embeddedMessage;
};