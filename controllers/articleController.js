const { body, validationResult } = require("express-validator");

const Article = require("../models/article")
const Comment = require("../models/comment")
const Users = require("../models/users")

exports.articles_list = (req,res) => {                 // Display all articles page GET
res.render('index', { title: 'ALL ARTICLES' });
};
  
exports.article_details_get = async (req,res, next) => {           // Display article page GET
    try{
      const article = await Article.findById(req.params.articleid) ;
      const comments = await Comment.find({article:req.params.articleid})
      const author = await Users.findById(article.user)

      res.render('articleDetail', { title: 'ARTICLE', user: req.user, article:article, author: author, comments:comments });
      console.log("author" + author)
      console.log("article" + article)

    } catch (err) {
      return  next(err);
    }
  }

exports.article_add_get = (req,res) => {               // Create new article GET
  res.render('addArticle', { title: 'Add a new article' });
};

exports.article_add_post = [                            // Create new article POST
  body("title")
    .trim()
    .isLength({ min: 1 },{max: 30})
    .escape()
    .withMessage('Title is required!'),
  body("content")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage('Content is required!'),   
  
    async (req, res, next) => {
      const errors = validationResult(req);
      if(!errors.isEmpty()) {
        return res.render("addArticle", { title: "Add a new article", errors: errors.array() });
      }
    
      const article = new Article({
        user: req.user.id,
        title: req.body.title,
        content: req.body.content,
        date: Date.now(),
      })

      await article.save((err) => {
        if(err) return next(err);
        res.redirect(`/articles/view/${article.id}`)
      })
    }
];
  
exports.article_delete = (req, res, next) => {                // Delete Article
    Article.findByIdAndRemove(req.params.articleid, function (err) {
      if(err) return next(err);
      res.render('profile', { title: 'Article deleted successfully!'});
    })
};

