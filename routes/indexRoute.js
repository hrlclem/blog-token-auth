const express = require('express');
const router = express.Router();
const Article = require("../models/article")

// Display homepage GET
router.get('/', async (req, res, next) => {
  try{
    const articles = await Article.find().sort([["date", "descending"]]).populate("user");
    return res.render('index', { title: 'HOMEPAGE', user: req.user, articles: articles});
  } catch (err) {
    return  next(err);
  }
});


module.exports = router;
