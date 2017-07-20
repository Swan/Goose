/*
 * The sole purpose of this file is to connect to the Ripple WebSocket and
 * maintain the connection, whilst performing different tasks when new
 * scores come in. This will be called in config/configuration.js
 */
import * as config from '../config/config.json';
import { suspicious } from './suspicious';
const WebSocket = require('ws');

export function connectToWebSocket(client) {
    let socket = new WebSocket(config.WEBSOCKET);

    socket.onopen = (event) => {

        /*
         * Here, we'll want to grab the scores of every single user that
         * submits something.
         */
        const message = { type: 'subscribe_scores', data: [] };
        socket.send(JSON.stringify(message));


        socket.onmessage = (event) => {
            const message = JSON.parse(event.data);
            if (message.type == 'connected') console.log(`[WEBSOCKET] Successfully connected to WebSocket: ${config.WEBSOCKET}`);
            if (message.type == 'subscribed_to_scores') console.log(`[WEBSOCKET] Successfully subscribed to scores on WebSocket: ${config.WEBSOCKET}`);

            let data = message.data;
            if (message.type == 'new_score') {
                /*
                 * Only care about scores over 100pp
                 */
                if (data.play_mode == 0 && data.pp >= 100) {
                    console.log(`[WEBSOCKET] NEW OSU!STD SCORE SUBMITTED!: PP: ${data.pp} | Game Mode: ${data.play_mode} | Beatmap: ${data.beatmap_md5}`);
                }

                /*
                 * Only consider osu!std scores as suspicious if they are over 475 PP
                 */
                if (data.play_mode == 0 && data.pp >= config.suspicious.STD) {
                    console.log(`[WEBSOCKET] SUSPICOUS OSU!STD SCORE SUBMITTED!: PP: ${data.pp} | Game Mode: ${data.play_mode} | Beatmap: ${data.beatmap_md5}`);
                    suspicious(client, data);
                }

                /*
                 * Only consider osu!mania scores as suspicious if they are over 8,000 PP
                 */
                if (data.play_mode == 3 && data.pp >= config.suspicious.MANIA) {
                    console.log(`[WEBSOCKET] SUSPICOUS OSU!MANIA SCORE SUBMITTED!: PP: ${data.pp} | Game Mode: ${data.play_mode} | Beatmap: ${data.beatmap_md5}`);
                    suspicious(client, data);
                }                

            }
        };

        /*
         * In the event that the WebSocket connection closes, we'll
         * attempt to reconnect to it again.
         */
        socket.onclose = (event) => {
            console.log("[WEBSOCKET] Socket Closed, Attempting to reconnect to Ripple WebSocket.");
            connectToWebsocket();
        };
    };
}