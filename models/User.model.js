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
    imageUrl: {
        type: String,
        default: '/images/profile-default.png'
    },
    country: String,
    aboutMe: String,
    favTeam: String,
    favPlayers: [{
        ref: 'Player',
        type: mongoose.Schema.Types.ObjectId
    }],
    myTeams: [{
        ref: 'Team',
        type: mongoose.Schema.Types.ObjectId
    }]
});

const UserModel = mongoose.model("User", userSchema);
module.exports = UserModel;