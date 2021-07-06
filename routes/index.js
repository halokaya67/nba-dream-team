const router = require("express").Router();
const {getPlayerByFullName} = require("../middlewares/middleware");

/* GET home page */
router.get("/", (req, res, next) => {
  let playersArr = [];
  let players = [];
  let names = ['lebron_james', 'kevin_durant', 'james_harden', 'giannis_antetokounmpo', 'stephen_curry'];
  for (let i = 0; i < names.length; i++) {
    players.push(getPlayerByFullName(names[i])) // pushing 5 promises inside the players array
  }
  Promise.all(players)
    .then((players) => {
      players.forEach((obj) => {
        playersArr.push(obj.data.data[0]);
      });
      res.render('index', {playersArr})
    }).catch((err) => {
      next(err);
    })
  
 // TODO: when you search for just one layer do like this
  // getPlayerByFullName('kevin')
  //   .then()
  //   .catch()
});

module.exports = router;