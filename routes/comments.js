const express = require('express');
const router = express.Router();

const comment_controller = require("../controllers/commentController")

// -.com/articles/:articleid/comments/-
router.get('/', comment_controller.comment_list);                            // Display all comments GET
router.post('/', comment_controller.comment_details_get);                   // Post comment on article 
router.delete('/:commentid/delete', comment_controller.comment_delete);      // Delete Comment


module.exports = router;
