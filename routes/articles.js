var express = require("express");
let getDataFromReddit = require("./APIFunctions/getDataFromReddit");
var router = express.Router();

/* GET article data */
router.get("/", function(req, res, next) {

  let keyWord = req.query.keyWord;
  let sortType = req.query.sort;
  let nbOfItems = parseInt(req.query.nbitem);

  // param keyWord is mandatory
  if(!keyWord) return res.send("no keyword specified");
  

  // Call Reddit API
  getDataFromReddit(keyWord, sortType, nbOfItems).then(redditData => {
    return res.send(JSON.stringify({ redditData: redditData }));
  });
});

module.exports = router;
