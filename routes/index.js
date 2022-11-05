const express = require('express');
const router = express.Router();


// Display homepage GET
router.get('/', function(req, res, next) {
  res.render('index', { title: 'HOMEPAGE' });
});


module.exports = router;
