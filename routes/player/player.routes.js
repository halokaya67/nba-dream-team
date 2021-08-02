const router = require('express').Router();

// Model imports
const UserModel = require('../../models/User.model');
const PlayerModel = require('../../models/Player.model');
const TeamModel = require('../../models/Team.model')

const uploader = require('../../config/cloudinary.config');
const { getPlayerByFullName, getPlayersByFullName, getPlayerById } = require("../../middlewares/middleware");

// Fav player render
router.get('/profile/add-player', (req, res, next) => {
    // validating username
    let { username } = req.session.loggedInUser
    
    UserModel.find({ username })
        .then((user) => {
            // rendering welcome back message
            res.render('player/add-player', {user: user[0]});
        }).catch((err) => {
            next(err);
        })
})


router.post('/profile/add-player', (req, res, next) => {
    const id = req.body.player
    let {username} = req.session.loggedInUser
    // API call for player
    let picked;
    let player = getPlayerById(id);

    Promise.resolve(player)
    // fetch data from api and push into Playermodel
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

router.post('/profile/list-players', (req, res, next) => {
    // Search player feature
    let {username} = req.session.loggedInUser
    const { search } = req.body;

    // replace underscore for space in api data when string is input in search bar
    let name = String(search).replace(/ /g, "_");
    
    let playersArr;
    let players = [];

    // pushing player into players array
    players.push(getPlayersByFullName(name));

    Promise.all(players)
    // fetching response response from API)
        .then((players) => {
            // grabbing data inside playersArr
            players.forEach((obj) => {
                playersArr =  obj.data.data;
            });
            res.render('player/add-player', {playersArr, username, })
        }).catch((err) => {
            next(err);
        })
});

// Deleting players from fav list
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
// rendering add team player view
router.get('/profile/:id/add-team-player', (req, res, next) => {
    const {username} = req.session.loggedInUser;
    let id = req.params.id;
    console.log(id)

    TeamModel.findById(id)
        .then((team) => {
            res.render('player/add-team-player', { team, username });
        }).catch((err) => {
            next(err);
        })
});

// Inserting player to team
router.post('/profile/:id/add-team-player', (req, res, next) => {
    const playerId = req.body.player;
    const { username } = req.session.loggedInUser;
    let id = req.params.id;
    
    let player = getPlayerById(playerId);

    Promise.resolve(player)
        .then((player) => {
            const { first_name, last_name, height_feet, height_inches, position, weight_pounds } = player.data;
            const { full_name } = player.data.team;
            PlayerModel.create({ first_name, last_name, height_feet, height_inches, position, weight_pounds, team_name: full_name })
                .then((createdPlayer) => {
                    TeamModel.findByIdAndUpdate((id), {$push: {players: createdPlayer}})
                        .then((team) => {
                            res.redirect(`/profile/${team._id}`,);
                        })
                })
        }).catch((err) => {
            next(err);
        })
});

// Deleting player from Team Model
router.post('/profile/:id/:playerId/delete-team-player', (req, res, next) => {
    let id = req.params.id;
    let playerId = req.params.playerId;

    PlayerModel.findByIdAndDelete(playerId)
        .then(() => {
            TeamModel.findByIdAndUpdate((id) , { $pull: { players: playerId } })
                .then(() => {
                    res.redirect(`/profile/${id}`);
                })
        }).catch((err) => {
            next(err);
        });
});

// Listing players in the teams
router.post('/profile/:id/list-players', (req, res, next) => {
    let {username} = req.session.loggedInUser
    const { search } = req.body;
    let name = String(search).replace(/ /g, "_");
    let id = req.params.id;
    
    let playersArr;
    let players = [];

    players.push(getPlayersByFullName(name));

    Promise.all(players)
        .then((players) => {
            players.forEach((obj) => {
                playersArr =  obj.data.data;
            });
            TeamModel.findById(id)
                .then((team) => {
                    res.render(`player/add-team-player`, {team, playersArr, username})  
                })
        }).catch((err) => {
            next(err);
        })
});

module.exports = router;