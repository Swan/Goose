import * as Discord from 'discord.js';
import { Mode } from './mode';
import * as utils from './utils';
const config = require('./config/config.json');
const axios = require('axios');

// Responsible for handling a suspicious score when it comes in.
export async function handleSuspiciousScore (client: Discord.Client, data: any) {
    try {
        const channel: any = await client.channels.get(config.channelIds.secret);
        const response = await axios.get(`https://osu.ppy.sh/api/get_beatmaps?k=${config.osuAPIKey}&h=${data.beatmap_md5}`);

        const beatmapId: number = response.data[0].beatmap_id;

        return await channel.sendEmbed(getEmbed(data, beatmapId));

    } catch (err) {
        console.error(err);
    }
}

// Returns a Discord.RichEmbed object with information regarding the suspicious score.
function getEmbed (data: any, beatmapId: number): Discord.RichEmbed {
    // Get a string representation of the game mode enum.
    const gameMode: string = Mode[data.play_mode].toUpperCase();

    const performancePoints: string = utils.addCommas(Math.ceil(data.pp));

    return new Discord.RichEmbed()
        .setAuthor(`SUSPICIOUS ${gameMode} (${performancePoints}pp) SCORE FROM: ${data.user.username.toUpperCase()} (#${data.user.id})!`)
        .setColor(0xF6F614)
        .setThumbnail(`https://a.ripple.moe/${data.user.id}`)
        .setTimestamp()
        .addField('Details', `User: **${data.user.username} (#${data.user.id})** has submitted **${performancePoints}pp ${gameMode} score!** `)
        .addField(`Userpage`, `[Profile](https://ripple.moe/u/${data.user.id})`, true)
        .addField('Replay', `[Replay](https://ripple.moe/web/replays/${data.id})`, true)
        .addField(`.osu File`, `[Beatmap](https://osu.ppy.sh/osu/${beatmapId})`, true)
        .addField(`Beatmap`, `[Beatmap](https://eggplants.org/b/${beatmapId})`, true);        
}