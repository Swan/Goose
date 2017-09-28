import * as Discord from 'discord.js';
const config = require('../config/config.json');

// Responsible for sending the #playerreporting embedded message
export async function sendPlayerReportingEmbed(client: Discord.Client, message: Discord.Message, args: string[]) {
    try {
        if (message.author.id != config.ownerId) return;

        const embed: Discord.RichEmbed = getPlayerReportingEmbed();
        return await message.channel.sendEmbed(embed);

    } catch(err) {
        console.log(err);
        return await message.reply("Unable to send the Player Reporting embedded message.");
    }
}

// Returns the embedded message that'll be sent in the channel.
const getPlayerReportingEmbed = () => {
    return new Discord.RichEmbed()
        .setTitle('Welcome To The Player Reporting Channel!')
        .setColor(0xDB88C2)
        .setThumbnail('https://eggplants.org/7kw3b4.png')
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
};