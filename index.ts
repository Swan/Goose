import * as Discord from 'discord.js';
import * as configuration from './config/configuration';
import * as commands from './/commands';
import { dumpReport } from './src/report';
import { pinReport } from './src/pin';
import { sayJoinMessage, sayLeaveMessage } from './src/arrival';

const client: Discord.Client = new Discord.Client();

client.on('message', (message: Discord.Message) => {
    commands.execute(client, message);
    dumpReport(client, message);
});

client.on('guildMemberAdd', (member) => { sayJoinMessage(client, member); });
client.on('guildMemberRemove', (member) => { sayLeaveMessage(client, member); });
client.on('messageReactionAdd', (messageReaction) => { pinReport(messageReaction) });

configuration.start(client);

