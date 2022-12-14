const express = require('express');
const router = express.Router();

const article_controller = require("../controllers/articleController")

const freeAccess = (req, res, next) => {
    if (req.user) {
      return next();
    }
    res.redirect("/users/auth/nologin");
  };



// -.com/articles/-
router.get('/', article_controller.articles_list);                      // Display all articles page GET
router.get('/view/:articleid', article_controller.article_details_get);      // Display article page GET

router.get('/add', freeAccess, article_controller.article_add_get);                 // Get share article 
router.post('/add', freeAccess, article_controller.article_add_post);               // Post share article 
router.delete('/view/:articleid/delete', freeAccess, article_controller.article_delete); // Delete Article


module.exports = router;
