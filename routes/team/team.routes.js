const router = require('express').Router();
const bcrypt = require('bcryptjs');
const UserModel = require('../../models/User.model');
const PlayerModel = require('../../models/Player.model');
const TeamModel = require('../../models/Team.model')
const uploader = require('../../config/cloudinary.config');
const { getPlayerByFullName, getPlayersByFullName, getPlayerById } = require("../../middlewares/middleware");

router.get('/profile/create-team', (req, res, next) => {
    const {username} = req.session.loggedInUser;
    res.render('team/create-team', {username});
});

router.post('/profile/create-team', (req, res, next) => {
    const { name } = req.body
    const {username} = req.session.loggedInUser;

    if (!name) {
        res.render('team/create-team', {error: 'Please enter all fields'}) 
        return;
    }
    
    TeamModel.create({ name })
        .then((team) => {
            UserModel.findOneAndUpdate({ username }, { $push: { myTeams: team }})
                .then(() => {
                    res.redirect('/profile');
                })
        }).catch((err) => {
            next(err)
        });
});

router.get('/profile/:id/edit-team', (req, res, next) => {
    let {username} = req.session.loggedInUser;
    let id = req.params._id

    TeamModel.findOne(id)
        .then((team) => {
            console.log(team);
            res.render('team/edit-team', {team})
        }).catch((error) => {
            res.redirect('/profile', { error: 'Team not  found!' });
        })
});

router.post('/profile/:id/delete-team', (req, res, next) => {
    let id = req.params._id;

});

router.post('/upload/team-logo', uploader.single("imageUrl"), (req, res, next) => {
    // the uploader.single() callback will send the file to cloudinary and get you and obj with the url in return
    console.log('file is: ', req.file)
    
    if (!req.file) {
        console.log("there was an error uploading the file", next(new Error('No file uploaded!')));
        return;
    }
    // You will get the image url in 'req.file.path'
    // Your code to store your url in your database should be here
    let {username} = req.session.loggedInUser;
    const { path } = req.file
    
    TeamModel.findOneAndUpdate({  }, { imageUrl: path })
        .then(() => {
            res.redirect('/profile');
        }).catch((error) => {
            res.render('profile/create-team', {error: 'Profile Image Upload Failed!'});
        })
});

module.exports = router;