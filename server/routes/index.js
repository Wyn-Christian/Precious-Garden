var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.json({ title: "This is the index of Precious Garden's Server" });
});

module.exports = router;
