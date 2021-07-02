const router = require("express").Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});


// Get Sign up page

router.get("/signUp", (req, res, next) => {
  res.render("./auth/signUp");
});


// Get Log in page

router.get("/logIn", (req, res, next) => {
  res.render("auth/logIn");
});

// Post sign up 

router.post("signup", (req,res,next) => {
    const {username, email, password} = req.body

    if (!username || !email || !password) {
      res.render('auth/signUp.hbs', {error: 'Please enter all fields'})
      // To tell JS to come out off this function
      return;
  }

  // Check for email 
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  // check if the email does not match the regex
  if ( !re.test(email)) {
    res.render('auth/signUp.hbs', {error: 'Pleae enter a valid format'})
    // To tell JS to come out off this function
    return;
  }


  //check for strong passwords
  let passRegEx = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/
  if (!passRegEx.test(password)) {
    res.render('auth/signUp.hbs', {error: 'Password needs to have a special character a number and be 6-16 characters'})
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
        res.redirect('/profile')
    })
    .catch((err) => {
        next(err)
    })

})

module.exports = router;