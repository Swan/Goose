import * as Discord from 'discord.js';
const Mute = require('./models/mute');
const moment = require('moment');
const config = require('./config/config.json');

// Checks the db if any of the muted user's have had their mute times expired.
export async function checkUnmuteTime(client: Discord.Client) {
    try {
        setInterval(async () => {
            // Every 60 seconds, we'll check the database for unmute times
            const foundMutedUsers: any = await Mute.find();
            foundMutedUsers.forEach(async (user) => {
                const currentTime: any = moment().utc();

                if (currentTime.diff(user.unmuteTime) >= 0) {
                    console.log(`[COMMANDS] User: ${user.discordId} was unmuted from the chat.`);

                    const guild: Discord.Guild = client.guilds.array()[0];

                    // Remove role from user
                    const target: Discord.GuildMember = await guild.fetchMember(user.discordId);
                    await target.removeRole(config.roles.muted);
                    await target.setMute(false);

                    // Remove from DB
                    return await user.remove();
                }
            });
        }, 5000);

    } catch (e) {
        console.log(e);
    }
}