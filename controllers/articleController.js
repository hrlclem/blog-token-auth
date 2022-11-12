const { body, validationResult } = require("express-validator");
const Article = require("../models/article")

exports.articles_list = (req,res) => {                 // Display all articles page GET

  res.render('index', { title: 'ARTICLES' });
};
  
exports.article_details_get = (req,res) => {           // Display article page GET
  res.render('article', { title: 'ARTICLE' });
};

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
        title: req.body.title,
        content: req.body.content,
        user: req.user.id,
        date: Date.now(),
      })

      await article.save((err) => {
        if(err) return next(err);
        res.redirect("/")
      })
    }
];
  
exports.article_delete = (req,res) => {                // Delete Article
  res.render('article', { title: 'DELETE ARTICLE' });
};

