var express = require('express');
var router = express.Router();
const path = require('path');

const root = path.join(__dirname,"../public")

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile('index.html', {root} )
})

router.all('/', (req, res, next) => {
  res.status(405).send("Method Not Allowed")
})

module.exports = router
