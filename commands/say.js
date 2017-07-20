/*
 * This function is a fun command that will say anything
 * the owner of it wants to a given channel.
 * Example: .say (id) Hello!
 */
import * as config from '../config/config.json';

export async function say(client, message, args) {
    try {
    /*
     * In the event that the message sender wasn't the owner, 
     * we don't want to do anything with this command.
     */
     if (message.author.id != config.OWNER_ID) return;
     
     /*
      * In the event that the message sender doesn't provide enough arguments.
      * or the channel id they've specified was invalid.  
      */
     if (args.length < 2) return await message.reply("You need to specify both a channel id & a message");

     const channelId = args[0];
     if (isNaN(channelId)) return await message.reply("The channel id must be a number. Usage: `.say (channel id) (message)`");

     if (channelId.length != 18) return await message.reply("The channel id you have given was not long enough.");

     // Remove the channel id from the array of arguments.
     args.splice(0, 1);
     
     /*
      * Join the array together to get the original message string and
      * send it to the discord channel.
      */
     const messageToSend = args.join(" ");
     return client.channels.get(channelId).sendMessage(messageToSend); 

    } catch(err) {
        console.log(err);
        return await message.reply("Unable to execute the .say command");
    }

     
}