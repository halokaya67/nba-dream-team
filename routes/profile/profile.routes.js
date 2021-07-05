const router = require('express').Router();
const UserModel = require('../../models/User.model')

router.get('/profile', (req,res,next) => {
    res.render('profile/profile')
})

router.post('/profile', (req,res,next) => {
    res.req.params('profile/profile-edit')
})

router.post('/profile', (req,res,next) => {
    res.req.params('profile/teams-edit')
})




module.exports = router

