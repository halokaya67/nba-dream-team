const router = require('express').Router();
const bcrypt = require('bcryptjs');
const UserModel = require('../../models/User.model')

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
            res.render('profile/profile-edit', {user});
        }).catch((err) => {
            next(err);
        })
});



router.post('/profile/edit', (req, res, next) => {
    const { imgUrl, aboutMe, username, email, password, age, country, favTeam } = req.body;

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    UserModel.findOneAndUpdate({ username }, { imgUrl, aboutMe, username, email, password: hash, age, country, favTeam })
        .then(() => {
            res.redirect('/profile/profile');
        }).catch(error => {
            res.render('profile/profile-edit', {error: 'Edit Failed!'});
        })
});

module.exports = router;
