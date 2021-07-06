const mongoose = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    age: Number,
    imageUrl: String,
    country: String,
    aboutMe: String,
    favTeam: String,
    favPlayers: [{
        ref: 'player',
        type: mongoose.Schema.Types.ObjectId
    }],
    myTeams: [{
        ref: 'team',
        type: mongoose.Schema.Types.ObjectId
    }]
});

const UserModel = mongoose.model("User", userSchema);
module.exports = UserModel;