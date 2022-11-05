
exports.articles_list = (req,res) => {                 // Display all articles page GET
  res.render('index', { title: 'ARTICLES' });
};
  
exports.article_details_get = (req,res) => {           // Display article page GET
  res.render('article', { title: 'ARTICLE' });
};

exports.article_add_post = (req,res) => {               // Create new article POST
  res.render('article', { title: 'ARTICLE' });
};
  
exports.article_delete = (req,res) => {                // Delete Article
  res.render('article', { title: 'DELETE ARTICLE' });
};

