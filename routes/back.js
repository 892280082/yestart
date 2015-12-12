var express = require('express');
var Admin = require('../models/admin.js');
var merges = require('../self_modules/merges/merges.js');
var router = express.Router();


router.use("/*",function(req,res,next){
  console.log("haha");
  req.session.admin ? res.next() : res.download('/back/login.html');
})

module.exports = router;
