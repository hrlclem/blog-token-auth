const { body, validationResult } = require("express-validator");

const Comment = require("../models/comment")


exports.comment_list = (req,res) => {                     // Display all comments of an article page GET
  res.render('comment', { title: 'COMMENTS' });
};

exports.comment_add_get = (req,res) => {                  // Add comment GET
  res.render('comment', { title: 'COMMENT' });
};

exports.comment_add_post = [                            // Create new article POST
    body("content")
      .trim()
      .isLength({ min: 1 })
      .escape()
      .withMessage('Content is required!'),   

    async (req, res, next) => {
      const errors = validationResult(req);
      if(!errors.isEmpty()) {
        return res.render("articleDetail", { title: "Couldn't add new comment", errors: errors.array() });
      }
      console.log(req.params.articleid)
    
      const comment = new Comment({
        content: req.body.content,
        date: Date.now(),
        user: req.user.id,
        article: req.params.articleid,
      })

      await comment.save((err) => {
        if(err) return next(err);
      res.redirect(`/`);
    })
  }
];

  
exports.comment_delete = (req,res) => {                   // Delete Comment
  res.render('comment', { title: 'DELETE COMMENT' });
};
