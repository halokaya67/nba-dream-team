const router = require('express').Router();
const UserModel = require('../../models/User.model');
const PlayerModel = require('../../models/Player.model');
const TeamModel = require('../../models/Team.model')
const uploader = require('../../config/cloudinary.config');
const { getPlayerByFullName, getPlayersByFullName, getPlayerById } = require("../../middlewares/middleware");

router.get('/profile/add-player', (req, res, next) => {
    let {username} = req.session.loggedInUser
    res.render('player/add-player', {username});
})

router.post('/profile/add-player', (req, res, next) => {
    const id = req.body.player
    let {username} = req.session.loggedInUser
    
    let picked;
    let player = getPlayerById(id);

    Promise.resolve(player)
        .then((player) => {
            const { first_name, last_name, height_feet, height_inches, position, weight_pounds } = player.data;
            const { full_name } = player.data.team;
            PlayerModel.create({ first_name, last_name, height_feet, height_inches, position, weight_pounds, team_name: full_name })
                .then((createdPlayer) => {
                    UserModel.findOneAndUpdate({ username }, {$push: {favPlayers: createdPlayer}})
                        .then(() => {
                            res.redirect('/profile');
                        })
                })
        }).catch((err) => {
            next(err);
        })
});

router.post('/profile/:id/delete-player', (req, res, next) => {
    let {username} = req.session.loggedInUser
    let id = req.params.id
        
    PlayerModel.findByIdAndDelete(id)
        .then(() => {
            UserModel.findOneAndUpdate({ username }, { $pull: { favPlayers: id } })
                .then(() => {
                    res.redirect('/profile');
                })
        }).catch((err) => {
            next(err);
        })
});

router.post('/profile/list-players', (req, res, next) => {
    let {username} = req.session.loggedInUser
    const { search } = req.body;
    let name = String(search).replace(/ /g, "_");
    
    let playersArr;
    let players = [];

    players.push(getPlayersByFullName(name));

    Promise.all(players)
        .then((players) => {
            players.forEach((obj) => {
                playersArr =  obj.data.data;
            });
            res.render('player/add-player', {playersArr, username})
        }).catch((err) => {
            next(err);
        })
});

module.exports = router;