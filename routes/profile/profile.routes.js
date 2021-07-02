const Router = require('express')
const UserModel = require('../../models/User.model')

router.get('/profile', (req,res,next) => {
    res.render('profile/profile')
})

router.get('profile/edit', (req,res,next) => {
    res.render(profile/profile-edit)
})

module.exports= Router