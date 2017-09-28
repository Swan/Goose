import * as Discord from 'discord.js';
import { Mode } from '../enums/mode';
import * as suspicious from '../src/suspicious';
const config = require('./config.json');
const WebSocket = require('ws');

// Responsible for connecting to the Ripple WebSocket & handling all of the associated events.
export function connectToWebSocket(client: Discord.Client) {
    let socket = new WebSocket(config.websocket);

    socket.onopen = (event: any) => {

        // Send a message to the Ripple WebSocket that we want to receive the data for all scores.
        socket.send(JSON.stringify({ type: 'subscribe_scores', data: [] }));

        socket.onmessage = (event: any) => {
            const message = JSON.parse(event.data);

            if (message.type == 'connected') 
                console.log(`[WEBSOCKET] Successfully connected to WebSocket: ${config.websocket}`);

            if (message.type == 'subscribed_to_scores')
                console.log(`[WEBSOCKET] Successfully subscribed to all scores.`);

            handleNewScore(client, message);
        }

    }
}

// Handles all of the events that will take place when a given score comes in.
function handleNewScore(client: Discord.Client, message: any) {
    if (message.type == 'new_score') {
        const data = message.data;

        // Suspicious osu!std score
        if (data.play_mode == Mode.Standard && data.pp >= config.suspicious.std) {
            console.log(`[WEBSOCKET] Suspicious Std score from - User: ${data.user.username} (#${data.user.id}) | PP: ${data.pp} | Id: ${data.id}`);
            suspicious.handleSuspiciousScore(client, data);
        }

        // Suspicious osu!mania score
        if (data.play_mode == Mode.Mania && data.pp >= config.suspicious.mania) {
            console.log(`[WEBSOCKET] Suspicious Mania score from - User: ${data.user.username} (#${data.user.id}) | PP: ${data.pp} | Id: ${data.id}`);
            suspicious.handleSuspiciousScore(client, data);
        }

        // Suspicious osu!taiko score
        if (data.play_mode == Mode.Taiko && data.pp >= config.suspicious.taiko) {
            console.log(`[WEBSOCKET] Suspicious Taiko score from - User: ${data.user.username} (#${data.user.id}) | PP: ${data.pp} | Id: ${data.id}`);
            suspicious.handleSuspiciousScore(client, data);
        }
    }
}