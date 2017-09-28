const mongoose = require('mongoose');

const muteSchema = new mongoose.Schema({
    discordId: String,
    discordName: String,
    unmuteTime: String,
    reason: String
});

module.exports = mongoose.model("Mute", muteSchema);