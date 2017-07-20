/*
 * The purpose of this file is to send suspicious scores of both mania
 * and osu!std. For a score to be considered "suspicious" it will have
 * to be larger than 475pp for std and 8,500pp for mania
 */
import * as config from '../config/config.json';
import * as axios from 'axios';
import * as utils from './utils';
import { RichEmbed } from 'discord.js';

export async function suspicious(client, data) {
    try {
        /*
        * Get a string representation of the playmode for later use in
        * the embedded message.
        */
        let gameMode = '';
        switch (data.play_mode) {
            case 0:
                gameMode = 'OSU!STD';
                break;
            case 3:
                gameMode = 'OSU!MANIA';
                break;
        }

        /*
        * Since the Ripple API doesn't return the specific beatmap id,
        * and only the beatmap md5, we'll make a request to the actual beatmap
        * and find it that way.
        */
        const api = `https://ripple.moe/api/get_beatmaps?h=${data.beatmap_md5}&limit=1`;
        const response = await axios.get(api);
        const beatmapId = response.data[0].beatmap_id;


        const embed = getEmbed(data, gameMode, beatmapId);
        return await client.channels.get(config.channels.CHEATERS).sendEmbed(embed);

    } catch (err) {
        console.log(err);
    }

}

/*
 * Responsible for creating an embedded message and returning it 
 * back to the caller to be sent to the Discord.
 */
const getEmbed = (data, gameMode, beatmapId) => {
    const embed = new RichEmbed()
        .setAuthor(`SUSPICIOUS ${gameMode} SCORE! - USER: ${data.user_id} submitted ${utils.addCommas(Math.trunc(data.pp))}pp score!`)
        .setColor(0xF6BC02)
        .setThumbnail(`http://a.ripple.moe/${data.user_id}`)
        .setTimestamp()
        .addField('Details', `Ripple user **#${data.user_id}** has submitted **${gameMode}** score **#${data.id}** worth ${utils.addCommas(Math.trunc(data.pp))}pp!`, true)
        .addField(`Userpage`, `[Profile](https://ripple.moe/u/${data.user_id})`, true)
        .addField(`Replay`, `[Replay](https://ripple.moe/web/replays/${data.id})`, true)
        .addField(`.osu File`, `[Beatmap](https://osu.ppy.sh/osu/${beatmapId})`, true)
        .addField(`Beatmap`, `[Beatmap](https://eggplants.org/b/${beatmapId})`, true);

    return embed;
};