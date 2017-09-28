import * as Discord from 'discord.js';
const Mute = require('../models/mute');
const moment = require('moment');
const config = require('../config/config.json');

// Responsible for muting a user, whether timed or not.
export async function muteMember(client: Discord.Client, message: Discord.Message, args: string[]) {
    try {
        if (!message.guild.member(message.author).hasPermission("MUTE_MEMBERS")) return;

        // In the event the sender does not mention a user.
        if (message.mentions.users.size == 0) 
            return await message.reply("You need to mention a user in order to mute them.");


        //Get the first user mentioned, check if it's a valid user
        // and then proceed to mute them from text/voice chat.
        const target: Discord.GuildMember = message.guild.member(message.mentions.users.first());
        if (!target)
            return await message.reply("The user you are trying to mute isn't valid.");

        // Get mute time if it exists, and store the unmute time in the database.
        const muteTime: string | null = args[1] || null;
        const timeFormat: string | null = args[2] || null;
        let reason: string = args[3] || "None";

        if (muteTime && !timeFormat) return await message.reply("You need to give me a time format (s/m/h/d).");
        
        if (muteTime && timeFormat) {
            if (timeFormat == 's' || timeFormat == 'm' || timeFormat == 'h' || timeFormat == 'd' || timeFormat == 'y') {
                const currentTime: any = moment().utc();
                const unmuteTime: any = currentTime.add(muteTime, timeFormat).utc().format();

                // If the mute reason has more than one word, we'll want to join them together.
                if (args[4]) {
                    args.splice(0, 3);
                    reason = args.join(" ");
                }

                // Store unmute time in DB
                const foundMutedUser: any = await Mute.findOne({ discordId: target.id});
                if (foundMutedUser) {
                    // If already a muted user, update his time.
                    await foundMutedUser.update({ unmuteTime: unmuteTime, reason: reason });
                    console.log(`[COMMANDS] ${target} muted updated successfully to: ${unmuteTime} | Reason: ${reason}`);

                } else {
                    // We'll want to store a new muted user in the database.
                    const mutedUser = await Mute.create({ discordId: target.id, discordName: target.displayName, unmuteTime: unmuteTime });
                    console.log(`[COMMANDS] ${target} was successfully until: ${unmuteTime} | Reason: ${reason}`);
                }

                // Add mute role + voice chat
                await target.addRole(config.roles.muted);
                await target.setMute(true);
                return await message.channel.sendMessage(`${target} has been muted from text/voice chat for: **${muteTime}${timeFormat}**. Reason: *"${reason}"*`);

            } else {
                return await message.reply("You need to give me a proper time format (s/m/h/d).");
            }

        } else {
            await target.addRole(config.roles.muted);
            await target.setMute(true);
            return await message.channel.sendMessage(`${target} has been muted from text/voice chat.`);
        }        
    } catch (err) {
        console.log(err);
        return await message.reply("I don't have permissions to mute that user.");
    }
}