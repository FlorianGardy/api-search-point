var express = require("express");
let getDataFromReddit = require("./APIFunctions/getDataFromReddit");
var router = express.Router();

/* GET article data */
router.get("/", function(req, res, next) {
  // Call Reddit API
  getDataFromReddit("Marlene", "relevance", 25).then(redditData => {
    return res.send(JSON.stringify({ redditData: redditData }));
  });
});

module.exports = router;
