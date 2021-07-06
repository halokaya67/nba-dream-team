const router = require("express").Router();
const {getPlayerByFullName} = require("../middlewares/middleware");

/* GET home page */
router.get("/", (req, res, next) => {
  let players = []
  let names = ['kevin_durant', 'james_harden']
  for (let i = 0; i < 5; i++) {
    players.push(getPlayerByFullName(names[i])) // pushing 5 promises inside the players array
  }
  Promise.all(players)
    .then(() => {
      res.render()
    })
    .catch()
  
 // TODO: when you search for just one layer do like this
  getPlayerByFullName('kevin')
    .then()
    .catch()

    // .then((lebronJames) => {
      
      // getPlayerByFullName('kevin_durant')
      //   .then((kevinDurant) => {
      //     getPlayerByFullName('james_harden')
      //       .then((jamesHarden) => {
      //         getPlayerByFullName('giannis_antetokounmpo')
      //           .then((giannisAntetokounmpo) => {
      //             getPlayerByFullName('stephen_curry')
      //               .then((stephenCurry) => {
      //                 res.render("index", {lebronJames: lebronJames.data[0], kevinDurant: kevinDurant.data[0], jamesHarden: jamesHarden.data[0], giannisAntetokounmpo: giannisAntetokounmpo.data[0], stephenCurry: stephenCurry.data[0]});
      //               })
      //           })
      //       })
      //   })
    // })
});

module.exports = router;