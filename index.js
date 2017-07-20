/*
 * This file is the entry point of the bot. 
 * We'll create and log the client in here, and specify a list of events
 * and their handlers. See: config/configuration.js for more config details.
 */ 
import * as Discord from 'discord.js';
import { loginBot } from './config/configuration';
import * as commands from './commands/commands';
import { sayJoinMessage, sayLeaveMessage } from './handlers/joinleave';
import { dumpReport } from './handlers/report';
import { pinReport } from './handlers/pin';

const client = new Discord.Client();

client.on('message', (message) => { 
    commands.execute(client, message); 
    dumpReport(client, message);
});

client.on('guildMemberAdd', (member) => { sayJoinMessage(client, member); });
client.on('guildMemberRemove', (member) => { sayLeaveMessage(client, member); });
client.on('messageReactionAdd', (messageReaction) => { pinReport(messageReaction) });

loginBot(client);
