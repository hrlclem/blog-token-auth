const express = require('express');
const router = express.Router();

const article_controller = require("../controllers/articleController")
const comment_controller = require("../controllers/commentController")


const freeAccess = (req, res, next) => {
    if (req.user) {
      return next();
    }
    res.redirect("/users/nologin");
  };



// -.com/articles/-
router.get('/', article_controller.articles_list);                      // Display all articles page GET

router.get('/add', freeAccess, article_controller.article_add_get);                 // Get Add article 
router.post('/add', freeAccess, article_controller.article_add_post);               // Post Add article 

router.get('/view/:articleid', article_controller.article_details_get);      // Display article page GET
router.post('/view/:articleid/delete', freeAccess, article_controller.article_delete); // Delete Article

router.get('/view/:articleid/comments/', comment_controller.comment_list);                            // Display all comments GET
router.post('/view/:articleid/comments/add', freeAccess, comment_controller.comment_add_post);                         // Post comment on article 
router.delete('/view/:articleid/comments/:commentid/delete', freeAccess, comment_controller.comment_delete);      // Delete Comment

module.exports = router;
