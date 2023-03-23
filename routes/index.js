var express = require('express');
var router = express.Router();

const root = __dirname

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile('/index.html', {root} )
});

module.exports = router;
