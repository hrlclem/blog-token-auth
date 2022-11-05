const express = require('express');
const router = express.Router();

const article_controller = require("../controllers/articleController")

// -.com/articles/-
router.get('/', article_controller.articles_list);                    // Display all articles page GET
router.get('/:articleid', article_controller.article_details_get);    // Display article page GET

router.post('/add', article_controller.article_add_post);             // Post article 
router.delete('/:articleid/delete', article_controller.article_delete);      // Delete Article


module.exports = router;
