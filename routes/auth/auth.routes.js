const router = require('express').Router();
const bcrypt = require('bcryptjs');
const UserModel = require('../../models/User.model');

// Get Sign up page

router.get("/signUp", (req, res, next) => {
  res.render("auth/signUp");
});

// Post sign up 

router.post("/signUp", (req,res,next) => {
    const {username, email, password} = req.body

    if (!username || !email || !password) {
      res.render('auth/signUp', {error: 'Please enter all fields'})
      // To tell JS to come out off this function
      return;
  }

  // Check for email 
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  // check if the email does not match the regex
  if ( !re.test(email)) {
    res.render('auth/signUp', {error: 'Pleae enter a valid format'})
    // To tell JS to come out off this function
    return;
  }


  //check for strong passwords
  let passRegEx = /^(?=.*[A-Z])(?=.*[!@#$&*_])(?=.*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{6,16}$/
  if (!passRegEx.test(password)) {
    res.render('auth/signUp', {error: 'Password needs to have an uppercase character, a special character, a number and be 6-16 characters'})
    // To tell JS to come out off this function
    return;
  }

  // ------------------------------------------------
  // ------------------------------------------------

  // Generates a salt
  const salt = bcrypt.genSaltSync(10);

  // Uses the salt and your password to create a hashed password
  const hash = bcrypt.hashSync(password, salt);

  UserModel.create({username, email, password: hash})
    .then(() => {
        res.redirect('/profile/profile')
    })
    .catch((err) => {
        next(err)
    })

})

// Get Log in page

router.get("/logIn", (req, res, next) => {
  res.render("auth/logIn");
});

// Post Log in page

router.post('/logIn', (req, res, next) => {
  const { username, password } = req.body;

  UserModel.findOne({ username })
    .then((user) => {
      if (user) {
        let isValid = bcrypt.compareSync(password, user.password);
        if (isValid) {
          req.session.loggedInUser = user;
          req.app.locals.isLoggedIn = true;
          res.redirect('/profile');
        } else {
          res.render('auth/logIn', { error: 'Invalid password!"}' })
        }
      } else {
        res.render('auth/logIn', { error: 'User not found!' });
      }
    }).catch((err) => {
      next(err);
    })
});

router.get('/logOut', (req, res, next) => {
  req.session.destroy();
  req.app.locals.isLoggedIn = false;
  res.redirect('/');
});

module.exports = router;