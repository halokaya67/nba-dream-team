const mongoose = require("mongoose");


const teamSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    players: {
        type: Array,
        ref: 'players',
        type: Mongoose.Schema.Types.ObjectId    
    }
})

const TeamModel = mongoose.model("Team", userSchema);
module.exports = TeamModel

