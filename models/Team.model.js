const mongoose = require("mongoose");


const teamSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    imageUrl: String,
    players: [{
        ref: 'Player',
        type: mongoose.Schema.Types.ObjectId    
    }]
})

const TeamModel = mongoose.model("Team", teamSchema);
module.exports = TeamModel

