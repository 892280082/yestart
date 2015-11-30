var express = require('express');
var merges = require('../self_modules/merges/merges.js');
var router = express.Router();


/* login page. */
router.get('/cached', function(req, res, next) {
  res.render('angular/cached');
});

router.get('/data', function(req, res, next) {
	res.send('今天天气好啊');
});


module.exports = router;