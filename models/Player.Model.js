const mongoose = require("mongoose");


const playerSchema = new mongoose.Schema({
    firstName:{
        type: String
    },
    lastName:{
        type: String
    },
    team:{
        type: String
    },
    age:{
        type: Number
    },
    height: {
        type: Number
    },
    weight:{
        type: Number
    },
    position:{
        type: String
    }
})

const PlayerModel = mongoose.model("Player", playerSchema);
module.exports = PlayerModel
