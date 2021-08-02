const router = require('express').Router();
const bcrypt = require('bcryptjs');

// models required/used
const UserModel = require('../../models/User.model');
const PlayerModel = require('../../models/Player.model');
const TeamModel = require('../../models/Team.model')
const uploader = require('../../config/cloudinary.config');
const { getPlayerByFullName, getPlayersByFullName, getPlayerById } = require("../../middlewares/middleware");

// render create team view
router.get('/profile/create-team', (req, res, next) => {
    const { username } = req.session.loggedInUser;
    UserModel.find({ username })
        .then((user) => {
            res.render('team/create-team', {user: user[0]});
        }).catch((err) => {
            next(err);
        })
});

router.post('/profile/create-team', (req, res, next) => {
    const { name } = req.body
    const {username} = req.session.loggedInUser;

    // make sure all fields entered
    if (!name) {
        res.render('team/create-team', {error: 'Please enter all fields!'}) 
        return;
    } else if (name.length >= 20) {
        res.render('team/create-team', {error: 'Name can be max 20 characters!'}) 
    } else {
        TeamModel.create({ name })
            .then((team) => {
                UserModel.findOneAndUpdate({ username }, { $push: { myTeams: team }})
                    .then(() => {
                        res.redirect('/profile');
                    })
            }).catch((err) => {
                res.render('team/create-team', {error: 'Team create failed!',username});
            });
    }
});

// Dynamic route for deleting teams
router.post('/profile/:id/delete-team', (req, res, next) => {
    let { username } = req.session.loggedInUser;
    let id = req.params.id;
    const { name } = req.body;

    playersIds = [];

    TeamModel.findById(id)
        .then((team) => {
            team.players.forEach((player) => {
                playersIds.push(player._id);
            })

            playersIds.forEach((id) => {
                PlayerModel.findByIdAndDelete(id)
                    .then(() => {
                        console.log(`Player with id:${id} deleted!`);
                    })
            })
        })
    
    

    UserModel.findOneAndUpdate({ username }, { $pull: { myTeams: id } })
        .then(() => {
            TeamModel.findByIdAndDelete(id)
                .then(() => {
                    res.redirect('/profile');
                }).catch((err) => {
                    res.render('profile/profile', {error: 'Team delete failed!',username});
                });
        })
});

// route for handling team select
router.get('/profile/:id', (req, res, next) => {
    const {username} = req.session.loggedInUser;
    let id = req.params.id;

    TeamModel.findById(id)
        .populate('players')
        .then((team) => {
            UserModel.find({ username })
                .then((user) => {
                    res.render('team/team', {team, user: user[0]});
                })
        }).catch((err) => {
            res.redirect('/profile', { error: 'Team not  found!' });
        });
});

// route for editing Team
router.get('/profile/:id/edit-team', (req, res, next) => {
    let {username} = req.session.loggedInUser;
    let id = req.params.id;

    TeamModel.findById(id)
        .then((team) => {
            UserModel.find({ username })
                .then((user) => {
                    res.render('team/edit-team', {team, user: user[0]});
                })
        }).catch((error) => {
            res.redirect('/profile', { error: 'Team not  found!' });
        })
});

// post route after edit team fill
router.post('/profile/:id/edit-team', (req, res, next) => {
    let id = req.params.id
    const { name } = req.body;

    TeamModel.findByIdAndUpdate((id), { name })
        .then(() => {
            res.redirect('/profile');
        }).catch((err) => {
            res.redirect('/profile', { error: 'Team edit failed!' });
        })
});

// handling team image

router.post('/upload/:id/team-logo', uploader.single("imageUrl"), (req, res, next) => {
    // the uploader.single() callback will send the file to cloudinary and get you and obj with the url in return
    console.log('file is: ', req.file)
    
    if (!req.file) {
        console.log("there was an error uploading the file", next(new Error('No file uploaded!')));
        return;
    }
    // You will get the image url in 'req.file.path'
    // Your code to store your url in your database should be here
    let id = req.params.id
    const { path } = req.file
    
    TeamModel.findByIdAndUpdate((id), { imageUrl: path })
        .then(() => {
            res.redirect('/profile');
        }).catch((error) => {
            res.render(`profile/${id}/edit-team`, {error: 'Profile Image Upload Failed!'});
        })
});

module.exports = router;