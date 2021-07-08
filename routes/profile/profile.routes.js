const router = require('express').Router();
const bcrypt = require('bcryptjs');
const UserModel = require('../../models/User.model');
const PlayerModel = require('../../models/Player.model');
const TeamModel = require('../../models/Team.model')
const uploader = require('../../config/cloudinary.config');
const {getPlayerByFullName, getPlayersByFullName, getPlayerById} = require("../../middlewares/middleware");

router.get('/profile', (req, res, next) => {
    let {username} = req.session.loggedInUser;

    UserModel.find({ username })
        .populate('myTeams')
        .populate('favPlayers')
        .then((user) => {
            res.render('profile/profile', {user: user[0], favPlayers: user[0].favPlayers, myTeams: user[0].myTeams});
        }).catch((err) => {
            next(err);
        })
});

router.get('/profile/edit', (req, res, next) => {
    let {username} = req.session.loggedInUser;

    UserModel.find({ username })
        .then((user) => {
            res.render('profile/edit-profile', {user: user[0]});
        }).catch((err) => {
            next(err);
        })
});

router.post('/profile/edit', (req, res, next) => {
    const { aboutMe, username, email, password, age, country, favTeam } = req.body;
    let id = req.session.loggedInUser._id;

    if (!username || !email || !password) {
        UserModel.findById(id)
            .then((user) => {
                res.render('profile/edit-profile', {error: 'Please enter required fields', user})
            }).catch((err) => {
                next(err);
            });
        // To tell JS to come out off this function
        return;
    }

  // Check for email 
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    // check if the email does not match the regex
    if ( !re.test(email)) {
        res.render('profile/edit-profile', {error: 'Please enter a valid format!'})
        // To tell JS to come out off this function
        return;
    }

  //check for strong passwords
    let passRegEx = /^(?=.*[A-Z])(?=.*[!@#$&*_])(?=.*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{6,16}$/
    if (!passRegEx.test(password)) {
        res.render('profile/edit-profile', {error: 'Password needs to have an uppercase character, a special character, a number and be 6-16 characters'})
        // To tell JS to come out off this function
        return;
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    UserModel.findOneAndUpdate({ username }, { aboutMe, username, email, password: hash, age, country, favTeam })
        .then(() => {
            res.redirect('/profile');
        }).catch(error => {
            res.render('profile/edit-profile', {error: 'Edit Failed!'});
        })
});

// profile delete
router.post('/profile/delete', (req, res, next) => {
    let {username} = req.session.loggedInUser;

    UserModel.findOneAndRemove({ username })
        .then(() => {
            req.session.destroy();
            res.redirect('/')
        }).catch(error => {
            res.render('profile/edit-profile', {error: 'Delete Account Failed!'});
        })
});

// Profile pic image upload 
router.post('/upload', uploader.single("imageUrl"), (req, res, next) => {
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
    console.log(path)
    
    UserModel.findOneAndUpdate({ username }, { imageUrl: path })
        .then(() => {
            res.redirect('/profile');
        }).catch((error) => {
            res.render('profile/edit-profile', {error: 'Profile Image Upload Failed!'});
        })
});

module.exports = router;