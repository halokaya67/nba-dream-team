const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    imageUrl: String,
    players: [{
        ref: 'Player',
        type: mongoose.Schema.Types.ObjectId,
        max: 5
    }]
})

const TeamModel = mongoose.model("Team", teamSchema);
module.exports = TeamModel

