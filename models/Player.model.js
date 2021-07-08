const mongoose = require("mongoose");


const playerSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    team_name: String,
    height_feet: Number,
    height_inches: Number,
    weight_pounds: Number,
    position: String,
})

const PlayerModel = mongoose.model("Player", playerSchema);
module.exports = PlayerModel
