const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxLength: 20
    },
    imageUrl: {
        type: String,
        default: '/images/team-default.png'
    },
    players: [{
        ref: 'Player',
        type: mongoose.Schema.Types.ObjectId
    }]
})

const TeamModel = mongoose.model("Team", teamSchema);
module.exports = TeamModel

