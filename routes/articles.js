var express = require("express");
var router = express.Router();

/* GET article data */
router.get("/", function(req, res, next) {
  console.log("Coucou les copinous");

  let redditData = [
    {
      text: "Les bananes sont cuites",
      url: "http://lesbananessontcuites.com"
    },
    {
      text: "Les bananes sont crues",
      url: "http://lesbananessontcuites.com"
    },
    {
      text: "Les bananes sont mortes",
      url: "http://lesbananessontcuites.com"
    }
  ];

  res.send(JSON.stringify({ redditData }));
});

module.exports = router;
