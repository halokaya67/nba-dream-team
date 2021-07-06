const router = require('express').Router();
const bcrypt = require('bcryptjs');
const UserModel = require('../../models/User.model');
const uploader = require('../../config/cloudinary.config');
const axios = require('axios');

router.get('/profile', (req, res, next) => {
    let username = req.session.loggedInUser.username;

router.post('/profile', (req,res,next) => {
    res.req.params('profile/profile-edit')
})

router.post('/profile', (req,res,next) => {
    res.req.params('profile/teams-edit')
})

    UserModel.find({ username })
        .then((user) => {
            res.render('profile/profile-edit', {user: user[0]});
        }).catch((err) => {
            next(err);
        })
});

router.get('/profile/teams-edit', (req, res, next) => {
    let username = req.session.loggedInUser.username;

    UserModel.findOne({ username })
        .then((user) => {
            res.render('profile/teams-edit', {user: user[0]})
        }).catch((error) => {
            res.redirect('/profile', { error: 'User not  found!' });
        })
});

router.post('/profile/edit', (req, res, next) => {
    const { imageUrl, aboutMe, username, email, password, age, country, favTeam } = req.body;

    if (!aboutMe || !username || !email || !password || !age || !country || !favTeam) {
        res.render('profile/profile-edit', {error: 'Please enter all fields'})
        // To tell JS to come out off this function
        return;
    }

  // Check for email 
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    // check if the email does not match the regex
    if ( !re.test(email)) {
        res.render('profile/profile-edit', {error: 'Please enter a valid format!'})
        // To tell JS to come out off this function
        return;
    }


  //check for strong passwords
    let passRegEx = /^(?=.*[A-Z])(?=.*[!@#$&*_])(?=.*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{6,16}$/
    if (!passRegEx.test(password)) {
        res.render('profile/profile-edit', {error: 'Password needs to have an uppercase character, a special character, a number and be 6-16 characters'})
        // To tell JS to come out off this function
        return;
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    UserModel.findOneAndUpdate({ username }, { imageUrl, aboutMe, username, email, password: hash, age, country, favTeam })
        .then(() => {
            res.redirect('/profile');
        }).catch(error => {
            res.render('profile/profile-edit', {error: 'Edit Failed!'});
        })
});

router.post('/profile/delete', (req, res, next) => {
    let username = req.session.loggedInUser.username;

    UserModel.findOneAndRemove({ username })
        .then(() => {
            req.session.destroy();
            res.redirect('/')
        }).catch(error => {
            res.render('profile/profile-edit', {error: 'Delete Account Failed!'});
        })
});

router.post('/upload', uploader.single("imageUrl"), (req, res, next) => {
    // the uploader.single() callback will send the file to cloudinary and get you and obj with the url in return
    console.log('file is: ', req.file)
    
    if (!req.file) {
        console.log("there was an error uploading the file", next(new Error('No file uploaded!')));
        return;
    }
    // You will get the image url in 'req.file.path'
    // Your code to store your url in your database should be here
    let username = req.session.loggedInUser.username;
    const { path } = req.file
    
    UserModel.findOneAndUpdate({ username }, { imageUrl: path })
        .then(() => {
            res.redirect('/profile');
        }).catch((error) => {
            res.render('profile/profile-edit', {error: 'Profile Image Upload Failed!'});
        })
});

module.exports = router;
